import type { TStatusResponse } from '#shared/types/api.type'
import { getQuizRooms } from '~~/server/utils/quiz.utils'

export default defineEventHandler((_event): TStatusResponse => {
  const quizRooms = getQuizRooms()
  const userPeers = Array.from(getUserPeers())
  const deploymentId = process.env.DENO_DEPLOYMENT_ID || 'local'

  return {
    timestamp: new Date().toISOString(),
    deploymentId,
    total: {
      users: userPeers.length,
      quizRooms: quizRooms.length,
    },
    quizRooms,
    userPeers: userPeers.map(([userId, data]) => ({ userId, data })),
  }
})
