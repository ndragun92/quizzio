<template>
  <div
    v-if="leaderboards?.length"
    class="bg-linear-to-t from-slate-800 to-slate-800/75 rounded-lg shadow-2xl p-6"
  >
    <h2 class="text-xl font-bold text-white mb-4 flex items-center">
      <span class="text-yellow-400 mr-2">🏆</span>
      Top Players
    </h2>
    <div class="space-y-2">
      <div
        v-for="(player, index) in leaderboards?.slice(0, 5) || []"
        :key="index"
        class="flex items-center gap-4 justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
      >
        <div class="flex items-center space-x-3 flex-1">
          <span class="text-lg font-bold text-cyan-400 w-6">{{ index + 1 }}</span>
          <span class="text-white">
            {{ player.guestDisplayName || player.nickname || "Guest Player" }}
          </span>
        </div>
        <span class="text-yellow-400 font-bold">{{ player.score }}</span>
        <div class="text-center text-xs">
          <div>Total</div>
          <div>rounds</div>
          <div>{{ player.roundsPlayed }}</div>
        </div>
        <div class="text-center text-xs">
          <div>Avg. score</div>
          <div>per round</div>
          <div>{{ (player.score / player.roundsPlayed).toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <NuxtLink
      to="/leaderboard"
      class="block text-center mt-4 text-cyan-400 hover:text-cyan-300 transition text-sm font-medium"
    >
      View Full Leaderboard →
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { data: leaderboards } = useFetch("/api/leaderboards", {
  key: "leaderboards",
});
</script>
