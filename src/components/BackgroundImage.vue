<template>
  <q-img
    :loading="eager ? 'eager' : 'lazy'"
    no-spinner
    no-transition
    :src="src"
    fit="cover">
    <slot />
  </q-img>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "BackgroundImage",
  props: {
    eager: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const $q = useQuasar();
    const src = computed(() => {
      for (const key of Object.keys($q.screen.sizes)) {
        console.log(key);
        if ($q.screen[key]) {
          return require(`assets/background-${key}.webp`);
        }
      }
      return require(`assets/background-xs.webp`);
    });
    return {
      src
    };
  }
});
</script>

<style scoped>

</style>
