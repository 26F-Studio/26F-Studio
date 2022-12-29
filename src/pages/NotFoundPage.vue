<template>
  <q-page
    class="flex column"
    style="background: #1a13ac">
    <BackgroundImage full-height>
      <div class="absolute-center bg-transparent text-center">
        <div class="main-text" style="font-size: 50vmin; line-height: 50vmin">
          404
        </div>
        <div class="q-mt-xl" style="font-size: 5vmin; opacity:.4; color: #e1e1e1">
          {{ i18n("labels.notFound") }}
        </div>
        <q-btn
          class="home-btn q-mt-xl"
          flat
          :label="i18n('labels.home')"
          no-caps
          size="4vmin"
          to="/home"
          style="padding: 0 5vmin" />
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";

export default defineComponent({
  name: 'NotFoundPage',
  components: {BackgroundImage},
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const i18n = (relativePath) => {
      return $i18n.t("pages.notFound." + relativePath);
    };
    return {
      i18n
    };
  }
})
</script>


<style scoped lang="scss">
@import "src/css/app.scss";

.main-text {
  background: linear-gradient(281.98deg, #7C4FFF 3.82%, #479EEE 90.68%);
  text-shadow: 0 3vw 4vw rgba(4, 0, 29, 0.15);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 600;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
