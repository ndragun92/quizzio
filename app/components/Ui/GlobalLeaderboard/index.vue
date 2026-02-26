<template>
  <div class="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">🏆 Leaderboard</h1>
          <p class="text-gray-400">Top players worldwide</p>
        </div>
        <button
          type="button"
          @click="$router.back()"
          class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
        >
          Back
        </button>
      </div>

      <!-- Stats Cards -->
      <div v-if="returnPlayerRank" class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <p class="text-gray-400 text-sm mb-2">Your Current Rank</p>
          <p class="text-4xl font-bold text-cyan-400">#{{ returnPlayerRank || "N/A" }}</p>
        </div>
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <p class="text-gray-400 text-sm mb-2">Your Score</p>
          <p class="text-4xl font-bold text-yellow-400">
            {{ returnPlayerStats?.score || "0" }}
          </p>
        </div>
        <div class="bg-slate-800 rounded-lg p-6 text-center">
          <p class="text-gray-400 text-sm mb-2">Win Rate</p>
          <p class="text-4xl font-bold text-green-400">
            {{
              returnPlayerStats?.wins
                ? (returnPlayerStats.wins / returnPlayerStats.roundsPlayed) * 100 + "%"
                : "0%"
            }}
          </p>
        </div>
      </div>

      <!-- Main Leaderboard -->
      <div class="bg-slate-800 rounded-lg shadow-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-700 border-b border-slate-600">
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-300">Rank</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-300">Player</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-300">Score</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-300">Games</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-300">Wins</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-300">
                  Avg Score <sup>per round</sup>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(player, index) in leaderboards"
                :key="index"
                :class="[
                  'border-b border-slate-700 hover:bg-slate-700/50 transition',
                  player.playerId === playerId ? 'bg-slate-700/30' : '',
                ]"
              >
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center justify-center w-8 h-8 rounded-full font-bold',
                      getMedalClass(index + 1),
                    ]"
                  >
                    {{ getMedalIcon(index + 1) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div>
                    <p class="font-bold text-white">
                      <UiRenderNickname
                        :nickname="player.nickname"
                        :guest-display-name="player.guestDisplayName"
                      />
                    </p>
                    <p v-if="player.playerId === playerId" class="text-xs text-cyan-400">
                      ← That's you!
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-bold text-yellow-400">{{ player.score }}</span>
                </td>
                <td class="px-6 py-4 text-center text-gray-300">
                  {{ player.roundsPlayed }}
                </td>
                <td class="px-6 py-4 text-center text-gray-300">
                  {{ player.wins }}
                </td>
                <td class="px-6 py-4 text-center text-gray-300">
                  {{ (player.score / player.roundsPlayed).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="!leaderboards?.length" class="text-center py-12">
          <p class="text-gray-400">No players on the leaderboard yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: leaderboards } = useFetch("/api/leaderboards", {
  key: "leaderboards",
});

const { playerId } = useUser();

const returnPlayerStats = computed(() => {
  if (!leaderboards.value?.length || !playerId.value) return null;
  return leaderboards.value.find((p) => p.playerId === playerId.value) || null;
});

const returnPlayerRank = computed(() => {
  if (!leaderboards.value?.length || !playerId.value) return null;
  const rank = leaderboards.value.findIndex((p) => p.playerId === playerId.value);
  return rank !== -1 ? rank + 1 : null;
});

const getMedalIcon = (rank: number): string => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `${rank}`;
  }
};

const getMedalClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "bg-yellow-500/20 text-yellow-400";
    case 2:
      return "bg-gray-400/20 text-gray-300";
    case 3:
      return "bg-orange-600/20 text-orange-400";
    default:
      return "bg-slate-700 text-gray-400";
  }
};
</script>
