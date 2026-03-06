import type {
  TWebSocketMessage,
  TWebSocketMessageType,
} from '#shared/types/websocket.type'

export default function useSocket () {
  const socketStore = useSocketStore()

  const { userId, nickname } = useUser()

  // const route = useRoute();
  // const isRoom = computed(() => route.name === "quiz-creatorId"); // TODO: Update this when we have more routes
  const router = useRouter()

  const onConnect = (): void => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = window.location.host

    const token = localStorage.getItem('token') || 'ey12fas321fSAdfsa' // JWT

    const userIdValue = userId.value

    socketStore.socket = new WebSocket(
      `${protocol}//${host}/api/ws?token=${token}&userId=${userIdValue}&nickname=${nickname.value}`,
    )

    socketStore.socket.onopen = () => {
      socketStore.isConnected = true
      console.debug('Connected to WebSocket')

      // if (isRoom) {
      //   // Try to reconnect if we have saved data
      //   const savedSessionData = localStorage.getItem(localStorageSessionKey);
      //   if (savedSessionData) {
      //     const { roomId } = JSON.parse(savedSessionData) as TRoomSession;
      //     onSend("reconnect", { roomId, userId: userIdValue });
      //   }
      // }
    }

    socketStore.socket.onmessage = async (event: MessageEvent<string>) => {
      const { type, data } = JSON.parse(event.data) as TWebSocketMessage
      await onHandleMessage(type, data)
    }

    socketStore.socket.onclose = () => {
      socketStore.isConnected = false
      console.debug('Disconnected from WebSocket')
      // Try to reconnect if we have saved data
      // const saved = localStorage.getItem(localStorageSessionKey);
      // if (saved) {
      //   const { roomId: sRoomId, playerId: sPlayerId } = JSON.parse(saved) as TRoomSession;
      //   onSend("leave", { roomId: sRoomId, playerId: sPlayerId });
      // }
    }

    socketStore.socket.onerror = (error: Event) => {
      console.error(
        `useSocket.ts:socketStore.socket.onerror() ${JSON.stringify(error)}`,
      )
      socketStore.error = 'Connection error'
    }
  }

  const onSend = <T = unknown>(type: TWebSocketMessageType, data: T): void => {
    if (socketStore.socket && socketStore.isConnected) {
      socketStore.socket.send(JSON.stringify({ type, data }))
    }
  }

  const onHandleMessage = async (
    type: TWebSocketMessageType,
    data: unknown,
  ): Promise<void> => {
    // console.debug("onHandleMessage", type, data);
    switch (type) {
      case 'refresh':
        // await refreshNuxtData("rooms");
        await refreshNuxtData('status')
        break
      case 'error': {
        const errorMessage = data as string
        socketStore.error = errorMessage
        if (errorMessage === 'Room not found') {
          await router.push({ name: 'quiz' })
        }
        break
      }
      // Handle more events...
    }
  }

  const error = computed(() => socketStore.error)
  const isConnected = computed(() => socketStore.isConnected)

  return {
    onConnect,
    onSend,
    error,
    isConnected,
  }
}
