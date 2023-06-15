<template>
  <q-page className="flex flex-center bg-dark">
    <div style="width: 1280px; height: 720px">
      <LovePlayground />
    </div>
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
