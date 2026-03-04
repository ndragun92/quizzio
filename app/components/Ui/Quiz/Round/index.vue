<template>
  <UiQuizRoundTypeMultipleChoice v-if="question?.type === 'multiple-choice'" :question="question" />
  <UiQuizRoundTypeTrueFalse v-else-if="question?.type === 'true-false'" :question="question" />
  <UiQuizRoundTypeShortAnswer v-else-if="question?.type === 'short-answer'" :question="question" />
  <UiQuizRoundTypeFillInTheBlank
    v-else-if="question?.type === 'fill-in-the-blank'"
    :question="question"
  />
  <UiQuizRoundTypeMatching v-else-if="question?.type === 'matching'" :question="question" />
  <UiQuizRoundTypeOrdering v-else-if="question?.type === 'ordering'" :question="question" />
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
