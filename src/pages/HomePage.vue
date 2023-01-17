<template>
  <q-page class="flex column">
    <BackgroundImage
      eager
      :img-style="{minHeight: '50vh'}"
      mask-position="top"
      style="margin-top: -6vw; padding-top: 3vw">
      <div
        class="text-color-primary text-font-galaxy text-shadow-grey absolute"
        style="font-size: 64vw; font-weight: 180; right: -6vw; top:-27vw;">
        {{ "\u{0FFFFF}" }}
      </div>
      <div
        class="absolute-center bg-transparent full-width row"
        :class="$q.screen.gt.sm ? 'justify-start' : 'justify-center'">
        <div
          :class="$q.screen.gt.sm ? undefined : 'text-center'"
          class="text-color-white text-font-galaxy-oblique-bold"
          style="font-size: 9vw; line-height: 8vw; margin-left: 4vw; white-space: pre">
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div
      class="relative-position full-width"
      style="height:fit-content; overflow: hidden">
    </div>
    <div
      class="text-color-primary text-font-galaxy-bold text-center"
      style="font-size: 8vw; padding-bottom: 3vw;">
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 10vw">
      <ProductPanel
        :horizontal="$q.screen.gt.sm"
        :reversed="index % 2 === 1"
        :product="product" />
    </div>
    <div class="column" v-if="!loggedIn">
      <div
        class="text-color-primary text-font-galaxy-bold text-center"
        style="font-size: 5vw;"
        :style="`white-space: ${$q.screen.xs ? 'pre' : 'normal'}`">
        {{ i18n("labels.invite.interested") }}
      </div>
      <div
        class="text-color-primary text-font-inter-bold text-center q-pt-md"
        style="font-size: 2.5vw;line-height: 3vw">
        {{ i18n("labels.invite.account") }}
      </div>
      <div class="row justify-center q-py-xl q-mb-xl">
        <q-btn
          class="text-font-inter-bold btn-primary q-px-xl"
          size="1.5vw"
          flat
          no-caps
          style="font-size: 1.5vw"
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
</style>
