<script setup lang="ts">
import { ref } from "vue";

const leftDrawer = ref(false);
const toggleDrawer = (position: string) => {
  switch (position) {
    case "left":
      leftDrawer.value = !leftDrawer.value;
      break;
  }
};
</script>
<template>
  <div>
    <RouterView
      name="header"
      @click:drawer="toggleDrawer($event)"
      style="z-index: 101"
    />
    <RouterView name="drawer" v-model="leftDrawer" />
    <div class="container mx-auto my-14">
      <RouterView />
    </div>
    <RouterView name="footer" style="z-index: 99" />
  </div>
</template>

<style scoped></style>
