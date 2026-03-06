import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import type { TLoginRequest, TLoginResponse } from '#shared/types/api.type'
import { getDatabase, schema } from '~~/server/utils/db/client'
import { hashPassword, isPasswordHash, verifyPassword } from '~~/server/utils/auth/password'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default defineEventHandler(async (event): Promise<TLoginResponse | Response> => {
  const body = await readBody<TLoginRequest>(event)

  if (!body?.username || !body?.password) {
    return new Response('Unauthorized', { status: 401 })
  }

  const db = await getDatabase()
  const [user] = (await (db as any)
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, body.username))
    .limit(1)) as Array<{ id: number, username: string, nickname: string, password: string }>

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const isValidPassword = await verifyPassword(body.password, user.password)

  if (!isValidPassword) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Upgrade legacy plaintext passwords to scrypt hash on successful login.
  if (!isPasswordHash(user.password)) {
    const upgradedHash = await hashPassword(body.password)

    await (db as any)
      .update(schema.users)
      .set({ password: upgradedHash })
      .where(eq(schema.users.id, user.id))
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, nickname: user.nickname },
    JWT_SECRET,
    {
      expiresIn: '24h',
    },
  )

  return { token, user: { id: user.id, username: user.username, nickname: user.nickname } }
})
