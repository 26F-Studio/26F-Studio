<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewbox="`0 0 ${width} ${height}`">
    <path fill-rule="evenodd" :fill="fill"
          :d="`M${x},${y} C${bx1},${by1} ${bx2},${by2} ${width},${y} L${width},${height} ${x},${height} ${x},${y}  Z`"/>
  </svg>
</template>

<script>
import {computed, defineComponent, ref} from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    fill: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    }
  },
  setup() {
    const width = 1920, height = 1080, amplitude = 200;
    const waveFunction = (timestamp) => {
      return Math.sin(timestamp / 2000);
    };
    const differentialWaveFunction = (timestamp) => {
      return Math.cos(timestamp / 2000);
    };
    const x = 0, y = ref(height - amplitude);
    const bx1 = 700, by1 = ref(height - amplitude);
    const bx2 = width - 700, by2 = ref(height - amplitude);
    const animationInterval = setInterval(() => {
      const timestamp = Date.now();
      y.value = height - amplitude + waveFunction(timestamp) * amplitude;
      by1.value = height - amplitude - differentialWaveFunction(timestamp) * amplitude;
      by2.value = height - amplitude + differentialWaveFunction(timestamp) * amplitude;
    }, 1000 / 60);
    return {
      width,
      height,
      x,
      y,
      bx1,
      by1,
      bx2,
      by2,
      animationInterval
    };
  },
  beforeUnmount() {
    clearInterval(this.animationInterval);
  }
});
</script>

<style scoped>

</style>
