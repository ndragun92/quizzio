<template>
  <UiCard>
    <pre>
     Test {{ returnMergedSelectedOptionsValue }}
    </pre>
    <div class="grid grid-cols-2 gap-2">
      <div class="space-y-2">
        <UiCard
          v-for="(option, index) in question?.leftOptions"
          :key="index"
          class="flex items-center gap-4"
          :clickable="true"
          :level="2"
          @click="onSelectLeftOption(index + 1)"
        >
          <div
            class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
            :class="leftOptionActiveColor(index + 1)"
          >
            {{ onReturnLetterFromIndex(index) }}
          </div>
          <input
            v-if="edit"
            v-model.trim="question!.leftOptions![index]"
            type="text"
            class="input--text flex-1"
          >

          <span
            v-else
            class="flex-1"
          >{{ option }}</span>
        </UiCard>
      </div>
      <div class="space-y-2">
        <UiCard
          v-for="(option, index) in question?.rightOptions"
          :key="index"
          class="flex items-center gap-4"
          :level="2"
          :clickable="true"
          @click="onSelectRightOption(index + 1)"
        >
          <div
            class="size-8 group-hover:border-ascend-purple-dark bg-primary-800 border border-primary-700 flex items-center justify-center rounded-full text-sm"
            :class="rightOptionActiveColor(index + 1)"
          >
            {{ index + 1 }}
          </div>

          <input
            v-if="edit"
            v-model.trim="question!.rightOptions![index]"
            type="text"
            class="input--text flex-1"
          >

          <span
            v-else
            class="flex-1"
          >{{ option }}</span>
        </UiCard>
      </div>
    </div>
  </UiCard>
  <UiCard
    v-if="edit"
    class="input--box"
  >
    <label
      :for="`correctAnswer--${question!.id}`"
      class="input--label"
    >Correct answer</label>
    <div class="relative">
      <textarea
        :id="`correctAnswer--${question!.id}`"
        v-model="model!.correctAnswer"
        class="input--text pointer-events-none text-transparent!"
        :required="true"
        rows="2"
        placeholder="Select options from both sides to form the correct answer"
      />
      <ul
        v-if="isSelectionValid"
        class="flex items-center gap-2 flex-wrap absolute top-2 left-2"
      >
        <li
          v-for="(option, index) in returnMergedSelectedOptions"
          :key="index"
          class="text-white py-1 px-4 rounded-full text-xs font-semibold"
          :class="colors[index]"
        >
          {{ option }}
        </li>
      </ul>
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

const colors = ['bg-green-700!', 'bg-yellow-700!', 'bg-blue-700!', 'bg-pink-700!']

const leftSelectedOptions = ref<number[]>([])

const onSelectLeftOption = (option: number) => {
  if (leftSelectedOptions.value.includes(option)) {
    leftSelectedOptions.value = leftSelectedOptions.value.filter(o => o !== option)
  } else if (leftSelectedOptions.value.length < 4) {
    leftSelectedOptions.value.push(option)
  }
}

const leftOptionActiveColor = (option: number) => {
  const findIndex = leftSelectedOptions.value.findIndex(o => o === option)
  if (findIndex === -1) { return '' }
  return colors[findIndex]
}

const returnLeftSelectedOptions = computed(() => {
  return leftSelectedOptions.value.map((_option) => {
    const index = _option - 1
    const leftOption = props.question?.leftOptions?.[index] || ''
    return leftOption
  })
})

const rightSelectedOptions = ref<number[]>([])

const onSelectRightOption = (option: number) => {
  if (rightSelectedOptions.value.includes(option)) {
    rightSelectedOptions.value = rightSelectedOptions.value.filter(o => o !== option)
  } else if (rightSelectedOptions.value.length < 4) {
    rightSelectedOptions.value.push(option)
  }
}

const rightOptionActiveColor = (option: number) => {
  const findIndex = rightSelectedOptions.value.findIndex(o => o === option)
  if (findIndex === -1) { return '' }
  return colors[findIndex]
}

const returnRightSelectedOptions = computed(() => {
  return rightSelectedOptions.value.map((_option) => {
    const index = _option - 1
    const rightOption = props.question?.rightOptions?.[index] || ''
    return rightOption
  })
})

const returnMergedSelectedOptions = computed(() => {
  return returnLeftSelectedOptions.value.map((leftOption, index) => {
    const rightOption = returnRightSelectedOptions.value[index] || ''
    return `${leftOption} - ${rightOption}`
  })
})

const returnMergedSelectedOptionsValue = computed(() => {
  return returnMergedSelectedOptions.value.join(quizSeparator)
})

const isSelectionValid = computed(() => {
  const totalSelected = leftSelectedOptions.value.length + rightSelectedOptions.value.length
  const totalOptions = (props.question?.leftOptions?.length || 0) + (props.question?.rightOptions?.length || 0)
  return totalSelected === totalOptions
})

watch(isSelectionValid, (newValue) => {
  if (!props.edit) { return }
  if (newValue) {
    model.value!.correctAnswer = returnMergedSelectedOptionsValue.value
  } else {
    model.value!.correctAnswer = ''
  }
})
</script>
