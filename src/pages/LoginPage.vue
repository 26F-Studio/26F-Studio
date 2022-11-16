<template>
  <q-page class="flex column">
    <div
      class="absolute full-width full-height"
      style="height:fit-content">
      <BackgroundImage class="full-width full-height"/>
      <WaveCover
        :end="{ratio: 0.3, control: [0.3, 0.2]}"
        position="right"
        :start="{ratio: 0.4, control: [0.4, 0.8]}"
        svg-class="absolute-right full-width full-height"/>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import WaveCover from "components/WaveCover";

export default defineComponent({
  name: "LoginPage",
  components: {BackgroundImage, WaveCover},
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    return {
      i18n
    };
  }
});
</script>

<style scoped>

</style>
