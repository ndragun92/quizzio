// server/database/schema.ts
import { integer, jsonb, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  nickname: varchar('nickname', { length: 64 }).notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  creatorId: integer('creatorId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 32 }).notNull().$type<NonNullable<TQuiz['status']>>(),
  category: varchar('category', { length: 64 }).notNull().$type<TQuiz['category']>(),
  difficulty: varchar('difficulty', { length: 32 }).notNull().$type<TQuiz['difficulty']>(),
  gameMode: varchar('gameMode', { length: 32 }).notNull().$type<TQuiz['gameMode']>(),
  settings: jsonb('settings').notNull().$type<TQuiz['settings']>(),
  questions: jsonb('questions').notNull().$type<TQuestion[]>(),
  createdAt: timestamp('createdAt', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})
