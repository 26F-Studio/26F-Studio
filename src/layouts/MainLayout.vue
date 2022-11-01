<template>
  <q-layout view="hHh lpR fff">
    <router-view name="header" @click:drawer="toggleDrawer($event)"/>
    <router-view name="drawer" v-model="leftDrawer"/>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <router-view name="footer"/>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawer = ref(false);
    return {leftDrawer}
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.main." + relativePath);
    },
    toggleDrawer(position) {
      switch (position) {
        case 'left':
          this.leftDrawer = !this.leftDrawer;
      }
    }
  }
});
</script>
