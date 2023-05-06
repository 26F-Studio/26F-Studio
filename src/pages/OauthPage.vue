<template>
  <q-page
    :class="$q.screen.gt.md ? 'flex-center' : 'flex-block'"
    class="flex column"
  >
    <BackgroundImage
      :class="$q.screen.gt.md ? 'absolute-full' : undefined"
      :full-height="$q.screen.gt.md"
      mask
      :mask-end="maskEnd"
      :mask-position="$q.screen.gt.md ? 'left' : 'top'"
      :mask-start="maskStart"
    >
      <div class="bg-transparent fit row items-center">
        <div
          class="col-grow col-lg-4 text-center text-color-white text-font-galaxy-oblique-bold"
          style="font-size: 5rem; line-height: 5rem; white-space: pre-wrap"
        >
          {{ i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div class="row justify-center full-width">
      <div
        :class="$q.screen.gt.md ? 'offset-4 offset-lg-5 col-6' : 'col-grow'"
        class="column items-center q-gutter-y-xl"
      >
        <div
          class="text-color-primary text-font-inter-bolder text-shadow-purple text-center"
          style="font-size: 2rem; line-height: 200%"
        >
          {{
            i18n(`labels.title`, {
              product: i18n(`labels.products.${product}`),
            })
          }}
        </div>
        <div class="row items-center q-gutter-x-lg">
          <q-avatar
            size="5rem"
            style="box-shadow: 0 1px 5px rgba(18, 20, 34, 0.8)"
          >
            <img
              :src="product ? require(`assets/products/${product}.png`) : null"
              alt="app"
            />
          </q-avatar>
          <svg
            width="4rem"
            viewBox="0 0 104 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM103.061 13.0607C103.646 12.4749 103.646 11.5251 103.061 10.9393L93.5147 1.3934C92.9289 0.807611 91.9792 0.807611 91.3934 1.3934C90.8076 1.97919 90.8076 2.92893 91.3934 3.51472L99.8787 12L91.3934 20.4853C90.8076 21.0711 90.8076 22.0208 91.3934 22.6066C91.9792 23.1924 92.9289 23.1924 93.5147 22.6066L103.061 13.0607ZM2 13.5H102V10.5H2V13.5Z"
              fill="#C2C2C2"
            />
            <path
              d="M102 46.5C102.828 46.5 103.5 47.1716 103.5 48C103.5 48.8284 102.828 49.5 102 49.5V46.5ZM0.939339 49.0607C0.353554 48.4749 0.353554 47.5251 0.939339 46.9393L10.4853 37.3934C11.0711 36.8076 12.0208 36.8076 12.6066 37.3934C13.1924 37.9792 13.1924 38.9289 12.6066 39.5147L4.12132 48L12.6066 56.4853C13.1924 57.0711 13.1924 58.0208 12.6066 58.6066C12.0208 59.1924 11.0711 59.1924 10.4853 58.6066L0.939339 49.0607ZM102 49.5H2V46.5H102V49.5Z"
              fill="#C2C2C2"
            />
          </svg>
          <q-card
            class="bg-white"
            style="border-radius: 50%; height: 5rem; width: 5rem"
          >
            <div
              class="text-color-primary text-font-galaxy-slim text-shadow-purple absolute-center"
              style="font-size: 4.5rem; top: 2.125rem"
            >
              {{ "\u{0FFFFF}" }}
            </div>
          </q-card>
        </div>
        <div class="column items-center q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-slim text-center"
            style="font-size: 0.75rem; white-space: pre-line"
          >
            {{
              i18n("labels.description", {
                product: i18n(`labels.products.${product}`),
              })
            }}
          </div>
          <div class="row no-wrap">
            <div
              class="offset-2 text-color-grey text-font-inter-bold"
              style="font-size: 0.75rem; white-space: pre"
            >
              {{ i18n("labels.permissions.common") }}
            </div>
            <div
              class="col-6 text-color-grey text-font-inter-slim"
              style="font-size: 0.75rem; white-space: pre-line"
            >
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
            to="/home"
          />
          <q-btn
            :label="i18n(`labels.confirm`)"
            :loading="isSubmitLoading"
            class="btn-primary"
            no-caps
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="authorize"
          />
        </div>
      </div>
    </div>
    <q-dialog ref="dialog" persistent>
      <q-card
        class="q-dialog-plugin hide-scrollbar"
        style="min-width: 20rem; max-width: 90vw"
      >
        <q-card-section>
          <div class="column items-center q-gutter-y-md">
            <div
              class="text-color-grey text-font-inter text-center"
              style="font-size: 0.75rem; white-space: pre"
            >
              {{ i18n("labels.copySuccess") }}
            </div>
            <div class="row justify-center items-center">
              <div
                class="text-color-grey text-font-inter"
                style="font-size: 0.75rem; white-space: pre"
              >
                {{ i18n("labels.manualCopyBefore") }}
              </div>
              <q-btn dense flat no-caps size="0.75rem" @click="showTokens">
                <div class="text-color-primary text-font-inter-bolder">
                  {{ i18n("labels.manualCopy") }}
                </div>
              </q-btn>
              <div
                class="text-color-grey text-font-inter"
                style="font-size: 0.75rem; white-space: pre"
              >
                {{ i18n("labels.manualCopyAfter") }}
              </div>
            </div>
          </div>
          <q-slide-transition>
            <div
              v-if="isTokensVisible"
              class="row justify-center q-mb-xl q-mb-lg-none z-max"
            >
              <div
                class="col-10 col-sm-8 col-md-6 text-color-blue text-font-inter"
                style="font-size: 0.75rem; word-break: break-all"
              >
                {{ copyTokens }}
              </div>
            </div>
          </q-slide-transition>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { copyToClipboard, useQuasar } from "quasar";
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useReCaptcha } from "vue-recaptcha-v3";
import { useRoute, useRouter } from "vue-router";

import { ResultCode, useApi } from "boot/axios";
import { useProducts } from "boot/config";
import { usePlayerStore } from "stores/player";

import BackgroundImage from "components/BackgroundImage.vue";
import { errorHandler } from "src/scripts/axios";

export default defineComponent({
  name: "OauthPage",
  components: { BackgroundImage },
  emits: ["scrollTo"],
  setup() {
    const $api = useApi();
    const $bus = inject("bus");
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
    const copyTokens = ref(
      "s5d65f76g87h98j0k09h8g7f6d5s4a23s45d6f7g8hj98h78g6fg8"
    );
    const isTokensVisible = ref(false);
    const dialog = ref(null);

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

    const showTokens = () => {
      isTokensVisible.value = true;
      setTimeout(() => $bus.emit("scrollTo", 1.0, 200), 500);
    };

    const authorize = async () => {
      isSubmitLoading.value = true;
      await $reCaptcha.recaptchaLoaded();
      const token = await $reCaptcha.executeRecaptcha("login");
      await errorHandler(
        async () => {
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
            message: i18n("notifications.submitSuccess"),
          });
          copyTokens.value = $player.accessToken + data["oauthToken"];
          try {
            await copyToClipboard(`${copyTokens.value}`);
          } catch (e) {
            console.log(e);
            showTokens();
          }
          dialog.value.show();
        },
        $q,
        $i18n.t
      );
      isSubmitLoading.value = false;
    };

    return {
      product: query.product,
      isSubmitLoading,
      copyTokens,
      isTokensVisible,
      dialog,
      maskEnd,
      maskStart,
      i18n,
      authorize,
      showTokens,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
