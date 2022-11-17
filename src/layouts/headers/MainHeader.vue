<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar class="aero-toolbar">
      <q-btn
        aria-label="Menu"
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
          style="font-size: 3vw">
          {{ `\u{0FFFFF}  ${i18n("labels.title")}` }}
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
      <ProfileButton/>
      <q-btn
        v-show="$q.screen.gt.xs"
        aria-label="Language"
        class="q-ml-sm q-ml-md-xs"
        flat
        icon="language"
        round
        :size="$q.screen.gt.sm ? '1vw' : 'md'">
        <LanguagesMenu/>
      </q-btn>
      <q-btn
        v-show="$q.screen.gt.xs"
        class="q-ml-sm q-ml-md-xs"
        aria-label="Settings"
        flat
        icon="settings"
        round
        :size="$q.screen.gt.sm ? '1vw' : 'md'">
        <SettingsMenu/>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import {useQuasar} from "quasar";
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

import LanguagesMenu from "components/LanguagesMenu";
import ProfileButton from "components/ProfileButton";
import SettingsMenu from "components/SettingsMenu";

export default defineComponent({
  name: "MainHeader",
  components: {LanguagesMenu, ProfileButton, SettingsMenu},
  setup(_, {emit}) {
    const $q = useQuasar();
    const $i18n = useI18n({useScope: "global"});
    const buttons = [
      "products",
      "support",
      "about",
      "contact"
    ];
    const i18n = (relativePath) => {
      return $i18n.t("layouts.headers.main." + relativePath);
    };
    const onLogoClick = (event, go) => {
      if ($q.screen.lt.md) {
        event.preventDefault();
        emit('click:drawer', 'left');
      }
      go();
    };
    return {buttons, i18n, onLogoClick};
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.aero-toolbar {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(25px);
}

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
