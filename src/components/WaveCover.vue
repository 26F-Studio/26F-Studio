<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewbox="`0 0 ${width} ${height}`">
    <path
      fill-rule="evenodd" :fill="color"
      :d="path"/>
  </svg>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    color: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    },
    end: {
      type: Object,
      default: () => ({
        ratio: 0.7,
        control: [0.6, 0.7]
      })
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
  },
  setup(props) {
    const width = 1920, height = 1080;
    const path = computed(() => {
      switch (props.position) {
        case "bottom":
          return `M0,${height} L0,${height * props.start.ratio} C` +
            `${width * props.start.control[0]},${height * props.start.control[1]} ` +
            `${width * props.end.control[0]},${height * props.end.control[1]} ` +
            `${width},${height * props.end.ratio} ` +
            `L${width},${height} Z`;
        case "left":
          return `M0,0 L${width * props.start.ratio},0 ` +
            `C${width * props.start.control[0]},${height * props.start.control[1]} ` +
            `${width * props.end.control[0]},${height * props.end.control[1]} ` +
            `${width * props.end.ratio},${height} ` +
            `L0,${height} Z`;
        case "right":
          return `M${width},${height} L${width * props.start.ratio},${height} ` +
            `C${width * props.start.control[0]},${height * props.start.control[1]} ` +
            `${width * props.end.control[0]},${height * props.end.control[1]} ` +
            `${width * props.end.ratio},0 ` +
            `L${width},0 Z`;
        case "top":
          return `M0,0 L0,${height * props.start.ratio} C` +
            `${width * props.start.control[0]},${height * props.start.control[1]} ` +
            `${width * props.end.control[0]},${height * props.end.control[1]} ` +
            `${width},${height * props.end.ratio} ` +
            `L${width},0 Z`;
        default:
          return "";
      }
    });
    return {
      width,
      height,
      path
    };
  }
});
</script>

<style scoped lang="scss">

</style>
