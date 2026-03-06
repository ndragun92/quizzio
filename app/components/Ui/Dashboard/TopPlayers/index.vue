<template>
  <UiCard class="space-y-3 col-span-1">
    <div class="space-y-2">
      <h3 class="font-bold text-2xl">
        Top Players
      </h3>
      <p class="text--secondary">
        Players with the highest scores in your quizzes.
      </p>
    </div>
    <ul class="space-y-4">
      <li
        v-for="(player, index) in topPlayers"
        :key="player.name"
        class="flex items-center gap-4"
      >
        <div
          class="size-8 rounded-full bg-primary-800 flex items-center justify-center text-center text-sm"
        >
          <div>{{ index + 1 }}</div>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold">
            {{ player.name }}
          </h4>
          <p class="text--secondary text-sm">
            {{ player.quiz }}
          </p>
        </div>
        <div class="text-orange-400 flex items-center gap-1 text-sm">
          <Icon
            name="lucide:award"
            size="20"
          />
          <span>{{ player.score }}</span>
        </div>
      </li>
    </ul>
  </UiCard>
</template>

<script lang="ts" setup>
const topPlayers = [
  { name: 'Player 1', quiz: 'Mathematics', score: 890 },
  { name: 'Player 2', quiz: 'Science', score: 870 },
  { name: 'Player 3', quiz: 'History', score: 860 },
  { name: 'Player 4', quiz: 'Geography', score: 850 },
  { name: 'Player 5', quiz: 'Literature', score: 840 },
]
</script>
