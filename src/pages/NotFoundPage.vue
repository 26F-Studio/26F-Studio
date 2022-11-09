<template>
  <div
    class="fullscreen text-center flex flex-center"
    style="background: #1a13ac">
    <div class="relative-position full-width full-height" style="height:fit-content">
      <q-img
        class="full-width full-height"
        :src="require(`assets/background.webp`)"
        fit="cover"/>
      <div class="absolute-center full-width">
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
          style="padding: 0 5vmin"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NotFoundPage',
  methods: {
    i18n(relativePath) {
      return this.$t("pages.notFound." + relativePath);
    },
  }
})
</script>


<style scoped lang="scss">
@import "src/css/app.scss";

.main-text {
  background: linear-gradient(100.71deg, rgba(130, 172, 255, 0.4) 14.61%, rgba(193, 130, 255, 0.4) 94.34%);;
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
