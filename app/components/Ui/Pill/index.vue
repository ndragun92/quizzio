<template>
  <div class="bg-primary-800 inline-flex px-4 py-1 rounded-full text-sm items-center gap-2">
    <Icon
      v-if="icon"
      :name="icon"
      size="22"
      class="text-ascend-purple"
    />
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  icon?: string
}

defineProps<Props>()
</script>
