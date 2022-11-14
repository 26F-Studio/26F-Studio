<template>
  <q-page class="flex flex-center">
    <q-media-player
      class="full-height full-width bg-transparent no-pointer-events"
      autoplay
      no-controls
      playsinline
      :show-big-play-button="false"
      type="video"
      :sources="videoSources" />
  </q-page>
</template>

<script>
import QMediaPlayer from '@quasar/quasar-app-extension-qmediaplayer'

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
    return {
      videoSources
    };
  }
};
</script>

<style scoped>

</style>
