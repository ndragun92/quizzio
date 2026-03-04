<template>
  <UiCard>
    <input type="text" class="input--text" placeholder="Your answer here..." />
  </UiCard>
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
