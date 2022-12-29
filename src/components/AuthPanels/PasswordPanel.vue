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
        {{ i18n("labels.password") }}
      </div>
      <q-input
        :type="showPassword ? 'text' : 'password'"
        class="full-width"
        v-model="passwordInput.content"
        :error="passwordInput.error"
        :error-message="i18n('errors.password')"
        outlined
        :loading="passwordInput.loading"
        :placeholder="i18n('placeholders.password')"
        rounded>
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
    <div class="row justify-end">
      <q-btn
        flat
        no-caps
        @click="goTo(+1)">
        <div class="btn-text">
          {{ i18n("labels.loginWithCode") }}
        </div>
      </q-btn>
    </div>
    <q-btn
      :label="i18n('labels.login')"
      class="login-btn"
      :disable="!canSubmit"
      :loading="isSubmitLoading"
      no-caps
      size="lg"
      unelevated
      @click="login" />
    <q-btn
      flat
      no-caps
      @click="resetPassword">
      <div class="btn-text">
        {{ i18n("labels.forgot") }}
      </div>
    </q-btn>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { useApi } from "boot/axios";
import { errorHandler, getPasswordHash } from "src/scripts/axios";
import { usePlayerStore } from "stores/player";

import AuthDialog from "components/AuthDialog.vue";

export default defineComponent({
  name: "PasswordPanel",
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

    const canSubmit = computed(() => {
      return emailInput.content && !emailInput.error &&
        passwordInput.content && !passwordInput.error;
    });
    const showPassword = ref(false);
    const isSubmitLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.passwordPanel." + relativePath);
    };

    const goTo = (delta) => {
      if (props.modelValue) {
        emit("update:modelValue", props.modelValue + delta);
      }
    };

    const login = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        const { accessToken, refreshToken } = (await $api.auth.loginEmailPassword(
          emailInput.content,
          await getPasswordHash(emailInput.content, passwordInput.content)
        )).data;
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

    const resetPassword = () => {
      $q.dialog({
        component: AuthDialog,
        componentProps: {
          type: "reset"
        }
      });
    };
    return {
      emailInput,
      passwordInput,
      showPassword,
      canSubmit,
      isSubmitLoading,
      i18n,
      goTo,
      login,
      resetPassword
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
