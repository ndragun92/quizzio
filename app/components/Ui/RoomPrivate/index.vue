<template>
  <div class="spacing--default">
    <div class="text-center spacing--small">
      <h2 class="h2">Join a Room by Code</h2>
      <p class="text--secondary">Fill in the details below to join a room.</p>
    </div>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="form--container">
        <div class="input--box">
          <label for="room-name" class="input--label">Room Code</label>
          <input
            id="room-name"
            v-model.trim="code"
            type="text"
            placeholder="Enter room code..."
            class="input--text"
          />
          <span class="text-red-500 text-sm">{{ errors.code }}</span>
        </div>

        <div class="input--box">
          <label for="room-password" class="input--label">Password (For Private Rooms)</label>
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
            <span>{{ isSubmitting ? "Loading..." : "Join Room" }}</span>
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
  z.object({
    code: z.string().min(1, "Room code is required"),
    password: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().min(6, "Password must be at least 6 characters").optional()
    ),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
});

const { value: code } = useField(
  "code",
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

const emit = defineEmits(["reset"]);

const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  let redirectUrl = `/game/rooms/${values.code}`;
  if (values.password) {
    redirectUrl += `?password=${encodeURIComponent(values.password)}`;
  }
  router.push(redirectUrl);
});
</script>
