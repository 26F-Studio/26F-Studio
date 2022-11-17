<template>
  <q-img
    fit="cover"
    :loading="eager ? 'eager' : 'lazy'"
    no-spinner
    no-transition
    :position="position"
    :src="typeof src === 'string' ? src : require(`assets/products/${product}.png`)"
    :width="width">
    <slot/>
  </q-img>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ProductImage",
  props: {
    eager: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    product: {
      type: String,
      required: true
    },
    width: {
      type: String
    },
  },
  setup(props) {
    const $q = useQuasar();
    const src = computed(() => {
      for (const key of Object.keys($q.screen.sizes)) {
        if ($q.screen[key]) {
          return require(`assets/products/${props.product}-${key}.webp`);
        }
      }
      return require(`assets/products/${props.product}-xs.webp`);
    });
    return {src};
  }
});
</script>

<style scoped>

</style>
