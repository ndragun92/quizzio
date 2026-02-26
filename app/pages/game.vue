<template>
  <div class="min-h-dvh flex flex-col">
    <header
      class="bg-slate-900/75 border-b border-slate-800 px-4 py-2 flex items-center justify-between sticky top-0 z-10 h-12"
    >
      <h1 class="text-lg font-bold">
        Last Typist
        <strong class="text-transparent bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text"
          >Standing</strong
        >
      </h1>
      <div v-if="nickname">
        Welcome back, <strong v-if="id" class="text-cyan-500">{{ nickname }}</strong>
        <strong v-else class="text-cyan-500"
          >{{ guestDisplayName }} <sup>{{ nickname }}</sup></strong
        >
      </div>
      <nav>
        <ul class="flex items-center gap-4">
          <li>
            <NuxtLink
              :to="{
                name: 'game-rooms',
              }"
              class="link--default"
              exact-active-class="link--active"
              >Home</NuxtLink
            >
          </li>
          <!--          <li>-->
          <!--            <a href="#" class="link&#45;&#45;default" exact-active-class="link&#45;&#45;active">Profile</a>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            <a href="#" class="link&#45;&#45;default" exact-active-class="link&#45;&#45;active">Settings</a>-->
          <!--          </li>-->
          <li>
            <button
              class="button--default from-red-500! to-red-700! hover:from-red-600! hover:to-red-800! py-1.5! px-3! text-xs! focus:ring-red-500!"
              @click="logout()"
            >
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "protected",
});

const { logout, id, nickname, guestDisplayName } = useUser();
</script>
