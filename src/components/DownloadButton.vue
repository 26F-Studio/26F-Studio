<template>
  <q-btn-dropdown
    class="download-btn"
    flat
    no-caps
    split
    size="1.5vw"
    @click="downloadProduct(mainPlatform)">
    <template v-slot:label>
      <div class="no-wrap q-ma-sm">
        <div
          style="font-weight: 700; font-size: 2vw;">
          {{ i18n("labels.download") }}
        </div>
        <div
          :class="$q.screen.xs ? 'q-pt-sm' : ''"
          style="font-weight: 400; font-size: 1vw">
          {{ i18n(`labels.platforms.${mainPlatform}`) }}
        </div>
      </div>
    </template>
    <q-list>
      <q-item
        v-for="(platform, index) in platforms"
        :key="index"
        clickable
        v-close-popup
        @click="downloadProduct(platform)">
        <q-item-section avatar>
          <q-avatar icon="folder" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ i18n(`labels.platforms.${platform}`) }}</q-item-label>
          <q-item-label caption>February 22, 2016</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" color="amber" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";

import { usePlatforms } from "boot/config";

export default defineComponent({
  name: "DownloadButton",
  props: {
    repo: {
      type: String,
      required: true
    }
  },
  setup() {
    const $q = useQuasar();
    let mainPlatform = "windows64";
    let platforms = usePlatforms();

    if ($q.platform.is.android) {
      mainPlatform = "android";
    } else if ($q.platform.is.ios || $q.platform.is.mac) {
      mainPlatform = "appstore";
    } else if ($q.platform.is.linux) {
      mainPlatform = "linux";
    }

    platforms = platforms.filter(function(platform) {
      return platform !== mainPlatform;
    });

    const mainLoading = ref(false);
    return { mainPlatform, platforms, mainLoading };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.downloadButton." + relativePath);
    },
    async downloadProduct(platform) {
      const notify = this.$q.notify({
        group: false,
        message: this.i18n("notifications.download"),
        spinner: true,
        timeout: 0,
        type: "info"
      });
      const downloadLink = await this.$github.getDownloadLink(this.repo, platform);
      if (downloadLink) {
        window.location.href = downloadLink;
        notify({
          message: this.i18n("notifications.success"),
          spinner: false,
          timeout: 2500,
          type: "positive"
        });
      } else {
        notify({
          message: this.i18n("notifications.error"),
          spinner: false,
          timeout: 1500,
          type: "negative"
        });
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.download-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

</style>
