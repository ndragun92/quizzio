import { db, schema } from '@nuxthub/db'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed database with initial data',
  },
  async run () {
    console.log('Seeding database...')

    const users = [
      { username: 'admin', nickname: 'Admin', password: await hashPassword('12345678') },
    ]

    await db.insert(schema.users).values(users)

    return { result: 'Database seeded successfully' }
  },
})
