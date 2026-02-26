export default function useUser() {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  const id = computed(() => userStore.data?.id || null);
  const username = computed(() => userStore.data?.username || "");
  const guestNickname = computed(() => useCookie("guestNickname").value || "");
  const nickname = computed(() => userStore.data?.nickname || guestNickname.value || "");
  const guestDisplayName = computed(() => useCookie("guestDisplayName").value || "");
  const playerId = computed(
    () => `${userStore.data?.id || useCookie("guestPlayerId").value || ""}`
  );
  const isGuest = computed(() => !id.value);

  return { id, username, nickname, guestDisplayName, logout: authStore.logout, playerId, isGuest };
}
