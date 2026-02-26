import { localStorageSessionKey } from "#server/utils/rooms.utils";
import type { TWebSocketMessageType, TWebSocketMessage } from "#shared/types/websocket.type";
import type { TRoomSession } from "#shared/types/api.type";
import type { TRoom } from "#shared/types/rooms.type";

export default function useSocket() {
  const socketStore = useSocketStore();
  const roomStore = useRoomStore();

  const { playerId, isGuest, nickname, guestDisplayName } = useUser();

  const route = useRoute();
  const isRoom = computed(() => route.name === "game-rooms-id");
  const router = useRouter();

  const onConnect = (): void => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;

    const token = localStorage.getItem("token") || "ey12fas321fSAdfsa"; // JWT

    const newPlayerId = crypto.randomUUID();
    if (!playerId.value) {
      useCookie("guestPlayerId", {
        maxAge: 2629800, // 1 month
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      }).value = newPlayerId;
    }

    const playerIdValue = playerId.value || newPlayerId;

    socketStore.socket = new WebSocket(
      `${protocol}//${host}/api/ws?token=${token}&playerId=${playerIdValue}&isGuest=${isGuest.value}&nickname=${nickname.value}&guestDisplayName=${guestDisplayName.value}`
    );

    socketStore.socket.onopen = () => {
      socketStore.isConnected = true;
      console.info("Connected to WebSocket");

      if (isRoom) {
        // Try to reconnect if we have saved data
        const savedSessionData = localStorage.getItem(localStorageSessionKey);
        if (savedSessionData) {
          const { roomId } = JSON.parse(savedSessionData) as TRoomSession;
          onSend("reconnect", { roomId, playerId: playerIdValue });
        }
      }
    };

    socketStore.socket.onmessage = async (event) => {
      const { type, data } = JSON.parse(event.data) as TWebSocketMessage;
      await onHandleMessage(type, data);
    };

    socketStore.socket.onclose = () => {
      socketStore.isConnected = false;
      console.info("Disconnected from WebSocket");
      // Try to reconnect if we have saved data
      const saved = localStorage.getItem(localStorageSessionKey);
      if (saved) {
        const { roomId: sRoomId, playerId: sPlayerId } = JSON.parse(saved) as TRoomSession;
        onSend("leaveRoom", { roomId: sRoomId, playerId: sPlayerId });
      }
    };

    socketStore.socket.onerror = (error) => {
      console.error(`useSocket.ts:socketStore.socket.onerror() ${JSON.stringify(error)}`);
      socketStore.error = "Connection error";
    };
  };

  const onSend = <T = unknown>(type: TWebSocketMessageType, data: T): void => {
    if (socketStore.socket && socketStore.isConnected) {
      socketStore.socket.send(JSON.stringify({ type, data }));
    }
  };

  const onHandleMessage = async (type: TWebSocketMessageType, data: unknown): Promise<void> => {
    // console.info("onHandleMessage", type, data);
    switch (type) {
      case "roomUpdate": {
        const roomData = data as TRoom;
        roomStore.onSetRoom(roomData);
        break;
      }
      case "reconnectSuccess": {
        const reconnectData = data as { room: TRoom; playerId: string };
        roomStore.onSetRoom(reconnectData.room);
        roomStore.onSetPlayerId(reconnectData.playerId);
        const sessionData: TRoomSession = {
          roomId: reconnectData.room.id,
          playerId: reconnectData.playerId,
        };
        localStorage.setItem(localStorageSessionKey, JSON.stringify(sessionData));
        await router.push({ name: "game-rooms-id", params: { id: reconnectData.room.id } });
        break;
      }
      case "refreshRooms":
        await refreshNuxtData("rooms");
        await refreshNuxtData("status");
        break;
      case "refreshStatus":
        await refreshNuxtData("status");
        break;
      case "error": {
        const errorMessage = data as string;
        socketStore.error = errorMessage;
        if (errorMessage === "Room not found") {
          await router.push({ name: "game-rooms" });
        }
        break;
      }
      // Handle more events...
    }
  };

  const error = computed(() => socketStore.error);
  const isConnected = computed(() => socketStore.isConnected);

  return {
    onConnect,
    onSend,
    error,
    isConnected,
  };
}
