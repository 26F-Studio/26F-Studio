<template>
  <div class="column q-gutter-y-xl">
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
        {{ i18n(`labels.${usePassword ? 'password' : 'code'}`) }}
      </div>
      <q-input
        v-model="secondInput"
        :placeholder="i18n(`placeholders.${usePassword ? 'password' : 'code'}`)"
        :type="(usePassword && !showPassword) ? 'password' : 'text'"
        class="full-width"
        outlined
        rounded>
        <template v-slot:prepend>
          <q-icon name="mdi-form-textbox-password"/>
        </template>
        <template v-slot:append>
          <q-icon
            v-if="usePassword"
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"/>
        </template>
      </q-input>
    </div>
    <div class="row justify-between">
      <q-checkbox
        v-model="rememberMe"
        :label="i18n('labels.rememberMe')"
        disable/>
      <q-btn
        dense
        flat
        no-caps
        @click="usePassword = !usePassword">
        <div class="btn-text">
          {{ i18n(`labels.loginWith${usePassword ? 'Password' : 'Code'}`)}}
        </div>
      </q-btn>
    </div>
    <q-btn
      :label="i18n('labels.login')"
      class="login-btn"
      :loading="isLoading"
      no-caps
      size="lg"
      unelevated/>
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
import {defineComponent, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useApi} from "boot/axios";

export default defineComponent({
  name: "LoginPanel",
  setup() {
    const $i18n = useI18n({useScope: "global"});
    const $api = useApi();

    const usePassword = ref(false);
    const firstInput = ref("");
    const secondInput = ref("");
    const showPassword = ref(false);
    const rememberMe = ref(false);
    const isLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.loginPanel." + relativePath);
    };

    const login = async () => {
      isLoading.value = true;
      if (usePassword.value) {

      }
    };
    return {
      usePassword,
      firstInput,
      secondInput,
      showPassword,
      rememberMe,
      isLoading,
      i18n
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
