<script lang="ts">
export type ButtonType = "primary" | "secondary" | "positive" | "negative";
</script>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  dense?: boolean;
  disabled?: boolean;
  outline?: boolean;
  type?: ButtonType;
}

const props = withDefaults(defineProps<Props>(), {
  dense: false,
  disabled: false,
  outline: false,
  type: "primary"
});

const buttonClass = computed(() => {
  let classString = props.type + (props.outline ? "-outline" : "-normal");
  if (props.dense) {
    classString += " dense";
  }
  return classString;
});
</script>
<template>
  <button :class="buttonClass" :disabled="disabled" type="button">
    Button
  </button>
</template>

<style scoped lang="scss">
@mixin roundedButton($dense: false) {
  @apply inline-flex justify-center items-center gap-2;
  @apply font-semibold text-sm;
  @apply rounded-full transition-all;
  @apply focus:outline-none focus:ring-4;
  @if $dense {
    @apply py-2 px-3;
  } @else {
    @apply py-3 px-4;
  }
}

button {
  @include roundedButton;
}

.dense {
  @include roundedButton($dense: true);
}

.primary {
  &-normal {
    @apply text-white border border-transparent;
    @apply bg-purple-500 hover:bg-purple-600 focus:ring-purple-200;
  }

  &-outline {
    @apply text-purple-500 border-2 border-purple-500;
    @apply hover:text-white hover:bg-purple-600 focus:ring-purple-200;
  }
}

.secondary {
  &-normal {
    @apply text-white border border-transparent;
    @apply bg-zinc-600 hover:bg-zinc-800 focus:ring-zinc-200;
  }

  &-outline {
    @apply text-zinc-600 border-2 border-zinc-600;
    @apply hover:text-white hover:bg-zinc-800 focus:ring-zinc-200;
  }
}

.positive {
  &-normal {
    @apply text-white border border-transparent;
    @apply bg-blue-500 hover:bg-blue-600 focus:ring-blue-200;
  }

  &-outline {
    @apply text-blue-500 border-2 border-blue-500;
    @apply hover:text-white hover:bg-blue-600 focus:ring-blue-200;
  }
}

.negative {
  &-normal {
    @apply text-white border border-transparent;
    @apply bg-red-500 hover:bg-red-600 focus:ring-red-200;
  }

  &-outline {
    @apply text-red-500 border-2 border-red-500;
    @apply hover:text-white hover:bg-red-600 focus:ring-red-200;
  }
}
</style>
