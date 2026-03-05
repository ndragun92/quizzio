import { dbQuiz, EStatus } from "~~/shared/utils/quiz.db";
import type { TDbQuiz, TNewQuiz, TNewUser } from "./schema";
import { quizzes, users } from "./schema";

const bootstrapUsers: TNewUser[] = [
  { id: 1, username: "admin", nickname: "Admin", password: "12345678" },
  { id: 2, username: "user", nickname: "User", password: "12345678" },
  { id: 3, username: "creator123", nickname: "Creator 123", password: "12345678" },
  { id: 4, username: "creator456", nickname: "Creator 456", password: "12345678" },
  { id: 5, username: "creator789", nickname: "Creator 789", password: "12345678" },
];

const quizSeedRows: TNewQuiz[] = dbQuiz.map((quiz) => ({
  id: quiz.id,
  title: quiz.title,
  description: quiz.description,
  creatorId: quiz.creatorId,
  status: quiz.status ?? EStatus.DRAFT,
  category: quiz.category,
  difficulty: quiz.difficulty,
  gameMode: quiz.gameMode,
  settings: quiz.settings,
  questions: quiz.questions,
  createdAt: quiz.createdAt,
  updatedAt: quiz.updatedAt,
}));

const chunkArray = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

export const seedDatabase = async (db: any): Promise<void> => {
  await db.insert(users).values(bootstrapUsers).onConflictDoNothing();

  const quizChunks = chunkArray(quizSeedRows, 50);
  for (const quizChunk of quizChunks) {
    await db.insert(quizzes).values(quizChunk).onConflictDoNothing();
  }
};

export const mapDbQuizToQuiz = (quiz: TDbQuiz) => ({
  id: quiz.id,
  title: quiz.title,
  description: quiz.description,
  creatorId: quiz.creatorId,
  status: quiz.status,
  category: quiz.category,
  difficulty: quiz.difficulty,
  gameMode: quiz.gameMode,
  settings: quiz.settings,
  questions: quiz.questions,
  createdAt: quiz.createdAt,
  updatedAt: quiz.updatedAt,
});
