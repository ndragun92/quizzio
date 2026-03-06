<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'protected',
  layout: 'creator',
})
</script>
