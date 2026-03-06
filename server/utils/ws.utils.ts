import type { TSocketInfo, TUserPeerData } from '#shared/types/websocket.type'
import type { TApiUser } from '#shared/types/user.type'
import type { TQuizRoom } from './quiz.utils'

// Peer type for WebSocket connections
export type TWebSocketPeer = {
  id: string

  [key: string]: any
}

const allPeers = new Map<string, TWebSocketPeer>() // peerId -> peer
const userPeers = new Map<string, TUserPeerData>() // userId -> peer data

export const getAllPeers = (): IterableIterator<[string, TWebSocketPeer]> => allPeers.entries()
export const getUserPeers = (): IterableIterator<[string, TUserPeerData]> => userPeers.entries()

export const addPeer = (peerId: TWebSocketPeer['id'], peer: TWebSocketPeer): void => {
  allPeers.set(peerId, peer)
}

export const removePeer = (peerId: TWebSocketPeer['id']): void => {
  allPeers.delete(peerId)
}

export interface TAddUserPeerParams {
  userId: TApiUser['id']
  peerId: string
}

export const addUserPeer = ({ userId, peerId }: TAddUserPeerParams): void => {
  userPeers.set(String(userId), { peerId })
}

export const removeUserPeer = (userId: TApiUser['id']): void => {
  userPeers.delete(String(userId))
}

// Map socket IDs to player/room info for an easy lookup
const socketMap = new Map<string, TSocketInfo>()

export const unmapSocket = (socketId: string): TSocketInfo | undefined => {
  const info = socketMap.get(socketId)
  socketMap.delete(socketId)
  return info
}

export interface TMapSocketParams {
  socketId: string
  quizRoomId: TQuizRoom['quizRoomId']
  userId: TApiUser['id']
}

export const mapSocket = ({ socketId, quizRoomId, userId }: TMapSocketParams): void => {
  socketMap.set(socketId, { quizRoomId, userId })
}

export const getSocketInfo = (socketId: string): TSocketInfo | undefined => socketMap.get(socketId)
