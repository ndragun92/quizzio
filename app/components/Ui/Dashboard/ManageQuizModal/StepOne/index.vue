<template>
  <form class="space-y-8" @submit.prevent="onSubmit">
    <div class="grid grid-cols-5 gap-4">
      <UiCard class="col-span-3 space-y-4" :level="2">
        <div class="space-y-1">
          <h4 class="font-bold text-xl">Quiz Details</h4>
          <p class="text--secondary">Basic information about your quiz.</p>
        </div>
        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="input--box">
              <label for="quiz-status" class="input--label">Status</label>
              <UiInputSelect id="quiz-status" v-model="status" :options="statuses" />
              <span class="text-red-500 text-sm">{{ errors.status }} </span>
            </div>
            <div class="input--box">
              <label for="quiz-game-mode" class="input--label">Game mode</label>
              <UiInputSelect id="quiz-game-mode" v-model="gameMode" :options="gameModes" />
              <span class="text-red-500 text-sm">{{ errors.gameMode }} </span>
            </div>
          </div>
          <div class="input--box">
            <label for="quiz-title" class="input--label">Quiz Title</label>
            <input
              id="quiz-title"
              v-model.trim="title"
              class="input--text"
              type="text"
              name="quiz-title"
              placeholder="Enter quiz title"
            />
            <span class="text-red-500 text-sm">{{ errors.title }} </span>
          </div>
          <div class="input--box">
            <label for="quiz-description" class="input--label">Description</label>
            <textarea
              id="quiz-description"
              v-model.trim="description"
              class="input--text"
              rows="4"
              name="quiz-description"
              placeholder="Enter quiz description"
            />
            <span class="text-red-500 text-sm">{{ errors.description }} </span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="input--box">
              <label for="quiz-category" class="input--label">Category</label>
              <UiInputSelect id="quiz-category" v-model="category" :options="categories" />
              <span class="text-red-500 text-sm">{{ errors.category }} </span>
            </div>
            <div class="input--box">
              <label for="quiz-difficulty" class="input--label">Difficulty</label>
              <UiInputSelect id="quiz-difficulty" v-model="difficulty" :options="difficulties" />
              <span class="text-red-500 text-sm">{{ errors.difficulty }} </span>
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
            <label for="quiz-time-limit-per-round" class="input--label"
              >Time Limit
              {{ gameMode === EGameMode.SURVIVAL ? "per each round" : "for the whole quiz" }}</label
            >
            <div class="relative">
              <div>
                <Icon
                  name="lucide:clock"
                  size="20"
                  class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <input
                id="quiz-time-limit-per-round"
                v-model.number="timeLimitPerRound"
                class="input--text pl-10! pr-20!"
                type="number"
                name="quiz-time-limit-per-round"
                placeholder="Enter time limit"
              />
              <div>
                <div class="text-primary-500 text-sm absolute right-3 top-1/2 -translate-y-1/2">
                  {{ gameMode === EGameMode.SURVIVAL ? "seconds" : "minutes" }}
                </div>
              </div>
            </div>
            <span class="text-red-500 text-sm">{{ errors["settings.timeLimitPerRound"] }} </span>
          </div>
          <div v-if="gameMode === EGameMode.SURVIVAL" class="input--box">
            <label for="quiz-time-lives" class="input--label">Number of lives</label>
            <div class="relative">
              <div>
                <Icon
                  name="lucide:heart"
                  size="20"
                  class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <input
                id="quiz-time-lives"
                v-model.number="lives"
                class="input--text pl-10! pr-20!"
                type="number"
                name="quiz-time-lives"
                placeholder="Enter number of lives"
              />
              <div>
                <div class="text-primary-500 text-sm absolute right-3 top-1/2 -translate-y-1/2">
                  lives
                </div>
              </div>
            </div>
            <span class="text-red-500 text-sm">{{ errors["settings.lives"] }} </span>
          </div>
          <div v-if="gameMode === EGameMode.CLASSIC" class="input--box">
            <label for="quiz-passing-score-percentage" class="input--label">Passing Score</label>
            <div class="relative">
              <div>
                <Icon
                  name="lucide:check"
                  size="20"
                  class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <input
                id="quiz-passing-score-percentage"
                v-model.number="passingScorePercentage"
                class="input--text pl-10! pr-8!"
                type="number"
                name="quiz-passing-score-percentage"
                placeholder="Enter passing score"
              />
              <div>
                <div class="text-primary-500 text-sm absolute right-3 top-1/2 -translate-y-1/2">
                  %
                </div>
              </div>
            </div>
            <span class="text-red-500 text-sm">
              {{ errors["settings.passingScorePercentage"] }}
            </span>
          </div>
          <div class="space-y-4 mt-4">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="input--label" for="quiz-shuffle-questions">Shuffle Questions</label>
                <p class="text--secondary">Show questions in a random order</p>
              </div>
              <UiInputToggle id="quiz-shuffle-questions" v-model="shuffleQuestions" />
            </div>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="input--label" for="quiz-immediate-results">Immediate Results</label>
                <p class="text--secondary">Show results for each question</p>
              </div>
              <UiInputToggle id="quiz-immediate-results" v-model="immediateResults" />
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="button--default button--compact whitespace-nowrap"
        >
          <span>{{ isSubmitting ? "Submitting..." : "Next" }}</span>
          <Icon name="lucide:chevron-right" size="16" />
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

