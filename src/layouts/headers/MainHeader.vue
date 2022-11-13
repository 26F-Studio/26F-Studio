<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar style="background: linear-gradient(rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.0))">
      <q-btn
        dense
        flat
        :icon="$q.screen.xs ? 'menu' : undefined"
        no-caps
        no-wrap
        :size="$q.screen.gt.sm ? '1.5vw' : undefined"
        square
        to="/home"
        stretch
        @click="onLogoClick">
        <div
          v-if="$q.screen.gt.xs"
          class="title-text self-center"
          :class="$q.screen.gt.sm ? 'q-mb-sm' : 'q-mb-xs'"
          style="font-size: 3vw">
          {{ '\u{0FFFFF}  ' + i18n("labels.title") }}
        </div>
      </q-btn>
      <q-space/>
      <q-btn
        v-show="$q.screen.gt.xs"
        v-for="(button, index) in buttons"
        :key="index"
        class="button-text"
        flat
        :label="i18n(`labels.${button}`)"
        no-caps
        :padding="$q.screen.lt.md ? 'sm' : undefined"
        size="1vw"
        stretch
        :to="`/${button}`"/>
      <ProfileButton size="1vw"/>
      <q-btn
        v-show="$q.screen.gt.xs"
        class="q-ml-sm q-ml-md-xs"
        flat
        icon="language"
        round
        size="1vw">
        <LanguagesMenu/>
      </q-btn>
      <q-btn
        v-show="$q.screen.gt.xs"
        class="q-ml-sm q-ml-md-xs"
        flat
        icon="settings"
        round
        size="1vw">
        <SettingsMenu/>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import {defineComponent} from "vue";
import LanguagesMenu from "components/LanguagesMenu";
import ProfileButton from "components/ProfileButton";
import SettingsMenu from "components/SettingsMenu";

export default defineComponent({
  name: "MainHeader",
  components: {LanguagesMenu, ProfileButton, SettingsMenu},
  setup() {
    const buttons = [
      "products",
      "support",
      "about",
      "contact"
    ];
    return {buttons};
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.main." + relativePath);
    },
    onLogoClick(event, go) {
      if (this.$q.screen.lt.md) {
        event.preventDefault();
        this.$emit('click:drawer', 'left');
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
  font-weight: 700;
}

.title-text {
  font-family: 'galaxy-sans', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
  font-weight: 206;
  -webkit-font-smoothing: antialiased;
}
</style>
