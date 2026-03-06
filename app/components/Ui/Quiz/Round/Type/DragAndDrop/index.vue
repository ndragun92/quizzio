<template>
  <div class="grid grid-cols-2 gap-2">
    <div class="space-y-2">
      <UiCard
        v-for="(option, index) in question?.options"
        :key="option"
        class="flex items-center gap-4"
        :clickable="true"
        :selected="index === 2"
        tabindex="0"
      >
        <div
          class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
        >
          {{ onReturnLetterFromIndex(index) }}
        </div>
        <h3 class="font-bold text-base">
          {{ option }}
        </h3>
      </UiCard>
    </div>
    <UiCard class="flex items-center text-center justify-center">
      <p class="text-sm text-primary-300">
        Drag and drop correct answers into the box.
      </p>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import type { TQuestion } from '~~/shared/utils/quiz.db'

type Props = {
  question: TQuestion | null
}

defineProps<Props>()
</script>
