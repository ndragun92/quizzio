export default function useRoom() {
  const { onSend } = useSocket();

  const roomStore = useRoomStore();

  const { playerId } = useUser();

  const onCreateRoom = ({
    nickname,
    guestDisplayName,
    room: { name, isPrivate, password, wordPack },
  }: {
    nickname: TApiUser["nickname"];
    guestDisplayName?: TPlayer["guestDisplayName"];
    room: Pick<TRoom, "name" | "isPrivate" | "wordPack" | "password">;
  }) => {
    onSend("createRoom", {
      playerId: playerId.value,
      nickname,
      guestDisplayName,
      name,
      isPrivate,
      password,
      wordPack,
    });
  };

  interface TJoinRoomParams {
    nickname: string;
    guestDisplayName?: TPlayer["guestDisplayName"];
    roomId: string;
    password?: string;
  }

  const onJoinRoom = ({ nickname, guestDisplayName, roomId, password }: TJoinRoomParams) => {
    onSend("joinRoom", { playerId: playerId.value, nickname, guestDisplayName, roomId, password });
  };

  const onStartGame = () => {
    onSend("startGame", null);
  };

  const onSubmitProgress = (progress: number) => {
    onSend("submitProgress", progress);
  };

  const onSubmitResult = ({
    text,
    timeTaken,
    errors,
  }: {
    text: string;
    timeTaken: number;
    errors: number;
  }) => {
    onSend("submitResult", { text, timeTaken, errors });
  };

  const onLeaveRoom = (roomId: TRoom["id"], playerId: TPlayer["id"]) => {
    onSend("leaveRoom", { roomId, playerId });
  };

  const room = computed(() => roomStore.room);

  return {
    onCreateRoom,
    onJoinRoom,
    onLeaveRoom,
    onStartGame,
    onSubmitProgress,
    onSubmitResult,
    room,
  };
}
