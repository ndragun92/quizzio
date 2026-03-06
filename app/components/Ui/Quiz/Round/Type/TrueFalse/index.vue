<template>
  <div class="grid grid-cols-2 gap-2">
    <UiCard
      v-for="(option, index) in question?.options"
      :key="option"
      class="flex items-center gap-4"
      :clickable="!edit"
      :selected="edit ? question?.correctAnswer === option : false"
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
  <UiCard
    v-if="edit"
    class="input--box"
  >
    <label
      :for="`correctAnswer--${question!.id}`"
      class="input--label"
    >Correct answer</label>
    <UiInputSelect
      :id="`correctAnswer--${question!.id}`"
      v-model="question!.correctAnswer as string"
      :options="question!.options!.map((option) => ({
        label: option,
        value: option,
      }))"
      :required="true"
    />
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

const props = defineProps<Props>()

if (props.edit) {
  if (model.value && model.value.options!.length !== 2) {
    model.value.options = ['True', 'False']
  }
}
</script>
