<template>
  <div class="full-width relative-position overflow-hidden">
    <q-img
      class="full-width"
      fit="cover"
      :loading="eager ? 'eager' : 'lazy'"
      no-spinner
      no-transition
      :src="typeof src === 'string' ? src : require('assets/background.png')"
      :style="style"
      @load="onImgLoaded">
      <slot/>
      <q-resize-observer v-if="maskPosition" @resize="onResize" debounce="50"/>
    </q-img>
  </div>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent, ref} from "vue";

export default defineComponent({
  name: "BackgroundImage",
  props: {
    eager: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    maskPosition: {
      type: String,
      validator: (value) => {
        return ["bottom", "left", "right", "top"].includes(value);
      }
    },
    maskStart: {
      type: Object,
      default: () => ({
        ratio: 0.9,
        control: [0.4, 1.1]
      })
    },
    maskEnd: {
      type: Object,
      default: () => ({
        ratio: 0.7,
        control: [0.6, 0.7]
      })
    },
  },
  setup(props) {
    const $q = useQuasar();
    const src = computed(() => {
      for (const key of Object.keys($q.screen.sizes)) {
        if ($q.screen[key]) {
          return require(`assets/background-${key}.webp`);
        }
      }
      return require("assets/background-xs.webp");
    });
    const fill = props.maskPosition ? computed(() => {
      return $q.dark.isActive ? "#121212" : "#fff";
    }) : undefined;

    const imgLoaded = ref(false);
    const onImgLoaded = () => {
      imgLoaded.value = true;
    };

    const path = ref("");
    const style = computed(() => ({
      height: props.fullHeight ? '100vh' : 'fit-content',
      clipPath: (props.maskPosition && imgLoaded.value) ? `path('${path.value}')` : undefined,
    }));


    const calculatePath = (width, height) => {
      switch (props.maskPosition) {
        case "bottom":
          return `M0,${height} L0,${height * props.maskStart.ratio} C` +
            `${width * props.maskStart.control[0]},${height * props.maskStart.control[1]} ` +
            `${width * props.maskEnd.control[0]},${height * props.maskEnd.control[1]} ` +
            `${width},${height * props.maskEnd.ratio} ` +
            `L${width},${height} Z`;
        case "left":
          return `M0,0 L${width * props.maskStart.ratio},0 ` +
            `C${width * props.maskStart.control[0]},${height * props.maskStart.control[1]} ` +
            `${width * props.maskEnd.control[0]},${height * props.maskEnd.control[1]} ` +
            `${width * props.maskEnd.ratio},${height} ` +
            `L0,${height} Z`;
        case "right":
          return `M${width},${height} L${width * props.maskStart.ratio},${height} ` +
            `C${width * props.maskStart.control[0]},${height * props.maskStart.control[1]} ` +
            `${width * props.maskEnd.control[0]},${height * props.maskEnd.control[1]} ` +
            `${width * props.maskEnd.ratio},0 ` +
            `L${width},0 Z`;
        case "top":
          return `M0,0 L0,${height * props.maskStart.ratio} C` +
            `${width * props.maskStart.control[0]},${height * props.maskStart.control[1]} ` +
            `${width * props.maskEnd.control[0]},${height * props.maskEnd.control[1]} ` +
            `${width},${height * props.maskEnd.ratio} ` +
            `L${width},0 Z`;
        default:
          return "";
      }
    };
    const onResize = ({width, height}) => {
      if (props.maskPosition) {
        path.value = calculatePath(width, height);
      }
    };
    return {
      src,
      fill,
      calculatePath,
      style,
      onImgLoaded,
      onResize,
    };
  }
});
</script>

<style scoped>

</style>
