<template>
  <q-page class="flex column">
    <div
      class="absolute full-width full-height"
      style="height:fit-content">
      <q-resize-observer @resize="onResize"/>
      <q-img
        class="full-width full-height"
        :src="require(`assets/background.png`)"
        :srcset="backGroundSrcSet"
        style="min-height: 540px"/>
      <WaveCover
        class="absolute-right full-width full-height"
        :end="{ratio: 0.3, control: [0.3, 0.2]}"
        :height="waveHeight"
        position="right"
        :start="{ratio: 0.4, control: [0.4, 0.8]}"
        :width="waveWidth"/>
      <!--
      <video
        class="absolute-center full-width q-px-xl"
        autoplay
        muted
        playsinline>
        <source src="videos/techmino_galaxy.mov" type="video/mp4; codecs='hvc1'">
        <source src="videos/techmino_galaxy.webm" type="video/webm">
      </video>
      -->
    </div>
  </q-page>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";

import WaveCover from "components/WaveCover";

export default defineComponent({
  name: "LoginPage",
  components: {WaveCover},
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n({useScope: "global"});

    const backGroundSrcSet = computed(() => {
      let result = "";
      for (const [key, value] of Object.entries($q.screen.sizes)) {
        result += `${require(`assets/background-${key}.webp`)} ${value}w,`;
      }
      result += `${require(`assets/background.webp`)} 3360w`;
      return result;
    });
    const backGroundSizes = computed(() => {
      let result = "";
      for (const value of Object.values($q.screen.sizes)) {
        result += `(max-width: ${value}px) ${value}px,`;
      }
      result += `3360w`;
      return result;
    });

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
      backGroundSrcSet,
      backGroundSizes,
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
