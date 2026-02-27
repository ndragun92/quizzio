<template>
  <div class="w-full max-w-lg space-y-4">
    <h2 class="font-semibold text-2xl">Welcome Back</h2>
    <p class="font-medium text-sm text-primary-500">
      Enter your credentials to access your account.
    </p>
    <div>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="form--container">
          <div class="input--box">
            <label class="input--label text-primary-950!" for="username">Username</label>
            <input
              id="username"
              v-model.trim="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              autocomplete="username"
              aria-describedby="username-help-text"
              class="input--text bg-white! border-primary-300! text-primary-950! placeholder:text-primary-300!"
            />
            <small id="username-help-text" class="text-xs text-gray-400 sr-only">
              We'll never share your email with anyone else.
            </small>
            <span class="text-red-500 text-sm">{{ errors.username }} </span>
          </div>
          <div>
            <label class="input--label text-primary-950!" for="password">Password</label>
            <input
              id="password"
              v-model.trim="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              aria-describedby="password-help-text"
              class="input--text bg-white! border-primary-300! text-primary-950! placeholder:text-primary-300!"
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
            class="button--secondary"
          >
            Back
          </NuxtLink>
          <button type="submit" :disabled="isSubmitting" class="button--default">
            {{ isSubmitting ? "Loading..." : "Sign In" }}
            <Icon name="material-symbols:arrow-forward-rounded" size="18" />
          </button>
        </div>
      </form>
      <p class="text-sm mt-6 text-center">
        Do not have an account?
        <NuxtLink
          :to="{
            name: 'auth-register',
          }"
          class="text-ascend-purple font-semibold hover:text-ascend-purple-dark hover:underline focus:outline-none focus:underline"
          >Sign up here!</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({
  layout: "auth",
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
