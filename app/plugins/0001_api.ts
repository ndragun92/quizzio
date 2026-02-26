export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    retryStatusCodes: [401],
    retry: 1,
    retryDelay: 500,

    onRequest: ({ options }) => {
      if (!options.headers.has("Authorization")) {
        const { $pinia } = useNuxtApp();
        const authStore = useAuthStore($pinia);
        const token = authStore.token;
        if (token) {
          options.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
