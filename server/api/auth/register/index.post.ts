import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import type { TRegisterRequest, TRegisterResponse } from '#shared/types/api.type'
import { getDatabase, schema } from '~~/server/utils/db/client'
import { hashPassword } from '~~/server/utils/auth/password'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default defineEventHandler(async (event): Promise<TRegisterResponse> => {
  const body = await readBody<TRegisterRequest>(event)

  if (!body?.username || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required',
    })
  }

  if (body.password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 6 characters',
    })
  }

  const db = await getDatabase()
  const [existingUser] = (await (db as any)
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, body.username))
    .limit(1)) as Array<{ id: number }>

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Username is already taken',
    })
  }

  const passwordHash = await hashPassword(body.password)
  const [createdUser] = (await (db as any)
    .insert(schema.users)
    .values({
      username: body.username,
      nickname: body.nickname?.trim() || body.username,
      password: passwordHash,
    })
    .returning()) as Array<{ id: number, username: string, nickname: string }>

  if (!createdUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user',
    })
  }

  const token = jwt.sign(
    {
      id: createdUser.id,
      username: createdUser.username,
      nickname: createdUser.nickname,
    },
    JWT_SECRET,
    { expiresIn: '24h' },
  )

  return {
    token,
    user: {
      id: createdUser.id,
      username: createdUser.username,
      nickname: createdUser.nickname,
    },
  }
})
