<template>
  <q-page class="flex column">
    <div class="relative-position full-width" style="height:fit-content; margin-top: -50px">
      <img class="full-width" src="images/home-header.png" alt="home-header" style="object-fit: contain;" />
      <div class="row absolute-center full-width">
        <div class="offset-1 header-text">
          {{ i18n("labels.header") }}
        </div>
      </div>
    </div>
    <div class="title-text text-center" style="font-size: 6vw; line-height: 18vw;">
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 10vw">
      <div
        class="row items-center"
        :class="index % 2 ? 'justify-end' : 'justify-start'">
        <img
          v-if="index % 2 === 0"
          :src="`images/${product}-icon.png`"
          :alt="`${product}-icon`"
          style="height: 35vw; margin-right: 5vw;"
          :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]})`" />
        <div
          class="col-auto column"
          :class="index % 2 ? 'text-right' : 'text-left'"
          style="max-width: 65vw">
          <div class="product-text">
            {{ i18n(`products.${product}.name`) }}
          </div>
          <div class="description-text">
            {{ i18n(`products.${product}.description`) }}
          </div>
          <div
            class="row q-gutter-x-xl items-center"
            :class="index % 2 === 1 ? 'justify-end' : 'justify-start'"
            style="margin-top:2vw">
            <DownloadButton :callback="downloadProduct" />
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
          v-if="index % 2 === 1"
          :src="`images/${product}-icon.png`"
          :alt="`${product}-icon`"
          style="height: 35vw; margin-left: 5vw"
          :style="`filter: drop-shadow(0 2vw 5vw ${shadowColors[product]});`" />
      </div>
    </div>
    <div class="title-text text-center" style="font-size: 5vw;">
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
        @click="onProductClick">
        {{ i18n("labels.invite.button") }}
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import DownloadButton from "components/DownloadButton";

export default defineComponent({
  name: "IndexPage",
  components: { DownloadButton },
  setup() {
    const products = [
      "techminoGalaxy",
      "techmino",
      "quatrack"
    ];
    const shadowColors = {
      techminoGalaxy: "rgba(0, 14, 143, 0.65)",
      techmino: "rgba(18, 20, 34, 0.65)",
      quatrack: "rgba(18, 20, 34, 0.65)"
    };
    return {
      products,
      shadowColors,
      onProductClick() {
        console.log("onProductClick");
      }
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.main." + relativePath);
    },
    downloadProduct(product) {
      console.log("downloadProduct", product);
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.header-text {
  color: #F1F2F3;
  font-family: 'newsreader-italic', sans-serif;
  font-weight: 800;
  font-size: 8vw;
  line-height: 12vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}

.title-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 2vw 4vw rgba(48, 0, 240, 0.31);
  font-family: 'newsreader', sans-serif;
  font-weight: 800;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-text {
  background: linear-gradient(90.8deg, #5580D4 4.29%, #7162CD 97.82%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-family: 'newsreader', sans-serif;
  font-weight: 600;
  font-size: 5vw;
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

.product-btn {
  @extend #secondary-btn;
  font-family: 'inter', sans-serif;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.account-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
