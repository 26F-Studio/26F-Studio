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
      return '60rem';
  }
});
</script>

<template>
  <q-card flat :style="{borderRadius: '2rem', width: panelWidth}">
    <div class="absolute-top-left q-pl-md">
      <div class="row items-center q-gutter-x-xs q-pa-sm">
        <LogoText :rem="3.5" />
        <div class="text-font-redhat-bolder" style="font-size: 2.3rem">
          <!--          26F Studio-->
          {{ screen.name }}
        </div>
      </div>
    </div>
    <div class="absolute-bottom-right q-pa-sm">
      <q-icon name="r_arrow_outward" size="5rem" style="font-weight: bolder" />
    </div>
    <img
      alt="?playOpenly.svg?"
      src="~assets/images/playOpenly.svg"
    />
  </q-card>
</template>

<style scoped lang="scss"></style>
