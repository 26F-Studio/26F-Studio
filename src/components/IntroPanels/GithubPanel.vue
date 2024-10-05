<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const { screen } = useQuasar();

const panelWidth = computed(() => {
  switch (screen.name) {
    case 'xs':
      return '10rem';
    case 'sm':
      return '15rem';
    case 'md':
      return '20rem';
    case 'lg':
      return '25rem';
    case 'xl':
    default:
      return '30rem';
  }
});
</script>

<template>
  <q-card flat :style="{ borderRadius: '2rem', width: panelWidth }">
    <div class="absolute-bottom-left q-pl-sm">
      <div class="column">
        <div
          class="text-font-redhat-bolder q-pa-sm"
          style="font-size: 2.2rem; line-height: 1rem"
        >
          Check out our
        </div>
        <div class="row"></div>
        <div
          class="text-font-redhat-bolder q-pa-sm"
          style="font-size: 2.2rem; line-height: 3rem"
        >
          GitHub repos
        </div>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss"></style>
