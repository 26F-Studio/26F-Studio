<template>
  <q-btn-dropdown
    class="download-btn"
    split
    size="1.5vw"
    flat
    no-caps
    @click="callback()">
    <template v-slot:label>
      <div class="column items-center no-wrap q-ma-sm">
        <div style="font-weight: 700; font-size: 1.5vw">
          {{i18n('labels.download') }}
        </div>
        <div style="font-weight: 400; font-size: 1vw">
          macOS, Universal
        </div>
      </div>
    </template>

    <q-list>
      <q-item
        v-for="(platform, index) in platforms"
        :key="index"
        clickable
        v-close-popup
        @click="callback()">
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
import { defineComponent } from "vue";

import { usePlatforms } from "boot/config";

export default defineComponent({
  name: "DownloadButton",
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  setup() {
    const platforms = usePlatforms();
    return { platforms };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.downloadButton." + relativePath);
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
