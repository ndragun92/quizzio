<template>
  <main class="bg-primary-950 min-h-dvh p-8">
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
    <div class="container mx-auto space-y-6 relative">
      <UiHeading>
        <template #title>
          {{ quiz ? quiz?.title : hasError ? "Error loading title" : "Title not available" }}
        </template>
        <template #description>
          {{
            quiz
              ? quiz?.description
              : hasError
                ? "Error loading description"
                : "Description not available"
          }}
        </template>
      </UiHeading>
      <div v-if="isLoading" class="py-8">
        <div class="flex items-center gap-2 justify-center py-4">
          <Icon name="svg-spinners:90-ring-with-bg" size="24" />
          <span class="font-bold">Loading... Please wait...</span>
        </div>
      </div>
      <div v-else-if="!quiz" class="py-8">
        <div class="flex items-center gap-2 justify-center py-4">
          <span class="font-bold">Quiz not found.</span>
        </div>
      </div>
      <div v-else class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-x-2">
            <span
              class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
            >
              <Icon name="lucide:tag" size="16" class="text-yellow-400 mr-1" />
              {{ capitalizeFirstLetter(quiz.category) }}</span
            >
            <span
              class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
            >
              <Icon name="lucide:sliders-horizontal" size="16" class="text-yellow-400 mr-1" />
              {{ capitalizeFirstLetter(quiz.difficulty) }}</span
            >
            <span
              class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
              ><Icon name="lucide:gamepad" size="16" class="text-yellow-400 mr-1" />
              {{ capitalizeFirstLetter(quiz.gameMode) }}</span
            >
            <span
              class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
            >
              <Icon name="lucide:book-open" size="16" class="text-yellow-400 mr-1" />
              {{ quiz.questions.length }} questions</span
            >
          </div>
          <div>
            <div class="space-x-2">
              <span
                class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
                ><Icon name="lucide:clock" size="16" class="text-yellow-400 mr-1" /> Time limit per
                round: {{ quiz.settings.timeLimitPerRound }} seconds</span
              >
              <span
                class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
                ><Icon name="lucide:check-circle" size="16" class="text-yellow-400 mr-1" /> Passing
                score: {{ quiz.settings.passingScorePercentage }}%</span
              >
              <span
                class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
                ><Icon name="lucide:shuffle" size="16" class="text-yellow-400 mr-1" /> Shuffle
                questions: {{ quiz.settings.shuffleQuestions ? "Yes" : "No" }}</span
              >
              <span
                class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
                ><Icon name="lucide:refresh-cw" size="16" class="text-yellow-400 mr-1" /> Immediate
                results: {{ quiz.settings.immediateResults ? "Yes" : "No" }}</span
              >
              <span
                v-if="quiz.gameMode === EGameMode.SURVIVAL"
                class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
                ><Icon name="lucide:heart" size="16" class="text-yellow-400 mr-1" /> Number of
                lives: {{ quiz.settings.lives }}</span
              >
            </div>
          </div>
        </div>
        <UiCard v-for="question in quiz.questions" :key="question.id" class="space-y-4">
          <h2 class="font-semibold text-2xl/7">
            {{ question?.text }}
          </h2>
          <div class="space-x-2">
            <span
              class="inline-flex items-center gap-0.5 bg-green-700 border-green-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
            >
              <Icon name="lucide:tag" size="16" class="text-green-400 mr-1" />
              {{ capitalizeFirstLetter(question.type.replace(/-/g, " ")) }}</span
            >
            <span
              class="inline-flex items-center gap-0.5 bg-yellow-700 border-yellow-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
              ><Icon name="lucide:award" size="16" class="text-yellow-400 mr-1" />
              {{ question.points }} points</span
            >
            <span
              v-if="question.doublePoints"
              class="inline-flex items-center gap-0.5 bg-purple-700 border-purple-600 px-3 py-0.5 border text-xs rounded-full font-semibold"
              ><Icon name="lucide:zap" size="16" class="text-purple-400 mr-1" /> Double points</span
            >
          </div>
          <UiCard :level="2">
            <UiQuizRound :question="question" />
          </UiCard>
        </UiCard>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { TQuiz } from "~~/shared/utils/quiz.db";
import { capitalizeFirstLetter } from "~~/shared/utils/general.utils";

const route = useRoute();

const routeParams = computed(() => route.params as { creatorId: string; quizId: string });

const creatorId = computed(() => routeParams.value.creatorId);
const quizId = computed(() => routeParams.value.quizId);

const { data: quiz, status } = useFetch<TQuiz>(`/api/quizzes/${creatorId.value}/${quizId.value}`, {
  key: `quiz-${creatorId.value}-${quizId.value}`,
});

const isLoading = computed(() => status.value === "pending");
const hasError = computed(() => status.value === "error");
</script>
