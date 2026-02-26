export default defineNuxtRouteMiddleware((from) => {
  const { $pinia } = useNuxtApp();
  const userStore = useUserStore($pinia);
  const guestNickname = useCookie("guestNickname");
  const isAuthenticated = userStore.data?.id || guestNickname.value;
  const fromPath = from.fullPath;
  const fromName = from.name;
  if (!isAuthenticated) {
    if (fromName === "game-rooms-id") {
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
