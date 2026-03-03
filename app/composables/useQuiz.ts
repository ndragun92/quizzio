export default function useQuiz() {
  const { onSend } = useSocket();

  const roomStore = useRoomStore();

  const { playerId } = useUser();

  interface TJoinQuizParams {
    nickname: string;
    guestDisplayName?: TPlayer["guestDisplayName"];
    creatorId: TQuiz["creatorId"];
    quizId: TQuiz["id"];
  }

  const onJoinQuiz = ({ nickname, guestDisplayName, creatorId, quizId }: TJoinQuizParams) => {
    onSend("joinQuiz", { playerId: playerId.value, nickname, guestDisplayName, creatorId, quizId });
  };

  const onLeaveQuiz = (quizId: TQuiz["id"], playerId: TPlayer["id"]) => {
    onSend("leaveQuiz", { quizId, playerId });
  };

  const room = computed(() => roomStore.room);

  return {
    onJoinQuiz,
    onLeaveQuiz,
    room,
  };
}
