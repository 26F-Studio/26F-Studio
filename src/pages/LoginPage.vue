<template>
  <q-page class="flex column">
    <BackgroundImage
      full-height
      mask
      mask-position="left"
      :mask-start="{ratio: 0.3, control: [0.3, 0.2]}"
      :mask-end="{ratio: 0.4, control: [0.4, 0.8]}"/>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";

export default defineComponent({
  name: "LoginPage",
  components: {BackgroundImage},
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    return {
      i18n
    };
  }
});
</script>

<style scoped>

</style>
