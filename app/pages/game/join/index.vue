<script setup lang="ts"></script>
<template>
  <div class="min-h-dvh flex items-center justify-center px-4">
    <div
      class="bg-linear-to-t from-slate-800 to-slate-800/75 rounded-lg shadow-2xl p-6 max-w-md w-full space-y-6"
    >
      <div class="text-center">
        <h2
          class="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          Join a Room
        </h2>
        <p class="text-gray-400 mt-1">Enter the room code to join</p>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"> Room Code </label>
          <input
            type="text"
            placeholder="Enter room code"
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Password (if required)</label>
          <input
            type="text"
            placeholder="Leave empty for public rooms"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
      <div class="flex gap-4">
        <nuxt-link
          to="/public"
          class="w-full text-center bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50 focus:outline-none focus:border-cyan-500"
        >
          Back
        </nuxt-link>
        <button
          class="w-full bg-linear-to-r flex items-center gap-2 justify-center from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
        >
          Join room
          <Icon name="material-symbols:arrow-forward-rounded" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
