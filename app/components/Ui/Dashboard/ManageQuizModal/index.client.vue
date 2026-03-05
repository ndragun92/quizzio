<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-30 p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Manage Quiz Modal"
    >
      <div class="absolute inset-0 bg-primary-950/50 backdrop-blur-sm" />
      <UiCard
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-11/12 xl:max-w-4xl p-6 z-40"
      >
        <div class="space-y-8">
          <div class="flex items-center gap-8">
            <div>
              <button
                type="button"
                class="button--default-outline button--icon border-primary-700!"
              >
                <Icon name="mi:chevron-left" size="20" />
                <span class="sr-only">Edit</span>
              </button>
            </div>
            <div class="space-y-0.5 flex-1">
              <h3 class="font-bold text-2xl">Create New Quiz</h3>
              <p class="text--secondary">
                Add questions, set answers and configure your quiz settings.
              </p>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <button type="button" class="button--primary button--compact whitespace-nowrap">
                  Save Draft
                </button>
                <button type="button" class="button--default button--compact whitespace-nowrap">
                  Preview
                </button>
              </div>
            </div>
          </div>
          <UiDashboardManageQuizModalStepOne v-if="step === 1" @next="onNext" />
        </div>
      </UiCard>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { userId } = useUser();

type TForm = Omit<TQuiz, "id" | "createdAt" | "updatedAt">;

const form = ref<TForm>({
  title: "",
  description: "",
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
});

const step = ref(1);

const onNext = (values: TForm) => {
  form.value = { ...form.value, ...values };
  step.value = 2;
};
</script>
