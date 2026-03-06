export default function useUser () {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  const id = computed(() => userStore.data?.id || null)
  const username = computed(() => userStore.data?.username || '')
  const nickname = computed(() => userStore.data?.nickname || '')

  return {
    id: readonly(id),
    username: readonly(username),
    nickname: readonly(nickname),
    logout: authStore.logout,
    userId: readonly(id),
  }
}
