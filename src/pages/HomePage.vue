<template>
  <q-page class="flex column">
    <BackgroundImage
      eager
      mask-position="top"
      :style="`margin-top: ${
        $q.screen.gt.sm ? '-2.16rem' : '-50px'
      }; padding-top: ${$q.screen.gt.sm ? '1.08rem' : '50px'}`"
    >
      <div
        class="text-color-primary text-font-galaxy text-shadow-grey absolute"
        style="font-size: 64vw; font-weight: 180; right: -6vw; top: -27vw"
      >
        {{ "\u{0FFFFF}" }}
      </div>
      <div
        class="absolute-center bg-transparent full-width row"
        :class="$q.screen.gt.sm ? 'justify-start' : 'justify-center'"
        style="margin-top: -1.08rem"
        :style="$q.screen.gt.sm ? 'padding-left: 4rem' : undefined"
      >
        <div
          :class="$q.screen.gt.sm ? undefined : 'text-center'"
          class="col-10 col-md-5 text-color-white text-font-galaxy-oblique-bold"
          :style="headerStyle"
        >
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div
      class="text-color-primary text-font-galaxy-bold text-center"
      style="font-size: 10vw; margin: 3vw 0"
    >
      {{ i18n("labels.title") }}
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      style="margin-bottom: 5rem"
    >
      <ProductPanel
        :horizontal="$q.screen.gt.sm"
        :reversed="index % 2 === 1"
        :product="product"
      />
    </div>
    <div class="column" v-if="!loggedIn">
      <div
        class="text-color-primary text-font-galaxy-bold text-center"
        style="font-size: 3rem; line-height: 100%"
        :style="`white-space: ${$q.screen.xs ? 'pre' : 'normal'}`"
      >
        {{ i18n("labels.invite.interested") }}
      </div>
      <div
        class="text-color-primary text-font-inter-bold text-center q-pt-md"
        style="font-size: 1.5rem"
      >
        {{ i18n("labels.invite.account") }}
      </div>
      <div class="row justify-center q-py-xl q-mb-xl">
        <q-btn
          class="btn-primary"
          :label="i18n('labels.invite.button')"
          no-caps
          padding="0.4rem 1.25rem"
          size="1.25rem"
          unelevated
          to="login"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
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
    const $q = useQuasar();

    const products = useProducts();

    const { id } = storeToRefs(usePlayerStore());
    const loggedIn = computed(() => {
      return id > 0;
    });

    const headerStyle = computed(() => {
      let styleString = "white-space: pre-wrap;";
      switch ($q.screen.name) {
        case "xs":
          styleString += " font-size: 3rem;";
          break;
        case "sm":
          styleString += " font-size: 4rem;";
          break;
        case "xl":
          styleString += " font-size: 6rem;";
          break;
        default:
          styleString += " font-size: 5rem;";
          break;
      }
      styleString += " line-height: 100%";
      return styleString;
    });
    const i18n = (relativePath) => {
      return $i18n.t("pages.home." + relativePath);
    };

    return {
      products,
      loggedIn,
      headerStyle,
      i18n,
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";
</style>
