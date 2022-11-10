<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewbox="`0 0 ${width} ${height}`">
    <g class="waves">
      <path
        v-for="(path, index) in paths"
        :key="index"
        fill-rule="evenodd" :fill="fill"
        :d="path"/>
    </g>

  </svg>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    fill: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    },
    position: {
      type: String,
      default: "bottom"
    },
    waves: {
      type: Array,
      default: () => [{
        period: 1,
        amplitude: 200,
        speed: 2
      }]
    },
  },
  setup(props) {
    const width = 1920, height = 1080;
    const paths = computed(() => {
      let result = [];
      for (const wave of props.waves) {
        const x = 0, y = height - wave.amplitude;
        let path = `M${x},${y} `;
        const segment = width / wave.period;
        for (let index = 0; index < wave.period; index++) {
          const bx1 = segment * (index + 0.33), by1 = height - wave.amplitude * (Math.sqrt(2) + 1);
          const bx2 = width - (segment * (index + 0.33)), by2 = height + wave.amplitude * (Math.sqrt(2) - 1);
          path += `C${bx1},${by1} ${bx2},${by2} ${segment * (index + 1)},${y} `;
        }
        path += `L${width},${height} ${x},${height} ${x},${y} Z`;
        result.push(path);
      }
      console.log(result);
      return result;
    });
    return {
      width,
      height,
      paths
    };
  }
});
</script>

<style scoped lang="scss">
.waves > use {
  animation: wave 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.waves > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.waves > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.waves > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.waves > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes wave {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
