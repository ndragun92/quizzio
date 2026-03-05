export default defineNuxtRouteMiddleware((from) => {
  const { $pinia } = useNuxtApp();
  const userStore = useUserStore($pinia);
  const isAuthenticated = userStore.data?.id;
  const fromPath = from.fullPath;
  const fromName = from.name;
  if (!isAuthenticated) {
    if (fromName === "quiz-creatorId") {
      return navigateTo({
        name: "index",
        query: {
          redirect: fromPath,
        },
      });
    }
    return navigateTo({
      name: "index",
    });
  }
});
