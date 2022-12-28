<template>
  <q-btn
    aria-label="Profile"
    flat
    :icon="playerStore.loggedIn ? undefined : 'login'"
    no-caps
    :padding="$q.screen.xs ? 'sm' : undefined"
    round
    :size="$q.screen.gt.sm ? '1vw' : 'md'"
    @click="playerStore.loggedIn ? undefined : $router.push('/login')">
    <q-avatar
      v-if="playerStore.loggedIn"
      :icon="playerStore.avatar ? undefined : 'mdi-account-circle'"
      :size="$q.screen.gt.sm ? '2vw' : 'md'">
      <q-img
        v-if="playerStore.avatar"
        :src="playerStore.avatar" />
    </q-avatar>
    <q-menu :offset="[0, 10]" style="min-width:22rem">
      <q-card bordered>
        <q-card-section class="q-gutter-sm">
          <div class="row justify-center">
            <q-responsive
              class="col-4"
              :ratio="1/3">
              <q-btn
                round
                dense
                flat
                @click="goProfile()"
                style="z-index: 0">
                <q-img
                  :src="playerStore.avatar"
                  style="border-radius: 50%" />
                <q-btn
                  class="absolute-bottom-right"
                  color="primary"
                  icon="mdi-pencil"
                  round
                  unelevated
                  size="sm"
                  @click="goProfile()"
                  style="margin-bottom: -0.25rem;margin-right: -0.5rem" />
              </q-btn>
            </q-responsive>
          </div>
          <div class="column items-center">
            <div class="row items-baseline q-gutter-x-sm">
              <q-icon v-if="!flag" name="mdi-help-rhombus-outline" />
              <span
                v-if="flag"
                class="fi"
                :class="flag" />
              <div class="text-body1 text-weight-bold">
                {{ playerStore.username }}
              </div>
              <span
                v-if="flag"
                class="fi invisible"
                :class="flag" />
              <q-icon v-if="!flag" class="invisible" name="mdi-help-rhombus-outline" />
            </div>
            <div :class="$q.dark.isActive ? 'text-grey' : 'text-grey-8'">
              {{ playerStore.motto }}
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="column items-center">
          <q-btn
            :color="$q.dark.isActive ? 'grey' : 'grey-9'"
            no-caps
            outline
            v-close-popup
            @click="logout">
            {{ i18n("labels.logout") }}
          </q-btn>
        </q-card-actions>
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

    const goProfile = (query) => {
      $router.push({
        name: "profile",
        query: query
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

<style scoped>
@import "/node_modules/flag-icons/css/flag-icons.min.css";
</style>
