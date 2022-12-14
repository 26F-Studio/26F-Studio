<template>
  <q-dialog
    ref="dialogRef"
    style="min-width: 50vw"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar full-width" style="min-width: 35vw">
      <q-card-section>
        <q-card-section class="justify-between" horizontal>
          <div class="text-h6">{{ i18n("labels.title") }}</div>
          <q-file
            v-model="imageFiles"
            :label="i18n('labels.chooseImage')"
            accept="image/*"
            class="col-6 ellipsis"
            outlined
            rounded
            @rejected="onRejected"
            @update:model-value="onFileChange" />
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-responsive :ratio="1">
        <div class="row justify-center absolute-full">
          <div v-if="!image" class="self-center text-grey label-text">
            {{ i18n("labels.noImage") }}
          </div>
        </div>
        <Cropper
          ref="cropper"
          :src="image"
          :stencil-component="CircleStencil" />
      </q-responsive>
      <q-separator />
      <q-card-actions align="between">
        <q-btn
          class="primary-btn"
          icon="mdi-flip-horizontal"
          round
          unelevated
          @click="flip(true,false)" />
        <q-btn
          class="primary-btn"
          icon="mdi-flip-vertical"
          round
          unelevated
          @click="flip(false,true)" />
        <q-btn
          class="primary-btn"
          icon="mdi-rotate-left"
          round
          unelevated
          @click="rotate(-90)" />
        <q-btn
          class="primary-btn"
          icon="mdi-rotate-right"
          round
          unelevated
          @click="rotate(90)" />
        <q-btn
          class="primary-btn"
          icon="mdi-magnify-minus-outline"
          round
          unelevated
          @click="zoom(0.5)" />
        <q-btn
          class="primary-btn"
          icon="mdi-magnify-plus-outline"
          round
          unelevated
          @click="zoom(2)" />
        <q-space />
        <q-btn
          :label="i18n('labels.cancel')"
          flat
          no-caps
          @click="onDialogCancel" />
        <q-btn
          :label="i18n('labels.confirm')"
          class="primary-btn"
          no-caps
          unelevated
          @click="onDialogOK(cropper.getResult().canvas.toDataURL(), null)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import { useI18n } from "vue-i18n";

import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  name: "CropperDialog",
  components: { Cropper },
  emits: [...useDialogPluginComponent.emits],
  props: {
    src: {
      type: String
    }
  },
  setup(props) {
    const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent();
    const $i18n = useI18n({ useScope: "global" });
    const $q = useQuasar();

    const image = ref(props.src);
    const imageFiles = ref(null);
    const cropper = ref(null);

    const i18n = (relativePath) => {
      return $i18n.t("components.cropperDialog." + relativePath);
    };

    const onFileChange = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        image.value = event.target.result.toString();
      };
      reader.readAsDataURL(file);
    };

    const onRejected = () => {
      $q.notify({
        type: "negative",
        message: i18n("notifications.invalidFile")
      });
    };

    const flip = (x, y) => {
      cropper.value.flip(x, y);
    };
    const rotate = (angle) => {
      cropper.value.rotate(angle);
    };
    const zoom = (ratio) => {
      cropper.value.zoom(ratio);
    };

    return {
      CircleStencil,
      dialogRef,
      onDialogCancel,
      onDialogHide,
      onDialogOK,
      cropper,
      image,
      imageFiles,
      i18n,
      onFileChange,
      onRejected,
      flip,
      rotate,
      zoom
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.label-text {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 1.5vw;
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

</style>
