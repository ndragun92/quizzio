import type { TApiUser } from '#shared/types/user.type'

export default defineEventHandler((event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not found in context',
    })
  }

  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
  } as TApiUser
})
