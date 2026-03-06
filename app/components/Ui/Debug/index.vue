<template>
  <slot v-if="debugEnabled" />
</template>

<script lang="ts" setup>
const {
  public: { debugEnabled },
} = useRuntimeConfig()
</script>
