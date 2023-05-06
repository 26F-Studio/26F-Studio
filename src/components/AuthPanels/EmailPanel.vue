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
    <div class="row justify-center">
      <div class="col-10 col-md-8 column q-gutter-y-md">
        <div
          class="text-color-grey text-font-inter-bold q-ml-md"
          style="font-size: 1rem"
        >
          {{ i18n("labels.email") }}
        </div>
        <q-input
          v-model="emailInput.content"
          clearable
          :dense="!$q.screen.gt.sm"
          :error="emailInput.error"
          :loading="emailInput.loading"
          outlined
          rounded
          type="email"
          style="font-size: 0.7rem"
        >
          <template v-slot:error>
            <div class="text-font-inter" style="font-size: 0.5rem">
              {{ i18n("errors.email") }}
            </div>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center">
      <q-btn
        class="btn-primary"
        :disable="!canSubmit"
        :label="i18n(`labels.submit`)"
        :loading="isCodeLoading"
        no-caps
        padding="0.4rem 4rem"
        size="1rem"
        unelevated
        @click="submit"
      >
        <template v-slot:loading>
          <div
            class="row justify-center items-center text-color-white text-font-inter-bolder"
          >
            <q-spinner class="on-left" color="white" />
            {{ i18n("labels.sendingCode") }}
          </div>
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { errorHandler } from "src/scripts/axios";
import { useApi } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "EmailPanel",
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  emits: ["update:email", "submit"],
  setup(props, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $q = useQuasar();

    const email = computed({
      get: () => props.email,
      set: (value) => emit("update:email", value),
    });
    const emailInput = reactive({
      content: email,
      error: null,
      loading: false,
    });
    emailInput.error = computed(() => {
      if (!emailInput.content) {
        return false;
      }
      return !emailInput.content.match(
        /^([a-zA-Z\d]+[-_.]?)+@([a-zA-Z\d]+[-_.]?)+\.[a-z]+$/
      );
    });

    const canSubmit = computed(() => {
      return emailInput.content && !emailInput.error;
    });
    const isCodeLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.emailPanel." + relativePath);
    };

    const submit = async () => {
      isCodeLoading.value = true;
      await errorHandler(
        async () => {
          await $api.auth.verifyEmail(props.email);
          isCodeLoading.value = false;
          emit("submit");
        },
        $q,
        $i18n.t
      );
      isCodeLoading.value = false;
    };

    return {
      emailInput,
      canSubmit,
      isCodeLoading,
      i18n,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
