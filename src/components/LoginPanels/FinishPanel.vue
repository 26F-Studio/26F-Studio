<template>
  <div class="row justify-center q-gutter-x-lg">
    <div class="col-4 column q-gutter-y-lg">
      <q-btn
        :label="i18n('labels.profile')"
        color="primary"
        icon="mdi-account"
        no-caps
        outline
        rounded
        to="/profile"
      />
    </div>
    <div class="col-4 column q-gutter-y-lg">
      <q-btn
        :label="i18n('labels.home')"
        color="primary"
        icon="mdi-home"
        no-caps
        outline
        rounded
        to="/home"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "FinishPanel",
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const i18n = (relativePath) => {
      return $i18n.t("components.authPanels.finishPanel." + relativePath);
    };

    return {
      i18n,
    };
  },
});
</script>

<style scoped></style>
