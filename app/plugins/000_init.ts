export default defineNuxtPlugin({
  name: 'init',
  async setup (nuxtApp) {
    const host = useRequestURL()
    nuxtApp.provide('app_origin', host.origin)
    nuxtApp.provide('app_hostname', host.hostname)

    const { $pinia } = useNuxtApp()
    const userStore = useUserStore($pinia)
    const authStore = useAuthStore($pinia)

    if (!userStore.data) {
      const token = useCookie('token').value
      if (token) {
        authStore.setToken(token)
        await userStore.getUser()
      }
    }
  },
})
