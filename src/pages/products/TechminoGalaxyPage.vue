<template>
  <q-page className="flex flex-center bg-dark">
    <!--    <video-->
    <!--      class="absolute-center full-width q-px-xl"-->
    <!--      autoplay-->
    <!--      muted-->
    <!--      playsinline>-->
    <!--      <source src="videos/techmino_galaxy.mov" type="video/quicktime">-->
    <!--      <source src="videos/techmino_galaxy.webm" type="video/webm">-->
    <!--    </video>-->
    <q-media-player
      className="full-height full-width bg-transparent no-pointer-events"
      autoplay
      muted
      no-controls
      playsinline
      :show-big-play-button="false"
      type="video"
      :sources="videoSources" />
    <div class="row q-gutter-md">
      <q-btn className="primary" label="Button" @click="copy" />
      <q-input />
    </div>

  </q-page>
</template>

<script>
// import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'

import { copyToClipboard } from "quasar";
import { ref } from "vue";
import { errorHandler } from "src/scripts/axios";

export default {
  name: "TechminoGalaxyPage",
  setup() {
    const videoSources = [
      {
        src: "/videos/techmino_galaxy.webm",
        type: "video/webm"
      },
      {
        src: "/videos/techmino_galaxy.mov",
        type: "video/quicktime"
      }
    ];

    const string = ref("1237129847y83279yhrf82u938rq7efwyu932uq808r84gwfeawhou9r83ywresfuiouaw9r88gryiesbufw9r834hwtgyireuofaw9wrjw3h8griesuofewr928q3h74wguwafoi9jr823hq4wuei");
    const copy = async () => {
      await errorHandler(async () => {
        await copyToClipboard(string.value);
      });
    };
    return {
      videoSources,
      copy
    };
  }
};
</script>

<style scoped>

</style>
