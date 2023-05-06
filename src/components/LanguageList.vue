<template>
  <q-list>
    <q-item
      v-for="langOption in langOptions"
      :key="langOption['value']"
      v-close-popup
      clickable
      @click="setLanguage(langOption['value'])"
    >
      <q-item-section class="text-center">
        {{ langOption["label"] }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import languages from "quasar/lang/index.json";
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { useProject } from "boot/config";

export default defineComponent({
  name: "LanguageList",
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });

    const appLanguages = languages.filter((lang) =>
      ["en-US", "zh-CN"].includes(lang.isoName)
    );
    const langOptions = appLanguages.map((lang) => ({
      label: lang.nativeName,
      value: lang.isoName,
    }));

    const i18n = (relativePath) => {
      return $i18n.t("components.languageList." + relativePath);
    };
    const setLanguage = (lang) => {
      $i18n.locale.value = lang;
      $q.localStorage.set(
        `${useProject()}.settings.language`,
        $i18n.locale.value
      );
    };

    return { langOptions, i18n, setLanguage };
  },
});
</script>
