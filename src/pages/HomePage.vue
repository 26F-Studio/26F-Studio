<template>
  <q-page class="flex column">
    <BackgroundImage
      eager
      :img-style="{minHeight: '50vh'}"
      mask-position="top"
      :mask-start="$q.screen.xs ? {ratio: 1.0, control: [0.4, 0.9]} : undefined"
      :mask-end="$q.screen.xs ? {ratio: 0.8, control: [0.6, 0.8]} : undefined"
      style="margin-top: -6vw">
      <div
        class="absolute header-icon"
        style="font-size: 64vw; right: -6vw; top:-27vw;">
        {{ "\u{0FFFFF}" }}
      </div>
      <div
        class="absolute-center bg-transparent full-width row"
        :class="$q.screen.xs ? 'justify-center' : 'justify-start'">
        <div class="header-text q-pb-xl" style="margin-left: 4vw">
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div
      class="relative-position full-width"
      style="height:fit-content; overflow: hidden">
    </div>
    <div
      class="primary-text-bold text-center"
      style="font-size: 8vw; padding-bottom: 3vw;">
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 10vw">
      <ProductPanel
        :horizontal="$q.screen.gt.xs"
        :reversed="index % 2 === 1"
        :product="product" />
    </div>
    <div class="column" v-if="!loggedIn">
      <div
        class="primary-text-bold text-center"
        style="font-size: 5vw;"
        :style="`white-space: ${$q.screen.xs ? 'pre' : 'normal'}`">
        {{ i18n("labels.invite.interested") }}
      </div>
      <div
        class="primary-text-flat text-center q-pt-md"
        style="font-size: 2.5vw;line-height: 3vw">
        {{ i18n("labels.invite.account") }}
      </div>
      <div class="row justify-center q-py-xl q-mb-xl">
        <q-btn
          class="primary-btn q-px-xl"
          size="1.5vw"
          flat
          no-caps
          style="font-size: 1.5vw; font-weight: 700"
          to="login">
          {{ i18n("labels.invite.button") }}
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { useProducts } from "boot/config";

import { usePlayerStore } from "stores/player";

import BackgroundImage from "components/BackgroundImage";
import ProductPanel from "components/ProductPanel";

export default defineComponent({
  name: "HomePage",
  components: { BackgroundImage, ProductPanel },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const products = useProducts();

    const { id } = storeToRefs(usePlayerStore());
    const loggedIn = computed(() => {
      return id > 0;
    });
    const i18n = (relativePath) => {
      return $i18n.t("pages.home." + relativePath);
    };

    return {
      products,
      loggedIn,
      i18n
    };
  },
  methods: {}
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.header-icon {
  background: radial-gradient(100% 100% at 98.5% 96.94%, #7C4FFF 40%, #479EEE 100%);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 180;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-text {
  color: #F1F2F3;
  font-family: 'galaxy-sans-oblique', sans-serif;
  font-weight: 300;
  font-size: 9vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}

.hint-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  font-family: 'inter', sans-serif;
  font-weight: 700;

  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
