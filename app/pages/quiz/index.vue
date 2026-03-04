<template>
  <main class="bg-primary-950 min-h-dvh p-8">
    <div class="container mx-auto space-y-6 relative">
      <UiHeading>
        <template #title> Quizzes </template>
        <template #description>List of all quizzes </template>
      </UiHeading>
      <UiCard class="space-y-8 col-span-2">
        <div class="space-y-2">
          <h3 class="font-bold text-2xl">Quiz Library</h3>
          <p class="text--secondary">Browse and explore available quizzes</p>
        </div>
        <div class="flex items-center gap-4 justify-between">
          <div>
            <div class="flex items-center gap-4">
              <div class="relative">
                <div>
                  <Icon
                    name="lucide:search"
                    size="20"
                    class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                  />
                </div>
                <input
                  v-model.trim="keyword"
                  type="search"
                  class="input--text pl-10!"
                  placeholder="Search quizzes..."
                />
              </div>
              <div>
                <UiInputSelect
                  v-model="category"
                  :options="categories"
                  placeholder="All Categories"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div v-if="isLoading" class="py-8">
            <div class="flex items-center gap-2 justify-center py-4">
              <Icon name="svg-spinners:90-ring-with-bg" size="24" />
              <span class="font-bold">Loading... Please wait...</span>
            </div>
          </div>
          <div v-if="!isLoading && filteredQuizzes.length === 0">
            <p class="text-center py-8">
              No quizzes found. Try adjusting your search or filter criteria.
            </p>
          </div>
          <UiCard
            v-for="quiz in filteredQuizzes"
            v-else
            :key="quiz.title"
            class="flex items-center justify-between gap-4"
            :level="2"
          >
            <div class="text-sm flex items-center gap-4">
              <div>
                <div
                  :class="`bg-green-500/25 size-9 rounded-full flex items-center justify-center`"
                >
                  <Icon name="lucide:book-open" size="20" class="text-green-400" />
                </div>
              </div>
              <div class="space-y-2">
                <div class="space-y-1">
                  <div class="flex items-center gap-4">
                    <h4 class="font-semibold">{{ quiz.title }}</h4>
                    <span
                      class="px-3 py-0.5 border text-xs rounded-full font-semibold capitalize"
                      :class="{
                        'bg-green-500 border-green-300': quiz.status === 'published',
                        'bg-orange-300/5 border-orange-300 text-orange-400':
                          quiz.status === 'draft',
                      }"
                      >{{ quiz.status }}</span
                    >
                  </div>
                  <p class="text--secondary">{{ quiz.description }}</p>
                </div>
                <div class="flex items-center gap-2 text--secondary">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:book-open" size="16" />
                    <span>{{ quiz.questions?.length }} Questions</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:clock" size="16" />
                    <span
                      >{{
                        Math.round(quiz.questions.length * (quiz.settings.timeLimitPerRound / 60))
                      }}
                      mins</span
                    >
                  </div>
                  <div class="flex items-center gap-2 capitalize">
                    <Icon name="lucide:tag" size="16" />
                    <span>{{ quiz.category }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <NuxtLink
                :to="{
                  name: 'quiz-creatorId-quizId',
                  params: {
                    creatorId: quiz.creatorId,
                    quizId: quiz.id,
                  },
                }"
                class="button--primary button--compact"
              >
                View quiz
              </NuxtLink>
            </div>
          </UiCard>
        </div>
      </UiCard>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ECategory } from "~~/shared/utils/quiz.db";

const { data: quizzes, status } = useFetch("/api/quizzes");

const isLoading = computed(() => status.value === "pending");

const category = ref<string>("");

const categories = Object.values(ECategory).map((cat) => ({
  label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize each word
  value: cat,
}));

const keyword = ref("");

const filteredQuizzes = computed(() => {
  if (!category.value && !keyword.value) return quizzes.value || [];
  return (quizzes.value || []).filter((quiz) => {
    const matchesCategory = category.value ? quiz.category === category.value : true;
    const matchesKeyword = keyword.value
      ? quiz.title.toLowerCase().includes(keyword.value.toLowerCase())
      : true;
    return matchesCategory && matchesKeyword;
  });
});
</script>
