<!-- TODO: Update design -->
<template>
  <div class="column q-gutter-y-lg">
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 1.1vw; white-space: pre-line">
      {{ i18n("labels.description") }}
    </div>
    <div
      class="text-color-grey text-font-inter-slim self-center"
      style="font-size: 0.9vw; white-space: pre-line">
      {{ i18n("labels.constraints") }}
    </div>
    <div class="row justify-center">
      <div class="col-8 column q-gutter-y-lg">
        <div class="column q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1.5vw">
            {{ i18n("labels.email") }}
          </div>
          <q-input
            v-model="emailInput.content"
            :error="emailInput.error"
            :error-message="i18n('errors.email')"
            :loading="emailInput.loading"
            clearable
            outlined
            rounded
            type="email">
            <template v-slot:append>
              <q-btn
                :loading="isCodeLoading"
                flat
                no-caps
                no-wrap
                rounded
                size="1vw"
                @click="getCode">
                <div class="text-color-primary text-font-inter-bold">
                  {{ i18n("labels.getCode") }}
                </div>
              </q-btn>
            </template>
          </q-input>
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1.5vw">
            {{ i18n("labels.code") }}
          </div>
          <q-input
            v-model="codeInput.content"
            :error="codeInput.error"
            :error-message="i18n('errors.code')"
            :loading="codeInput.loading"
            outlined
            rounded />
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1.5vw">
            {{ i18n("labels.password") }}
          </div>
          <q-input
            v-model="passwordInput.content"
            :error="passwordInput.error"
            :error-message="i18n('errors.password')"
            :loading="passwordInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
          </q-input>
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1.5vw">
            {{ i18n("labels.confirmPassword") }}
          </div>
          <q-input
            v-model="passwordConfirmInput.content"
            :error="passwordConfirmInput.error"
            :error-message="i18n('errors.confirmPassword')"
            :loading="passwordConfirmInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword" />
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
            padding="0.75vw 2.5vw"
            size="1.5vw"
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
  setup() {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
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
      return emailInput.content && !emailInput.error &&
        codeInput.content && !codeInput.error &&
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
        await $api.auth.verifyEmail(emailInput.content);
        isCodeLoading.value = false;
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.resetEmail(
          emailInput.content,
          codeInput.content,
          await getPasswordHash(emailInput.content, passwordInput.content)
        );
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.resetSuccess")
        });
        $router.go(0);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      emailInput,
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
