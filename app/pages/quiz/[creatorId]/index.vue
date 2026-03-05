<template>
  <main class="w-screen h-dvh bg-primary-950 flex flex-col">
    <NuxtImg
      src="/images/homepage_hero_eclipse_left.png"
      class="absolute left-0 top-0 opacity-75 pointer-events-none"
      alt="Homepage hero eclipse left"
    />
    <NuxtImg
      src="/images/homepage_hero_eclipse_right.png"
      class="absolute right-0 bottom-0 opacity-75 pointer-events-none"
      alt="Homepage hero eclipse right"
    />
    <header class="h-16 border-b border-primary-800">
      <div
        class="container mx-auto grid grid-cols-[150px_minmax(0,1fr)_150px] items-center gap-4 px-15 h-16"
      >
        <div>
          <button type="button" class="button--primary button--icon size-10!">
            <Icon name="mdi:chevron-left" size="24" />
            <span class="sr-only">Go back</span>
          </button>
        </div>
        <div>
          <h1 class="text-center font-semibold text-lg">
            {{ isLoading ? "Loading..." : quiz?.title }}
          </h1>
        </div>
        <div />
      </div>
    </header>
    <div v-if="isLoading" class="flex items-center justify-center flex-1">
      <div class="flex items-center gap-4">
        <Icon name="eos-icons:bubble-loading" size="32" class="text-ascend-purple-dark" />
        <span class="text-lg font-semibold text-ascend-purple-dark"
          >Please wait for round to load...</span
        >
      </div>
    </div>
    <div v-else-if="!quiz" class="flex items-center justify-center flex-1">
      <div class="flex items-center gap-4">
        <span class="text-lg font-semibold text-ascend-purple-dark">Quiz not found.</span>
      </div>
    </div>
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="container mx-auto px-15 grid grid-cols-[minmax(0,1fr)_320px] gap-15">
        <div class="space-y-6">
          <div class="space-y-1.5">
            <div class="text--secondary font-medium flex items-center justify-between">
              <span>Question {{ currentRound }} of {{ maxRounds }}</span>
              <span>{{ Math.floor(completedPercentage) }}% Complete</span>
            </div>
            <div>
              <div class="w-full h-2 bg-primary-900 rounded-full overflow-hidden">
                <div
                  class="h-full bg-ascend-purple-dark rounded-full transition-all duration-200"
                  :style="{ width: `${completedPercentage}%` }"
                />
              </div>
            </div>
          </div>
          <UiCard class="space-y-6">
            <div class="grid grid-cols-[150px_minmax(0,1fr)_150px] items-center">
              <div>
                <span class="bg-ascend-purple-dark py-1.5 px-3 text-xs rounded-full"
                  >{{ currentQuestion?.points }} points</span
                >
              </div>
              <div class="text-center">
                <div class="flex items-center gap-2 justify-center text-red-500">
                  <Icon name="mdi:stopwatch-outline" size="24" />
                  <span class="font-semibold text-base">00:00</span>
                </div>
              </div>
              <div class="flex justify-end">
                <span class="bg-primary-800 py-1.5 px-3 text-xs rounded-full capitalize">{{
                  quiz.difficulty
                }}</span>
              </div>
            </div>
            <h2 class="font-semibold text-2xl/7">
              {{ currentQuestion?.text }}
            </h2>
          </UiCard>
          <div
            v-if="currentQuestion?.doublePoints"
            class="bg-yellow-500/10 border-2 border-yellow-400 rounded-lg p-4 flex items-start gap-4"
          >
            <div>
              <Icon name="mdi:lightbulb-on-outline" size="24" class="text-yellow-400" />
            </div>
            <div class="space-y-2">
              <p class="text-sm text-yellow-300">
                This question is worth double points! Answering correctly will earn you double the
                points, but be careful - answering incorrectly will also deduct double the points!
              </p>
            </div>
          </div>
          <UiQuizRound :question="currentQuestion" />
          <div class="flex items-center gap-8 justify-between">
            <button type="button" class="button--primary w-auto!">
              <Icon name="mdi:flag-outline" size="24" />
              <span>Skip</span>
            </button>
            <button type="button" class="button--default w-auto!">
              <span>Next Question</span>
              <Icon name="mdi:chevron-right" size="24" />
            </button>
          </div>
        </div>
        <div>
          <UiCard class="space-y-3">
            <h4 class="text-lg font-semibold">Quiz Stats</h4>
            <div class="space-y-4">
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Game mode</h5>
                <div class="text-white font-semibold">{{ quiz?.gameMode }}</div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Score</h5>
                <div class="text-ascend-purple-dark font-semibold">0</div>
              </UiCard>
              <UiCard
                v-if="quiz.gameMode === 'survival'"
                class="text-center py-2! space-y-0.5"
                :level="2"
              >
                <h5 class="text--secondary">Lives</h5>
                <div class="text-red-500 space-x-2">
                  <Icon
                    v-for="live in quiz.settings.lives"
                    :key="live"
                    name="mdi:heart"
                    size="24"
                  />
                </div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Progress</h5>
                <div class="text-white font-semibold">{{ currentRound }} / {{ maxRounds }}</div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Position</h5>
                <div class="text-ascend-purple-dark font-semibold">2nd</div>
              </UiCard>
            </div>
          </UiCard>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { TQuiz } from "~~/shared/utils/quiz.db";

const route = useRoute();

const routeParams = computed(() => route.params as { creatorId: string; quizId: string });

const creatorId = computed(() => routeParams.value.creatorId);
const quizId = computed(() => routeParams.value.quizId);

const { onJoinQuiz } = useQuiz();
const { nickname } = useUser();
const socketStore = useSocketStore();
const isConnected = computed(() => socketStore.isConnected);
// const error = computed(() => socketStore.error);
const joinedQuiz = ref(false);

watch(
  isConnected,
  (connected) => {
    if (connected) {
      console.info("WebSocket connected, joining quiz...");
      if (!joinedQuiz.value) {
        onJoinQuiz({
          nickname: nickname.value,
          creatorId: parseInt(creatorId.value),
          quizId: parseInt(quizId.value),
        });
        joinedQuiz.value = true;
      } else {
        console.warn("Already joined quiz, not sending joinQuiz message again.");
      }
    } else {
      console.warn("WebSocket disconnected.");
    }
  },
  {
    immediate: true,
  }
);

const { data: quiz, status } = useFetch<TQuiz>(`/api/quizzes/${creatorId.value}/${quizId.value}`, {
  key: `quiz-${creatorId.value}-${quizId.value}`,
});

const isLoading = computed(() => status.value === "pending");

const currentRound = ref(1);
const maxRounds = computed(() => quiz.value?.questions.length ?? 0); // Placeholder for max rounds, should come from quiz data
const currentQuestion = computed(() => quiz.value?.questions[currentRound.value - 1] || null); // Placeholder for current question, should come from quiz data
const completedPercentage = computed(() => (currentRound.value / maxRounds.value) * 100);
</script>
