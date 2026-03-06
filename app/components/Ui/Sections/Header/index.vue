<template>
  <header
    class="bg-linear-to-t from-primary-950 to-primary-900 border-b border-primary-800 sticky top-0 z-50"
  >
    <div
      class="grid grid-cols-2 lg:grid-cols-[275px_minmax(0,1fr)_275px] gap-4 py-4 lg:py-0 lg:h-16 items-center container px-14 mx-auto"
    >
      <div class="space-x-2">
        <h1 class="text--gradient font-semibold text-2xl">
          Quizzio
        </h1>
        <sup v-if="nickname">Welcome back, <strong>{{ nickname }}</strong></sup>
      </div>
      <nav class="flex justify-end lg:justify-center">
        <ul class="flex items-center gap-6">
          <li>
            <a
              href="#"
              class="link--default"
            >Home</a>
          </li>
          <li>
            <a
              href="#"
              class="link--default"
            >Quizzes</a>
          </li>
          <li>
            <a
              href="#"
              class="link--default"
            >About</a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-4 justify-end col-span-2 lg:col-span-1">
        <template v-if="!userId">
          <NuxtLink
            :to="{ name: 'auth-login' }"
            class="button--secondary w-auto!"
          >Sign In</NuxtLink>
          <NuxtLink
            :to="{ name: 'auth-register' }"
            class="button--default w-auto!"
          >Register</NuxtLink>
        </template>
        <template v-else>
          <button
            type="button"
            class="button--primary w-auto!"
            @click="logout()"
          >
            Log Out
          </button>
          <NuxtLink
            :to="{ name: '@creator' }"
            class="button--default w-auto!"
          >Dashboard</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { userId, nickname, logout } = useUser()
</script>
