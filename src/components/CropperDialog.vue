<template>
  <q-dialog
    ref="dialogRef"
    style="min-width: 50vw"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar full-width" style="min-width: 35vw">
      <q-card-section>
        <div class="text-h6">{{ i18n("labels.title") }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-xl q-my-lg">
        <Cropper />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="i18n('labels.cancel')"
          flat
          @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { defineComponent } from "vue";
import { Cropper } from "vue-advanced-cropper";
import { useI18n } from "vue-i18n";

import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  name: "CropperDialog",
  components: { Cropper },
  emits: [...useDialogPluginComponent.emits],
  props: {
    image: {
      type: String
    }
  },
  setup(props) {
    const { dialogRef, onDialogCancel, onDialogHide } = useDialogPluginComponent();
    const $i18n = useI18n({ useScope: "global" });

    const i18n = (relativePath) => {
      return $i18n.t("components.cropperDialog." + relativePath);
    };

    return {
      dialogRef,
      onDialogHide,
      i18n,
      onDialogCancel
    };
  }
});
</script>

<style scoped>

</style>
