<template>
  <q-page class="flex flex-center bg-dark">
    <!--    <video-->
    <!--      class="absolute-center full-width q-px-xl"-->
    <!--      autoplay-->
    <!--      muted-->
    <!--      playsinline>-->
    <!--      <source src="videos/techmino_galaxy.mov" type="video/quicktime">-->
    <!--      <source src="videos/techmino_galaxy.webm" type="video/webm">-->
    <!--    </video>-->
    <q-media-player
      class="full-height full-width bg-transparent no-pointer-events"
      autoplay
      muted
      no-controls
      playsinline
      :show-big-play-button="false"
      type="video"
      :sources="videoSources"/>
  </q-page>
</template>

<script>
// import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'

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
