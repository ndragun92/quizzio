import jwt from "jsonwebtoken";
import type { TValidateResponse } from "#shared/types/api.type";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default defineEventHandler(async (event): Promise<TValidateResponse | Response> => {
  const authHeader = getHeader(event, "authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string };

    return {
      success: true,
      message: "Access granted",
      user: {
        id: decoded.id,
        username: decoded.username,
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
