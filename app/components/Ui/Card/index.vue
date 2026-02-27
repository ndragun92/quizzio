<template>
  <div
    class="border border-primary-800 rounded-lg p-5"
    :class="{
      'bg-primary-900': level === 1,
      'bg-primary-800/25': level === 2,
      'border-primary-700 hover:border-primary-600 transition-colors': hover,
      'border-dashed': placeholder,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  level?: 1 | 2;
  hover?: boolean;
  placeholder?: boolean;
};

withDefaults(defineProps<Props>(), {
  level: 1,
  hover: false,
});
</script>
