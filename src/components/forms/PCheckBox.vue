<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  disabled?: boolean;
  label?: string;
  modelValue: String;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed({
  get: () => props.modelValue,
  set: (e) => emit("update:modelValue", e),
})

const radioClass = computed(() => {
  return "";
});
</script>
<template>
  <div class="flex">
    <input
      :class="radioClass"
      :disabled="disabled"
      type="checkbox"
      v-model="isChecked" />
    <label v-if="label" class="text-sm text-gray-500 ml-2 dark:text-gray-400">
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply shrink-0 mt-0.5 rounded text-blue-600;
  @apply border-gray-200 dark:border-gray-700 dark:checked:border-blue-500;
  @apply dark:bg-gray-800 dark:checked:bg-blue-500;
  @apply focus:ring-blue-500 dark:focus:ring-offset-gray-800;
}
</style>
