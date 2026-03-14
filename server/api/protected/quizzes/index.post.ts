import { EStatus } from '~~/shared/utils/quiz.db'
import { db, schema } from '@nuxthub/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody(event)

  if (
    !body?.title ||
    !body?.description ||
    !body?.category ||
    !body?.difficulty ||
    !body?.gameMode ||
    !body?.settings ||
    !Array.isArray(body?.questions)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid quiz payload',
    })
  }

  return await db
    .insert(schema.quizzes)
    .values({
      title: body.title,
      description: body.description,
      creatorId: user.id,
      status: body.status ?? EStatus.DRAFT,
      category: body.category,
      difficulty: body.difficulty,
      gameMode: body.gameMode,
      settings: body.settings,
      questions: body.questions,
      // createdAt: new Date(),
    })
    .returning()
})
