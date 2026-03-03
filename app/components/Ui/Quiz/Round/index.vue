<template>
  <UiQuizRoundTypeMultipleChoice v-if="question?.type === 'multiple-choice'" :question="question" />
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
