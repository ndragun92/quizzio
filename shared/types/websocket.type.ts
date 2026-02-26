import type { TRoom } from "./rooms.type";

// WebSocket message types
export type TWebSocketMessageType =
  | "createRoom"
  | "joinRoom"
  | "leaveRoom"
  | "reconnect"
  | "roomUpdate"
  | "reconnectSuccess"
  | "refreshRooms"
  | "refreshStatus"
  | "startGame"
  | "submitProgress"
  | "submitResult"
  | "error";

// WebSocket message payload types
export interface TCreateRoomPayload {
  playerId: string;
  nickname: string;
  guestDisplayName?: string;
  name: string;
  isPrivate: boolean;
  wordPack: TRoom["wordPack"];
  password?: string;
}

export interface TJoinRoomPayload {
  playerId: string;
  nickname: string;
  guestDisplayName?: string;
  roomId: string;
  password?: string;
}

export interface TReconnectPayload {
  roomId: string;
  playerId: string;
}

export interface TLeaveRoomPayload {
  roomId: string;
  playerId: string;
}

// WebSocket response payloads
export interface TRoomUpdateResponse {
  type: "roomUpdate";
  data: TRoom;
}

export interface TReconnectSuccessResponse {
  type: "reconnectSuccess";
  data: {
    room: TRoom;
    playerId: string;
  };
}

export interface TErrorResponse {
  type: "error";
  data: string;
}

export type TWebSocketResponse =
  | TRoomUpdateResponse
  | TReconnectSuccessResponse
  | TErrorResponse
  | { type: "refreshRooms" }
  | { type: "refreshStatus" };

// WebSocket message structure
export interface TWebSocketMessage<T = unknown> {
  type: TWebSocketMessageType;
  data: T;
}

// Peer types
export interface TUserPeerData {
  peerId: string;
  isGuest: boolean;
}

export interface TSocketInfo {
  roomId: string;
  playerId: string;
}
