<template>
  <q-page class="flex column">
    <div
      class="absolute full-width full-height"
      style="height:fit-content">
      <q-resize-observer @resize="onResize" />
      <q-img
        class="full-width full-height"
        :src="require(`assets/background.webp`)"
        style="min-height: 540px" />
      <WaveCover
        class="absolute-right full-width full-height"
        :end="{ratio: 0.3, control: [0.3, 0.2]}"
        :height="waveHeight"
        position="right"
        :start="{ratio: 0.4, control: [0.4, 0.8]}"
        :width="waveWidth" />
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
import { defineComponent, ref } from "vue";
import WaveCover from "components/WaveCover";

export default defineComponent({
  name: "LoginPage",
  components: { WaveCover },
  setup() {
    const waveHeight = ref(1920);
    const waveWidth = ref(1080);
    return {
      waveHeight,
      waveWidth
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.login." + relativePath);
    },
    onResize(size) {
      this.waveHeight = size.height;
      this.waveWidth = size.width;
    }
  }
});
</script>

<style scoped>

</style>
