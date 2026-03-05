import type { TQuizRoom } from "../../server/utils/quiz.utils";
import type { TApiUser } from "./user.type";

// WebSocket message types
export type TWebSocketMessageType = "refresh" | "create" | "join" | "leave" | "error";

export interface TErrorResponse {
  type: "error";
  data: string;
}

export type TWebSocketResponse = TErrorResponse | { type: "refresh" };

// WebSocket message structure
export interface TWebSocketMessage<T = unknown> {
  type: TWebSocketMessageType;
  data: T;
}

// Peer types
export interface TUserPeerData {
  peerId: string;
}

export interface TSocketInfo {
  quizRoomId: TQuizRoom["quizRoomId"];
  userId: TApiUser["id"];
}
