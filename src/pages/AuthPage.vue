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
              alt="app"
              src="favicon.ico" />
          </q-avatar>
        </div>
        <div class="title-text text-center" style="font-size: 3rem">
          {{ i18n(`labels.titles.${product}`) }}
        </div>
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section avatar top>
                <q-avatar :icon="platformIconMap[platform]" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-black">
                  {{
                    i18n("labels.name", {
                      product: i18n(`labels.products.${product}`),
                      platform: i18n(`labels.platforms.${platform}`)
                    })
                  }}
                </q-item-label>
                <q-item-label caption>{{ i18n("labels.caption") }}</q-item-label>
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
          <q-card-section>
            <vue-h-captcha
              ref="hCaptcha"
              sitekey="1c44f708-6b62-4b69-b733-7abbdb1f5add"
              :theme="$q.dark.isActive ? 'dark' : 'light'"
              size="invisible"
              @error="logger('error', $event)"
              @expired="logger('expired', $event)"
              @verify="logger('verify', $event)"
              @challenge-expired="logger('challenge-expired', $event)" />
            <q-btn
              :label="i18n('labels.authorize')"
              class="full-width"
              color="positive"
              @click="authorize" />
          </q-card-section>
        </q-card>
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import { usePlatforms, useProducts } from "boot/config";

import VueHCaptcha from "@hcaptcha/vue3-hcaptcha";
import BackgroundImage from "components/BackgroundImage.vue";

export default defineComponent({
  name: "AuthPage",
  components: { VueHCaptcha, BackgroundImage },
  setup() {
    const $i18n = useI18n({ useScope: "global" });
    const { query } = useRoute();
    if (!useProducts().includes(query.product) ||
      !usePlatforms(false).includes(query.platform)) {
      useRouter().replace("404");
    }

    const platformIconMap = {
      android: "mdi-android",
      ios: "mdi-apple",
      linux: "mdi-penguin",
      macos: "mdi-apple",
      windows: "mdi-microsoft-windows"
    };

    const hCaptcha = ref(null);

    const i18n = (relativePath, params) => {
      return $i18n.t("pages.oauth." + relativePath, params);
    };
    const authorize = () => {
      hCaptcha.value.execute();
    };

    const logger = (type, event) => {
      console.log(type, event);
    };

    return {
      product: query.product,
      platform: query.platform,
      platformIconMap,
      hCaptcha,
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
