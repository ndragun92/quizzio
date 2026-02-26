import {
  broadcastRoomUpdate,
  broadcastToAllPeers,
  handlePlayerSubmission,
  startMatch,
} from "#server/utils/rooms.utils";

type TCustomPeer = {
  playerId?: string;
};

export default defineWebSocketHandler({
  open(peer) {
    const url = peer.websocket.url || "";
    const query = new URL(url).searchParams;
    // const token = query.get("token");
    const playerId = query.get("playerId");
    const isGuest = query.get("isGuest");
    const deploymentId = process.env.DENO_DEPLOYMENT_ID || "local";

    if (!playerId) {
      console.error("❌ No playerId");
      peer.close();
      return;
    }

    (peer as TCustomPeer).playerId = playerId || "";

    console.info("[ws] open", {
      playerId,
      isGuest,
      peerId: peer.id,
      deploymentId,
    });

    addPeer(peer.id, peer);

    addUserPeer({ userId: String(playerId), peerId: peer.id, isGuest: isGuest === "true" });
    broadcastToAllPeers(JSON.stringify({ type: "refreshStatus" }));
  },

  message(peer, message) {
    const text = message.text();
    if (!text) return;

    try {
      const { type, data } = JSON.parse(text);

      switch (type) {
        case "createRoom": {
          const { room, playerId } = createRoom({
            playerId: data.playerId,
            nickname: data.nickname,
            guestDisplayName: data.guestDisplayName,
            name: data.name,
            isPrivate: data.isPrivate,
            wordPack: data.wordPack,
            password: data.password,
          });
          mapSocket({ socketId: peer.id, roomId: room.id, playerId });
          peer.send(JSON.stringify({ type: "reconnectSuccess", data: { room, playerId } }));
          broadcastToAllPeers(JSON.stringify({ type: "refreshRooms" }));
          break;
        }
        case "joinRoom": {
          const result = joinRoom({
            playerId: data.playerId,
            nickname: data.nickname,
            guestDisplayName: data.guestDisplayName,
            roomId: data.roomId,
            password: data.password,
          });
          if (typeof result === "string") {
            peer.send(JSON.stringify({ type: "error", data: result }));
          } else {
            const { room, playerId } = result;
            mapSocket({ socketId: peer.id, roomId: room.id, playerId });
            peer.send(JSON.stringify({ type: "reconnectSuccess", data: { room, playerId } }));
            broadcastRoomUpdate(room.id);
          }
          // Delay the refreshRooms broadcast to ensure the room update is processed first
          // Updates list of available slots in the lobby after someone joins
          setTimeout(() => {
            broadcastToAllPeers(JSON.stringify({ type: "refreshRooms" }));
          }, 1000);
          break;
        }
        case "submitProgress": {
          const info = getSocketInfo(peer.id);
          if (info) {
            const room = getRoom(info.roomId);
            if (room) {
              const player = room.players.find((p) => p.id === info.playerId);
              if (player) {
                player.progress = data;
                broadcastRoomUpdate(room.id);
              }
            }
          }
          break;
        }
        case "startGame": {
          const info = getSocketInfo(peer.id);
          if (info) {
            const room = getRoom(info.roomId);
            if (room?.players?.find((p) => p.id === info.playerId)?.isHost) {
              startMatch(room);
            }
          }
          break;
        }
        case "submitResult": {
          const info = getSocketInfo(peer.id);
          if (info) {
            handlePlayerSubmission(info.roomId, info.playerId, data);
          }
          break;
        }
        case "reconnect": {
          const { roomId, playerId } = data;
          const room = getRoom(roomId);
          if (room) {
            const player = room.players.find((p) => p.id === playerId);
            if (player) {
              mapSocket({ socketId: peer.id, roomId, playerId });
              peer.send(JSON.stringify({ type: "reconnectSuccess", data: { room, playerId } }));
              room.players = room.players.map((p) => {
                if (p.id === playerId) p.isOnline = true;
                return p;
              });
              broadcastRoomUpdate(roomId);
            } else {
              peer.send(JSON.stringify({ type: "error", data: "Player not found in room" }));
            }
          } else {
            peer.send(JSON.stringify({ type: "error", data: "Room not found" }));
          }
          break;
        }
        case "leaveRoom": {
          const info = unmapSocket(peer.id);
          if (info) {
            leaveRoom({ roomId: info.roomId, playerId: info.playerId });
            broadcastRoomUpdate(info.roomId);
            setTimeout(() => {
              broadcastToAllPeers(JSON.stringify({ type: "refreshRooms" }));
            }, 1000);
          }
          break;
        }
      }
    } catch (error) {
      console.error(`server/api/ws.ts:message() ${JSON.stringify(error)}`);
    }
  },

  close(peer) {
    console.info("[ws] close", peer.id);

    const peerUserId = (peer as TCustomPeer).playerId;

    const info = unmapSocket(peer.id);
    if (info) {
      leaveRoom({ roomId: info.roomId, playerId: info.playerId });
      broadcastRoomUpdate(info.roomId);
      setTimeout(() => {
        broadcastToAllPeers(JSON.stringify({ type: "refreshRooms" }));
      }, 1000);
    }

    if (peerUserId) {
      removeUserPeer(String(peerUserId));
    }

    removePeer(peer.id);
    broadcastToAllPeers(JSON.stringify({ type: "refreshStatus" }));
  },

  error(peer, error) {
    console.info("[ws] error", peer, error);
  },
});
