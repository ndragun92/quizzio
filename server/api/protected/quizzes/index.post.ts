import type { TCreateQuizRequest } from '~~/shared/types/api.type'
import { EStatus } from '~~/shared/utils/quiz.db'
import { getDatabase, schema } from '~~/server/utils/db/client'
import { mapDbQuizToQuiz } from '~~/server/utils/db/seed'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<TCreateQuizRequest>(event)

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

  const db = await getDatabase()
  const [quiz] = await db
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
    })
    .returning()

  if (!quiz) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create quiz',
    })
  }

  return mapDbQuizToQuiz(quiz)
})
