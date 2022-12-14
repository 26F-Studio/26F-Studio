<template>
  <div
    v-if="horizontal"
    class="row items-center"
    :class="reversed ? 'justify-end' : 'justify-start'">
    <ProductImage
      class="cropped-image"
      :class="reversed ? 'order-last' : 'order-first'"
      :position="`${reversed ? '0' : '100%'} 0`"
      :product="product"
      :style="`margin-${reversed ? 'left' : 'right'}: 5vw; filter: drop-shadow(0 2vw 5vw ${shadowColors[product]})`" />
    <div
      class="col-auto column"
      :class="`text-${reversed ? 'right' : 'left'}`"
      style="max-width: 65vw">
      <div
        class="text-color-primary text-font-galaxy-slim text-shadow-purple"
        style="font-size: 5vw; line-height: 6vw">
        {{ i18n(`products.${product}.name`) }}
      </div>
      <div
        class="text-color-grey text-font-inter"
        style="font-size: 1.5vw; line-height: 3vw; word-wrap: break-word">
        {{ i18n(`products.${product}.description`) }}
      </div>
      <div
        class="row q-gutter-x-xl items-center"
        :class="`justify-${reversed ? 'end' : 'start'}`"
        style="margin-top:2vw">
        <DownloadButton
          :disable="product === 'techminoGalaxy'"
          :product="product" />
        <div>
          <q-btn
            :to="`/products/${paramCase(product)}`"
            class="btn-secondary q-px-xl"
            :label="i18n('labels.learnMore')"
            no-caps
            size="1.5vw"
            flat
            style="font-size: 1.5vw">
            <div hidden>
              {{ `about-${product}` }}
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO: Merge two states -->
  <div
    v-if="!horizontal"
    class="row justify-center">
    <div class="col-10 column items-center q-gutter-y-md">
      <ProductImage
        class="cropped-image"
        :position="`${reversed ? '0' : '100%'} 0`"
        :product="product"
        width="35vw"
        style="margin-top: 5vw"
        :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]})`" />
      <div class="text-color-primary text-font-galaxy text-shadow-purple text-center"
           style="font-size: 7vw; line-height: 8vw">
        {{ i18n(`products.${product}.name`) }}
      </div>
      <div
        class="text-color-grey text-font-inter text-center"
        style="font-size: 1.5vw; line-height: 3vw; word-wrap: break-word">
        {{ i18n(`products.${product}.description`) }}
      </div>
      <div class="row justify-center q-gutter-y-sm">
        <DownloadButton
          class="col-auto col-10"
          :disable="product === 'techminoGalaxy'"
          :product="product" />
        <q-btn
          :label="i18n('labels.learnMore')"
          flat
          :to="`/products/${paramCase(product)}`"
          no-caps
          padding="3vw 0"
          size="1.5vw"
          class="btn-secondary col-8"
          style="font-size: 1.5vw">
          <div hidden>
            {{ `about-${product}` }}
          </div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { paramCase } from "change-case-all";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import DownloadButton from "components/DownloadButton";
import ProductImage from "components/ProductImage";

export default defineComponent({
  name: "ProductPanel",
  components: { ProductImage, DownloadButton },
  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    reversed: {
      type: Boolean,
      default: false
    },
    product: {
      type: String,
      required: true
    }
  },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const shadowColors = {
      techminoGalaxy: "rgba(0, 14, 143, 0.65)",
      techmino: "rgba(18, 20, 34, 0.65)",
      quatrack: "rgba(18, 20, 34, 0.65)"
    };
    const i18n = (relativePath) => {
      return $i18n.t("components.productPanel." + relativePath);
    };
    return {
      shadowColors,
      i18n,
      paramCase
    };
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

$length: 35vw;

.cropped-image {
  height: $length;
  width: $length * 0.75;
  overflow: hidden;
}
</style>
