<template>
  <q-page class="flex column">
    <div
      class="absolute full-width full-height"
      style="height:fit-content">
      <q-resize-observer @resize="onResize"/>
      <BackgroundImage class="full-width full-height"/>
      <WaveCover
        class="absolute-right full-width full-height"
        :end="{ratio: 0.3, control: [0.3, 0.2]}"
        :height="waveHeight"
        position="right"
        :start="{ratio: 0.4, control: [0.4, 0.8]}"
        :width="waveWidth"/>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import WaveCover from "components/WaveCover";

export default defineComponent({
  name: "LoginPage",
  components: {BackgroundImage, WaveCover},
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const waveHeight = ref(1920);
    const waveWidth = ref(1080);

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    const onResize = (size) => {
      waveHeight.value = size.height;
      waveWidth.value = size.width;
    };
    return {
      waveHeight,
      waveWidth,
      i18n,
      onResize
    };
  }
});
</script>

<style scoped>

</style>
