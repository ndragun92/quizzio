export default defineEventHandler((_event) => {
  const creatorId = Number(_event.context.params?.creatorId);
  const quizId = Number(_event.context.params?.quizId);
  return dbQuiz.find((quiz) => quiz.id === quizId && quiz.creatorId === creatorId);
});
