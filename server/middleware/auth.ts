import jwt from 'jsonwebtoken'
import type { TApiUser } from '#shared/types/user.type'

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default defineEventHandler((event) => {
  // List of protected routes that require authentication
  const protectedRoutes = ['/api/protected', '/api/user']

  const isProtectedRoute = protectedRoutes.some(route =>
    event.node.req.url?.startsWith(route),
  )

  if (!isProtectedRoute) {
    return
  }

  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Missing token',
    })
  }

  const token = authHeader.substring(7)

  try {
    event.context.user = jwt.verify(token, JWT_SECRET) as TApiUser
  } catch (_error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    })
  }
})
