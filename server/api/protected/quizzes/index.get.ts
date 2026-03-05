import { eq } from "drizzle-orm";
import type { TQuiz } from "~~/shared/utils/quiz.db";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const db = await getDatabase();
  const quizzes = await db
    .select()
    .from(schema.quizzes)
    .where(eq(schema.quizzes.creatorId, user.id));

  return quizzes.map((quiz) => mapDbQuizToQuiz(quiz) as TQuiz);
});
