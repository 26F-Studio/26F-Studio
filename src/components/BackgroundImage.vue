<template>
  <q-img
    :loading="eager ? 'eager' : 'lazy'"
    no-spinner
    no-transition
    :src="require(`assets/background.png`)"
    :srcset="srcSet"
    :sizes="sizes"
    fit="cover">
    <slot/>
  </q-img>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "BackgroundImage",
  props: {
    eager: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    const $q = useQuasar();
    const srcSet = computed(() => {
      let result = "";
      for (const [key, value] of Object.entries($q.screen.sizes)) {
        result += `${require(`assets/background-${key}.webp`)} ${value}w,`;
      }
      result += `${require(`assets/background.webp`)} 3360w`;
      return result;
    });
    const sizes = computed(() => {
      let result = "";
      for (const value of Object.values($q.screen.sizes)) {
        result += `(max-width: ${value}px) ${value}px,`;
      }
      result += `3360w`;
      return result;
    });
    return {
      srcSet,
      sizes
    };
  }
});
</script>

<style scoped>

</style>
