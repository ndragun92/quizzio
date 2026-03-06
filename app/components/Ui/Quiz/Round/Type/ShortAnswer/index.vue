<template>
  <UiCard>
    <input
      v-model.trim="question!.providedAnswer"
      type="text"
      class="input--text"
      placeholder="Your answer here..."
    >
  </UiCard>
  <UiCard
    v-if="edit"
    class="input--box"
  >
    <label
      :for="`correctAnswer--${question!.id}`"
      class="input--label"
    >Correct answer</label>
    <input
      :id="`correctAnswer--${question!.id}`"
      v-model="(question!.correctAnswer as string)"
      class="input--text"
      type="text"
      :required="true"
    >
  </UiCard>
</template>

<script setup lang="ts">
import type { TQuestion } from '~~/shared/utils/quiz.db'

type Props = {
  question: TQuestion | null
  edit?: boolean
}

const model = defineModel<TQuestion>({
  required: false,
})

defineProps<Props>()
</script>
