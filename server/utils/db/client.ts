import { createDatabase } from "db0";
import postgresql from "db0/connectors/postgresql";
import { drizzle } from "db0/integrations/drizzle";
import * as schema from "./schema";
import { seedDatabase } from "./seed";

const createDrizzleClient = () => {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Missing PostgreSQL connection URL. Set POSTGRES_URL or DATABASE_URL.");
  }

  const db0 = createDatabase(postgresql({ url }));
  console.info("Connected to PostgreSQL database successfully.");
  return drizzle(db0 as any);
};

type TDatabaseClient = ReturnType<typeof createDrizzleClient>;

let databaseClient: TDatabaseClient | null = null;
let databaseReadyPromise: Promise<void> | null = null;

const getClient = (): TDatabaseClient => {
  if (databaseClient) {
    return databaseClient;
  }

  databaseClient = createDrizzleClient();
  return databaseClient;
};

export const getDatabase = async (): Promise<TDatabaseClient> => {
  const db = getClient();

  if (!databaseReadyPromise) {
    databaseReadyPromise = seedDatabase(db as any).catch((error) => {
      databaseReadyPromise = null;
      throw error;
    });
  }

  await databaseReadyPromise;
  return db;
};

export { schema };
