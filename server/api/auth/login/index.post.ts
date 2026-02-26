import jwt from "jsonwebtoken";
import type { TLoginRequest, TLoginResponse } from "#shared/types/api.type";
import type { TApiUser } from "#shared/types/user.type";

interface TUserRecord extends TApiUser {
  password: string;
}

const users: TUserRecord[] = [
  {
    id: 1,
    username: "admin",
    nickname: "Admin",
    password: "12345678",
  },
  {
    id: 2,
    username: "user",
    nickname: "User",
    password: "12345678",
  },
];

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export default defineEventHandler(async (event): Promise<TLoginResponse | Response> => {
  const body = await readBody<TLoginRequest>(event);
  const user = users.find(
    (user) => user.username === body.username && user.password === body.password
  );
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
