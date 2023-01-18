<template>
  <div class="column q-gutter-y-lg" style="margin-bottom: 2.25rem">
    <div
      class="text-color-primary text-font-inter-bolder text-shadow-purple text-center"
      style="font-size: 2rem">
      {{ i18n("labels.title") }}
    </div>
    <div class="full-width row justify-center">
      <div class="col-10 col-md-8 column q-gutter-y-md">
        <div
          class="row q-ml-md text-color-grey"
          style="font-size: 1rem; white-space: pre">
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
            style="font-size: 1rem">
            {{ i18n("labels.password") }}
          </div>
          <q-space />
          <q-btn
            dense
            flat
            :loading="isResetLoading"
            no-caps
            size="0.65rem"
            @click="resetPassword">
            <template v-slot:loading>
              <div class="row justify-center items-center text-color-primary text-font-inter-bolder">
                <q-spinner class="on-left" color="primary" />
                {{ i18n("labels.sendingCode") }}
              </div>
            </template>
            <div class="text-color-primary text-font-inter-bolder">
              {{ i18n("labels.forgot") }}
            </div>
          </q-btn>
        </div>
        <q-input
          v-model="passwordInput.content"
          :dense="!$q.screen.gt.sm"
          :error="passwordInput.error"
          :loading="passwordInput.loading"
          :type="showPassword ? 'text' : 'password'"
          outlined
          rounded
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
      </div>
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
        @click="login" />
    </div>
    <div class="row justify-center q-mt-xl">
      <q-btn
        :loading="isCodeLoading"
        dense
        flat
        no-caps
        no-wrap
        size="0.75rem"
        @click="loginWithCode">
        <template v-slot:loading>
          <div class="row justify-center items-center text-color-primary text-font-inter-bolder">
            <q-spinner class="on-left" color="primary" />
            {{ i18n("labels.sendingCode") }}
          </div>
        </template>
        <div class="text-color-primary text-font-inter-bolder">
          {{ i18n("labels.loginWithCode") }}
        </div>
      </q-btn>
    </div>
    <div class="row justify-center">
      <q-btn
        dense
        flat
        no-caps
        size="0.75rem"
        @click="$emit('go', -1)">
        <div class="text-color-primary text-font-inter-bolder">
          {{ i18n("labels.restart") }}
        </div>
      </q-btn>
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
      return passwordInput.content.length < 8;
    });

    const canSubmit = computed(() => {
      return passwordInput.content && !passwordInput.error;
    });
    const isResetLoading = ref(false);
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

    const resetPassword = async () => {
      isResetLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(props.email);
        isResetLoading.value = false;
        $q.dialog({
          component: AuthDialog,
          componentProps: {
            type: "reset",
            email: props.email
          }
        });
      }, $q, $i18n.t);
      isResetLoading.value = false;
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
      isResetLoading,
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
