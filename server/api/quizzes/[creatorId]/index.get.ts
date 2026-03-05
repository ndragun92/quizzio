import { eq } from "drizzle-orm";
import type { TQuiz } from "~~/shared/utils/quiz.db";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler(async (_event) => {
  const creatorId = Number(_event.context.params?.creatorId);
  const db = await getDatabase();
  const quizzes = (await (db as any)
    .select()
    .from(schema.quizzes)
    .where(eq(schema.quizzes.creatorId, creatorId))) as any[];

  return quizzes.map((quiz) => mapDbQuizToQuiz(quiz) as TQuiz);
});
