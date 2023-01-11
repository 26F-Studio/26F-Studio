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
      <div class="col-9 column q-gutter-y-md">
        <div class="row">
          <div class="col-6 column q-pr-md q-gutter-y-md">
            <div
              class="text-color-grey text-font-inter-bold q-ml-md"
              style="font-size: 1.5vw">
              {{ i18n("labels.username") }}
            </div>
            <q-input
              v-model="username"
              class="full-width"
              clearable
              outlined
              rounded />
          </div>
          <div class="col-6 column q-pl-md q-gutter-y-md">
            <div
              class="text-color-grey text-font-inter-bold q-ml-md"
              style="font-size: 1.5vw">
              {{ i18n("labels.region") }}
            </div>
            <q-select
              v-model="region"
              :display-value="region ? region.label : i18n('labels.regionHint')"
              :options="flags"
              class="full-width"
              clearable
              outlined
              rounded>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-avatar :class="`fi ${scope.opt.class}`" rounded size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="column q-gutter-y-md">
          <div
            class="text-color-grey text-font-inter-bold q-ml-md"
            style="font-size: 1.5vw">
            {{ i18n("labels.motto") }}
          </div>
          <q-input
            v-model="motto"
            class="full-width"
            clearable
            counter
            maxlength="150"
            outlined
            rounded
            type="textarea" />
        </div>
        <div
          class="text-color-grey text-font-inter-bold text-center"
          style="font-size: 1.5vw">
          {{ i18n("labels.avatar") }}
        </div>
        <div class="row justify-center">
          <q-avatar
            class="cursor-pointer"
            size="10vw"
            style="border-radius: 25%; border: 1px solid #c2c2c2"
            text-color="white"
            @click="editAvatar">
            <q-img
              v-if="avatar"
              :src="avatar" />
            <div v-if="!avatar" class="text-color-grey text-font-inter" style="font-size: 1.5vw">
              {{ i18n("labels.upload") }}
            </div>
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="row justify-center q-mt-xl">
      <q-btn
        :label="i18n('labels.submit')"
        :loading="isSubmitLoading"
        class="btn-primary"
        no-caps
        padding="0.75vw 2.5vw"
        size="1.5vw"
        unelevated
        @click="submit" />
    </div>
    <div class="row justify-center q-mt-xl">
      <q-btn
        flat
        no-caps
        size="1.25vw"
        @click="$emit('go', +1)">
        <div class="text-color-primary text-font-inter-bold">
          {{ i18n("labels.maybeLater") }}
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import { ResultCode, useApi } from "boot/axios";
import { errorHandler } from "src/scripts/axios";
import { flags } from "src/scripts/flags";
import { usePlayerStore } from "stores/player";

import CropperDialog from "components/CropperDialog.vue";

export default defineComponent({
  name: "InfoPanel",
  props: {
    modelValue: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();

    const avatar = ref("");
    const username = ref("");
    const motto = ref("");
    const region = ref(null);
    const isSubmitLoading = ref(false);

    avatar.value = $player.avatar;
    username.value = $player.username;
    motto.value = $player.motto;
    region.value = flags.find((item) => {
      return item.value === $player.region;
    });

    const i18n = (relativePath) => {
      return $i18n.t("components.loginPanels.infoPanel." + relativePath);
    };

    const goTo = (delta) => {
      if (props.modelValue) {
        emit("update:modelValue", props.modelValue + delta);
      }
    };

    const editAvatar = () => {
      $q.dialog({
        component: CropperDialog,
        componentProps: {}
      }).onOk((image) => {
        avatar.value = image;
      });
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      await errorHandler(async () => {
        const { code, data } = await $api.player.updateInfo(
          $player.accessToken,
          {
            avatar: avatar.value ? avatar.value : undefined,
            username: username.value ? username.value : undefined,
            motto: motto.value ? motto.value : undefined,
            region: region.value ? region.value.value : undefined
          }
        );
        if (code === ResultCode.Continued) {
          this.accessToken = data.accessToken;
        }
        await $player.update();
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.submitSuccess")
        });
        setTimeout(() => {
          goTo(+1);
        }, 2000);
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      flags,
      avatar,
      username,
      motto,
      region,
      isSubmitLoading,
      i18n,
      goTo,
      editAvatar,
      submit
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
