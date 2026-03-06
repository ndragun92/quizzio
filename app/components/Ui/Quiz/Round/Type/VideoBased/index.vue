<template>
  <UiCard class="space-y-4">
    <div>
      <video
        v-if="question?.src"
        :src="question.src"
        controls
        class="rounded-lg mx-auto object-cover h-64 w-lg bg-primary-950 border-3 border-primary-800"
        width="512"
        height="256"
      >
        Your browser does not support the video element.
      </video>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <UiCard
        v-for="(option, index) in question?.options"
        :key="option"
        class="flex items-center gap-4"
        :clickable="true"
        :selected="index === 0"
        :level="2"
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
  </UiCard>
</template>

<script setup lang="ts">
import { vi } from 'zod/v4/locales'
import type { TQuestion } from '~~/shared/utils/quiz.db'

type Props = {
  question: TQuestion | null
}

defineProps<Props>()
</script>
