<template>
  <div class="column q-gutter-y-lg">
    <q-slide-transition>
      <q-banner
        v-if="isBannerVisible"
        class="bg-orange text-white"
        inline-actions
        rounded>
        {{ i18n("labels.notice") }}
        <template v-slot:action>
          <q-icon
            class="cursor-pointer"
            name="close"
            @click="dismissBanner" />
        </template>
      </q-banner>
    </q-slide-transition>
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n("labels.email") }}
      </div>
      <q-input
        class="full-width"
        v-model="emailInput.content"
        :error="emailInput.error"
        :error-message="i18n('errors.email')"
        outlined
        :loading="emailInput.loading"
        rounded
        :placeholder="i18n('placeholders.email')"
        type="email">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>
    </div>
    <q-slide-transition>
      <div v-show="isSent" class="q-ml-lg btn-text">
        {{ i18n("notifications.getCodeSuccess") }}
      </div>
    </q-slide-transition>
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n("labels.code") }}
      </div>
      <q-input
        class="full-width"
        v-model="codeInput.content"
        :error="codeInput.error"
        :error-message="i18n('errors.code')"
        outlined
        :loading="codeInput.loading"
        :placeholder="i18n('placeholders.code')"
        rounded>
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password" />
        </template>
        <template v-slot:append>
          <q-btn
            flat
            :loading="isCodeLoading"
            no-caps
            rounded
            @click="getCode">
            <div class="btn-text">
              {{ i18n(`labels.getCode`) }}
            </div>
          </q-btn>
        </template>
      </q-input>
    </div>
    <div class="row justify-end">
      <q-btn
        flat
        no-caps
        @click="goTo(-1)">
        <div class="btn-text">
          {{ i18n("labels.loginWithPassword") }}
        </div>
      </q-btn>
    </div>
    <q-btn
      :label="i18n(`labels.login`)"
      class="primary-btn"
      :disable="!canSubmit"
      :loading="isSubmitLoading"
      no-caps
      size="lg"
      unelevated
      @click="login" />
    <q-slide-transition>
      <q-skeleton
        v-if="!isBannerVisible"
        class="no-pointer-events invisible"
        type="QBtn" />
    </q-slide-transition>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { ResultCode, useApi } from "boot/axios";
import { useProject } from "boot/config";
import { errorHandler } from "src/scripts/axios";
import { usePlayerStore } from "stores/player";

export default defineComponent({
  name: "CodePanel",
  props: {
    modelValue: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $router = useRouter();

    const emailInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    emailInput.error = computed(() => {
      if (!emailInput.content) {
        return false;
      }
      return !emailInput.content.match(/^([a-zA-Z\d]+[-_.]?)+@([a-zA-Z\d]+[-_.]?)+\.[a-z]+$/);
    });

    const codeInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    codeInput.error = computed(() => {
      if (!codeInput.content) {
        return false;
      }
      return !codeInput.content.match(/^\d{8}$/);
    });

    const canSubmit = computed(() => {
      return emailInput.content && !emailInput.error &&
        codeInput.content && !codeInput.error;
    });
    const isCodeLoading = ref(false);
    const isSent = ref(false);
    const isSubmitLoading = ref(false);
    const isBannerVisible = ref(true);

    if ($q.localStorage.has(`${useProject()}.once.loginWithCodeBanner`)) {
      isBannerVisible.value = !$q.localStorage.getItem(`${useProject()}.once.loginWithCodeBanner`);
    }

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.codePanel." + relativePath);
    };

    const goTo = (delta) => {
      if (props.modelValue) {
        emit("update:modelValue", props.modelValue + delta);
      }
    };

    const getCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(emailInput.content);
        isCodeLoading.value = false;
        isSent.value = true;
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const login = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        const { code, data } = await $api.auth.loginEmailCode(emailInput.content, codeInput.content);
        $player.accessToken = data.accessToken;
        await $player.update();
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.loginSuccess")
        });
        if (code === ResultCode.Continued) {
          $q.sessionStorage.set(`${useProject()}.persist.email`, emailInput.content);
          $q.sessionStorage.set(`${useProject()}.persist.code`, codeInput.content);
          setTimeout(() => {
            $q.sessionStorage.remove(`${useProject()}.persist.email`);
            $q.sessionStorage.remove(`${useProject()}.persist.code`);
          }, 30 * 60 * 1000);
          setTimeout(() => {
            goTo(+1);
          }, 2000);
        } else {
          setTimeout(() => {
            $router.go(-1);
          }, 2000);
        }
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    const dismissBanner = () => {
      isBannerVisible.value = false;
      $q.localStorage.set(`${useProject()}.once.loginWithCodeBanner`, true);
    };
    return {
      emailInput,
      codeInput,
      canSubmit,
      isCodeLoading,
      isSent,
      isSubmitLoading,
      isBannerVisible,
      i18n,
      goTo,
      getCode,
      login,
      dismissBanner
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.label-text {
  color: #636365;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.btn-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 2vw 4vw rgba(48, 0, 240, 0.31);
  font-family: 'inter', sans-serif;
  font-weight: 800;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
