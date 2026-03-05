import jwt from "jsonwebtoken";
import { and, eq } from "drizzle-orm";
import type { TLoginRequest, TLoginResponse } from "#shared/types/api.type";
import { getDatabase, schema } from "~~/server/utils/db/client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default defineEventHandler(async (event): Promise<TLoginResponse | Response> => {
  const body = await readBody<TLoginRequest>(event);
  const db = await getDatabase();
  const [user] = (await (db as any)
    .select()
    .from(schema.users)
    .where(and(eq(schema.users.username, body.username), eq(schema.users.password, body.password)))
    .limit(1)) as Array<{ id: number; username: string; nickname: string }>;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, nickname: user.nickname },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return { token, user: { id: user.id, username: user.username, nickname: user.nickname } };
});
