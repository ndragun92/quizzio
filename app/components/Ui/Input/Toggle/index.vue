<template>
  <div class="input--box">
    <label class="inline-flex items-center cursor-pointer">
      <input
        v-model="model"
        type="checkbox"
        class="sr-only peer"
      >
      <span
        class="block relative w-9 h-5 bg-primary-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ascend-purple rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-ascend-purple-dark"
      />
      <span class="select-none ms-3 input--label"><slot /></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel({
  type: Boolean,
  default: false,
})
</script>
