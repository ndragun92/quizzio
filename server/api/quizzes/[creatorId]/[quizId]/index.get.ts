import { and, eq } from "drizzle-orm";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler(async (_event) => {
  const creatorId = Number(_event.context.params?.creatorId);
  const quizId = Number(_event.context.params?.quizId);

  const db = await getDatabase();
  const [quiz] = await db
    .select()
    .from(schema.quizzes)
    .where(and(eq(schema.quizzes.id, quizId), eq(schema.quizzes.creatorId, creatorId)))
    .limit(1);

  return quiz ? mapDbQuizToQuiz(quiz) : null;
});
