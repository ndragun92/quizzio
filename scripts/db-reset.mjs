import { Client } from "pg";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("[db:reset] Missing POSTGRES_URL or DATABASE_URL.");
  process.exit(1);
}

const client = new Client({ connectionString });

try {
  await client.connect();
  console.info("[db:reset] Connected. Dropping public schema...");

  await client.query("DROP SCHEMA IF EXISTS public CASCADE;");
  await client.query("CREATE SCHEMA public;");

  // Restore common default grants for the public schema.
  await client.query("GRANT ALL ON SCHEMA public TO postgres;");
  await client.query("GRANT ALL ON SCHEMA public TO public;");

  console.info("[db:reset] Database schema reset completed.");
} catch (error) {
  console.error("[db:reset] Failed to reset database schema.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
