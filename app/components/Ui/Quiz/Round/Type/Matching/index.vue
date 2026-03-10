<template>
  <UiCard>
    <div class="grid grid-cols-2 gap-2">
      <div class="space-y-2">
        <UiCard
          v-for="(option, index) in question?.leftOptions"
          :key="index"
          class="flex items-center gap-4"
          :level="2"
        >
          <div
            class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
          >
            {{ onReturnLetterFromIndex(index) }}
          </div>
          <input
            v-if="edit"
            v-model.trim="question!.leftOptions![index]"
            type="text"
            class="input--text"
          >

          <template v-else>
            {{ option }}
          </template>
        </UiCard>
      </div>
      <div class="space-y-2">
        <UiCard
          v-for="(option, index) in question?.rightOptions"
          :key="index"
          class="flex items-center gap-4"
          :level="2"
        >
          <div
            class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
          >
            {{ index + 1 }}
          </div>

          <input
            v-if="edit"
            v-model.trim="question!.rightOptions![index]"
            type="text"
            class="input--text"
          >

          <template v-else>
            {{ option }}
          </template>
        </UiCard>
      </div>
    </div>
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
  if (model.value && model.value.leftOptions!.length !== 4) {
    model.value.leftOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }
  if (model.value && model.value.rightOptions!.length !== 4) {
    model.value.rightOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }
}
</script>
