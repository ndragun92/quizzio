<template>
  <div class="min-h-dvh flex items-center justify-center px-4">
    <div
      class="bg-linear-to-t from-slate-800 to-slate-800/75 rounded-lg shadow-2xl p-6 max-w-md w-full space-y-6"
    >
      <div class="text-center">
        <h2
          class="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          Sign In to Your Account
        </h2>
        <p class="text-gray-400 mt-1">Play with more features available</p>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2" for="username"
            >Username</label
          >
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            autocomplete="username"
            aria-describedby="username-help-text"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <small id="username-help-text" class="text-xs text-gray-400 sr-only">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2" for="password"
            >Password</label
          >
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            aria-describedby="password-help-text"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <small id="password-help-text" class="text-xs text-gray-400 sr-only">
            We'll never share your password with anyone else.'
          </small>
        </div>
      </div>
      <div class="flex gap-4">
        <NuxtLink
          to="/"
          class="w-full text-center bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50 focus:outline-none focus:border-cyan-500"
        >
          Back
        </NuxtLink>
        <button
          class="w-full bg-linear-to-r flex items-center gap-2 justify-center from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
        >
          Sign In
          <Icon name="material-symbols:arrow-forward-rounded" size="18" />
        </button>
      </div>
      <div class="text-md text-gray-400 text-center mt-4">
        <div>Don't have an account?</div>
        <div>
          <NuxtLink
            to="/auth/register"
            class="font-semibold text-cyan-400 hover:text-cyan-500 hover:underline focus:outline-none focus:underline"
            >Create one here!</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
