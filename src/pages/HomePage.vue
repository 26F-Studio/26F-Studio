<template>
  <q-page class="flex column">
    <BackgroundImage
      eager
      :img-style="{minHeight: '50vh'}"
      mask-position="top"
      :mask-start="$q.screen.xs ? {ratio: 1.0, control: [0.4, 0.9]} : undefined"
      :mask-end="$q.screen.xs ? {ratio: 0.8, control: [0.6, 0.8]} : undefined">
      <div
        class="absolute header-icon"
        style="font-size: 80vw; right: -26vw; top:-42vw;">
        {{ "\u{0FFFFF}" }}
      </div>
      <div
        class="absolute-center bg-transparent full-width row"
        :class="$q.screen.xs ? 'justify-center' : 'justify-start'">
        <div
          class="header-text q-pb-xl"
          :class="$q.screen.xs ? undefined : 'offset-1'">
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div
      class="relative-position full-width"
      style="height:fit-content; overflow: hidden;">
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
    <div class="column" v-if="!loggedIn">
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
  components: {BackgroundImage, ProductPanel},
  setup() {
    const $i18n = useI18n({useScope: "global"});

    const products = useProducts();

    const {id} = storeToRefs(usePlayerStore());
    const loggedIn = computed(() => {
      return id > 0;
    });
    const i18n = (relativePath) => {
      return $i18n.t("pages.main." + relativePath);
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
  background: linear-gradient(168.41deg, rgba(130, 142, 255, 0.7) 6.5%, rgba(130, 142, 255, 0.3) 96.66%);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 200;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  rotate: 5deg;
}

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
