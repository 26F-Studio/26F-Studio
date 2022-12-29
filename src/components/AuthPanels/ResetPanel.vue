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
        :placeholder="i18n('placeholders.email')"
        rounded
        type="email"
        :loading="emailInput.loading">
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
        :placeholder="i18n('placeholders.code')"
        rounded
        :loading="codeInput.loading">
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password" />
        </template>
        <template v-slot:append>
          <q-btn
            :disable="!emailInput.content || emailInput.error"
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
    <div>
      <div class="row items-center q-ml-lg q-mb-sm">
        <div class="label-text">
          {{ i18n("labels.password") }}
        </div>
        <q-chip
          class="q-ml-md"
          color="primary"
          outline>
          <q-avatar
            color="primary"
            icon="mdi-help"
            text-color="white" />
          {{ i18n("labels.passwordConstraints") }}
          <q-tooltip style="white-space: pre">
            {{ i18n("tooltips.passwordConstraints") }}
          </q-tooltip>
        </q-chip>
      </div>
      <q-input
        class="full-width"
        v-model="passwordInput.content"
        :error="passwordInput.error"
        :error-message="i18n('errors.password')"
        outlined
        :placeholder="i18n('placeholders.password')"
        rounded
        :type="showPassword ? 'text' : 'password'"
        :loading="passwordInput.loading">
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword" />
        </template>
      </q-input>
    </div>
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n("labels.confirmPassword") }}
      </div>
      <q-input
        class="full-width"
        v-model="passwordConfirmInput.content"
        :error="passwordConfirmInput.error"
        :error-message="i18n('errors.confirmPassword')"
        outlined
        :placeholder="i18n('placeholders.confirmPassword')"
        rounded
        :type="showPassword ? 'text' : 'password'"
        :loading="passwordConfirmInput.loading">
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword" />
        </template>
      </q-input>
    </div>
    <q-btn
      :label="i18n(`labels.verify`)"
      class="login-btn"
      :disable="!canSubmit"
      :loading="isSubmitLoading"
      no-caps
      size="lg"
      unelevated
      @click="submit">
    </q-btn>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { errorHandler, getPasswordHash } from "src/scripts/axios";
import { usePlayerStore } from "stores/player";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ResetPanel",
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
        await $api.auth.resetEmail(
          emailInput.content,
          codeInput.content,
          await getPasswordHash(emailInput.content, passwordInput.content)
        );
        isSubmitLoading.value = false;
        $player.logout();
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

.label-text {
  color: #636365;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.login-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
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

.unavailable-btn {
  @extend #disabled-btn;
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
