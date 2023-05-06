<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin hide-scrollbar"
      style="width: 30rem; max-width: 90vw"
    >
      <q-card-section>
        <q-card-section class="justify-between items-center" horizontal>
          <div class="text-h6">{{ i18n("labels.title") }}</div>
          <q-file
            v-model="imageFiles"
            :label="i18n('labels.chooseImage')"
            accept="image/*"
            class="col-6 ellipsis"
            outlined
            rounded
            @rejected="onRejected"
            @update:model-value="onFileChange"
          />
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-responsive :ratio="1">
        <div class="row justify-center absolute-full">
          <div
            v-if="!image"
            class="text-color-grey text-font-inter-bold self-center"
            style="font-style: italic; font-size: 1.5rem"
          >
            {{ i18n("labels.noImage") }}
          </div>
        </div>
        <Cropper
          ref="cropper"
          :default-size="
            ({ imageSize }) => ({
              width: Math.min(imageSize.width, imageSize.height),
              height: Math.min(imageSize.width, imageSize.height),
            })
          "
          :src="image"
          :stencil-component="CircleStencil"
        />
      </q-responsive>
      <q-separator />
      <div class="row justify-end full-width">
        <div
          class="col-12 col-md-auto row justify-between q-gutter-md-x-sm q-pa-md"
        >
          <q-btn
            class="btn-secondary"
            icon="mdi-flip-horizontal"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="flip(true, false)"
          />
          <q-btn
            class="btn-secondary"
            icon="mdi-flip-vertical"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="flip(false, true)"
          />
          <q-btn
            class="btn-secondary"
            icon="mdi-rotate-left"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="rotate(-90)"
          />
          <q-btn
            class="btn-secondary"
            icon="mdi-rotate-right"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="rotate(90)"
          />
          <q-btn
            class="btn-secondary"
            icon="mdi-magnify-minus-outline"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="zoom(0.5)"
          />
          <q-btn
            class="btn-secondary"
            icon="mdi-magnify-plus-outline"
            padding="0.5rem"
            size="0.75rem"
            unelevated
            @click="zoom(2)"
          />
        </div>
        <q-separator v-if="!$q.screen.gt.sm" class="full-width" />
        <q-space />
        <q-btn
          class="q-ma-md"
          :label="i18n('labels.cancel')"
          flat
          no-caps
          padding="0.25rem 0.5rem"
          size="0.75rem"
          @click="onDialogCancel"
        />
        <q-btn
          class="q-ma-md btn-primary"
          :label="i18n('labels.confirm')"
          no-caps
          padding="0.25rem 0.5rem"
          size="0.75rem"
          unelevated
          @click="onDialogOK(cropper.getResult().canvas.toDataURL(), null)"
        />
      </div>
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
      type: String,
    },
  },
  setup(props) {
    const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } =
      useDialogPluginComponent();
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
        message: i18n("notifications.invalidFile"),
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
      zoom,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
