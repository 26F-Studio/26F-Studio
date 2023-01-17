<template>
  <div :class="divClass">
    <ProductImage
      :class="imageClass"
      :position="`${reversed ? '0' : '100%'} 0`"
      :product="product"
      :style="imageStyle"
      :width="horizontal ? undefined : '35vw'" />
    <div :class="groupClass" :style="horizontal ? 'max-width: 65vw' : undefined">
      <div
        class="text-color-primary text-font-galaxy-slim text-shadow-purple"
        :class="horizontal ? undefined : 'col-10 text-center'"
        style="font-size: 3rem; line-height: 175%">
        {{ i18n(`products.${product}.name`) }}
      </div>
      <div
        class="text-color-grey text-font-inter"
        :class="horizontal ? undefined : 'col-10 text-center'"
        style="font-size: 1rem; line-height: 200%; word-wrap: break-word">
        {{ i18n(`products.${product}.description`) }}
      </div>
      <div :class="buttonsClass" :style="`margin-top: ${horizontal ? '1rem' : 'unset'}`">
        <DownloadButton :disable="product === 'techminoGalaxy'" :product="product" />
        <q-btn
          :label="i18n('labels.learnMore')"
          :to="`/products/${paramCase(product)}`"
          class="btn-secondary"
          flat
          no-caps
          padding="0.4rem 1.2rem"
          style="font-size: 1.1rem">
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
import { computed, defineComponent } from "vue";
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
  setup(props) {
    const $i18n = useI18n({ useScope: "global" });

    const shadowColors = {
      techminoGalaxy: "rgba(0, 14, 143, 0.65)",
      techmino: "rgba(18, 20, 34, 0.65)",
      quatrack: "rgba(18, 20, 34, 0.65)"
    };

    const divClass = computed(() => {
      let classString = "";
      if (props.horizontal) {
        classString += `row ${props.reversed ? "justify-end" : "justify-start"} items-center`;
      } else {
        classString += "column items-center q-gutter-y-md";
      }
      return classString;
    });

    const imageClass = computed(() => {
      let classString = "cropped-image";
      if (props.horizontal) {
        classString += ` ${props.reversed ? "order-last" : "order-first"}`;
      }
      return classString;
    });

    const imageStyle = computed(() => {
      let styleString = `filter: drop-shadow(0 2vw 5vw ${shadowColors[props.product]});`;
      if (props.horizontal) {
        styleString += ` margin-${props.reversed ? "left" : "right"}: 5vw;`;
      } else {
        styleString += " margin-top: 2.5rem";
      }
      return styleString;
    });

    const groupClass = computed(() => {
      let classString = "";
      if (props.horizontal) {
        classString += `col-auto column text-${props.reversed ? "right" : "left"}`;
      } else {
        classString += `row justify-center`;
      }
      return classString;
    });

    const buttonsClass = computed(() => {
      let classString = "";
      if (props.horizontal) {
        classString += `row q-gutter-x-xl items-center ` +
          `justify-${props.reversed ? "end" : "start"}`;
      } else {
        classString += `column items-center q-gutter-y-lg`;
      }
      return classString;
    });

    const i18n = (relativePath) => {
      return $i18n.t("components.productPanel." + relativePath);
    };

    return {
      divClass,
      imageClass,
      imageStyle,
      groupClass,
      buttonsClass,
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
