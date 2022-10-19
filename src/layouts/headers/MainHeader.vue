<template>
  <q-header class="bg-transparent text-light">
    <q-toolbar>
      <q-avatar icon="svguse:svgs/26f-studio.svg#logo"/>
      <q-toolbar-title>
        {{ i18n("labels.title") }}
      </q-toolbar-title>
      <q-space />
      <q-btn
        v-for="(type, index) in buttons"
        :key="index"
        flat
        :label="i18n(`labels.${type}`)"
        no-caps
        stretch
        :to="`/${type}`" />
      <q-btn flat icon="language" stretch>
        <LanguagesMenu />
      </q-btn>
      <q-btn flat icon="settings" stretch>
        <SettingsMenu />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from "vue";
import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";

export default defineComponent({
  name: "MainHeader",
  components: { LanguagesMenu, SettingsMenu },
  setup() {
    const buttons = [
      "products",
      "support",
      "about",
      "contact",
      "sign"
    ];
    return { buttons };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.main." + relativePath);
    }
  }
});
</script>
