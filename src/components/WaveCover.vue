<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="1920px" height="1080px">
    <path fill-rule="evenodd" stroke="rgb(0, 0, 0)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter"
          :fill="fill"
          d="M0,900 L0,1080 L1920,1080 L1920,900 C1220,700 700,1100 0,900 Z" />
  </svg>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    fill: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    }
  }
});
</script>

<style scoped>

</style>
