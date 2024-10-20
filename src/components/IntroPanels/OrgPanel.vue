<script setup lang="ts">
// import LogoText from 'components/LogoText.vue';
</script>

<template>
  <q-card class="org-panel" flat style="border-radius: 2rem">
    <div class="absolute-top-left q-pl-md" style="width: 100%">
      <div
        class="row items-center q-gutter-x-xs q-pa-sm"
        style="width: inherit"
      >
        <div class="logo-text self-center">
          {{ `\u{0FFFFF}` }}
        </div>
        <!--        <LogoText :ratio="100" />-->
        <div class="text-font-redhat-bolder" style="font-size: 2.3rem">
          26F Studio
        </div>
      </div>
    </div>
    <div class="absolute-bottom-right q-pa-sm">
      <q-icon name="r_arrow_outward" size="5rem" style="font-weight: bolder" />
    </div>
    <img alt="?playOpenly.svg?" src="~assets/images/playOpenly.svg" />
  </q-card>
</template>

<style scoped lang="scss">
@import 'src/css/app.scss';

.org-panel {
  border-radius: 2rem;
  container-name: org-panel-container;
  container-type: normal;
}

.logo-text {
  @extend .text-font-galaxy-slim;
  font-size: 2cqw;
}
</style>
