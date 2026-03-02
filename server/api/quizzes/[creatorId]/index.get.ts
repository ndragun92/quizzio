export default defineEventHandler((_event) => {
  const creatorId = Number(_event.context.params?.creatorId);
  return dbQuiz.filter((quiz) => quiz.creatorId === creatorId);
});
