<template>
  <q-btn
    :label="playerStore.loggedIn ? undefined : i18n('labels.signIn')"
    aria-label="Profile"
    flat
    :round="playerStore.loggedIn"
    no-caps
    :square="!playerStore.loggedIn"
    :stretch="!playerStore.loggedIn"
    class="button-text"
    :size="$q.screen.gt.sm ? '0.7rem' : 'md'"
    @click="onButtonClick">
    <q-avatar
      v-if="playerStore.loggedIn"
      :icon="playerStore.avatar ? undefined : 'mdi-account-circle'"
      :size="$q.screen.gt.sm ? '1.7rem' : 'md'">
      <q-img
        v-if="playerStore.avatar"
        :src="playerStore.avatar" />
    </q-avatar>
    <q-menu
      ref="menu"
      class="q-ma-md"
      :offset="[0, 15]"
      anchor="bottom middle"
      no-parent-event
      self="top middle"
      style="border-radius: 0.75rem; min-width: 11rem">
      <q-card bordered>
        <q-card-section class="q-gutter-sm">
          <div class="row justify-center">
            <q-responsive
              :ratio="1/2"
              class="col-6">
              <q-btn
                round
                dense
                flat
                @click="goProfile"
                style="z-index: 0">
                <q-img
                  :src="playerStore.avatar"
                  style="border-radius: 50%" />
                <q-avatar
                  class="absolute-bottom-right"
                  color="primary"
                  :icon="flag ? undefined : 'mdi-help'"
                  round
                  size="sm"
                  style="margin-bottom: -0.1rem; margin-right: -0.3rem"
                  @click="goProfile"
                  text-color="white">
                  <span v-if="flag" :class="`fi ${flag}`" />
                </q-avatar>
              </q-btn>
            </q-responsive>
          </div>
          <div class="column items-center q-gutter-y-sm text-color-grey">
            <div class="text-font-inter-bold" style="font-size: 1rem">
              {{ playerStore.username }}
            </div>
            <div class="text-font-inter-slim" style="font-size: 0.75rem">
              {{ playerStore.motto }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="column items-center q-gutter-y-md">
          <q-btn
            class="btn-primary"
            flat
            label="Account Settings"
            no-caps
            size="0.75rem"
            @click="goProfile" />
          <q-btn
            flat
            no-caps
            size="0.65rem"
            @click="logout">
            <div class="text-color-primary text-font-inter-bolder">
              {{ i18n("labels.signOut") }}
            </div>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { getFlag } from "src/scripts/flags";
import { usePlayerStore } from "stores/player";

export default defineComponent({
  name: "ProfileButton",
  setup() {
    const $i18n = useI18n({ useScope: "global" });
    const $router = useRouter();

    const playerStore = usePlayerStore();

    const menu = ref(null);

    const flag = computed(() => {
      return getFlag(playerStore.region);
    });

    onMounted(async () => {
      if (playerStore.noToken) {
        return;
      }
      await playerStore.check();
      await playerStore.update();
    });

    const i18n = (path) => {
      return $i18n.t("components.profileButton." + path);
    };

    const onButtonClick = () => {
      if (playerStore.loggedIn) {
        menu.value.toggle();
      } else {
        $router.push({ name: "login" });
      }
    };

    const goProfile = () => {
      $router.push({
        name: "profile",
        query: { id: playerStore.id }
      });
    };

    const logout = () => {
      menu.value.hide();
      playerStore.logout();
      $router.go(0);
    };

    return {
      playerStore,
      menu,
      flag,
      i18n,
      onButtonClick,
      goProfile,
      logout
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
