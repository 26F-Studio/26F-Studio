<template>
  <div class="column q-gutter-y-lg" style="margin-bottom: 2.25rem">
    <div
      class="text-color-primary text-font-inter-bolder text-shadow-purple text-center"
      style="font-size: 2rem">
      {{ i18n("labels.title") }}
    </div>
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 0.75rem; white-space: pre-line">
      {{ i18n("labels.description", { email: email }) }}
    </div>
    <div
      class="row text-center items-center justify-center"
      style="font-size: 0.75rem; white-space: pre-line">
      <div class="text-color-grey text-font-inter-slim">
        {{ i18n("labels.resendBefore") }}
      </div>
      <q-btn
        :loading="isCodeLoading"
        dense
        flat
        no-caps
        size="0.75rem"
        @click="getCode">
        <div class="text-color-primary text-font-inter-bold">
          {{ i18n("labels.resend") }}
        </div>
      </q-btn>
      <div class="text-color-grey text-font-inter-slim">
        {{ i18n("labels.resendAfter") }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-10 col-md-8 column q-gutter-y-lg">
        <div class="column q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-bolder q-ml-md"
            style="font-size: 1rem">
            {{ i18n("labels.code") }}
          </div>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="codeInput.error"
            :loading="codeInput.loading"
            outlined
            rounded
            v-model="codeInput.content"
            style="font-size: 0.7rem">
            <template v-slot:error>
              <div class="text-font-inter" style="font-size: 0.5rem">
                {{ i18n("errors.code") }}
              </div>
            </template>
          </q-input>
        </div>
        <div class="row justify-center q-my-lg">
          <q-btn
            :disable="!canSubmit"
            :label="i18n(`labels.submit`)"
            :loading="isSubmitLoading"
            class="btn-primary"
            no-caps
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="login" />
        </div>
        <div class="row justify-center">
          <q-btn
            dense
            flat
            no-caps
            size="0.75rem"
            @click="$emit('go', -1)">
            <div class="text-color-primary text-font-inter-bolder">
              {{ i18n("labels.loginWithPassword") }}
            </div>
          </q-btn>
        </div>
        <div class="row justify-center">
          <q-btn
            dense
            flat
            no-caps
            size="0.75rem"
            @click="$emit('go', -2)">
            <div class="text-color-primary text-font-inter-bolder">
              {{ i18n("labels.restart") }}
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { ResultCode, useApi } from "boot/axios";
import { errorHandler } from "src/scripts/axios";
import { usePlayerStore } from "stores/player";

export default defineComponent({
  name: "CodePanel",
  props: {
    code: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  emits: ["go"],
  setup(props, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $router = useRouter();

    const code = computed({
      get: () => props.code,
      set: (value) => emit("update:code", value)
    });
    const codeInput = reactive({
      content: code,
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
      return codeInput.content && !codeInput.error;
    });
    const isSubmitLoading = ref(false);
    const isCodeLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.loginPanels.codePanel." + relativePath);
    };

    const getCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(props.email);
        isCodeLoading.value = false;
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const login = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        const { code, data } = await $api.auth.loginEmailCode(props.email, codeInput.content);
        $player.accessToken = data.accessToken;
        await $player.update();
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.loginSuccess")
        });
        if (code === ResultCode.Continued) {
          setTimeout(() => {
            emit("go", +1);
          }, 2000);
        } else {
          setTimeout(() => {
            $router.go(-1);
          }, 2000);
        }
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      codeInput,
      canSubmit,
      isSubmitLoading,
      isCodeLoading,
      i18n,
      getCode,
      login
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
