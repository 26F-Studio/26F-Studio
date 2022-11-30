<template>
  <q-btn-dropdown
    :class="disable ? 'unavailable-btn' : 'download-btn'"
    toggle-aria-label="Download"
    :disable-main-btn="disable"
    :disable-dropdown="disable"
    flat
    no-caps
    split
    size="1.5vw"
    @click="downloadProduct(mainPlatform)">
    <template v-slot:label>
      <div class="no-wrap q-ma-sm">
        <div
          style="font-weight: 700; font-size: 2vw;">
          {{ disable ? i18n("labels.disable") : i18n("labels.download") }}
        </div>
        <div class="row justify-center">
          <div
            v-for="(icon, index) in platformIconMap[mainPlatform]"
            :key="index"
            class="row">
            <q-separator
              v-show="index !==0"
              class="q-my-xs"
              vertical />
            <q-icon
              :name="icon"
              class="q-ma-sm"
              size="1.5vw" />
          </div>
          <div
            v-if="!disable"
            :class="$q.screen.xs ? 'q-pt-sm' : ''"
            style="font-weight: 400; font-size: 1vw">
            {{ i18n(`labels.platforms.${mainPlatform}`) }}
          </div>
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
        <q-item-section avatar class="row">
          <div class="platform-card row">
            <div
              v-for="(icon, index) in platformIconMap[platform]"
              :key="index"
              class="row">
              <q-separator
                v-show="index !==0"
                class="q-my-xs"
                vertical />
              <q-icon
                :name="icon"
                class="q-ma-sm"
                size="1.5vw" />
            </div>
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ i18n(`labels.platforms.${platform}`) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon
            v-if="['appstore', 'testflight'].includes(platform)"
            name="mdi-open-in-new" />
          <q-icon
            v-if="!['appstore', 'testflight'].includes(platform)"
            name="mdi-download" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";

import { getLatestDownloadLink, usePlatforms } from "boot/config";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "DownloadButton",
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    product: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar();
    const $i18n = useI18n({ useScope: "global" });

    let mainPlatform = "windows64";
    let platforms = usePlatforms();
    const platformIconMap = {
      android: ["mdi-android", "mdi-package-variant"],
      appstore: ["mdi-apple", "mdi-store"],
      linux: ["mdi-penguin", "mdi-package-variant-closed"],
      macosDmg: ["mdi-apple", "mdi-harddisk"],
      macosPkg: ["mdi-apple", "mdi-package-variant"],
      testflight: ["mdi-apple", "mdi-airplane"],
      windows32: ["mdi-microsoft-windows-classic", "mdi-cpu-32-bit"],
      windows64: ["mdi-microsoft-windows", "mdi-cpu-64-bit"]
    };

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

    const i18n = (relativePath) => {
      return $i18n.t("components.downloadButton." + relativePath);
    };
    const downloadProduct = (platform) => {
      const downloadLink = getLatestDownloadLink(props.product, platform);
      if (downloadLink) {
        window.location.href = downloadLink;
      } else {
        $q.notify({
          message: i18n("notifications.error"),
          spinner: false,
          timeout: 1500,
          type: "negative"
        });
      }
    };

    return {
      mainPlatform,
      platforms,
      platformIconMap,
      i18n,
      downloadProduct
    };
  }
});
</script>

<style scoped lang="scss">
@use "src/css/app.scss";

.download-btn {
  @extend #primary-btn;
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.unavailable-btn {
  @extend #disabled-btn;
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.platform-card {
  @extend #primary-btn;
  border-radius: 0.75vw;
}

</style>
