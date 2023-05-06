<template>
  <q-list style="min-width: 100px">
    <q-item v-ripple tag="label">
      <q-item-section>
        {{ i18n("labels.darkMode") }}
      </q-item-section>
      <q-item-section avatar>
        <q-toggle
          :model-value="$q.dark.isActive"
          checked-icon="dark_mode"
          color="primary"
          unchecked-icon="light_mode"
          @update:model-value="toggleDarkMode"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { useProject } from "boot/config";

export default defineComponent({
  name: "SettingList",
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });
    const i18n = (relativePath) => {
      return $i18n.t("components.settingList." + relativePath);
    };
    const toggleDarkMode = () => {
      $q.dark.toggle();
      $q.localStorage.set(`${useProject()}.settings.darkMode`, $q.dark.mode);
    };
    return { i18n, toggleDarkMode };
  },
  methods: {},
});
</script>
