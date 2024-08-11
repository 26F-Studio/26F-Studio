<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useSettingsStore } from 'stores/settings';
import { createI18n } from 'utils/common';

const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());

const i18n = createI18n(useI18n(), 'layouts.headers.MainHeader.');
</script>

<template>
  <q-header class="bg-transparent text-white">
    <q-toolbar>
      <q-btn
        aria-label="Menu"
        flat
        no-caps
        no-wrap
        to="/home"
        stretch
      >
        <div
          class="text-color-white text-font-galaxy-slim self-center"
          style="font-size: 2rem; margin-bottom: 0.3rem"
        >
          {{ `\u{0FFFFF}` }}
        </div>
      </q-btn>
      <q-toolbar-title>
      </q-toolbar-title>
      <q-btn
        :icon="darkModeColorAndIcon.icon"
        :text-color="darkModeColorAndIcon.color"
        flat
        round
        @click="toggleDarkMode"
      >
        <q-tooltip>
          {{ i18n('labels.toggleDarkMode') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
@import 'src/css/app.scss';
</style>
