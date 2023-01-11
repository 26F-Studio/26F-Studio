<template>
  <div class="column q-gutter-y-lg">
    <div
      class="text-color-primary text-font-inter text-shadow-purple text-center"
      style="font-size: 2.5vw; font-weight: 800">
      {{ i18n("labels.title") }}
    </div>
    <div
      class="text-color-grey text-font-inter-slim text-center"
      style="font-size: 1.1vw; white-space: pre-line">
      {{ i18n("labels.description") }}
    </div>
    <div class="row justify-center">
      <div class="col-8 column q-gutter-y-md">
        <div
          class="text-color-grey text-font-inter-bold q-ml-md"
          style="font-size: 1.5vw">
          {{ i18n("labels.email") }}
        </div>
        <q-input
          v-model="emailInput.content"
          :error="emailInput.error"
          :error-message="i18n('errors.email')"
          :loading="emailInput.loading"
          clearable
          outlined
          rounded
          type="email" />
      </div>
    </div>
    <div class="row justify-center">
      <q-btn
        :disable="!canSubmit"
        :label="i18n(`labels.submit`)"
        class="btn-primary"
        no-caps
        padding="0.75vw 2.5vw"
        size="1.5vw"
        unelevated
        @click="$emit('go', +1)" />
    </div>
    <div v-if="false" class="column q-gutter-y-md">
      <div
        class="text-color-grey text-font-inter-slim text-center"
        style="font-size: 1.1vw; white-space: pre-line">
        {{ i18n("labels.other") }}
      </div>
      <div class="row justify-center q-gutter-x-md">
        <q-btn
          v-for="(item, index) in oauthMethods"
          :key="index"
          flat
          round
          @click="$router.push(item.to)">
          <q-avatar size="4vw">
            <q-img :src="item.file" />
          </q-avatar>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "EmailPanel",
  props: {
    email: {
      type: String,
      required: true
    }
  },
  emits: ["update:email", "go"],
  setup(props, { emit }) {
    const $i18n = useI18n({ useScope: "global" });

    const oauthMethods = [
      {
        file: require("/src/assets/oauth/apple.svg"),
        to: ""
      },
      {
        file: require("/src/assets/oauth/google.svg"),
        to: ""
      },
      {
        file: require("/src/assets/oauth/microsoft.svg"),
        to: ""
      },
      {
        file: require("/src/assets/oauth/github.svg"),
        to: ""
      },
      {
        file: require("/src/assets/oauth/twitter.svg"),
        to: ""
      }
    ];

    const email = computed({
      get: () => props.email,
      set: (value) => emit("update:email", value)
    });
    const emailInput = reactive({
      content: email,
      error: null,
      loading: false
    });
    emailInput.error = computed(() => {
      if (!emailInput.content) {
        return false;
      }
      return !emailInput.content.match(/^([a-zA-Z\d]+[-_.]?)+@([a-zA-Z\d]+[-_.]?)+\.[a-z]+$/);
    });

    const canSubmit = computed(() => {
      return emailInput.content && !emailInput.error;
    });

    const i18n = (relativePath) => {
      return $i18n.t("components.infoPanels.emailPanel." + relativePath);
    };

    return {
      oauthMethods,
      emailInput,
      canSubmit,
      i18n
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
