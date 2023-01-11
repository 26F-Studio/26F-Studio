<template>
  <q-btn-dropdown
    :class="disable ? 'btn-disabled' : 'btn-primary'"
    content-class="hide-scrollbar"
    content-style="border-radius: 1vw"
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
          :class="`text-color-${disable ? 'grey' : 'white'}`"
          class="text-font-inter-bold"
          style="font-size: 2vw">
          {{ disable ? i18n("labels.disable") : i18n("labels.download") }}
        </div>
        <div v-if="!disable" class="row justify-center items-center">
          <q-icon
            :name="platformIconMap[mainPlatform]"
            class="q-ma-sm"
            size="1.5vw" />
          <div
            class="text-color-white text-font-inter-slim"
            :class="$q.screen.xs ? 'q-pt-sm' : ''"
            style="font-size: 1vw">
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
          <div class="btn-primary" style="border-radius: 0.75vw">
            <q-icon
              :name="platformIconMap[platform]"
              class="q-ma-sm"
              size="1.5vw" />
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-color-grey text-font-inter-slim"
            style="font-size: 0.75vw">
            {{ i18n(`labels.platforms.${platform}`) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon
            :name="['appstore', 'testflight'].includes(platform) ? 'mdi-open-in-new' : 'mdi-download'"
            size="1.5vw" />
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
      android: "mdi-android",
      appstore: "mdi-apple",
      linux: "mdi-penguin",
      macosDmg: "mdi-apple",
      macosPkg: "mdi-apple",
      testflight: "mdi-apple",
      windows32: "mdi-microsoft-windows-classic",
      windows64: "mdi-microsoft-windows"
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
</style>
