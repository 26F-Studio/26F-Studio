<template>
  <q-scroll-area
    ref="scrollArea"
    class="fullscreen"
    :dark="$q.dark.isActive"
    :thumb-style="thumbStyle">
    <router-view @scrollTo="scrollTo" />
  </q-scroll-area>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useProject } from "boot/config";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });

    const thumbStyle = {
      backgroundColor: "#a0a0a5",
      borderRadius: "8px",
      boxShadow: "0 0 8px rgba(4, 0, 29, 0.25)",
      opacity: "0.75",
      right: "4px",
      width: "8px",
      zIndex: "100"
    };

    const scrollArea = ref(null);

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

    const scrollTo = ({ percentage, duration }) => {
      scrollArea.value.setScrollPercentage("vertical", percentage, duration);
    };

    return {
      thumbStyle,
      scrollArea,
      i18n,
      scrollTo
    };
  }
});
</script>
