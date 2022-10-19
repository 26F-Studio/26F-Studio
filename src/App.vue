<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    if ($q.localStorage.has("26fStudio.settings.darkMode")) {
      $q.dark.set($q.localStorage.getItem("26fStudio.settings.darkMode"));
    } else {
      $q.dark.set("auto");
    }
    return { };
  },
  created() {
    if (this.$q.localStorage.has("26fStudio.settings.language")) {
      this.$i18n.locale = this.$q.localStorage.getItem(
        "26fStudio.settings.language"
      );
    } else {
      this.$i18n.locale = this.$q.lang.getLocale();
    }
  },
  methods: {
    i18n(relativePath) {
      return this.$t("app." + relativePath);
    },
  }
})
</script>
