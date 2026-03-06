<template>
  <form class="space-y-8" @submit.prevent="onSubmit">
    <UiCard :level="2" class="space-y-4">
      <div class="space-y-1">
        <h4 class="font-bold text-xl">Quiz Questions</h4>
        <p class="text--secondary">Create and manage quiz questions for your quiz.</p>
        <div class="space-y-2">
          <pre
            class="h-52 overflow-auto p-8 rounded bg-primary-900 border border-primary-800 text-sm"
            >{{ errors }}</pre
          >
          <pre
            class="h-52 overflow-auto p-8 rounded bg-primary-900 border border-primary-800 text-sm"
            >{{ questions }}</pre
          >
        </div>
      </div>
      <UiCard v-for="(question, index) in questions" :key="index" :level="3" class="space-y-4">
        <div class="flex items-center gap-4 justify-between">
          <h5 class="font-semibold text-lg">Question {{ index + 1 }}</h5>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <label for="points" class="input--label">Points:</label>
              <input
                id="points"
                v-model.number="questions[index]!.points"
                type="number"
                class="input--text bg-primary-900! w-20!"
                placeholder="XX"
              />
            </div>
            <div class="flex items-center gap-2">
              <label for="type" class="input--label sr-only">Type:</label>
              <UiInputSelect
                v-model="questions[index]!.type"
                input-class="bg-primary-900! w-auto!"
                :options="questionTypeOptions"
              />
            </div>
            <div>
              <button
                type="button"
                class="button--default-outline button--icon text-red-500! border-transparent!"
              >
                <Icon name="lucide:trash" size="20" />
                <span class="sr-only">Delete question</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div class="input--box">
            <label for="input--text" class="input--label">Question Text</label>
            <textarea
              id="input--text"
              v-model="questions[index]!.text"
              class="input--text bg-primary-900! h-24!"
              placeholder="Type your question here..."
            ></textarea>
          </div>
        </div>
        <div class="input--box">
          <label for="input--text" class="input--label">Answer Options</label>
          <component
            :is="getQuestionComponent(questions[index]!.type)"
            :question="questions[index]"
          />
        </div>
      </UiCard>
    </UiCard>
    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="button--primary button--compact whitespace-nowrap"
          @click="emit('back')"
        >
          <Icon name="lucide:chevron-left" size="16" />
          <span>Prev</span>
        </button>
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
import { EQuestionType } from "~~/shared/utils/quiz.db";

const validationSchema = toTypedSchema(
  z.object({
    questions: z
      .array(
        z.object({
          text: z.string().min(1, "Question text is required"),
          type: z.nativeEnum(EQuestionType, {
            errorMap: () => ({ message: "Question type is required" }),
          }),
          options: z.array(z.string()).optional(),
          leftOptions: z.array(z.string()).optional(),
          rightOptions: z.array(z.string()).optional(),
          src: z.string().optional(),
          correctAnswer: z.union([z.string(), z.boolean()]).optional(),
          points: z.number().min(0, "Points must be a positive number").optional(),
          doublePoints: z.boolean().optional(),
        })
      )
      .min(1, "At least one question is required"),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});
const { value: questions } = useField("questions", undefined, {
  initialValue: [
    {
      text: "",
      type: EQuestionType.MULTIPLE_CHOICE,
      options: [],
      leftOptions: [],
      rightOptions: [],
      src: "",
      correctAnswer: "",
      points: 10,
      doublePoints: false,
    },
  ],
});

const emit = defineEmits(["back", "next"]);

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted with values:", values);
});

const getQuestionComponent = (type: EQuestionType) => {
  switch (type) {
    case EQuestionType.MULTIPLE_CHOICE:
      return resolveComponent("UiQuizRoundTypeMultipleChoice");
    case EQuestionType.TRUE_FALSE:
      return resolveComponent("UiQuizRoundTypeTrueFalse");
    case EQuestionType.SHORT_ANSWER:
      return resolveComponent("UiQuizRoundTypeShortAnswer");
    case EQuestionType.FILL_IN_THE_BLANK:
      return resolveComponent("UiQuizRoundTypeFillInTheBlank");
    case EQuestionType.MATCHING:
      return resolveComponent("UiQuizRoundTypeMatching");
    case EQuestionType.ORDERING:
      return resolveComponent("UiQuizRoundTypeOrdering");
    case EQuestionType.IMAGE_BASED:
      return resolveComponent("UiQuizRoundTypeImageBased");
    case EQuestionType.AUDIO_BASED:
      return resolveComponent("UiQuizRoundTypeAudioBased");
    case EQuestionType.VIDEO_BASED:
      return resolveComponent("UiQuizRoundTypeVideoBased");
    case EQuestionType.CODE_SNIPPET:
      return resolveComponent("UiQuizRoundTypeCodeSnippet");
    case EQuestionType.DRAG_AND_DROP:
      return resolveComponent("UiQuizRoundTypeDragAndDrop");
    case EQuestionType.GUESS_THE_NUMBER:
      return resolveComponent("UiQuizRoundTypeGuessTheNumber");
    case EQuestionType.MEMORIZE_THE_ORDER:
      return resolveComponent("UiQuizRoundTypeMemorizeTheOrder");
    case EQuestionType.MULTIPLE_CHOICE_SHARED_ANSWERS:
      return resolveComponent("UiQuizRoundTypeMultipleChoiceSharedAnswers");
    default:
      return null;
  }
};
</script>
