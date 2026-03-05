export default defineNuxtRouteMiddleware((from) => {
  const { $pinia } = useNuxtApp();
  const userStore = useUserStore($pinia);
  const isAuthenticated = userStore.data?.id;
  const fromPath = from.fullPath;
  const fromName = from.name;
  if (!isAuthenticated) {
    if (fromName.startsWith("@creator")) {
      return navigateTo({
        name: "auth-login",
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
