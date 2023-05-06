<template>
  <div class="column q-gutter-y-lg" style="margin-bottom: 2.25rem">
    <div
      class="text-color-primary text-font-inter-bolder text-shadow-purple text-center"
      style="font-size: 2rem"
    >
      {{ i18n("labels.title") }}
    </div>
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 0.75rem; white-space: pre-line"
    >
      {{ i18n("labels.description") }}
    </div>
    <div
      class="text-color-grey text-font-inter-slim self-center"
      style="font-size: 0.6rem; white-space: pre-line"
    >
      {{ i18n("labels.constraints") }}
    </div>
    <div class="row justify-center">
      <div class="col-10 col-md-8 column q-gutter-y-lg">
        <div class="column q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-bolder q-ml-md"
            style="font-size: 1rem"
          >
            {{ i18n("labels.password") }}
          </div>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="passwordInput.error"
            :loading="passwordInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded
            v-model="passwordInput.content"
            style="font-size: 0.7rem"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
            <template v-slot:error>
              <div class="text-font-inter" style="font-size: 0.5rem">
                {{ i18n("errors.password") }}
              </div>
            </template>
          </q-input>
          <div
            class="text-color-grey text-font-inter-bolder q-ml-md"
            style="font-size: 1rem"
          >
            {{ i18n("labels.confirmPassword") }}
          </div>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="passwordConfirmInput.error"
            :loading="passwordConfirmInput.loading"
            :type="showPassword ? 'text' : 'password'"
            outlined
            rounded
            v-model="passwordConfirmInput.content"
            style="font-size: 0.7rem"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
            <template v-slot:error>
              <div class="text-font-inter" style="font-size: 0.5rem">
                {{ i18n("errors.confirmPassword") }}
              </div>
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
            padding="0.4rem 1.25rem"
            size="1rem"
            unelevated
            @click="submit"
          />
        </div>
        <div class="row justify-center q-mt-xl">
          <q-btn flat no-caps size="0.75rem" @click="$emit('go', +1)">
            <div class="text-color-primary text-font-inter-bolder">
              {{ i18n("labels.maybeLater") }}
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { errorHandler, getPasswordHash } from "src/scripts/axios";

export default defineComponent({
  name: "SetupPanel",
  props: {
    code: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $q = useQuasar();

    const passwordInput = reactive({
      content: "",
      error: null,
      loading: false,
    });
    passwordInput.error = computed(() => {
      if (!passwordInput.content) {
        return false;
      }
      return !passwordInput.content.match(
        RegExp(
          "^(?!.*[^A-Za-z0-9#?!@$%^&*-_]$)" +
            "((?=.*[a-z])(?=.*[A-Z])|" +
            "(?=.*[a-z])(?=.*[0-9])|" +
            "(?=.*[a-z])(?=.*[#?!@$%^&*-_])|" +
            "(?=.*[A-Z])(?=.*[0-9])|" +
            "(?=.*[A-Z])(?=.*[#?!@$%^&*-_])|" +
            "(?=.*[0-9])(?=.*[#?!@$%^&*-_]))" +
            ".{8,64}$"
        )
      );
    });

    const passwordConfirmInput = reactive({
      content: "",
      error: null,
      loading: false,
    });
    passwordConfirmInput.error = computed(() => {
      if (!passwordConfirmInput.content) {
        return false;
      }
      return passwordConfirmInput.content !== passwordInput.content;
    });

    const canSubmit = computed(() => {
      return (
        passwordInput.content &&
        !passwordInput.error &&
        passwordConfirmInput.content &&
        !passwordConfirmInput.error
      );
    });

    const showPassword = ref(false);
    const isSubmitLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.loginPanels.setupPanel." + relativePath);
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      await errorHandler(
        async () => {
          await $api.auth.resetEmail(
            props.email,
            props.code,
            await getPasswordHash(props.email, passwordInput.content)
          );
          isSubmitLoading.value = false;
          $q.notify({
            type: "positive",
            message: i18n("notifications.setupSuccess"),
          });
          emit("go", +1);
        },
        $q,
        $i18n.t
      );
      isSubmitLoading.value = false;
    };

    return {
      passwordInput,
      passwordConfirmInput,
      canSubmit,
      showPassword,
      isSubmitLoading,
      i18n,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
