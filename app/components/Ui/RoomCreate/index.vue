<template>
  <div class="spacing--default">
    <div class="text-center spacing--small">
      <h2 class="h2">Create a Room</h2>
      <p class="text--secondary">Set up your game</p>
    </div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="form--container">
        <div class="input--box">
          <label for="room-name" class="input--label">Room Name</label>
          <input
            id="room-name"
            v-model.trim="name"
            type="text"
            placeholder="Enter room name..."
            class="input--text"
          />
          <span class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
        <div class="input--box">
          <label class="input--label">Word Pack</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'normal',
              }"
              @click="wordPack = 'normal'"
            >
              Normal
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'funny',
              }"
              @click="wordPack = 'funny'"
            >
              Funny
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'quotes',
              }"
              @click="wordPack = 'quotes'"
            >
              Quotes
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'code',
              }"
              @click="wordPack = 'code'"
            >
              Code
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'education',
              }"
              @click="wordPack = 'education'"
            >
              Education
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'music',
              }"
              @click="wordPack = 'music'"
            >
              Music
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'movies',
              }"
              @click="wordPack = 'movies'"
            >
              Movies
            </button>
            <button
              type="button"
              class="button--option"
              :class="{
                'button--option-selected': wordPack === 'long',
              }"
              @click="wordPack = 'long'"
            >
              Long sentences
            </button>
          </div>
          <span class="text-red-500 text-sm">{{ errors.wordPack }}</span>
        </div>
        <UiInputToggle v-model="isPrivate"> Private Room </UiInputToggle>
        <div v-if="isPrivate" class="input--box">
          <label for="room-password" class="input--label">Password</label>
          <input
            id="room-password"
            v-model.trim="password"
            type="password"
            placeholder="Leave empty for public rooms"
            class="input--text"
          />
          <span class="text-red-500 text-sm">{{ errors.password }}</span>
        </div>
        <div class="flex items-center gap-4">
          <button type="button" class="button--secondary flex-1" @click="emit('reset')">
            Back
          </button>
          <button type="submit" class="button--default flex-2" :disabled="isSubmitting">
            <span>{{ isSubmitting ? "Loading..." : "Create Room" }}</span>
            <Icon name="mdi:arrow-right" size="18" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const validationSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1, "Username is required"),
      password: z.string().optional(),
      wordPack: z.enum([
        "normal",
        "funny",
        "quotes",
        "code",
        "education",
        "music",
        "movies",
        "long",
      ]),
      isPrivate: z.boolean(),
    })
    .superRefine((values, ctx) => {
      if (values.isPrivate) {
        if (!values.password || values.password.length < 6) {
          ctx.addIssue({
            path: ["password"],
            code: z.ZodIssueCode.custom,
            message: "Password is required and must be at least 6 characters",
          });
        }
      }
    })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});

const { value: name } = useField(
  "name",
  {},
  {
    initialValue: "",
  }
);

const { value: password } = useField(
  "password",
  {},
  {
    initialValue: "",
  }
);

const { value: wordPack } = useField(
  "wordPack",
  {},
  {
    initialValue: "normal",
  }
);

const { value: isPrivate } = useField(
  "isPrivate",
  {},
  {
    initialValue: false,
  }
);

const emit = defineEmits(["reset"]);

const { onCreateRoom } = useRoom();
const { nickname, guestDisplayName } = useUser();

const onSubmit = handleSubmit(async (values) => {
  onCreateRoom({
    nickname: nickname.value,
    guestDisplayName: guestDisplayName.value,
    room: values as Pick<TRoom, "name" | "isPrivate" | "wordPack" | "password">,
  });
});
</script>
