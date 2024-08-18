<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ rem: number }>();
</script>

<template>
  <div
    class="text-font-galaxy-slim self-center"
    :style="{
      'font-size': `${props.rem}rem`,
      'margin-bottom': `${props.rem * 0.15}rem`,
    }"
  >
    {{ `\u{0FFFFF}` }}
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/app.scss';
</style>
