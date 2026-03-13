<template>
  <form
    class="space-y-8"
    @submit.prevent="onCreate"
  >
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <UiCard
        class="space-y-6 xl:col-span-3"
        :level="2"
      >
        <div class="space-y-1">
          <h4 class="font-bold text-xl">
            Review Quiz
          </h4>
          <p class="text--secondary">
            Confirm the content and settings before creating your quiz.
          </p>
        </div>

        <div class="space-y-4">
          <div class="space-y-3 rounded-lg border border-primary-700 bg-primary-900/40 p-5">
            <div class="flex flex-wrap gap-2">
              <UiPill>{{ statusLabel }}</UiPill>
              <UiPill>{{ categoryLabel }}</UiPill>
              <UiPill>{{ difficultyLabel }}</UiPill>
              <UiPill>{{ gameModeLabel }}</UiPill>
            </div>

            <div class="space-y-2">
              <h5 class="font-bold text-2xl">
                {{ props.form.title || 'Untitled quiz' }}
              </h5>
              <p class="text--secondary text-sm leading-6">
                {{ props.form.description || 'No description provided.' }}
              </p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
              <p class="text--secondary">
                Total questions
              </p>
              <p class="mt-2 font-bold text-2xl">
                {{ questionCount }}
              </p>
            </div>
            <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
              <p class="text--secondary">
                Total points
              </p>
              <p class="mt-2 font-bold text-2xl">
                {{ totalPoints }}
              </p>
            </div>
            <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
              <p class="text--secondary">
                Double point questions
              </p>
              <p class="mt-2 font-bold text-2xl">
                {{ doublePointsCount }}
              </p>
            </div>
            <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
              <p class="text--secondary">
                Question types
              </p>
              <p class="mt-2 text-sm leading-6 text-primary-200">
                {{ questionTypeSummary }}
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between gap-4">
            <h5 class="font-semibold text-base">
              Question Preview
            </h5>
            <p class="text--secondary">
              Showing first {{ previewQuestions.length }} of {{ questionCount }}
            </p>
          </div>

          <div class="space-y-3">
            <UiCard
              v-for="(question, index) in previewQuestions"
              :key="question.id"
              :level="3"
              class="space-y-3"
            >
              <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div class="space-y-1">
                  <p class="text-xs font-semibold tracking-[0.2em] text-primary-400 uppercase">
                    Question {{ index + 1 }}
                  </p>
                  <h6 class="font-semibold text-base">
                    {{ question.text || 'Untitled question' }}
                  </h6>
                </div>

                <div class="flex flex-wrap gap-2">
                  <UiPill>{{ formatLabel(question.type) }}</UiPill>
                  <UiPill v-if="question.doublePoints">
                    Double points
                  </UiPill>
                </div>
              </div>

              <div class="grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <p class="text--secondary">
                    Points
                  </p>
                  <p class="mt-1 font-semibold text-primary-100">
                    {{ question.points }}
                  </p>
                </div>
                <div>
                  <p class="text--secondary">
                    Options
                  </p>
                  <p class="mt-1 font-semibold text-primary-100">
                    {{ getOptionSummary(question) }}
                  </p>
                </div>
                <div>
                  <p class="text--secondary">
                    Correct answer
                  </p>
                  <p class="mt-1 truncate font-semibold text-primary-100">
                    {{ question.correctAnswer || 'Not set' }}
                  </p>
                </div>
              </div>
            </UiCard>

            <p
              v-if="remainingQuestionCount > 0"
              class="text--secondary"
            >
              +{{ remainingQuestionCount }} more question{{ remainingQuestionCount === 1 ? '' : 's' }} included in this quiz.
            </p>
          </div>
        </div>
      </UiCard>

      <UiCard
        class="space-y-4 xl:col-span-2"
        :level="2"
      >
        <div class="space-y-1">
          <h4 class="font-bold text-xl">
            Game Settings
          </h4>
          <p class="text--secondary">
            Final review of gameplay rules and answer flow.
          </p>
        </div>

        <div class="space-y-3">
          <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
            <p class="text--secondary">
              Time limit
            </p>
            <p class="mt-1 font-semibold text-primary-100">
              {{ timeLimitLabel }}
            </p>
          </div>

          <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4">
            <p class="text--secondary">
              Mode specific rule
            </p>
            <p class="mt-1 font-semibold text-primary-100">
              {{ modeSpecificRule }}
            </p>
          </div>

          <div class="rounded-lg border border-primary-700 bg-primary-900/30 p-4 space-y-3">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-semibold text-primary-100">
                  Shuffle questions
                </p>
                <p class="text--secondary">
                  Randomize the order players will see.
                </p>
              </div>
              <UiPill>{{ props.form.settings.shuffleQuestions ? 'Enabled' : 'Disabled' }}</UiPill>
            </div>

            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-semibold text-primary-100">
                  Immediate results
                </p>
                <p class="text--secondary">
                  Reveal results right after each question.
                </p>
              </div>
              <UiPill>{{ props.form.settings.immediateResults ? 'Enabled' : 'Disabled' }}</UiPill>
            </div>
          </div>
        </div>
      </UiCard>
    </div>

    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="button--primary button--compact whitespace-nowrap"
          @click="emit('back')"
        >
          <Icon
            name="lucide:chevron-left"
            size="16"
          />
          <span>Prev</span>
        </button>
        <button
          type="submit"
          :disabled="props.isSubmitting"
          class="button--default button--compact whitespace-nowrap"
        >
          <span>{{ props.isSubmitting ? 'Creating...' : 'Create Quiz' }}</span>
          <Icon
            name="lucide:check"
            size="16"
          />
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
type Props = {
  form: TQuiz
  isSubmitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
})

