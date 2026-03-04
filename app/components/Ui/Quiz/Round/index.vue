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
  <UiQuizRoundTypeImageBased v-else-if="question?.type === 'image-based'" :question="question" />
  <UiQuizRoundTypeAudioBased v-else-if="question?.type === 'audio-based'" :question="question" />
  <UiQuizRoundTypeVideoBased v-else-if="question?.type === 'video-based'" :question="question" />
  <UiQuizRoundTypeCodeSnippet v-else-if="question?.type === 'code-snippet'" :question="question" />
  <UiQuizRoundTypeDragAndDrop v-else-if="question?.type === 'drag-and-drop'" :question="question" />
  <UiQuizRoundTypeGuessTheNumber
    v-else-if="question?.type === 'guess-the-number'"
    :question="question"
  />
  <UiQuizRoundTypeMemorizeTheOrder
    v-else-if="question?.type === 'memorize-the-order'"
    :question="question"
  />
  <UiQuizRoundTypeMultipleChoiceSharedAnswers
    v-else-if="question?.type === 'multiple-choice-shared-answers'"
    :question="question"
  />
</template>

<script setup lang="ts">
import type { TQuestion } from "~~/shared/utils/quiz.db";

type Props = {
  question: TQuestion | null;
};

defineProps<Props>();
</script>
