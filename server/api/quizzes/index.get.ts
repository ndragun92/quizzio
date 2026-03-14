import { eq } from 'drizzle-orm'
import { EStatus } from '~~/shared/utils/quiz.db'
import { db, schema } from '@nuxthub/db'

export default defineEventHandler((_event) => {
  return db.select()
    .from(schema.quizzes)
    .where(eq(schema.quizzes.status, EStatus.PUBLISHED))
})
