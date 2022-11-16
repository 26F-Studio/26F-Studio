<template>
  <svg :class="svgClass" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${width} ${height}`">
    <path
      fill-rule="evenodd" :fill="fill"
      :d="path"/>
  </svg>
  <q-resize-observer @resize="onResize"/>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "WaveCover",
  props: {
    svgClass: {
      type: String,
      default: ""
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
    }
  },
  setup(props) {
    const $q = useQuasar();
    const fill = computed(() => {
      return $q.dark.isActive ? "#121212" : "#fff";
    });
    const height = ref(1920);
    const width = ref(1080);
    const path = computed(() => {
      switch (props.position) {
        case "bottom":
          return `M0,${height.value} L0,${height.value * props.start.ratio} C` +
            `${width.value * props.start.control[0]},${height.value * props.start.control[1]} ` +
            `${width.value * props.end.control[0]},${height.value * props.end.control[1]} ` +
            `${width.value},${height.value * props.end.ratio} ` +
            `L${width.value},${height.value} Z`;
        case "left":
          return `M0,0 L${width.value * props.start.ratio},0 ` +
            `C${width.value * props.start.control[0]},${height.value * props.start.control[1]} ` +
            `${width.value * props.end.control[0]},${height.value * props.end.control[1]} ` +
            `${width.value * props.end.ratio},${height.value} ` +
            `L0,${height.value} Z`;
        case "right":
          return `M${width.value},${height.value} L${width.value * props.start.ratio},${height.value} ` +
            `C${width.value * props.start.control[0]},${height.value * props.start.control[1]} ` +
            `${width.value * props.end.control[0]},${height.value * props.end.control[1]} ` +
            `${width.value * props.end.ratio},0 ` +
            `L${width.value},0 Z`;
        case "top":
          return `M0,0 L0,${height.value * props.start.ratio} C` +
            `${width.value * props.start.control[0]},${height.value * props.start.control[1]} ` +
            `${width.value * props.end.control[0]},${height.value * props.end.control[1]} ` +
            `${width.value},${height.value * props.end.ratio} ` +
            `L${width.value},0 Z`;
        default:
          return "";
      }
    });
    const onResize = (size) => {
      height.value = Math.ceil(size.height);
      width.value = Math.ceil(size.width);
    };
    return {
      fill,
      height,
      width,
      path,
      onResize,
    };
  }
});
</script>

<style scoped lang="scss">

</style>
