<template>
  <div class="relative">
    <div>
      <Icon
        :name="icon"
        size="20"
        class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
      />
    </div>
    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      :required="required"
      :class="`input--text appearance-none px-10! ${inputClass}`"
    >
      <option
        v-if="!hideDefaultOption"
        value=""
        class="bg-primary-950"
      >
        {{ placeholder }}
      </option>
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
  id?: string
  options: { label: string, value: string }[]
  placeholder?: string
  icon?: string
  inputClass?: string
  hideDefaultOption?: boolean
  disabled?: boolean
  required?: boolean
}

const model = defineModel<string>()

withDefaults(defineProps<Props>(), {
  id: '',
  placeholder: 'Select an option',
  icon: 'lucide:filter',
  inputClass: '',
  hideDefaultOption: false,
  disabled: false,
  required: false,
})
</script>
