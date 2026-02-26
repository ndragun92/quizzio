import type { TUserPeerData, TSocketInfo } from "#shared/types/websocket.type";

// Peer type for WebSocket connections
export interface TWebSocketPeer {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const allPeers = new Map<string, TWebSocketPeer>(); // peerId -> peer
const userPeers = new Map<string, TUserPeerData>(); // userId -> peer data

export const getAllPeers = (): IterableIterator<[string, TWebSocketPeer]> => allPeers.entries();
export const getUserPeers = (): IterableIterator<[string, TUserPeerData]> => userPeers.entries();

export const addPeer = (peerId: string, peer: TWebSocketPeer): void => {
  allPeers.set(peerId, peer);
};

export const removePeer = (peerId: string): void => {
  allPeers.delete(peerId);
};

export interface TAddUserPeerParams {
  userId: string;
  peerId: string;
  isGuest: boolean;
}

export const addUserPeer = ({ userId, peerId, isGuest }: TAddUserPeerParams): void => {
  userPeers.set(userId, { peerId, isGuest });
};

export const removeUserPeer = (userId: string): void => {
  userPeers.delete(userId);
};

// Map socket IDs to player/room info for an easy lookup
const socketMap = new Map<string, TSocketInfo>();

export const unmapSocket = (socketId: string): TSocketInfo | undefined => {
  const info = socketMap.get(socketId);
  socketMap.delete(socketId);
  return info;
};

export interface TMapSocketParams {
  socketId: string;
  roomId: string;
  playerId: string;
}

export const mapSocket = ({ socketId, roomId, playerId }: TMapSocketParams): void => {
  socketMap.set(socketId, { roomId, playerId });
};

export const getSocketInfo = (socketId: string): TSocketInfo | undefined => socketMap.get(socketId);
