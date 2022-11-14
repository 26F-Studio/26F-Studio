<template>
  <q-menu>
    <q-list style="min-width: 100px">
      <q-item tag="label" v-ripple>
        <q-item-section>
          {{ i18n('labels.darkMode') }}
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            color="primary"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            :model-value="$q.dark.isActive"
            @update:model-value="toggleDarkMode"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import {defineComponent} from 'vue';

import {useProject} from "boot/config";

export default defineComponent({
  name: 'SettingsMenu',
  setup() {
    const toggleDarkMode = () => {
      this.$q.dark.toggle();
      this.$q.localStorage.set(`${useProject()}.settings.darkMode`, this.$q.dark.mode);
    };
    const i18n = (relativePath) => {
      return this.$t('components.settingsMenu.' + relativePath);
    }
    return {}
  },
  methods: {}
});
</script>
