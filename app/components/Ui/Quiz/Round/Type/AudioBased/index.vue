<template>
  <UiCard class="space-y-4">
    <UiCard :level="2">
      <audio v-if="question?.src" :src="question.src" controls class="w-full">
        Your browser does not support the audio element.
      </audio>
    </UiCard>
    <div class="grid grid-cols-2 gap-4">
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
        <h3 class="font-bold text-base">{{ option }}</h3>
      </UiCard>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