const emit = defineEmits(['back', 'create'])

const questionCount = computed(() => props.form.questions.length)

const totalPoints = computed(() => props.form.questions.reduce((sum, question) => {
  return sum + (question.points ?? 0)
}, 0))

const doublePointsCount = computed(() => props.form.questions.filter(question => question.doublePoints).length)

const previewQuestions = computed(() => props.form.questions.slice(0, 3))

const remainingQuestionCount = computed(() => questionCount.value - previewQuestions.value.length)

const formatLabel = (value?: string) => {
  if (!value) {
    return 'Not set'
  }

  return value
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const statusLabel = computed(() => formatLabel(props.form.status))
const categoryLabel = computed(() => formatLabel(props.form.category))
const difficultyLabel = computed(() => formatLabel(props.form.difficulty))
const gameModeLabel = computed(() => formatLabel(props.form.gameMode))

const questionTypeSummary = computed(() => {
  const breakdown: Record<string, number> = props.form.questions.reduce((accumulator, question) => {
    const label = formatLabel(question.type)
    accumulator[label] = (accumulator[label] ?? 0) + 1
    return accumulator
  }, {} as Record<string, number>)

  return Object.entries(breakdown)
    .map(([label, count]) => `${label} (${count})`)
    .join(', ')
})

const timeLimitLabel = computed(() => {
  const amount = props.form.settings.timeLimitPerRound
  const unit = props.form.gameMode === EGameMode.CLASSIC ? 'minute' : 'second'
  return `${amount} ${unit}${amount === 1 ? '' : 's'}`
})

const modeSpecificRule = computed(() => {
  if (props.form.gameMode === EGameMode.SURVIVAL) {
    return `${props.form.settings.lives} live${props.form.settings.lives === 1 ? '' : 's'} before elimination`
  }

  return `Passing score: ${props.form.settings.passingScorePercentage}%`
})

const getOptionSummary = (question: TQuestion) => {
  if (question.type === EQuestionType.MATCHING) {
    return `${question.leftOptions?.length ?? 0} pairs`
  }

  if (question.options?.length) {
    return `${question.options.length} options`
  }

  return 'No options'
}

const onCreate = () => {
  emit('create')
}
</script>
