<template>
  <q-page class="flex column">
    <div
      class="relative-position full-width"
      style="height:fit-content">
      <q-img
        class="full-width"
        :src="require(`assets/homePageSplash-${$q.screen.lt.md ? 'v' : 'h'}.png`)"/>
      <div
        class="row absolute-center full-width"
        :class="$q.screen.xs ? 'justify-center' : 'justify-start'">
        <div
          class="header-text"
          :class="$q.screen.xs ? undefined : 'offset-1'">
          {{ i18n("labels.header") }}
        </div>
      </div>
      <!--
      <video
        class="absolute-center full-width q-px-xl"
        autoplay
        muted
        playsinline>
        <source src="videos/techmino_galaxy.mov" type="video/mp4; codecs='hvc1'">
        <source src="videos/techmino_galaxy.webm" type="video/webm">
      </video>
      -->
    </div>
    <div class="title-text text-center" style="font-size: 10vw; line-height: 18vw;">
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 10vw">
      <ProductPanel
        :horizontal="$q.screen.gt.xs"
        :reversed="index % 2 === 1"
        :product="product"/>
    </div>
    <div
      class="title-text text-center"
      style="font-size: 7vw;"
      :style="`white-space: ${$q.screen.xs ? 'pre' : 'normal'}`">
      {{ i18n("labels.invite.interested") }}
    </div>
    <div class="hint-text text-center q-pt-md">
      {{ i18n("labels.invite.account") }}
    </div>
    <div class="row justify-center q-py-xl q-mb-xl">
      <q-btn
        class="account-btn q-px-xl"
        size="1.5vw"
        flat
        no-caps
        @click="onSignClick">
        {{ i18n("labels.invite.button") }}
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";

import {useProducts} from "boot/config";

import ProductPanel from "components/ProductPanel";

export default defineComponent({
  name: "HomePage",
  components: {ProductPanel},
  setup() {
    return {
      products: useProducts()
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.main." + relativePath);
    },
    onSignClick() {
      this.$q.notify({
        message: this.i18n("notifications.comingSoon"),
        type: "info"
      });
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.header-text {
  color: #F1F2F3;
  font-family: 'galaxy-sans-oblique', sans-serif;
  font-weight: 800;
  font-size: 14vw;
  line-height: 14vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}

.title-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 2vw 4vw rgba(48, 0, 240, 0.31);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 800;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hint-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  font-family: 'inter', sans-serif;
  font-weight: 700;
  font-size: 2.5vw;
  line-height: 3vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.account-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
