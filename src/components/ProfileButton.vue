<template>
  <q-btn
    flat
    :icon="loggedIn ? undefined : 'login'"
    no-caps
    :padding="$q.screen.lt.sm ? 'sm' : undefined"
    round
    @click="loggedIn ? undefined : $router.push('/login')">
    <q-avatar
      v-if="loggedIn"
      :icon="loggedIn ? 'mdi-account-circle' : undefined"
      size="lg">
      <q-img
        v-if="playerStore.avatar"
        :src="playerStore.avatar"/>
    </q-avatar>
    <q-menu :offset="[0, 10]" style="min-width:22rem">
      <q-card bordered>
        <q-card-section class="q-gutter-sm">
          <div class="row justify-center">
            <q-responsive
              class="col-3"
              :ratio="0.25">
              <q-btn
                round
                dense
                flat
                @click="goProfile()"
                style="z-index: 0">
                <q-img
                  :src="playerStore.avatar"
                  style="border-radius: 50%"/>
                <q-btn
                  class="absolute-bottom-right"
                  color="secondary"
                  icon="mdi-pencil"
                  round
                  unelevated
                  size="sm"
                  @click="goProfile()"
                  style="margin-bottom: -0.25rem;margin-right: -0.5rem"/>
              </q-btn>
            </q-responsive>
          </div>
          <div class="column items-center">
            <div class="text-body1 text-weight-bold">
              {{ playerStore.username }}
            </div>
            <div :class="$q.dark.isActive ? 'text-grey' : 'text-grey-8'">
              {{ playerStore.motto }}
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
        </q-card-section>
        <q-separator/>
        <q-card-actions class="column items-center">
          <q-btn
            :color="$q.dark.isActive ? 'grey' : 'grey-9'"
            no-caps
            outline
            @click="logout">
            {{ i18n('labels.logout') }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {usePlayerStore} from "stores/player";

export default defineComponent({
  name: "ProfileButton",
  setup() {
    const playerStore = usePlayerStore();
    const loggedIn = computed(() => {
      return playerStore["id"] > 0
    });
    return {
      playerStore,
      loggedIn,
    };
  },
  async created() {
    // await this.playerStore.check();
    // this.playerStore.update();
  },
  methods: {
    i18n(path) {
      return this.$t("components.profileButton." + path);
    },
    goProfile(query) {
      this.$router.push({
        name: 'profile',
        query: query,
      });
    },
    logout() {
      this.playerStore.logout();
      this.$router.go(0);
    }
  }
});
</script>

<style scoped>
</style>
