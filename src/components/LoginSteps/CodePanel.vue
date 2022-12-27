<template>
  <div class="column q-gutter-y-lg">
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n("labels.email") }}
      </div>
      <q-input
        v-model="firstInput"
        :placeholder="i18n('placeholders.email')"
        class="full-width"
        outlined
        rounded
        type="email">
        <template v-slot:prepend>
          <q-icon name="mail"/>
        </template>
      </q-input>
    </div>
    <div>
      <div class="label-text q-ml-lg q-mb-sm">
        {{ i18n('labels.code') }}
      </div>
      <q-input
        v-model="secondInput"
        :placeholder="i18n('placeholders.code')"
        class="full-width"
        outlined
        rounded>
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password"/>
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
        @click="tabTo(-1)">
        <div class="btn-text">
          {{ i18n('labels.loginWithPassword') }}
        </div>
      </q-btn>
    </div>
    <q-btn
      :label="i18n('labels.login')"
      class="login-btn"
      :loading="isLoginLoading"
      no-caps
      size="lg"
      unelevated
      @click="login"/>
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
            @click="dismissBanner"/>
        </template>
      </q-banner>
    </q-slide-transition>
    <q-slide-transition>
      <q-skeleton
        v-if="!isBannerVisible"
        class="no-pointer-events"
        type="QBtn"
        style="opacity: 0"/>
    </q-slide-transition>
  </div>
</template>

<script>
import {useQuasar} from "quasar";
import {defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";

import {useApi} from "boot/axios";
import {useProject} from "boot/config";
import {errorHandler} from "src/scripts/axios";
import {usePlayerStore} from "stores/player";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "CodePanel",
  props: {
    modelValue: {
      type: Number,
    }
  },
  setup(props, {emit}) {
    const $api = useApi();
    const $i18n = useI18n({useScope: "global"});
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $router = useRouter();

    const firstInput = ref("");
    const secondInput = ref("");
    const showPassword = ref(false);
    const isCodeLoading = ref(false);
    const isLoginLoading = ref(false);
    const isBannerVisible = ref(true);

    if ($q.localStorage.has(`${useProject()}.once.loginWithCodeBanner`)) {
      isBannerVisible.value = !$q.localStorage.getItem(`${useProject()}.once.loginWithCodeBanner`);
    }

    const i18n = (relativePath) => {
      return $i18n.t("components.loginSteps.codePanel." + relativePath);
    };

    const tabTo = (delta) => {
      if (props.modelValue) {
        emit('update:modelValue', props.modelValue + delta);
      }
    };

    const getCode = async () => {
      isCodeLoading.value = true;
      await errorHandler(async () => {
        await $api.auth.verifyEmail(firstInput.value);
        isCodeLoading.value = false;
        $q.notify({
          type: 'positive',
          message: i18n('notifications.getCodeSuccess')
        });
      }, $q, $i18n.t);
      isCodeLoading.value = false;
    };

    const login = async () => {
      isLoginLoading.value = true;
      await errorHandler(async () => {
        const {code, data} = await $api.auth.loginEmailCode(firstInput.value, secondInput.value.trim());
        const {accessToken, refreshToken} = data;
        console.log(code);
        console.log(accessToken);
        console.log(refreshToken);
        $player.setToken(accessToken, refreshToken);
        await $player.update();
        isLoginLoading.value = false;
        $q.notify({
          type: 'positive',
          message: i18n('notifications.loginSuccess')
        });
        if (code === 201) {
          setTimeout(() => {
            tabTo(+1);
          }, 2000);
        } else {
          setTimeout(() => {
            $router.go(-1);
          }, 2000);
        }
      }, $q, $i18n.t);
      isLoginLoading.value = false;
    };

    const dismissBanner = () => {
      isBannerVisible.value = false;
      $q.localStorage.set(`${useProject()}.once.loginWithCodeBanner`, true);
    };
    return {
      firstInput,
      secondInput,
      showPassword,
      isCodeLoading,
      isLoginLoading,
      isBannerVisible,
      i18n,
      tabTo,
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
