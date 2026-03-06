<template>
  <div class="w-full max-w-lg space-y-4">
    <h2 class="font-semibold text-2xl">
      Create Account
    </h2>
    <p class="font-medium text-sm text-primary-500">
      Choose your account type and start your quiz journey with us.
    </p>
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in types"
          :key="item.value"
          class="border border-primary-300 transition duration-200 hover:border-ascend-purple-dark hover:bg-ascend-purple/10 rounded-lg text-center py-8 px-4"
          :class="{
            'border-ascend-purple-dark! bg-ascend-purple/10': item.value === type,
          }"
          @click="type = item.value"
        >
          <div class="text-center">
            <div>
              <Icon
                :name="item.icon"
                size="28"
              />
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold text-base text-primary-500">
                {{ item.label }}
              </h3>
              <p class="text-xs text-primary-500">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <div class="form--container">
          <div class="input--box">
            <label
              class="input--label text-primary-950!"
              for="username"
            >Username</label>
            <input
              id="username"
              v-model.trim="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              autocomplete="username"
              aria-describedby="username-help-text"
              class="input--text bg-white! border-primary-300! text-primary-950! placeholder:text-primary-300!"
            >
            <small
              id="username-help-text"
              class="text-xs text-gray-400 sr-only"
            >
              We'll never share your email with anyone else.
            </small>
            <span class="text-red-500 text-sm">{{ errors.username }} </span>
          </div>
          <div>
            <label
              class="input--label text-primary-950!"
              for="password"
            >Password</label>
            <input
              id="password"
              v-model.trim="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              aria-describedby="password-help-text"
              class="input--text bg-white! border-primary-300! text-primary-950! placeholder:text-primary-300!"
            >
            <small
              id="password-help-text"
              class="text-xs text-gray-400 sr-only"
            >
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
          <button
            type="submit"
            :disabled="isSubmitting"
            class="button--default"
          >
            {{ isSubmitting ? "Loading..." : "Sign Up" }}
            <Icon
              name="material-symbols:arrow-forward-rounded"
              size="18"
            />
          </button>
        </div>
      </form>
      <p class="text-sm mt-6 text-center">
        Already have an account?
        <NuxtLink
          :to="{
            name: 'auth-login',
          }"
          class="text-ascend-purple font-semibold hover:text-ascend-purple-dark hover:underline focus:outline-none focus:underline"
        >Sign in here!</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
  middleware: () => {
    const userStore = useUserStore()
    if (userStore.data?.id) {
      return navigateTo({
        name: 'index',
      })
    }
  },
})

const types = [
  {
    label: 'Player',
    value: 'player',
    description: 'Join as a player and challenge yourself with exciting quizzes.',
    icon: 'mdi:users',
  },
  {
    label: 'Quiz Creator',
    value: 'quiz_creator',
    description: 'Create and share your own quizzes with the community.',
    icon: 'mdi:account-tie',
  },
]

const validationSchema = toTypedSchema(
  z.object({
    type: z.enum(['player', 'quiz_creator'], {
      errorMap: () => ({ message: 'Please select an account type' }),
    }),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
)

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
})

const { value: type } = useField(
  'type',
  {},
  {
    initialValue: 'player',
  },
)

const { value: username } = useField(
  'username',
  {},
  {
    initialValue: 'admin',
  },
)

const { value: password } = useField('password', {}, { initialValue: '12345678' })

const authStore = useAuthStore()
const userStore = useUserStore()

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch<{
      token: string
      user: {
        id: string
        username: string
      }
    }>('/api/auth/register', {
      method: 'POST',
      body: values,
    })
    const { token } = response
    authStore.setToken(token)
    useCookie('token', {
      maxAge: 2629800, // 1 month
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    }).value = token
    await userStore.getUser()
    navigateTo({
      name: 'index',
    })
  } catch (error) {
    console.error(`pages/auth/register/index.vue:onSubmit() ${JSON.stringify(error)}`)
  }
})
</script>
