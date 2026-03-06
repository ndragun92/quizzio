<template>
  <section>
    <UiCard class="space-y-3">
      <div class="space-y-2">
        <h3 class="font-bold text-2xl">
          Recent Quizzes
        </h3>
        <p class="text--secondary">
          Manage your recent quizzes and activities here.
        </p>
      </div>
      <ul class="grid grid-cols-3 gap-4">
        <li
          v-for="quizz in recentQuizzes"
          :key="quizz.title"
        >
          <UiCard
            class="space-y-4"
            :level="2"
            :hover="true"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-4 justify-between">
                <h4 class="font-semibold">
                  {{ quizz.title }}
                </h4>
                <Icon
                  name="lucide:chevron-right"
                  size="16"
                />
              </div>
              <div class="flex items-center gap-2 text--secondary">
                <div class="flex items-center gap-2">
                  <Icon
                    name="lucide:clipboard"
                    size="16"
                  />
                  <span>{{ quizz.questions }} questions</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon
                    name="lucide:users"
                    size="16"
                  />
                  <span>{{ quizz.participants }} Participants</span>
                </div>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-4 justify-between text-sm">
                <span>Completion Rate</span>
                <span>{{ quizz.completionRate }}%</span>
              </div>
              <div class="bg-primary-800 h-2 rounded-full">
                <div
                  class="bg-ascend-purple-dark h-2 rounded-full"
                  :style="{ width: quizz.completionRate + '%' }"
                />
              </div>
            </div>
          </UiCard>
        </li>
        <li>
          <UiCard
            class="h-full flex items-center justify-center"
            :placeholder="true"
            :hover="true"
          >
            <div class="space-y-2">
              <div>
                <div
                  class="mx-auto"
                  :class="`bg-purple-500/25 size-9 rounded-full flex items-center justify-center`"
                >
                  <Icon
                    name="lucide:plus"
                    size="20"
                    class="text-purple-400"
                  />
                </div>
              </div>
              <div class="space-y-1">
                <h4 class="font-semibold text-center">
                  Create New Quiz
                </h4>
                <p class="text--secondary text-center">
                  Start a new quiz and engage your participants.
                </p>
              </div>
            </div>
          </UiCard>
        </li>
      </ul>
    </UiCard>
  </section>
</template>

<script lang="ts" setup>
const recentQuizzes = [
  {
    title: 'Introduction to Biology',
    questions: 15,
    participants: 120,
    completionRate: 75,
  },
  {
    title: 'World History Overview',
    questions: 20,
    participants: 80,
    completionRate: 60,
  },
  {
    title: 'Basic Mathematics',
    questions: 10,
    participants: 150,
    completionRate: 85,
  },
  {
    title: 'Literature Classics',
    questions: 25,
    participants: 60,
    completionRate: 50,
  },
]
</script>
