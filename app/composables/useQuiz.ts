export default function useQuiz () {
  const { onSend } = useSocket()

  const { userId, nickname } = useUser()

  interface TJoinQuizParams {
    nickname: TApiUser['nickname']
    creatorId: TQuiz['creatorId']
    quizId: TQuiz['id']
  }

  const onCreateQuiz = ({ quiz }: { quiz: TQuiz }) => {
    const quizRoomId = `${quiz.creatorId}-${quiz.id}--${Date.now()}`
    const quizRoomName = prompt('Enter a name for your quiz room:')
    if (!quizRoomName) {
      alert('Quiz room name cannot be empty')
      return
    }
    onSend('create', {
      quizRoomId,
      quizRoomName,
      quiz,
      userId: userId.value,
      nickname: nickname.value,
    })
  }

  const onJoinQuiz = ({ nickname, creatorId, quizId }: TJoinQuizParams) => {
    onSend('join', { userId: userId.value, nickname, creatorId, quizId })
  }

  const onLeaveQuiz = (quizId: TQuiz['id'], userId: TApiUser['id']) => {
    onSend('leave', { quizId, userId })
  }

  return {
    onCreateQuiz,
    onJoinQuiz,
    onLeaveQuiz,
  }
}
