<template>
  <q-header class="bg-transparent" style="height: 0">
    <q-toolbar>
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
    </q-toolbar>
  </q-header>
</template>

<script>
import {useQuasar} from "quasar";
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "SimpleHeader",
  setup(_, {emit}) {
    const $q = useQuasar();
    const $i18n = useI18n({useScope: "global"});

    const i18n = (relativePath) => {
      return $i18n.t("layouts.headers.simple." + relativePath);
    };
    const onLogoClick = (event, go) => {
      if ($q.screen.lt.md) {
        event.preventDefault();
        emit('click:drawer', 'left');
      }
      go();
    };
    return {i18n, onLogoClick};
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
