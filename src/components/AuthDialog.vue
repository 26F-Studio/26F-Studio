<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin hide-scrollbar"
      style="min-width: 50vw">
      <q-card-section>
        <div class="text-h6">{{ i18n(`labels.titles.${type}`) }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-xl q-my-lg">
        <DeactivatePanel v-if="type === 'deactivate'" />
        <ResetPanel v-if="type === 'reset'" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="i18n('labels.cancel')"
          @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import DeactivatePanel from "components/AuthPanels/DeactivatePanel.vue";
import ResetPanel from "components/AuthPanels/ResetPanel.vue";

export default defineComponent({
  name: "AuthDialog",
  components: { DeactivatePanel, ResetPanel },
  emits: [...useDialogPluginComponent.emits],
  props: {
    type: {
      type: String,
      options: ["deactivate", "migrate", "reset"],
      required: true
    },
    finishCallback: {
      type: Function,
      default: () => {
      }
    }
  },
  setup() {
    const { dialogRef, onDialogCancel, onDialogHide } = useDialogPluginComponent();
    const $i18n = useI18n({ useScope: "global" });

    const step = ref(1);

    const i18n = (relativePath) => {
      return $i18n.t("components.authDialog." + relativePath);
    };

    return {
      dialogRef,
      onDialogCancel,
      onDialogHide,
      step,
      i18n
    };
  }
});
</script>

<style scoped>

</style>
