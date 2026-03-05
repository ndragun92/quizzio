import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import type { TValidateResponse } from "#shared/types/api.type";
import { getDatabase, schema } from "~~/server/utils/db/client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default defineEventHandler(async (event): Promise<TValidateResponse | Response> => {
  const authHeader = getHeader(event, "authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const db = await getDatabase();
    const [user] = (await (db as any)
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, decoded.id))
      .limit(1)) as Array<{ id: number; username: string }>;

    if (!user) {
      return new Response("Invalid user", { status: 401 });
    }

    return {
      success: true,
      message: "Access granted",
      user: {
        id: user.id,
        username: user.username,
      },
      data: {
        items: ["Item 1", "Item 2", "Item 3"],
        timestamp: new Date().toISOString(),
      },
    };
  } catch (_error) {
    return new Response("Invalid or expired token", { status: 401 });
  }
});
