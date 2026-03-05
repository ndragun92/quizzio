import type { TApiUser } from "./user.type";

// Auth API types
export interface TLoginRequest {
  username: TApiUser["username"];
  password: string;
}

export interface TLoginResponse {
  token: string;
  user: TApiUser;
}

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
