<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ ratio: number }>();
</script>

<template>
  <div
    class="text-font-galaxy-slim self-center"
    :style="{
      'font-size': `${props.ratio}%`,
      'margin-bottom': `${props.ratio * 0.15}%`,
    }"
  >
    {{ `\u{0FFFFF}` }}
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/app.scss';
</style>
