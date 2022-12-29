<template>
  <q-page class="flex column">
    <BackgroundImage full-height>
      <div class="row full-width bg-transparent" style="padding-top: 4.5vw">
        <q-card class="col-3 hide-scrollbar">
          <q-card-section class="q-pa-xl q-my-lg">
            <InfoPanel />
          </q-card-section>
        </q-card>
      </div>
    </BackgroundImage>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { useApi } from "boot/axios";
import { usePlayerStore } from "stores/player";

import BackgroundImage from "components/BackgroundImage.vue";
import InfoPanel from "components/AuthPanels/InfoPanel.vue";

export default defineComponent({
  name: "ProfilePage",
  components: { InfoPanel, BackgroundImage },
  setup() {
    const $api = useApi();
    const $i18n = useI18n({ useScope: "global" });
    const $player = usePlayerStore();
    const $q = useQuasar();
    const $router = useRouter();

    const i18n = (relativePath) => {
      return $i18n.t("pages.profile." + relativePath);
    };
  }
});
</script>

<style scoped>

</style>
