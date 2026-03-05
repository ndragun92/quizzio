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
  return {
    db: drizzle(db0 as any),
    raw: db0,
  };
};

type TDatabaseClients = ReturnType<typeof createDrizzleClient>;
type TDatabaseClient = TDatabaseClients["db"];

let databaseClient: TDatabaseClients | null = null;
let databaseReadyPromise: Promise<void> | null = null;

const getClient = (): TDatabaseClients => {
  if (databaseClient) {
    return databaseClient;
  }

  databaseClient = createDrizzleClient();
  return databaseClient;
};

export const getDatabase = async (): Promise<TDatabaseClient> => {
  const clients = getClient();

  if (!databaseReadyPromise) {
    databaseReadyPromise = seedDatabase(clients.db as any, clients.raw as any).catch((error) => {
      databaseReadyPromise = null;
      throw error;
    });
  }

  await databaseReadyPromise;
  return clients.db;
};

export { schema };
