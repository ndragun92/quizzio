<template>
  <div class="grid grid-cols-2 gap-4">
    <UiCard class="flex items-center gap-4">
      <div
        class="size-8 bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
      >
        A
      </div>
      <h3 class="font-bold text-base">{{ question?.options?.[0] }}</h3>
    </UiCard>
    <UiCard class="flex items-center gap-4">
      <div
        class="size-8 bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
      >
        B
      </div>
      <h3 class="font-bold text-base">{{ question?.options?.[1] }}</h3>
    </UiCard>
    <UiCard class="flex items-center gap-4">
      <div
        class="size-8 bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
      >
        C
      </div>
      <h3 class="font-bold text-base">{{ question?.options?.[2] }}</h3>
    </UiCard>
    <UiCard class="flex items-center gap-4">
      <div
        class="size-8 bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
      >
        D
      </div>
      <h3 class="font-bold text-base">{{ question?.options?.[3] }}</h3>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