type Props = {
  form: TQuiz;
};

const props = defineProps<Props>();

const validationSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Quiz title is required"),
    description: z.string().min(1, "Quiz description is required"),
    status: z.string().min(1, "Quiz status is required"),
    category: z.string().min(1, "Quiz category is required"),
    difficulty: z.string().min(1, "Quiz difficulty is required"),
    gameMode: z.string().min(1, "Quiz game mode is required"),
    settings: z.object({
      timeLimitPerRound: z.number().min(1, "Time limit must be at least 1 minute"),
      passingScorePercentage: z.number().min(1, "Passing score must be at least 1%"),
      shuffleQuestions: z.boolean(),
      immediateResults: z.boolean(),
      lives: z.number().min(0, "Lives must be 0 or more"),
    }),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});
const { value: title } = useField(
  "title",
  {},
  {
    initialValue: props.form.title || "",
  }
);

const { value: description } = useField(
  "description",
  {},
  {
    initialValue: props.form.description || "",
  }
);

const { value: status } = useField(
  "status",
  {},
  {
    initialValue: props.form.status || EStatus.PUBLISHED,
  }
);

const { value: category } = useField(
  "category",
  {},
  {
    initialValue: props.form.category || ECategory.GENERAL,
  }
);

const { value: difficulty } = useField(
  "difficulty",
  {},
  {
    initialValue: props.form.difficulty || EDifficulty.EASY,
  }
);

const { value: gameMode } = useField(
  "gameMode",
  {},
  {
    initialValue: props.form.gameMode || EGameMode.SURVIVAL,
  }
);

const { value: timeLimitPerRound } = useField(
  "settings.timeLimitPerRound",
  {},
  {
    initialValue: props.form.settings.timeLimitPerRound || 30,
  }
);

const { value: passingScorePercentage } = useField(
  "settings.passingScorePercentage",
  {},
  {
    initialValue: props.form.settings.passingScorePercentage || 70,
  }
);

const { value: shuffleQuestions } = useField(
  "settings.shuffleQuestions",
  {},
  {
    initialValue: props.form.settings.shuffleQuestions || false,
  }
);

const { value: immediateResults } = useField(
  "settings.immediateResults",
  {},
  {
    initialValue: props.form.settings.immediateResults || false,
  }
);

const { value: lives } = useField(
  "settings.lives",
  {},
  {
    initialValue: props.form.settings.lives || 3,
  }
);

const emit = defineEmits(["next"]);

const onSubmit = handleSubmit((values) => {
  emit("next", values);
});
</script>
