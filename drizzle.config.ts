import { defineConfig } from 'drizzle-kit'
import process from 'node:process'

const url = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!url) {
  throw new Error('Missing POSTGRES_URL or DATABASE_URL for Drizzle config')
}

export default defineConfig({
  schema: './server/utils/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url,
  },
})
