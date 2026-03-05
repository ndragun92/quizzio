import { and, eq } from "drizzle-orm";
import type { TQuiz } from "~~/shared/utils/quiz.db";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler(async (_event) => {
  const creatorId = Number(_event.context.params?.creatorId);
  const quizId = Number(_event.context.params?.quizId);

  const db = await getDatabase();
  const [quiz] = (await (db as any)
    .select()
    .from(schema.quizzes)
    .where(and(eq(schema.quizzes.id, quizId), eq(schema.quizzes.creatorId, creatorId)))
    .limit(1)) as any[];

  return quiz ? (mapDbQuizToQuiz(quiz) as TQuiz) : null;
});
