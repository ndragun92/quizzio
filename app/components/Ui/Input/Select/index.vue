<template>
  <div class="relative">
    <div>
      <Icon
        :name="icon"
        size="20"
        class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
      />
    </div>
    <select :id="id" v-model="model" class="input--text appearance-none px-10!">
      <option value="" class="bg-primary-950">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        class="bg-primary-950"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div>
      <Icon
        name="lucide:chevron-down"
        size="20"
        class="text-primary-500 absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  id?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  icon?: string;
};

const model = defineModel<string>();

withDefaults(defineProps<Props>(), {
  id: "",
  placeholder: "Select an option",
  icon: "lucide:filter",
});
</script>
