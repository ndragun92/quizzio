import { getDatabase } from '~~/server/utils/db/client'

export default defineNitroPlugin(async () => {
  try {
    await getDatabase()
    console.debug('[db] Database initialized and seed routine completed.')
  } catch (error) {
    console.error('[db] Database initialization failed.', error)
    throw error
  }
})
