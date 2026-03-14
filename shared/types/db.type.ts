import type { quizzes, users } from '@nuxthub/db/schema'

// Select types (for reading data)
export type User = typeof users.$inferSelect
export type Quiz = typeof quizzes.$inferSelect

// Insert types (for creating data)
export type NewUser = typeof users.$inferInsert
export type NewQuiz = typeof quizzes.$inferInsert
