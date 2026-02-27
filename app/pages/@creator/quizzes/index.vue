<template>
  <div class="space-y-6 relative">
    <UiHeading>
      <template #title> Quizzes </template>
      <template #description> Create, manage and analyze your quizzes </template>
      <template #actions>
        <button class="button--default">
          <Icon name="lucide:plus" size="20" />
          <span>Create New Quiz</span>
        </button>
      </template>
    </UiHeading>
    <UiCard class="space-y-8 col-span-2">
      <div class="space-y-2">
        <h3 class="font-bold text-2xl">Quiz Library</h3>
        <p class="text--secondary">Browse and manage all your quizzes</p>
      </div>
      <div class="flex items-center gap-4 justify-between">
        <div class="inline-flex rounded-md border border-primary-800 overflow-hidden" role="group">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            class="py-3 px-4 text-sm hover:bg-primary-800 focus:bg-primary-800"
            type="button"
            :class="{
              'bg-primary-950!': option.value === filter,
            }"
            @click="onSelectOption(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
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
              <input type="text" class="input--text pl-10!" placeholder="Search quizzes..." />
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
        <UiCard
          v-for="quiz in quizzes"
          :key="quiz.title"
          class="flex items-center justify-between gap-4"
          :level="2"
        >
          <div class="text-sm flex items-center gap-4">
            <div>
              <div :class="`bg-green-500/25 size-9 rounded-full flex items-center justify-center`">
                <Icon name="lucide:book-open" size="20" class="text-green-400" />
              </div>
            </div>
            <div class="space-y-2">
              <div class="space-y-1">
                <div class="flex items-center gap-4">
                  <h4 class="font-semibold">{{ quiz.title }}</h4>
                  <span
                    class="px-3 py-0.5 border text-xs rounded-full font-semibold"
                    :class="{
                      'bg-green-500 border-green-300': quiz.status === 'Published',
                      'bg-orange-300/5 border-orange-300 text-orange-400': quiz.status === 'Draft',
                    }"
                    >{{ quiz.status }}</span
                  >
                </div>
                <p class="text--secondary">{{ quiz.description }}</p>
              </div>
              <div class="flex items-center gap-2 text--secondary">
                <div class="flex items-center gap-2">
                  <Icon name="lucide:book-open" size="16" />
                  <span>{{ quiz.questions }} Questions</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:clock" size="16" />
                  <span>{{ quiz.duration }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="lucide:users" size="16" />
                  <span>{{ quiz.participants }} Participants</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" class="button--primary py-2! px-6!">View</button>
            <button type="button" class="button--default-outline border-primary-700! py-2! px-2!">
              <Icon name="mi:options-vertical" size="20" />
              <span class="sr-only">Edit</span>
            </button>
          </div>
        </UiCard>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
const filter = ref<"all" | "active" | "drafts" | "archived">("all");

const filterOptions = [
  { label: "All Quizzes", value: "all" },
  { label: "Active Quizzes", value: "active" },
  { label: "Drafts", value: "drafts" },
  { label: "Archived", value: "archived" },
];

const onSelectOption = (value: string) => {
  filter.value = value as typeof filter.value;
};

const category = ref<string>("");

const categories = [
  { label: "Mathematics", value: "mathematics" },
  { label: "Science", value: "science" },
  { label: "History", value: "history" },
  { label: "Geography", value: "geography" },
  { label: "Literature", value: "literature" },
];

const quizzes = [
  {
    title: "Science Mid-term Quiz",
    description: "Test your knowledge on basic science concepts.",
    status: "Published",
    date: "2024-06-15",
    questions: 20,
    duration: "30 mins",
    participants: 120,
  },
  {
    title: "History Final Quiz",
    description: "A comprehensive quiz covering world history.",
    status: "Draft",
    date: "2024-06-20",
    questions: 15,
    duration: "25 mins",
    participants: 0,
  },
  {
    title: "Math Weekly Quiz",
    description: "Weekly quiz on algebra and geometry.",
    status: "Published",
    date: "2024-06-18",
    questions: 10,
    duration: "20 mins",
    participants: 85,
  },
];
</script>
