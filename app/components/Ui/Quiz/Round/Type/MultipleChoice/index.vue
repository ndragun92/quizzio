<template>
  <div class="grid grid-cols-2 gap-2">
    <UiCard
      v-for="(option, index) in question?.options"
      :key="index"
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
      <input
        v-if="edit"
        v-model.trim="question!.options![index]"
        type="text"
        class="input--text"
      >
      <h3
        v-else
        class="font-bold text-base"
      >
        {{ option }}
      </h3>
    </UiCard>
  </div>
  <div
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
      input-class="bg-primary-900!"
      :options="question!.options!.map((option) => ({
        label: option,
        value: option,
      }))"
      :required="true"
    />
  </div>
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
  if (model.value && model.value.options!.length < 4) {
    model.value.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }
}
</script>
