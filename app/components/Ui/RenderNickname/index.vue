<template>
  <span v-if="guestDisplayName" class="font-semibold"
    >{{ guestDisplayName }}
    <sup class="text-xs text-neutral-400 fonr-normal">{{ nickname }}</sup></span
  >
  <span v-else>{{ nickname }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  nickname: string;
  guestDisplayName?: string;
}>();
</script>
