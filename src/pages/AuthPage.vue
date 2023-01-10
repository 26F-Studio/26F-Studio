<template>
  <q-page class="flex column">
    <BackgroundImage full-height>
      <div class="absolute-center column items-center bg-transparent hide-scrollbar q-gutter-y-md">
        <div class="row items-center q-gutter-x-xs">
          <q-avatar size="5rem">
            <img
              :src="product ? require(`assets/products/${product}.png`) : null"
              alt="app" />
          </q-avatar>
          <q-icon name="mdi-dots-horizontal" size="lg" />
          <q-avatar color="positive" icon="check" size="xl" />
          <q-icon name="mdi-dots-horizontal" size="lg" />
          <q-avatar size="5rem">
            <img
              alt="26f-studio"
              src="favicon.ico" />
          </q-avatar>
        </div>
        <div class="title-text text-center" style="font-size: 3rem">
          {{ i18n(`labels.titles.${product}`) }}
        </div>
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    :src="product ? require(`assets/products/${product}.png`) : null"
                    alt="app" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-black">
                  {{ i18n(`labels.products.${product}`) }}
                </q-item-label>
                <q-item-label caption>
                  {{ i18n("labels.caption") }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon color="grey" name="mdi-account-outline" size="lg" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-black">{{ i18n("labels.data") }}</q-item-label>
                </q-item-section>
              </template>
            </q-expansion-item>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-y-md">
            <q-btn
              :label="i18n('labels.authorize')"
              :loading="isSubmitLoading"
              class="full-width"
              color="positive"
              @click="authorize" />
            <q-slide-transition>
              <q-expansion-item
                v-if="copyTokens"
                hide-expand-icon>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar color="positive" icon="check" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="normal-text">{{ i18n("labels.copySuccess") }}</q-item-label>
                    <q-item-label caption>{{ i18n("labels.manualCopy") }}</q-item-label>
                  </q-item-section>
                </template>
                <q-card class="text-dark">
                  <q-card-section class="wrap">
                    {{ copyTokens }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-slide-transition>
          </q-card-section>
        </q-card>
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { copyToClipboard, useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
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
  setup() {
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
    const copyTokens = ref("");

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
        copyTokens.value = JSON.stringify({
          accessToken: $player.accessToken,
          oauthToken: data.oauthToken
        });
        await copyToClipboard(copyTokens.value);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    const logger = (type, event) => {
      console.log(type, event);
    };

    return {
      product: query.product,
      platform: query.platform,
      isSubmitLoading,
      copyTokens,
      i18n,
      authorize,
      logger
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.title-text {
  color: #E1E1E1;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 3rem;
  line-height: 190%;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
