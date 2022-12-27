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
        {{ i18n('labels.password') }}
      </div>
      <q-input
        v-model="secondInput"
        :placeholder="i18n('placeholders.password')"
        :type="showPassword ? 'text' : 'password'"
        class="full-width"
        outlined
        rounded>
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password"/>
        </template>
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"/>
        </template>
      </q-input>
    </div>
    <div class="row justify-end">
      <q-btn
        flat
        no-caps
        @click="tabTo(+1)">
        <div class="btn-text">
          {{ i18n('labels.loginWithCode') }}
        </div>
      </q-btn>
    </div>
    <q-btn
      :label="i18n('labels.login')"
      class="login-btn"
      :loading="isLoading"
      no-caps
      size="lg"
      unelevated
      @click="login"/>
    <q-btn
      dense
      disable
      flat
      no-caps>
      <div class="btn-text">
        {{ i18n("labels.forgot") }}
      </div>
    </q-btn>
  </div>
</template>

<script>
import {argon2id} from 'hash-wasm';
import {useQuasar} from "quasar";
import {defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";

import {useApi} from "boot/axios";
import {errorHandler} from "src/scripts/axios";

export default defineComponent({
  name: "PasswordPanel",
  props: {
    modelValue: {
      type: Number,
    }
  },
  setup(props, {emit}) {
    const $api = useApi();
    const $i18n = useI18n({useScope: "global"});
    const $q = useQuasar();

    const firstInput = ref("");
    const secondInput = ref("");
    const showPassword = ref(false);
    const isLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.loginSteps.passwordPanel." + relativePath);
    };

    const tabTo = (delta) => {
      if (props.modelValue) {
        emit('update:modelValue', props.modelValue + delta);
      }
    };

    const login = async () => {
      isLoading.value = true;
      await errorHandler(async () => {
        const {data: seed} = await $api.auth.seedEmail(firstInput.value);
        const hashedPassword = await argon2id({
          password: secondInput.value.trim(),
          salt: seed,
          iterations: 256,
          parallelism: 16,
          memorySize: 512,
          hashLength: 64,
          outputType: 'hex',
        });
        const {accessToken, refreshToken} = (await $api.auth.loginEmailPassword(firstInput.value, hashedPassword)).data;
        console.log(accessToken, refreshToken);
      }, $q, $i18n.t);
      isLoading.value = false;
    };
    return {
      firstInput,
      secondInput,
      showPassword,
      isLoading,
      i18n,
      tabTo,
      login
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
