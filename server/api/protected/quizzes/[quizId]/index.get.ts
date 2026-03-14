import { and, eq } from 'drizzle-orm'
import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event) => {
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

  return await db
    .select()
    .from(schema.quizzes)
    .where(and(eq(schema.quizzes.id, quizId), eq(schema.quizzes.creatorId, user.id)))
    .limit(1)
})
