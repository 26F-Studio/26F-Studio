<template>
  <div
    v-if="horizontal"
    class="row items-center"
    :class="reversed ? 'justify-end' : 'justify-start'">
    <img
      v-if="!reversed"
      :src="`images/${product}-clipped.png`"
      :alt="`${product}-icon`"
      style="height: 35vw; margin-right: 5vw;"
      :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]})`"/>
    <div
      class="col-auto column"
      :class="reversed ? 'text-right' : 'text-left'"
      style="max-width: 65vw">
      <div class="product-text">
        {{ i18n(`products.${product}.name`) }}
      </div>
      <div class="description-text">
        {{ i18n(`products.${product}.description`) }}
      </div>
      <div
        class="row q-gutter-x-xl items-center"
        :class="reversed ? 'justify-end' : 'justify-start'"
        style="margin-top:2vw">
        <DownloadButton :repo="repos[product]"/>
        <div>
          <q-btn
            class="product-btn q-px-xl"
            size="1.5vw"
            flat
            no-caps
            @click="onProductClick">
            Learn More
          </q-btn>
        </div>
      </div>
    </div>
    <img
      v-if="reversed"
      :src="`images/${product}-clipped.png`"
      :alt="`${product}-icon`"
      style="height: 35vw; margin-left: 5vw"
      :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]});`"/>
  </div>
  <div
    v-if="!horizontal"
    class="row justify-center">
    <div class="col-8 column items-center q-gutter-y-md">
      <img
        :src="`images/${product}-clipped.png`"
        :alt="`${product}-icon`"
        style="height: 35vw; margin-bottom: 5vw;"
        :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]})`"/>
      <div class="product-text text-center">
        {{ i18n(`products.${product}.name`) }}
      </div>
      <div class="description-text text-center">
        {{ i18n(`products.${product}.description`) }}
      </div>
      <div class="row justify-center q-gutter-y-sm">
        <DownloadButton
          class="col-auto col-10"
          :repo="repos[product]"/>
        <q-btn
          class="product-btn col-8"
          size="1.5vw"
          flat
          no-caps
          padding="3vw 0"
          @click="onProductClick">
          Learn More
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import DownloadButton from "components/DownloadButton";

export default defineComponent({
  name: "ProductPanel",
  components: {DownloadButton},
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
    const products = [
      "techminoGalaxy",
      "techmino",
      "quatrack"
    ];
    const repos = {
      techminoGalaxy: "Techmino_Galaxy",
      techmino: "Techmino",
      quatrack: "Quatrack"
    };
    const shadowColors = {
      techminoGalaxy: "rgba(0, 14, 143, 0.65)",
      techmino: "rgba(18, 20, 34, 0.65)",
      quatrack: "rgba(18, 20, 34, 0.65)"
    };
    return {
      products,
      repos,
      shadowColors
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.productPanel." + relativePath);
    },
    onProductClick() {
      this.$q.notify({
        message: this.i18n("notifications.comingSoon"),
        type: "info"
      });
    },
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.product-text {
  background: linear-gradient(90.8deg, #5580D4 4.29%, #7162CD 97.82%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 600;
  font-size: 7vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description-text {
  color: #636365;
  font-family: 'inter', sans-serif;
  font-weight: 500;
  font-size: 1.8vw;
  line-height: 3.5vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  word-wrap: break-word;
}

.product-btn {
  @extend #secondary-btn;
  font-family: 'inter', sans-serif;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
