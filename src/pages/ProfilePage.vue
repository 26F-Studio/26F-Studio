<template>
  <q-page class="flex column">
    <BackgroundImage full-height>
      <div
        :style="{paddingTop: $q.screen.gt.md ? '4.5vw' : '4rem'}"
        class="row full-width bg-transparent hide-scrollbar">
        <q-card class="col-12 col-md-6 col-lg-4 col-xl-3">
          <q-card-section class="q-pa-xl q-my-lg">
            <div class="q-gutter-y-lg">
              <div class="row justify-center">
                <q-responsive
                  :ratio="1/4"
                  class="col-3">
                  <q-btn
                    dense
                    flat
                    round
                    style="z-index: 0"
                    @click="editAvatar">
                    <q-img
                      :src="avatar ? avatar : null"
                      class="bg-grey"
                      initial-ratio="1"
                      style="border-radius: 50%">
                      <q-icon
                        v-if="!avatar"
                        class="absolute-center"
                        color="white"
                        name="mdi-account-edit"
                        size="6vw" />
                    </q-img>
                  </q-btn>
                </q-responsive>
              </div>
              <div>
                <div class="label-text q-ml-lg q-mb-sm">
                  {{ i18n("labels.username") }}
                </div>
                <q-input
                  v-model="username"
                  :placeholder="i18n('placeholders.username')"
                  class="full-width">
                  <template v-slot:prepend>
                    <q-icon name="mdi-card-account-details" />
                  </template>
                </q-input>
              </div>
              <div>
                <div class="label-text q-ml-lg q-mb-sm">
                  {{ i18n("labels.motto") }}
                </div>
                <q-input
                  v-model="motto"
                  :placeholder="i18n('placeholders.motto')"
                  class="full-width">
                  <template v-slot:prepend>
                    <q-icon name="mdi-message-processing" />
                  </template>
                </q-input>
              </div>
              <div>
                <div class="label-text q-ml-lg q-mb-sm">
                  {{ i18n("labels.region") }}
                </div>
                <q-select
                  v-model="region"
                  :display-value="region ? region.label : i18n('placeholders.region')"
                  :options="flags"
                  class="full-width">
                  <template v-slot:prepend>
                    <q-avatar v-if="region" :class="`fi ${region.class}`" rounded size="sm" />
                    <q-avatar v-if="!region" class="bg-grey text-white" icon="help" rounded size="sm" />
                  </template>
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
              <div>
                <div class="label-text q-ml-lg q-mb-sm">
                  {{ i18n("labels.avatarFrame") }}
                </div>
                <q-select
                  v-model="avatarFrame"
                  :display-value="i18n('placeholders.avatarFrame')"
                  class="full-width"
                  disable>
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-box-outline" />
                  </template>
                </q-select>
              </div>
              <q-btn
                :label="i18n(`labels.submit`)"
                :loading="isSubmitLoading"
                class="primary-btn full-width"
                no-caps
                size="lg"
                unelevated
                @click="submit">
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="col-grow q-mt-md q-mt-md-none q-ml-md-md">
          <q-card-section class="q-pa-xl q-my-lg">
          </q-card-section>
        </q-card>
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { usePlayerStore } from "stores/player";
import { flags } from "src/scripts/flags";

import BackgroundImage from "components/BackgroundImage.vue";
import CropperDialog from "components/CropperDialog.vue";
import { errorHandler } from "src/scripts/axios";

export default defineComponent({
  name: "ProfilePage",
  components: { BackgroundImage },
  setup() {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();

    const {
      accessToken,
      avatar,
      motto,
      username,
      region,
      avatarFrame
    } = storeToRefs(usePlayerStore());

    const isSubmitLoading = ref(false);

    const i18n = (relativePath) => {
      return $i18n.t("pages.profile." + relativePath);
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
        await $api.player.updateInfo(
          accessToken,
          {
            avatar: avatar.value ? avatar.value : undefined,
            username: username.value ? username.value : undefined,
            motto: motto.value ? motto.value : undefined,
            region: region.value ? region.value.value : undefined
          }
        );
        await $player.update();
        isSubmitLoading.value = false;
        $q.notify({
          type: "positive",
          message: i18n("notifications.submitSuccess")
        });
      }, $q, $i18n.t);
      isSubmitLoading.value = false;
    };

    return {
      flags,
      avatar,
      motto,
      username,
      region,
      avatarFrame,
      isSubmitLoading,
      i18n,
      editAvatar,
      submit
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.label-text {
  color: #636365;
  font-family: 'Inter', sans-serif;
  font-style: normal;
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
