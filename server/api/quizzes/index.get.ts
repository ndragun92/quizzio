export default defineEventHandler((_event) => {
  return dbQuiz.filter((quiz) => quiz.status === "published");
});
