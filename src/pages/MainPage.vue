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
    <div class="self-center title-text">
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index">
      <div
        class="row"
        :class="index % 2 === 1 ? 'justify-end' : 'justify-start'">
        <img
          v-if="index % 2 === 0"
          :src="`images/${product}-icon.png`"
          :alt="`${product}-icon`"
          style="height: 55vw;margin-top: -10vw" />
        <div class="col-7" style="margin-left: -5vw">
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
            <DownloadButton
              :callback="downloadProduct" />
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
          style="height: 55vw;margin-top: -10vw" />
      </div>
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
    return {
      products,
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

.newsreader {
  font-family: 'newsreader', sans-serif;
}

.newsreader-italic {
  font-family: 'newsreader-italic', sans-serif;
}

.header-text {
  @extend .newsreader-italic;
  color: #F1F2F3;
  font-style: italic;
  font-weight: 800;
  font-size: 8vw;
  line-height: 12vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}

.title-text {
  @extend .newsreader;
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-style: normal;
  font-weight: 800;
  font-size: 6vw;
  line-height: 18vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-text {
  @extend .newsreader;
  background: linear-gradient(90.8deg, #5580D4 4.29%, #7162CD 97.82%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-style: normal;
  font-weight: 600;
  font-size: 5vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description-text {
  font-style: normal;
  font-weight: 400;
  font-size: 1.8vw;
  line-height: 3vw;
  white-space: pre
}

.download-btn {
  background: linear-gradient(81.97deg, #B14FFF -3.99%, #474EEE 90.36%);
  box-shadow: 0 15px 35px rgba(36, 0, 182, 0.21);
  border-radius: 1vw;
  font-family: 'inter', sans-serif;
  font-style: normal;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.product-btn {
  background: #CCD4FF;
  border-radius: 1vw;
  font-family: 'inter', sans-serif;
  font-style: normal;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #636DD0;
}
</style>
