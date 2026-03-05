import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);

  const setToken = (payload: string | null): void => {
    token.value = payload;
  };

  const logout = async (redirect = true): Promise<void> => {
    setToken(null);
    useCookie("token").value = null;

    // Clear user data from the user store
    const userStore = useUserStore();
    userStore.clearUser();

    await nextTick();
    if (import.meta.client && redirect) {
      window.location.href = "/";
    }
  };

  return { token, setToken, logout };
});
