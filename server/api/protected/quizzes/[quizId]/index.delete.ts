import { and, eq } from 'drizzle-orm'
import type { TDeleteQuizResponse } from '~~/shared/types/api.type'
import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event): Promise<TDeleteQuizResponse> => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const quizId = Number(event.context.params?.quizId)

  if (!Number.isInteger(quizId) || quizId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid quiz id',
    })
  }

  const deleted = await db
    .delete(schema.quizzes)
    .where(and(eq(schema.quizzes.id, quizId), eq(schema.quizzes.creatorId, user.id)))
    .returning()

  if (deleted.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quiz not found',
    })
  }

  return { success: true }
})
