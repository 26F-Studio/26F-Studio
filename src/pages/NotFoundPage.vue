<template>
  <q-page class="flex column" style="background: #1a13ac">
    <BackgroundImage full-height>
      <div class="absolute-center bg-transparent text-center">
        <q-img :src="require('assets/notFound.svg')" width="60vmin" />
        <div class="text-color-white text-font-inter" style="font-size: 5vmin">
          {{ i18n("labels.notFound") }}
        </div>
        <q-btn
          class="btn-primary"
          :label="i18n('labels.home')"
          no-caps
          padding="0.4rem 1.25rem"
          size="1.5rem"
          to="/home"
          unelevated
          style="margin-top: 2rem"
        />
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";

export default defineComponent({
  name: "NotFoundPage",
  components: { BackgroundImage },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const i18n = (relativePath) => {
      return $i18n.t("pages.notFound." + relativePath);
    };
    return {
      i18n,
    };
  },
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";
</style>
