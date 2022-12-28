<template>
  <div class="column q-gutter-y-lg">
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n("labels.email") }}
      </div>
      <q-input
        class="full-width"
        :error="firstInput.error"
        :error-message="i18n('errors.firstInput')"
        :loading="firstInput.loading"
        outlined
        :placeholder="i18n('placeholders.email')"
        rounded
        type="email"
        v-model="firstInput.content">
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
        :error="secondInput.error"
        :error-message="i18n('errors.secondInput')"
        :loading="secondInput.loading"
        outlined
        :placeholder="i18n('placeholders.code')"
        rounded
        v-model="secondInput.content">
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password" />
        </template>
        <template v-slot:append>
          <q-btn
            :disable="!firstInput.content || firstInput.error"
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
        :error="thirdInput.error"
        :error-message="i18n('errors.thirdInput')"
        :loading="thirdInput.loading"
        outlined
        :placeholder="i18n('placeholders.password')"
        rounded
        :type="showPassword ? 'text' : 'password'"
        v-model="thirdInput.content">
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
        :error="fourthInput.error"
        :error-message="i18n('errors.fourthInput')"
        :loading="fourthInput.loading"
        outlined
        :placeholder="i18n('placeholders.confirmPassword')"
        rounded
        :type="showPassword ? 'text' : 'password'"
        v-model="fourthInput.content">
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

    const firstInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    firstInput.error = computed(() => {
      if (!firstInput.content) {
        return false;
      }
      return !firstInput.content.match(/^([a-zA-Z\d]+[-_.]?)+@([a-zA-Z\d]+[-_.]?)+\.[a-z]+$/);
    });
    const secondInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    secondInput.error = computed(() => {
      if (!secondInput.content) {
        return false;
      }
      return !secondInput.content.match(/^\d{8}$/);
    });
    const thirdInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    thirdInput.error = computed(() => {
      if (!thirdInput.content) {
        return false;
      }
      return !thirdInput.content.match(
        RegExp("^(?!.*[^A-Za-z0-9#?!@$%^&*-]$)" +
          "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|" +
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-])|" +
          "(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])|" +
          "(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-]))" +
          ".{8,64}$")
      );
    });
    const fourthInput = reactive({
      content: "",
      error: null,
      loading: false
    });
    fourthInput.error = computed(() => {
      if (!fourthInput.content) {
        return false;
      }
      return fourthInput.content !== thirdInput.content;
    });
    const canSubmit = computed(() => {
      return firstInput.content && !firstInput.error &&
        secondInput.content && !secondInput.error &&
        thirdInput.content && !thirdInput.error &&
        fourthInput.content && !fourthInput.error;
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
        await $api.auth.verifyEmail(firstInput.content);
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
          firstInput.content,
          secondInput.content,
          await getPasswordHash(firstInput.content, thirdInput.content)
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
      firstInput,
      secondInput,
      thirdInput,
      fourthInput,
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
