<script setup lang="ts">
import LogoText from 'components/LogoText.vue';
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
      return '20rem';
  }
});
</script>

<template>
  <q-card flat :style="{ borderRadius: '2rem', width: panelWidth }">
    <div class="absolute-left">
      <LogoText :rem="6" style="padding-top: 2rem" />
    </div>
    <img alt="?playOpenly.svg?" src="~assets/images/26f.svg" />
  </q-card>
</template>

<style scoped lang="scss"></style>
