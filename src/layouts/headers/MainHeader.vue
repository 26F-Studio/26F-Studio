<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import NavigationDropdown, {
  NavigationGroup,
} from 'components/NavigationDropdown.vue';
import { useSettingsStore } from 'stores/settings';
import { createI18n } from 'utils/common';
import LogoText from 'components/LogoText.vue';

const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());

const i18n = createI18n(useI18n(), 'layouts.headers.MainHeader.');

const navigationGroups: NavigationGroup[] = [
  {
    label: i18n('navigationGroups.games.label'),
    items: [
      {
        label: i18n('navigationGroups.games.items.techminoGalaxy'),
        href: '/games/techmino-galaxy',
      },
      {
        label: i18n('navigationGroups.games.items.techmino'),
        href: '/games/techmino',
      },
      {
        label: i18n('navigationGroups.games.items.quatrack'),
        href: '/games/quatrack',
      },
      {
        label: i18n('navigationGroups.games.items.more'),
        href: '/games/more',
      },
    ],
  },
  {
    label: i18n('navigationGroups.resources.label'),
    items: [
      {
        label: i18n('navigationGroups.resources.items.glossary'),
        href: '/resources/glossary',
      },
    ],
  },
  {
    label: i18n('navigationGroups.utilities.label'),
    items: [],
  },
  {
    label: i18n('navigationGroups.aboutUs.label'),
    items: [
      {
        label: i18n('navigationGroups.aboutUs.items.github'),
        href: 'https://github.com/26F-Studio',
      },
    ],
  },
];
</script>

<template>
  <q-header
    class="bg-transparent"
    :class="{
      'text-black': !$q.dark.isActive,
    }"
  >
    <q-toolbar>
      <q-btn aria-label="Home" flat no-caps no-wrap to="/" stretch>
        <LogoText :rem="2" />
      </q-btn>
      <q-space />
      <NavigationDropdown
        v-for="(navigation, index) in navigationGroups"
        :key="index"
        :label="navigation.label"
        :items="navigation.items"
      />
      <q-btn flat icon="search" stretch />
      <q-btn
        flat
        stretch
        :icon="darkModeColorAndIcon.icon"
        :text-color="darkModeColorAndIcon.color"
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
