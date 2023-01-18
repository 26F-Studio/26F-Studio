<template>
  <q-page
    :class="$q.screen.gt.md ? 'flex-center' : 'flex-block'"
    class="flex column">
    <BackgroundImage
      :class="$q.screen.gt.md ? 'absolute-full' : undefined"
      :full-height="$q.screen.gt.md"
      mask
      :mask-end="maskEnd"
      :mask-position="$q.screen.gt.md ? 'left' : 'top'"
      :mask-start="maskStart">
      <div class="bg-transparent fit row items-center">
        <div class="col-grow col-lg-4 text-center text-color-white text-font-galaxy-oblique-bold"
             style="font-size: 5rem; line-height: 5rem; white-space: pre-wrap">
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div class="row justify-center full-width">
      <div
        :class="$q.screen.gt.md ? 'offset-4 offset-lg-5 col-6' : 'col-grow'"
        class="column items-center q-gutter-y-xl">
        <div
          class="text-color-primary text-font-inter-bolder text-shadow-purple text-center"
          style="font-size: 2rem; line-height: 200%">
          {{ i18n(`labels.title`, { product: i18n(`labels.products.${product}`) }) }}
        </div>
        <div class="row items-center q-gutter-x-xs">
          <q-avatar size="5rem">
            <img :src="product ? require(`assets/products/${product}.png`) : null" alt="app" />
          </q-avatar>
          <q-icon name="mdi-dots-horizontal" size="lg" />
          <q-avatar color="positive" icon="check" size="xl" />
          <q-icon name="mdi-dots-horizontal" size="lg" />
          <q-avatar size="5rem">
            <img alt="26f-studio" src="favicon.ico" />
          </q-avatar>
        </div>
        <div class="column items-center q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-slim text-center"
            style="font-size: 0.75rem; white-space: pre-line">
            {{ i18n("labels.description", { product: i18n(`labels.products.${product}`) }) }}
          </div>
          <div class="row no-wrap">
            <div
              class="offset-2 text-color-grey text-font-inter-bold"
              style="font-size: 0.75rem; white-space: pre">
              {{ i18n("labels.permissions.common") }}
            </div>
            <div
              class="col-6 text-color-grey text-font-inter-slim"
              style="font-size: 0.75rem; white-space: pre-line">
              {{ i18n("labels.permissionDescriptions.common") }}
            </div>
          </div>
        </div>
        <div class="row justify-center q-gutter-x-xl">
          <q-btn
            :label="i18n(`labels.cancel`)"
            class="btn-secondary"
            no-caps
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="$router.go(-1)" />
          <q-btn
            :label="i18n(`labels.confirm`)"
            :loading="isSubmitLoading"
            class="btn-primary"
            no-caps
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="authorize" />
        </div>
        <q-slide-transition>
          <div v-if="copyTokens" class="column items-center q-gutter-y-md">
            <div
              class="text-color-grey text-font-inter text-center"
              style="font-size: 0.75rem; white-space: pre">
              {{ i18n("labels.copySuccess") }}
            </div>
            <div class="row justify-center items-center">
              <div
                class="text-color-grey text-font-inter"
                style="font-size: 0.75rem; white-space: pre">
                {{ i18n("labels.manualCopyBefore") }}
              </div>
              <q-btn
                dense
                flat
                no-caps
                size="0.75rem"
                @click="showTokens">
                <div
                  class="text-color-primary text-font-inter-bolder">
                  {{ i18n("labels.manualCopy") }}
                </div>
              </q-btn>
              <div
                class="text-color-grey text-font-inter"
                style="font-size: 0.75rem; white-space: pre">
                {{ i18n("labels.manualCopyAfter") }}
              </div>
            </div>
          </div>
        </q-slide-transition>
        <q-slide-transition>
          <div v-if="isTokensVisible" class="row justify-center q-mb-xl q-mb-lg-none z-max">
            <div
              class="col-10 col-sm-8 col-md-6 text-color-blue text-font-inter"
              style="font-size: 0.75rem; word-break: break-all">
              {{ copyTokens }}
            </div>
          </div>
        </q-slide-transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import { copyToClipboard, useQuasar } from "quasar";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useReCaptcha } from "vue-recaptcha-v3";
import { useRoute, useRouter } from "vue-router";

import { ResultCode, useApi } from "boot/axios";
import { useProducts } from "boot/config";
import { usePlayerStore } from "stores/player";

import BackgroundImage from "components/BackgroundImage.vue";
import { errorHandler } from "src/scripts/axios";

export default defineComponent({
  name: "AuthPage",
  components: { BackgroundImage },
  emits: ["scrollTo"],
  setup(_, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $reCaptcha = useReCaptcha();
    const $router = useRouter();
    const { query } = useRoute();

    if (!useProducts().includes(query.product)) {
      $router.replace({ name: "notFound" });
    }

    onMounted(async () => {
      await $player.check();
      if (!$player.loggedIn) {
        await $router.push({ name: "login" });
      }
    });

    const isSubmitLoading = ref(false);
    const copyTokens = ref("tef76g8h9ijgyf7r5er76t729yh10981239021uj90e0921je9sd012jue091234567812uje9012ujedh1203h210euj0d912e02joiwshd09sahndio12h0dhjnost");
    const isTokensVisible = ref(false);

    const maskEnd = computed(() => {
      switch ($q.screen.name) {
        case "xs":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "sm":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "md":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "lg":
          return { ratio: 0.45, control: [0.45, 0.8] };
        default:
          return { ratio: 0.4, control: [0.4, 0.8] };
      }
    });

    const maskStart = computed(() => {
      switch ($q.screen.name) {
        case "xs":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "sm":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "md":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "lg":
          return { ratio: 0.35, control: [0.35, 0.2] };
        default:
          return { ratio: 0.3, control: [0.3, 0.2] };
      }
    });


    const i18n = (relativePath, params) => {
      return $i18n.t("pages.oauth." + relativePath, params);
    };

    const authorize = async () => {
      isSubmitLoading.value = true;
      await $reCaptcha.recaptchaLoaded();
      const token = await $reCaptcha.executeRecaptcha("login");
      await errorHandler(async () => {
        const { code, data } = await $api.auth.oauth(
          $player.accessToken,
          query.product,
          token
        );
        if (code === ResultCode.Continued) {
          $player.accessToken = data.accessToken;
        }
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.submitSuccess")
        });
        copyTokens.value = $player.accessToken + data["oauthToken"];
        await copyToClipboard(copyTokens.value);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    const showTokens = () => {
      isTokensVisible.value = true;
      setTimeout(() => emit("scrollTo", { percentage: 1.0, duration: 200 }), 500);
    };

    return {
      product: query.product,
      isSubmitLoading,
      copyTokens,
      isTokensVisible,
      maskEnd,
      maskStart,
      i18n,
      authorize,
      showTokens
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
