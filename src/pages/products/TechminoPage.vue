<template>
  <q-page className="flex flex-center bg-dark">
    <LovePlayground style="margin-top: 4rem"/>
  </q-page>
</template>

<script>

import LovePlayground from "components/LovePlayground.vue";

export default {
  name: "TechminoPage",
  components: {LovePlayground},
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
