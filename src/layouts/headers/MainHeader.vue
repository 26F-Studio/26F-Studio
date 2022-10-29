<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar>
      <q-btn
        class="title-text"
        flat
        icon="svguse:svgs/26f-studio.svg#logo"
        :label="$q.screen.lt.sm ? undefined : i18n('labels.title')"
        no-caps
        no-wrap
        size="1.5vw"
        square
        to="/home"
        @click="onLogoClick"/>
      <q-space/>
      <q-btn
        v-for="(button, index) in buttons"
        :key="index"
        class="button-text"
        flat
        :label="i18n(`labels.${button}`)"
        no-caps
        size="1vw"
        stretch
        :to="`/${button}`"/>
      <q-btn flat icon="language" stretch>
        <LanguagesMenu/>
      </q-btn>
      <q-btn flat icon="settings" stretch>
        <SettingsMenu/>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import {defineComponent} from "vue";
import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";

export default defineComponent({
  name: "MainHeader",
  components: {LanguagesMenu, SettingsMenu},
  setup() {
    const buttons = [
      "products",
      "support",
      "about",
      "contact",
      "sign"
    ];
    return {buttons};
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.main." + relativePath);
    },
    onLogoClick(event, go) {
      if (this.$q.screen.lt.sm) {
        event.preventDefault();
      }
      go();
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.button-text {
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.title-text {
  @extend .button-text;
  font-weight: 700;
}
</style>
