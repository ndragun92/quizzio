import { inArray } from 'drizzle-orm'
import { EStatus, dbQuiz } from '~~/shared/utils/quiz.db'
import { hashPassword } from '~~/server/utils/auth/password'
import type { TDbQuiz, TNewQuiz } from './schema'
import { quizzes, users } from './schema'

const bootstrapUsers: Array<{ username: string, nickname: string, password: string }> = [
  { username: 'admin', nickname: 'Admin', password: '12345678' },
  { username: 'user', nickname: 'User', password: '12345678' },
  { username: 'creator1', nickname: 'Creator 1', password: '12345678' },
  { username: 'creator2', nickname: 'Creator 2', password: '12345678' },
  { username: 'creator3', nickname: 'Creator 3', password: '12345678' },
]

const legacyCreatorIdToUsername: Record<number, string> = {
  1: 'creator1',
  2: 'creator2',
  3: 'creator3',
}

const chunkArray = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

export const seedDatabase = async (db: any, rawDb: any): Promise<void> => {
  for (const user of bootstrapUsers) {
    const passwordHash = await hashPassword(user.password)

    await rawDb.sql`
      INSERT INTO users (username, nickname, password)
      VALUES (${user.username}, ${user.nickname}, ${passwordHash})
      ON CONFLICT (username) DO NOTHING
    `
  }

  const existingQuizRows = await db.select().from(quizzes).limit(1)
  if (existingQuizRows.length > 0) {
    return
  }

  const creatorUsernames = Object.values(legacyCreatorIdToUsername)
  const creatorRows = (await db
    .select({ id: users.id, username: users.username })
    .from(users)
    .where(inArray(users.username, creatorUsernames))) as Array<{ id: number, username: string }>

  const creatorUsernameToId = Object.fromEntries(
    creatorRows.map(creator => [creator.username, creator.id]),
  ) as Record<string, number>

  let quizId = 1
  const quizSeedRows: TNewQuiz[] = dbQuiz.flatMap((quiz) => {
    const creatorUsername = legacyCreatorIdToUsername[quiz.creatorId]
    const creatorId = creatorUsername ? creatorUsernameToId[creatorUsername] : undefined

    if (!creatorId) {
      return []
    }

    return [
      {
        id: quizId++,
        title: quiz.title,
        description: quiz.description,
        creatorId,
        status: quiz.status ?? EStatus.DRAFT,
        category: quiz.category,
        difficulty: quiz.difficulty,
        gameMode: quiz.gameMode,
        settings: quiz.settings,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      },
    ]
  })

  const quizChunks = chunkArray(quizSeedRows, 50)
  for (const quizChunk of quizChunks) {
    await db.insert(quizzes).values(quizChunk).onConflictDoNothing()
  }
}

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
})
