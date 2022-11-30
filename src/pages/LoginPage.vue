<template>
  <q-page class="flex flex-center row">
    <BackgroundImage
      class="absolute-full"
      full-height
      mask
      mask-position="left"
      :mask-start="{ratio: 0.3, control: [0.3, 0.2]}"
      :mask-end="{ratio: 0.4, control: [0.4, 0.8]}">
      <div class="bg-transparent fit row">
        <div class="col-4 row items-center q-pa-md">
          <div class="header-text">
            {{ i18n("labels.header") }}
          </div>
        </div>
      </div>
    </BackgroundImage>
    <div class="offset-4 col-grow row justify-center q-pa-md">
      <div class="col-6 column q-gutter-y-xl">
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
              <q-icon name="mail" />
            </template>
          </q-input>
        </div>
        <div>
          <div class="label-text q-ml-lg q-mb-sm">
            {{ i18n("labels.password") }}
          </div>
          <q-input
            v-model="secondInput"
            :placeholder="i18n('placeholders.password')"
            :type="showPassword ? 'text' : 'password'"
            class="full-width"
            outlined
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
        <div class="row justify-between">
          <q-checkbox
            v-model="rememberMe"
            :label="i18n('labels.rememberMe')"
            disable />
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
        <q-btn
          :label="i18n('labels.login')"
          class="login-btn"
          disable
          no-caps
          size="lg"
          unelevated />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";

export default defineComponent({
  name: "LoginPage",
  components: { BackgroundImage },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const firstInput = ref("");
    const secondInput = ref("");
    const showPassword = ref(false);
    const rememberMe = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    return {
      firstInput,
      secondInput,
      showPassword,
      rememberMe,
      i18n
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.header-text {
  color: #F1F2F3;
  font-family: 'galaxy-sans-oblique', sans-serif;
  font-weight: 800;
  font-size: 8vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}

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
