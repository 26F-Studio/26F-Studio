<template>
  <q-page class="flex column">
    <BackgroundImage full-height>
      <div
        :style="{ paddingTop: $q.screen.gt.md ? '3rem' : '4rem' }"
        class="row full-width bg-transparent hide-scrollbar"
      >
        <q-card class="col-12 col-md-6 col-lg-4 col-xl-3">
          <q-card-section class="q-pa-xl q-my-lg">
            <div class="q-gutter-y-lg">
              <div class="row justify-center">
                <q-responsive :ratio="1 / 4" class="col-3">
                  <q-skeleton
                    v-if="!isLoaded"
                    type="QAvatar"
                    style="z-index: 0"
                  />
                  <q-btn
                    v-if="isLoaded"
                    dense
                    flat
                    round
                    style="z-index: 0"
                    @click="editAvatar"
                  >
                    <q-img
                      :src="avatar ? avatar : null"
                      class="bg-grey"
                      initial-ratio="1"
                      style="border-radius: 50%"
                    >
                      <q-icon
                        v-if="!avatar"
                        class="absolute-center"
                        color="white"
                        name="mdi-account-edit"
                        size="6vw"
                      />
                    </q-img>
                  </q-btn>
                </q-responsive>
              </div>
              <div class="column q-gutter-y-sm">
                <div
                  class="text-color-grey text-font-inter-bold"
                  style="font-size: 1rem"
                >
                  {{ i18n("labels.username") }}
                </div>
                <q-skeleton v-if="!isLoaded" class="full-width" type="QInput" />
                <q-input
                  v-if="isLoaded"
                  class="full-width"
                  :placeholder="i18n('placeholders.username')"
                  v-model="username"
                  style="font-size: 0.7rem"
                />
              </div>
              <div class="column q-gutter-y-sm">
                <div
                  class="text-color-grey text-font-inter-bold"
                  style="font-size: 1rem"
                >
                  {{ i18n("labels.motto") }}
                </div>
                <q-skeleton v-if="!isLoaded" class="full-width" type="QInput" />
                <q-input
                  v-if="isLoaded"
                  class="full-width"
                  :placeholder="i18n('placeholders.motto')"
                  v-model="motto"
                  style="font-size: 0.7rem"
                />
              </div>
              <div class="column q-gutter-y-sm">
                <div
                  class="text-color-grey text-font-inter-bold"
                  style="font-size: 1rem"
                >
                  {{ i18n("labels.region") }}
                </div>
                <q-skeleton v-if="!isLoaded" class="full-width" type="QInput" />
                <q-select
                  v-if="isLoaded"
                  class="full-width"
                  :display-value="
                    region ? region.label : i18n('placeholders.region')
                  "
                  :options="flags"
                  v-model="region"
                  style="font-size: 0.7rem"
                >
                  <template v-slot:prepend>
                    <q-avatar
                      :class="region ? `fi ${region.class}` : undefined"
                      :color="region ? undefined : 'primary'"
                      :icon="region ? undefined : 'mdi-help'"
                      rounded
                      size="1.25rem"
                      text-color="white"
                    />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-avatar
                          :class="`fi ${scope.opt.class}`"
                          rounded
                          size="sm"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <q-skeleton
                v-if="!isLoaded"
                class="btn-disabled full-width"
                type="QBtn"
                size="2.5rem"
              />
              <q-btn
                v-if="isLoaded"
                :label="i18n('labels.submit')"
                :loading="isSubmitLoading"
                class="btn-primary full-width"
                no-caps
                padding="0.4rem"
                size="1rem"
                unelevated
                @click="submit"
              >
              </q-btn>
              <q-skeleton
                v-if="!isLoaded"
                class="btn-disabled full-width"
                type="QBtn"
                size="2rem"
              />
              <q-btn
                v-if="isLoaded"
                class="btn-secondary full-width"
                dense
                flat
                :label="i18n('labels.resetPassword')"
                no-caps
                padding="0.35rem"
                size="0.75rem"
                @click="resetPassword"
              >
                <template v-slot:loading>
                  <div
                    class="row justify-center items-center text-color-primary text-font-inter-bolder"
                  >
                    <q-spinner class="on-left" color="primary" />
                    {{ i18n("labels.sendingCode") }}
                  </div>
                </template>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="col-grow q-mt-md q-mt-md-none q-ml-md-md">
          <q-card-section class="q-pa-xl q-my-lg"></q-card-section>
        </q-card>
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useApi } from "boot/axios";
import { usePlayerStore } from "stores/player";
import { flags } from "src/scripts/flags";

import BackgroundImage from "components/BackgroundImage.vue";
import CropperDialog from "components/CropperDialog.vue";
import { errorHandler } from "src/scripts/axios";
import { useRoute, useRouter } from "vue-router";
import AuthDialog from "components/AuthDialog.vue";

export default defineComponent({
  name: "ProfilePage",
  components: { BackgroundImage },
  setup() {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $router = useRouter();
    const { query } = useRoute();

    const avatar = ref("");
    const username = ref("");
    const motto = ref("");
    const region = ref(null);
    const isLoaded = ref(false);
    const isSubmitLoading = ref(false);

    onMounted(async () => {
      let data;
      if (!query.playerId) {
        await $player.check();
        if (!$player.loggedIn) {
          await $router.push({ name: "login" });
          return;
        }
        data = $player.info;
      } else {
        await errorHandler(
          async () => {
            data = (await $api.player.getInfo(null, query.playerId)).data;
            data.avatar = (
              await $api.player.getAvatar(null, query.playerId)
            ).data;
          },
          $q,
          $i18n.t
        );
      }
      avatar.value = data.avatar;
      username.value = data.username;
      motto.value = data.motto;
      region.value = flags.find((item) => {
        return item.value === data.region;
      });
      isLoaded.value = true;
    });

    const i18n = (relativePath) => {
      return $i18n.t("pages.profile." + relativePath);
    };

    const editAvatar = () => {
      $q.dialog({
        component: CropperDialog,
        componentProps: {},
      }).onOk((image) => {
        avatar.value = image;
      });
    };

    const submit = async () => {
      isSubmitLoading.value = true;
      console.log($player.accessToken);
      await errorHandler(
        async () => {
          await $api.player.updateInfo($player.accessToken, {
            avatar: avatar.value ? avatar.value : undefined,
            username: username.value ? username.value : undefined,
            motto: motto.value ? motto.value : undefined,
            region: region.value ? region.value.value : undefined,
          });
          await $player.update();
          isSubmitLoading.value = false;
          $q.notify({
            type: "positive",
            message: i18n("notifications.submitSuccess"),
          });
        },
        $q,
        $i18n.t
      );
      isSubmitLoading.value = false;
    };

    const resetPassword = async () => {
      await errorHandler(
        async () => {
          $q.dialog({
            component: AuthDialog,
            componentProps: {
              type: "reset",
            },
          });
        },
        $q,
        $i18n.t
      );
    };

    return {
      flags,
      avatar,
      motto,
      username,
      region,
      isLoaded,
      isSubmitLoading,
      i18n,
      editAvatar,
      submit,
      resetPassword,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
