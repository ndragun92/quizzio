<template>
  <UiCard>
    <div class="space-y-2">
      <UiCard
        v-for="(option, index) in question?.options"
        :key="option"
        class="flex items-center gap-4"
        :level="2"
      >
        <div
          class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
        >
          {{ index + 1 }}
        </div>
        {{ option }}</UiCard
      >
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
