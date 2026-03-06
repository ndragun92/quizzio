<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-30 overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Manage Quiz Modal"
    >
      <div class="fixed inset-0 bg-primary-950/50 backdrop-blur-sm" />

      <div class="relative z-40 flex min-h-full justify-center py-4 sm:py-8">
        <UiCard class="my-auto w-full max-w-11/12 xl:max-w-4xl p-6">
          <div class="space-y-8">
            <div class="flex items-center gap-8">
              <div>
                <button
                  type="button"
                  class="button--default-outline button--icon border-primary-700!"
                  @click="emit('close')"
                >
                  <Icon
                    name="mi:close"
                    size="20"
                  />
                  <span class="sr-only">Close</span>
                </button>
              </div>

              <div class="space-y-0.5 flex-1">
                <h3 class="font-bold text-2xl">
                  Create New Quiz
                </h3>
                <p class="text--secondary">
                  Add questions, set answers and configure your quiz settings.
                </p>
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="step === 2"
                    type="button"
                    class="button--default button--compact whitespace-nowrap"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>

            <UiDashboardManageQuizModalStepOne
              v-if="step === 1"
              :form="form"
              @next="onNext"
            />
            <UiDashboardManageQuizModalStepTwo
              v-else-if="step === 2"
              @back="step = 1"
            />
          </div>
        </UiCard>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { userId } = useUser()

const emit = defineEmits(['close'])

type TForm = Omit<TQuiz, 'id' | 'createdAt' | 'updatedAt'>

const form = ref<TForm>({
  title: '',
  description: '',
  creatorId: userId.value!,
  status: EStatus.PUBLISHED,
  category: ECategory.GENERAL,
  difficulty: EDifficulty.EASY,
  gameMode: EGameMode.SURVIVAL,
  settings: {
    timeLimitPerRound: 30,
    passingScorePercentage: 70,
    shuffleQuestions: false,
    immediateResults: false,
    lives: 3,
  },
  questions: [],
})

const step = ref(2)

const onNext = (values: TForm) => {
  form.value = { ...toRaw(form.value), ...values }
  step.value = 2
}
</script>
