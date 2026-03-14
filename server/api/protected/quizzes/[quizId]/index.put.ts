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

  const body = await readBody(event)

  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing quiz update payload',
    })
  }

  const updates: Partial<typeof schema.quizzes.$inferInsert> = {
    updatedAt: new Date().toISOString(),
  }

  if (body.title !== undefined) { updates.title = body.title }
  if (body.description !== undefined) { updates.description = body.description }
  if (body.status !== undefined) { updates.status = body.status }
  if (body.category !== undefined) { updates.category = body.category }
  if (body.difficulty !== undefined) { updates.difficulty = body.difficulty }
  if (body.gameMode !== undefined) { updates.gameMode = body.gameMode }
  if (body.settings !== undefined) { updates.settings = body.settings }
  if (body.questions !== undefined) { updates.questions = body.questions }

  if (Object.keys(updates).length === 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No valid quiz fields to update',
    })
  }

  return await db
    .update(schema.quizzes)
    .set(updates)
    .where(and(eq(schema.quizzes.id, quizId), eq(schema.quizzes.creatorId, user.id)))
    .returning()
})
