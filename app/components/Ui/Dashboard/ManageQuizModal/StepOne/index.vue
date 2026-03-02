<template>
  <form class="space-y-8">
    <div class="grid grid-cols-5 gap-4">
      <UiCard class="col-span-3 space-y-4" :level="2">
        <div class="space-y-1">
          <h4 class="font-bold text-xl">Quiz Details</h4>
          <p class="text--secondary">Basic information about your quiz.</p>
        </div>
        <div class="space-y-2">
          <div class="input--box">
            <label for="quiz-title" class="input--label">Quiz Title</label>
            <input
              id="quiz-title"
              class="input--text"
              type="text"
              name="quiz-title"
              placeholder="Enter quiz title"
            />
          </div>
          <div class="input--box">
            <label for="quiz-description" class="input--label">Description</label>
            <textarea
              id="quiz-description"
              class="input--text"
              rows="4"
              name="quiz-description"
              placeholder="Enter quiz description"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="input--box">
              <label for="quiz-category" class="input--label">Category</label>
              <UiInputSelect id="quiz-category" v-model="category" :options="categories" />
            </div>
            <div class="input--box">
              <label for="quiz-difficulty" class="input--label">Difficulty</label>
              <UiInputSelect id="quiz-difficulty" v-model="difficulty" :options="difficulties" />
            </div>
          </div>
        </div>
      </UiCard>
      <UiCard class="col-span-2 space-y-4" :level="2">
        <div class="space-y-1">
          <h4 class="font-bold text-xl">Quiz Settings</h4>
          <p class="text--secondary">Configure how your quiz works.</p>
        </div>
        <div class="space-y-2">
          <div class="input--box">
            <label for="quiz-time-limit" class="input--label">Time Limit</label>
            <div class="relative">
              <div>
                <Icon
                  name="lucide:clock"
                  size="20"
                  class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <input
                id="quiz-time-limit"
                class="input--text pl-10! pr-20!"
                type="number"
                name="quiz-time-limit"
                placeholder="Enter time limit"
              />
              <div>
                <div class="text-primary-500 text-sm absolute right-3 top-1/2 -translate-y-1/2">
                  minutes
                </div>
              </div>
            </div>
          </div>
          <div class="input--box">
            <label for="quiz-passing-score" class="input--label">Passing Score</label>
            <div class="relative">
              <div>
                <Icon
                  name="lucide:check"
                  size="20"
                  class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <input
                id="quiz-passing-score"
                class="input--text pl-10! pr-8!"
                type="number"
                name="quiz-passing-score"
                placeholder="Enter passing score"
              />
              <div>
                <div class="text-primary-500 text-sm absolute right-3 top-1/2 -translate-y-1/2">
                  %
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-4 mt-4">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="input--label" for="quiz-randomize">Randomize Questions</label>
                <p class="text--secondary">Show questions in a random order</p>
              </div>
              <UiInputToggle id="quiz-randomize" />
            </div>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="input--label" for="quiz-immediate-results">Immediate Results</label>
                <p class="text--secondary">Show results for each question</p>
              </div>
              <UiInputToggle id="quiz-immediate-results" />
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <button type="button" class="button--primary button--compact whitespace-nowrap">
          <Icon name="lucide:chevron-left" size="16" />
          <span>Prev</span>
        </button>
        <button type="button" class="button--default button--compact whitespace-nowrap">
          <span>Next</span>
          <Icon name="lucide:chevron-right" size="16" />
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
const category = ref("");

const categories = [
  {
    label: "All Categories",
    value: "",
  },
  {
    label: "Mathematics",
    value: "mathematics",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "History",
    value: "history",
  },
  {
    label: "Geography",
    value: "geography",
  },
  {
    label: "Literature",
    value: "literature",
  },
];

const difficulty = ref("");

const difficulties = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
</script>
