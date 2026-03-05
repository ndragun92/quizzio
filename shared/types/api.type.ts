import type { TApiUser } from "./user.type";
import type { TQuestion, TQuiz } from "../utils/quiz.db";

// Auth API types
export interface TLoginRequest {
  username: TApiUser["username"];
  password: string;
}

export interface TLoginResponse {
  token: string;
  user: TApiUser;
}

export interface TRegisterRequest {
  username: TApiUser["username"];
  password: string;
  nickname?: TApiUser["nickname"];
  type?: "player" | "quiz_creator";
}

export type TRegisterResponse = TLoginResponse;

export interface TValidateResponse {
  success: boolean;
  message: string;
  user: {
    id: TApiUser["id"];
    username: TApiUser["username"];
  };
  data: {
    items: string[];
    timestamp: string;
  };
}

// Protected quiz CRUD API types
export interface TCreateQuizRequest {
  title: string;
  description: string;
  status?: NonNullable<TQuiz["status"]>;
  category: TQuiz["category"];
  difficulty: TQuiz["difficulty"];
  gameMode: TQuiz["gameMode"];
  settings: TQuiz["settings"];
  questions: TQuestion[];
}

export type TUpdateQuizRequest = Partial<TCreateQuizRequest>;

export interface TDeleteQuizResponse {
  success: boolean;
}

// Status API response
export interface TStatusResponse {
  timestamp: string;
  deploymentId: string;
  total: {
    users: number;
    quizRooms: number;
  };
  quizRooms: unknown[];
  userPeers: Array<{
    userId: string;
    data: {
      peerId: string;
    };
  }>;
}
