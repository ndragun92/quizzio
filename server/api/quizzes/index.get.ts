import { eq } from "drizzle-orm";
import { EStatus, type TQuiz } from "~~/shared/utils/quiz.db";
import { getDatabase, schema } from "~~/server/utils/db/client";
import { mapDbQuizToQuiz } from "~~/server/utils/db/seed";

export default defineEventHandler((_event) => {
  return getDatabase().then((db) =>
    (db as any)
      .select()
      .from(schema.quizzes)
      .where(eq(schema.quizzes.status, EStatus.PUBLISHED))
      .then((rows: any[]) => rows.map((quiz) => mapDbQuizToQuiz(quiz) as TQuiz))
  );
});
