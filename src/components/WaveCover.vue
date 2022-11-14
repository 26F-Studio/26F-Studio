<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${width} ${height}`">
    <path
      fill-rule="evenodd" :fill="fill"
      :d="path"/>
  </svg>
</template>

<script>
import { useQuasar } from "quasar";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    end: {
      type: Object,
      default: () => ({
        ratio: 0.7,
        control: [0.6, 0.7]
      })
    },
    height: {
      type: Number,
      default: 1080
    },
    position: {
      type: String,
      default: "bottom"
    },
    start: {
      type: Object,
      default: () => ({
        ratio: 0.9,
        control: [0.4, 1.1]
      })
    },
    width: {
      type: Number,
      default: 1920
    }
  },
  setup(props) {
    const $q = useQuasar();
    const fill = computed(() => {
      return $q.dark.isActive ? "#121212" : "#fff";
    });
    const path = computed(() => {
      switch (props.position) {
        case "bottom":
          return `M0,${props.height} L0,${props.height * props.start.ratio} C` +
            `${props.width * props.start.control[0]},${props.height * props.start.control[1]} ` +
            `${props.width * props.end.control[0]},${props.height * props.end.control[1]} ` +
            `${props.width},${props.height * props.end.ratio} ` +
            `L${props.width},${props.height} Z`;
        case "left":
          return `M0,0 L${props.width * props.start.ratio},0 ` +
            `C${props.width * props.start.control[0]},${props.height * props.start.control[1]} ` +
            `${props.width * props.end.control[0]},${props.height * props.end.control[1]} ` +
            `${props.width * props.end.ratio},${props.height} ` +
            `L0,${props.height} Z`;
        case "right":
          return `M${props.width},${props.height} L${props.width * props.start.ratio},${props.height} ` +
            `C${props.width * props.start.control[0]},${props.height * props.start.control[1]} ` +
            `${props.width * props.end.control[0]},${props.height * props.end.control[1]} ` +
            `${props.width * props.end.ratio},0 ` +
            `L${props.width},0 Z`;
        case "top":
          return `M0,0 L0,${props.height * props.start.ratio} C` +
            `${props.width * props.start.control[0]},${props.height * props.start.control[1]} ` +
            `${props.width * props.end.control[0]},${props.height * props.end.control[1]} ` +
            `${props.width},${props.height * props.end.ratio} ` +
            `L${props.width},0 Z`;
        default:
          return "";
      }
    });
    return {
      fill,
      path
    };
  }
});
</script>

<style scoped lang="scss">

</style>
