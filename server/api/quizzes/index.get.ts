import { eq } from "drizzle-orm";
import { EStatus } from "~~/shared/utils/quiz.db";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler((_event) => {
  return getDatabase().then((db) =>
    db
      .select()
      .from(schema.quizzes)
      .where(eq(schema.quizzes.status, EStatus.PUBLISHED))
      .then((rows) => rows.map((quiz) => mapDbQuizToQuiz(quiz)))
  );
});
