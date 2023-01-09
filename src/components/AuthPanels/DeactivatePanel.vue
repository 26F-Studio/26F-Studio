<template>
  <div class="column q-gutter-y-lg">
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
    <q-btn
      :label="i18n(`labels.verify`)"
      class="primary-btn"
      :disable="!canSubmit"
      :loading="isSubmitLoading"
      no-caps
      size="lg"
      unelevated
      @click="showDialog = true">
      <q-dialog
        persistent
        v-model="showDialog">
        <q-card
          class="bg-negative text-white"
          style="font-family: 'Inter', sans-serif;">
          <q-card-section>
            <div class="text-h6">{{ i18n("labels.holdOn") }}</div>
          </q-card-section>
          <q-card-section>
            {{ i18n("labels.warning") }}
          </q-card-section>
          <q-card-section>
            <q-card class="bg-warning text-dark">
              <q-card-section>
                {{ i18n("labels.notice") }}
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-actions class="row justify-end q-gutter-x-xl">
            <q-btn
              flat
              :label="i18n('labels.confirm')"
              no-caps
              v-close-popup
              @click="submit" />
            <q-btn
              color="primary"
              :label="i18n('labels.cancel')"
              no-caps
              v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-btn>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { errorHandler } from "src/scripts/axios";
import { usePlayerStore } from "stores/player";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DeactivatePanel",
  setup() {
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
    const showDialog = ref(false);
    const isSubmitLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.deactivatePanel." + relativePath);
    };

    const getCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(emailInput.content);
        isCodeLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.getCodeSuccess")
        });
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        const { code, data } = await $api.auth.loginEmailCode(emailInput.content, codeInput.content);
        const { accessToken, refreshToken } = data;
        console.log(code);
        console.log(accessToken);
        console.log(refreshToken);
        $player.setToken(accessToken, refreshToken);
        await $player.update();
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.loginSuccess")
        });
        setTimeout(() => {
          $router.go(-1);
        }, 2000);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      emailInput,
      codeInput,
      canSubmit,
      isCodeLoading,
      showDialog,
      isSubmitLoading,
      i18n,
      getCode,
      submit
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
