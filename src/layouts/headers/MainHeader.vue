<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar class="aero-toolbar no-padding">
      <q-btn
        aria-label="Menu"
        flat
        :icon="$q.screen.gt.sm ? undefined : 'menu'"
        no-caps
        no-wrap
        padding="0.7rem"
        square
        to="/home"
        stretch
        @click="onLogoClick">
        <div
          v-if="$q.screen.gt.sm"
          class="title-text self-center"
          style="font-size: 2rem; margin-bottom: 0.3rem">
          {{ `\u{0FFFFF}  ${i18n("labels.title")}` }}
        </div>
      </q-btn>
      <q-btn
        v-if="!$q.screen.gt.sm"
        class="absolute-center"
        :class="$q.screen.gt.xs ? 'full-height' : undefined"
        aria-label="Home"
        flat
        no-caps
        no-wrap
        :round="!$q.screen.gt.xs"
        :size="$q.screen.gt.xs ? undefined : 'md'"
        :square="$q.screen.gt.xs"
        to="/home">
        <div
          class="title-text self-center"
          style="font-size: 1.75rem; margin-bottom: 0.25rem">
          {{ "\u{0FFFFF}" + ($q.screen.gt.xs ? `  ${i18n("labels.title")}` : "") }}
        </div>
      </q-btn>
      <q-space />
      <q-btn-dropdown
        v-show="$q.screen.gt.sm"
        v-for="(list, button, index) in dropdownButtons"
        :key="index"
        class="normal-text-white"
        flat
        :label="i18n(`labels.${button}`)"
        no-caps
        size="0.75rem"
        stretch
        style="font-weight: 700">
        <q-list>
          <q-item
            v-for="(item, index) in list"
            :key="index"
            v-close-popup
            :to="item.to"
            class="q-py-lg"
            clickable>
            <q-item-section>
              <q-item-label style="font-weight: 400; font-size: 0.75vw">
                {{ i18n(`labels.${item.label}`) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <ProfileButton class="q-ml-sm q-mr-sm q-mr-md-none" />
      <q-btn
        v-show="$q.screen.gt.sm"
        class="q-ml-sm"
        aria-label="Language"
        flat
        icon="language"
        round
        :size="$q.screen.gt.sm ? '0.7rem' : 'md'">
        <q-menu anchor="bottom middle" fit self="top middle">
          <LanguageList />
        </q-menu>
      </q-btn>
      <q-btn
        v-show="$q.screen.gt.sm"
        class="q-mx-sm"
        aria-label="Settings"
        flat
        icon="settings"
        round
        :size="$q.screen.gt.sm ? '0.7rem' : 'md'">
        <q-menu anchor="bottom middle" self="top middle">
          <SettingList />
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import ProfileButton from "components/ProfileButton";
import LanguageList from "components/LanguageList.vue";
import SettingList from "components/SettingList.vue";

export default defineComponent({
  name: "MainHeader",
  components: { ProfileButton, LanguageList, SettingList },
  setup(_, { emit }) {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });
    const dropdownButtons = {
      products: [{
        label: "techminoGalaxy",
        to: "/products/techmino-galaxy"
      }, {
        label: "techmino",
        to: "/products/techmino"
      }, {
        label: "quatrack",
        to: "/products/quatrack"
      }, {
        label: "miscellaneous",
        to: "/products/miscellaneous"
      }],
      support: [{
        label: "accountSettings",
        to: "/account/settings"
      }, {
        label: "gameManuals",
        to: "/support/manuals"
      }, {
        label: "glossary",
        to: "/support/glossary"
      }, {
        label: "utilities",
        to: "/support/utilities"
      }],
      about: [{
        label: "whoWeAre",
        to: "/about/us"
      }, {
        label: "brandingGuidelines",
        to: "/about/guidelines"
      }],
      contact: [{
        label: "joinUs",
        to: "/contact/join"
      }]
    };
    const i18n = (relativePath) => {
      return $i18n.t("layouts.headers.main." + relativePath);
    };
    const onLogoClick = (event, go) => {
      if ($q.screen.gt.sm) {
        go();
      } else {
        event.preventDefault();
        emit("click:drawer", "left");
      }
    };
    return { dropdownButtons, i18n, onLogoClick };
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.aero-toolbar {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(25px);
}

.title-text {
  font-family: 'galaxy-sans', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
  font-weight: 206;
  -webkit-font-smoothing: antialiased;
}
</style>
