<template>
  <div class="row justify-center">
    <div class="col-8 column q-gutter-y-lg">
      <div
        class="text-color-primary text-font-inter text-shadow-purple text-center"
        style="font-size: 2.5vw; font-weight: 800">
        {{ i18n("labels.title") }}
      </div>
      <div class="column q-gutter-y-md">
        <div
          class="row q-ml-md text-color-grey"
          style="font-size: 1.5vw; white-space: pre">
          <div class="text-font-inter-bold">
            {{ i18n("labels.email") }}
          </div>
          <div class="text-font-inter">
            {{ email }}
          </div>
        </div>
        <div class="row items-center q-ml-md">
          <div
            class="text-color-grey text-font-inter-bold"
            style="font-size: 1.5vw">
            {{ i18n("labels.password") }}
          </div>
          <q-space />
          <q-btn
            dense
            flat
            no-caps
            size="0.75vw"
            @click="resetPassword">
            <div class="text-color-primary text-font-inter-bold">
              {{ i18n("labels.forgot") }}
            </div>
          </q-btn>
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
          @click="login" />
      </div>
      <div class="row justify-center q-mt-xl">
        <q-btn
          :loading="isCodeLoading"
          dense
          flat
          no-caps
          no-wrap
          size="1.25vw"
          @click="loginWithCode">
          <template v-slot:loading>
            <div class="row justify-center items-center text-color-primary text-font-inter-bold">
              <q-spinner class="on-left" color="primary" />
              {{ i18n("labels.sendingCode") }}
            </div>
          </template>
          <div class="text-color-primary text-font-inter-bold">
            {{ i18n("labels.loginWithCode") }}
          </div>
        </q-btn>
      </div>
      <div class="row justify-center">
        <q-btn
          dense
          flat
          no-caps
          size="1.25vw"
          @click="$emit('go', -1)">
          <div class="text-color-primary text-font-inter-bold">
            {{ i18n("labels.restart") }}
          </div>
        </q-btn>
      </div>
    </div>
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
      return passwordInput.content && !passwordInput.error;
    });
    const showPassword = ref(false);
    const isSubmitLoading = ref(false);
    const isCodeLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.loginPanels.passwordPanel." + relativePath);
    };

    const login = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        $player.accessToken = (await $api.auth.loginEmailPassword(
          props.email,
          await getPasswordHash(props.email, passwordInput.content)
        )).data.accessToken;
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

    const loginWithCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(props.email);
        isCodeLoading.value = false;
        emit("go", +1);
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    return {
      passwordInput,
      showPassword,
      canSubmit,
      isSubmitLoading,
      isCodeLoading,
      i18n,
      login,
      resetPassword,
      loginWithCode
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
