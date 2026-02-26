<template>
  <div class="min-h-dvh flex items-center justify-center px-4">
    <div
      class="bg-linear-to-t from-slate-800 to-slate-800/75 rounded-lg shadow-2xl p-6 max-w-md w-full space-y-6"
    >
      <div class="text-center">
        <h1
          class="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          Sign In to Your Account
        </h1>
        <p class="text-gray-400 mt-1">Play with more features available</p>
      </div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="form--container">
          <div class="input--box">
            <label class="input--label" for="username">Username</label>
            <input
              id="username"
              v-model.trim="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              autocomplete="username"
              aria-describedby="username-help-text"
              class="input--text"
            />
            <small id="username-help-text" class="text-xs text-gray-400 sr-only">
              We'll never share your email with anyone else.
            </small>
            <span class="text-red-500 text-sm">{{ errors.username }} </span>
          </div>
          <div>
            <label class="input--label" for="password">Password</label>
            <input
              id="password"
              v-model.trim="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              aria-describedby="password-help-text"
              class="input--text"
            />
            <small id="password-help-text" class="text-xs text-gray-400 sr-only">
              We'll never share your password with anyone else.'
            </small>
            <span class="text-red-500 text-sm">{{ errors.password }} </span>
          </div>
        </div>
        <div class="flex gap-4">
          <NuxtLink
            :to="{
              name: 'index',
            }"
            class="w-full text-center bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50 focus:outline-none focus:border-cyan-500"
          >
            Back
          </NuxtLink>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-linear-to-r flex items-center gap-2 justify-center from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
          >
            {{ isSubmitting ? "Loading..." : "Sign in" }}
            <Icon name="material-symbols:arrow-forward-rounded" size="18" />
          </button>
        </div>
      </form>
      <div class="text-md text-gray-400 text-center mt-4">
        <div>Don't have an account?</div>
        <div>
          <NuxtLink
            :to="{
              name: 'auth-register',
            }"
            class="font-semibold text-cyan-400 hover:text-cyan-500 hover:underline focus:outline-none focus:underline"
            >Create one here!</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({
  middleware: () => {
    const userStore = useUserStore();
    if (userStore.data?.id) {
      return navigateTo({
        name: "index",
      });
    }
  },
});

const validationSchema = toTypedSchema(
  z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});
const { value: username } = useField(
  "username",
  {},
  {
    initialValue: "admin",
  }
);

const { value: password } = useField("password", {}, { initialValue: "12345678" });

const authStore = useAuthStore();
const userStore = useUserStore();

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch<{
      token: string;
      user: {
        id: string;
        username: string;
      };
    }>("/api/auth/login", {
      method: "POST",
      body: values,
    });
    const { token } = response;
    authStore.setToken(token);
    useCookie("token", {
      maxAge: 2629800, // 1 month
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    }).value = token;
    await userStore.getUser();
    navigateTo({
      name: "index",
    });
  } catch (error) {
    console.error(`pages/auth/login/index.vue:onSubmit() ${JSON.stringify(error)}`);
  }
});
</script>
