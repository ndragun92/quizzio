import type { TApiUser } from "./user.type";
import type { TGameState } from "./game.type";
import type { TRoom } from "./rooms.type";

// Auth API types
export interface TLoginRequest {
  username: string;
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
    id: number;
    username: string;
  };
  data: {
    items: string[];
    timestamp: string;
  };
}

// Room list item for public endpoints
export interface TRoomListItem {
  id: string;
  name: string;
  playersCount: number;
  maxPlayers: number;
  status: TGameState;
  wordPack: TRoom["wordPack"];
}

// Status API response
export interface TStatusResponse {
  timestamp: string;
  deploymentId: string;
  total: {
    users: number;
    rooms: number;
  };
  rooms: unknown[];
  userPeers: Array<{
    userId: string;
    data: {
      peerId: string;
      isGuest: boolean;
    };
  }>;
}

// Session storage types
export interface TRoomSession {
  roomId: string;
  playerId: string;
}
