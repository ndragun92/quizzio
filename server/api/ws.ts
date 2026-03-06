import type { TApiUser } from '~~/shared/types/user.type'
import {
  broadcastQuizRoomUpdate,
  broadcastToAllPeers,
  createQuiz,
} from '../utils/quiz.utils'

type TCustomPeer = {
  userId?: TApiUser['id']
}

export default defineWebSocketHandler({
  open (peer) {
    const url = peer.websocket.url || ''
    const query = new URL(url).searchParams
    const userId = query.get('userId')
    const deploymentId = process.env.DENO_DEPLOYMENT_ID || 'local'

    if (!userId) {
      console.error('❌ No userId provided in WebSocket connection')
      peer.close()
      return
    }

    (peer as TCustomPeer).userId = Number.parseInt(userId || '0')

    console.debug('[ws] open', {
      userId,
      peerId: peer.id,
      deploymentId,
    })

    addPeer(peer.id, peer)

    addUserPeer({ userId: Number.parseInt(userId || '0'), peerId: peer.id })
    broadcastToAllPeers(JSON.stringify({ type: 'refresh' }))
  },

  message (peer, message) {
    const text = message.text()
    if (!text) {
      return
    }

    try {
      const { type, data } = JSON.parse(text)

      switch (type) {
        case 'createQuiz': {
          const { quizRoomId, quizRoomName, quiz, userId, nickname } = data
          const result = createQuiz({
            quizRoomId,
            quizRoomName,
            quiz,
            userId,
            nickname,
          })
          if (typeof result === 'string') {
            peer.send(JSON.stringify({ type: 'error', data: result }))
          }
          broadcastToAllPeers(JSON.stringify({ type: 'refresh' }))
          break
        }
        case 'joinQuiz': {
          const { userId, nickname, quizRoomId } = data
          const result = joinQuiz({ userId, nickname, quizRoomId })
          if (typeof result === 'string') {
            peer.send(JSON.stringify({ type: 'error', data: result }))
          } else {
            const { quizRoom, userId } = result
            mapSocket({ socketId: peer.id, quizRoomId, userId })
            peer.send(
              JSON.stringify({
                type: 'reconnect',
                data: { quizRoomId, userId },
              }),
            )
            broadcastQuizRoomUpdate(quizRoom.quizRoomId)
          }
          break
        }
      }
    } catch (error) {
      console.error(`server/api/ws.ts:message() ${JSON.stringify(error)}`)
    }
  },

  close (peer) {
    console.debug('[ws] close', peer.id)

    const peerUserId = (peer as TCustomPeer).userId

    const info = unmapSocket(peer.id)
    if (info) {
      // leaveRoom({ roomId: info.quizRoomId, userId: info.userId });
      broadcastQuizRoomUpdate(info.quizRoomId)
      setTimeout(() => {
        broadcastToAllPeers(JSON.stringify({ type: 'refresh' }))
      }, 1000)
    }

    if (peerUserId) {
      removeUserPeer(peerUserId)
    }

    removePeer(peer.id)
    broadcastToAllPeers(JSON.stringify({ type: 'refresh' }))
  },

  error (peer, error) {
    console.error('[ws] error', peer, error)
  },
})
