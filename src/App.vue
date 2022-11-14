<template>
  <router-view/>
</template>

<script>
import {useQuasar} from "quasar";
import {defineComponent} from "vue";

import {useProject} from "boot/config";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n({useScope: "global"});

    if ($q.localStorage.has(`${useProject()}.settings.darkMode`)) {
      $q.dark.set($q.localStorage.getItem(`${useProject()}.settings.darkMode`));
    } else {
      $q.dark.set("auto");
    }
    if ($q.localStorage.has(`${useProject()}.settings.language`)) {
      $i18n.locale.value = $q.localStorage.getItem(
        `${useProject()}.settings.language`
      );
    } else {
      $i18n.locale.value = $q.lang.getLocale();
    }

    const i18n = (relativePath) => {
      return $i18n.t("app." + relativePath);
    };

    return {i18n};
  }
});
</script>
