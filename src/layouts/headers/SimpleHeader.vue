<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar class="no-padding">
      <q-btn
        aria-label="Menu"
        flat
        :icon="$q.screen.gt.sm ? 'menu' : undefined"
        no-caps
        no-wrap
        padding="0.7rem"
        square
        to="/home"
        stretch
        @click="onLogoClick">
        <div
          v-if="$q.screen.gt.sm"
          class="text-color-white text-font-galaxy-slim self-center"
          style="font-size: 2rem; margin-bottom: 0.3rem">
          {{ `\u{0FFFFF}  ${i18n("labels.title")}` }}
        </div>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SimpleHeader",
  setup(_, { emit }) {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });

    const i18n = (relativePath) => {
      return $i18n.t("layouts.headers.simple." + relativePath);
    };
    const onLogoClick = (event, go) => {
      if ($q.screen.lt.md) {
        event.preventDefault();
        emit("click:drawer", "left");
      }
      go();
    };
    return { i18n, onLogoClick };
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";
</style>
