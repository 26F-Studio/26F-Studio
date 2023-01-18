<template>
  <div class="column q-gutter-y-md" style="margin-bottom: 2.25rem">
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 0.75rem; white-space: pre-line">
      {{ i18n("labels.description") }}
    </div>
    <div
      class="row text-center items-center justify-center"
      style="font-size: 0.6rem; white-space: pre-line">
      <div class="text-color-grey text-font-inter-slim">
        {{ i18n("labels.resendBefore") }}
      </div>
      <q-btn
        :loading="isCodeLoading"
        dense
        flat
        no-caps
        size="0.6rem"
        @click="getCode">
        <div class="text-color-primary text-font-inter-bold">
          {{ i18n("labels.resend") }}
        </div>
      </q-btn>
      <div class="text-color-grey text-font-inter-slim">
        {{ i18n("labels.resendAfter") }}
      </div>
    </div>
    <div class="row justify-center full-width">
      <div class="col-10 col-md-8 column q-gutter-y-md">
        <div
          class="text-color-grey text-font-inter-bold q-ml-md"
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
    </div>
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 0.6rem; white-space: pre-line">
      {{ i18n("labels.reminder") }}
    </div>
    <div
      class="text-color-grey text-font-inter self-center"
      style="font-size: 0.5rem; white-space: pre-line">
      {{ i18n("labels.constraints") }}
    </div>
    <div class="row justify-center full-width">
      <div class="col-10 col-md-8 column q-gutter-y-lg">
        <div class="column q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1rem">
            {{ i18n("labels.password") }}
          </div>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="passwordInput.error"
            :loading="passwordInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded
            v-model="passwordInput.content"
            style="font-size: 0.7rem">
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
            <template v-slot:error>
              <div class="text-font-inter" style="font-size: 0.5rem">
                {{ i18n("errors.password") }}
              </div>
            </template>
          </q-input>
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1rem">
            {{ i18n("labels.confirmPassword") }}
          </div>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="passwordConfirmInput.error"
            :loading="passwordConfirmInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded
            v-model="passwordConfirmInput.content"
            style="font-size: 0.7rem">
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
            <template v-slot:error>
              <div class="text-font-inter" style="font-size: 0.5rem">
                {{ i18n("errors.confirmPassword") }}
              </div>
            </template>
          </q-input>
        </div>
        <div class="row justify-center">
          <q-btn
            :disable="!canSubmit"
            :label="i18n('labels.submit')"
            :loading="isSubmitLoading"
            class="btn-primary"
            no-caps
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="submit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { errorHandler, getPasswordHash } from "src/scripts/axios";

export default defineComponent({
  name: "SetupPanel",
  props: {
    email: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $q = useQuasar();
    const $router = useRouter();

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

    const passwordInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    passwordInput.error = computed(() => {
      if (!passwordInput.content) {
        return false;
      }
      return !passwordInput.content.match(
        RegExp("^(?!.*[^A-Za-z0-9#?!@$%^&*-]$)" +
          "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|" +
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-])|" +
          "(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])|" +
          "(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-]))" +
          ".{8,64}$")
      );
    });

    const passwordConfirmInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    passwordConfirmInput.error = computed(() => {
      if (!passwordConfirmInput.content) {
        return false;
      }
      return passwordConfirmInput.content !== passwordInput.content;
    });

    const canSubmit = computed(() => {
      return codeInput.content && !codeInput.error &&
        passwordInput.content && !passwordInput.error &&
        passwordConfirmInput.content && !passwordConfirmInput.error;
    });

    const showPassword = ref(false);
    const isCodeLoading = ref(false);
    const isSubmitLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.resetPanel." + relativePath);
    };

    const getCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(props.email);
        isCodeLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.codeSent")
        });
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.resetEmail(
          props.email,
          codeInput.content,
          await getPasswordHash(props.email, passwordInput.content)
        );
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.resetSuccess")
        });
        setTimeout(() => {
          $router.go(0);
        }, 2000);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      codeInput,
      passwordInput,
      passwordConfirmInput,
      canSubmit,
      showPassword,
      isCodeLoading,
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
</style>
