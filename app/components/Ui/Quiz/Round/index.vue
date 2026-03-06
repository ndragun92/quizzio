<template>
  <UiQuizRoundTypeMultipleChoice
    v-if="question?.type === EQuestionType.MULTIPLE_CHOICE"
    :question="question"
  />
  <UiQuizRoundTypeTrueFalse
    v-else-if="question?.type === EQuestionType.TRUE_FALSE"
    :question="question"
  />
  <UiQuizRoundTypeShortAnswer
    v-else-if="question?.type === EQuestionType.SHORT_ANSWER"
    :question="question"
  />
  <UiQuizRoundTypeFillInTheBlank
    v-else-if="question?.type === EQuestionType.FILL_IN_THE_BLANK"
    :question="question"
  />
  <UiQuizRoundTypeMatching
    v-else-if="question?.type === EQuestionType.MATCHING"
    :question="question"
  />
  <UiQuizRoundTypeOrdering
    v-else-if="question?.type === EQuestionType.ORDERING"
    :question="question"
  />
  <UiQuizRoundTypeImageBased
    v-else-if="question?.type === EQuestionType.IMAGE_BASED"
    :question="question"
  />
  <UiQuizRoundTypeAudioBased
    v-else-if="question?.type === EQuestionType.AUDIO_BASED"
    :question="question"
  />
  <UiQuizRoundTypeVideoBased
    v-else-if="question?.type === EQuestionType.VIDEO_BASED"
    :question="question"
  />
  <UiQuizRoundTypeCodeSnippet
    v-else-if="question?.type === EQuestionType.CODE_SNIPPET"
    :question="question"
  />
  <UiQuizRoundTypeDragAndDrop
    v-else-if="question?.type === EQuestionType.DRAG_AND_DROP"
    :question="question"
  />
  <UiQuizRoundTypeGuessTheNumber
    v-else-if="question?.type === EQuestionType.GUESS_THE_NUMBER"
    :question="question"
  />
  <UiQuizRoundTypeMemorizeTheOrder
    v-else-if="question?.type === EQuestionType.MEMORIZE_THE_ORDER"
    :question="question"
  />
  <UiQuizRoundTypeMultipleChoiceSharedAnswers
    v-else-if="question?.type === EQuestionType.MULTIPLE_CHOICE_SHARED_ANSWERS"
    :question="question"
  />
</template>

<script setup lang="ts">
import { EQuestionType, type TQuestion } from '~~/shared/utils/quiz.db'

type Props = {
  question: TQuestion | null
}

defineProps<Props>()
</script>
