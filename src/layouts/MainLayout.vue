<template>
  <q-layout view="hHh lpR fff">
    <router-view name="header" style="z-index: 101" @click:drawer="toggleDrawer($event)" />
    <router-view name="drawer" v-model="leftDrawer"/>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <router-view name="footer" style="z-index: 99" />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const leftDrawer = ref(false);
    const i18n = (relativePath) => {
      return $i18n.t("layouts.main." + relativePath);
    };
    const toggleDrawer = (position) => {
      switch (position) {
        case 'left':
          leftDrawer.value = !leftDrawer.value;
      }
    };
    return {leftDrawer, i18n, toggleDrawer};
  }
});
</script>
