import { defineStore } from 'pinia'
import type { TApiUser } from '#shared/types/user.type'

export const useUserStore = defineStore('user', () => {
  const data = shallowRef<TApiUser | null>(null)

  const { $api } = useNuxtApp()

  const setUser = (payload: TApiUser): void => {
    data.value = payload
  }

  const getUser = async (): Promise<void> => {
    try {
      const response = await $api<TApiUser>('/api/user')
      if (response) {
        setUser(response)
      }
    } catch (error) {
      console.error(`useUserStore:getUser() ${JSON.stringify(error)}`)
    }
  }

  const clearUser = (): void => {
    data.value = null
  }

  return { data, getUser, clearUser }
})
