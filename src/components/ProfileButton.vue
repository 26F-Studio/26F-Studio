<template>
  <q-btn
    :label="playerStore.loggedIn ? undefined : i18n('labels.signIn')"
    aria-label="Profile"
    flat
    :round="playerStore.loggedIn"
    no-caps
    :padding="$q.screen.xs ? 'sm' : undefined"
    :square="!playerStore.loggedIn"
    :stretch="!playerStore.loggedIn"
    class="button-text"
    :size="$q.screen.gt.sm ? '1vw' : 'md'"
    @click.prevent="playerStore.loggedIn ? undefined : $router.push('/login')">
    <q-avatar
      v-if="playerStore.loggedIn"
      :icon="playerStore.avatar ? undefined : 'mdi-account-circle'"
      :size="$q.screen.gt.sm ? '2vw' : 'md'">
      <q-img
        v-if="playerStore.avatar"
        :src="playerStore.avatar" />
    </q-avatar>
    <q-menu
      :offset="[0, 15]"
      anchor="bottom middle"
      self="top middle"
      style="border-radius: 1vw; min-width:14rem">
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
          <div class="column items-center q-gutter-y-sm">
            <div class="label-text-username">
              {{ playerStore.username }}
            </div>
            <div :class="$q.dark.isActive ? 'text-grey' : 'text-grey-8'">
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
            @click="goProfile" />
          <q-btn
            flat
            no-caps
            @click="logout">
            <div class="btn-text">
              {{ i18n("labels.signOut") }}
            </div>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
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

    const goProfile = () => {
      $router.push({
        name: "profile",
        query: { id: playerStore.id }
      });
    };

    const logout = () => {
      playerStore.logout();
      $router.go(0);
    };


    return {
      playerStore,
      flag,
      i18n,
      goProfile,
      logout
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
  font-feature-settings: 'pnum' on, 'lnum' on;

  &-username {
    @extend .label-text;
    font-weight: 700;
    font-size: 1.1rem;
  }

  &-motto {
    @extend .label-text;
    font-weight: 400;
    font-size: 0.9rem;
  }
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
