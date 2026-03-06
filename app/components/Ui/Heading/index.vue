<template>
  <div class="flex items-center justify-between gap-4">
    <div class="space-y-2">
      <h2 class="font-bold text-2xl">
        <slot name="title" />
      </h2>
      <p
        v-if="$slots.description"
        class="text--secondary"
      >
        <slot name="description" />
      </p>
    </div>
    <div
      v-if="$slots.actions"
      class="flex items-center gap-2"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
