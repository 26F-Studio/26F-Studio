<template>
  <q-page class="flex flex-center">
    <q-media-player
      type="video"
      :sources="videoSources" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
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
});
</script>
