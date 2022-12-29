<template>
  <q-page class="flex flex-center row">
    <BackgroundImage
      class="absolute-full"
      full-height
      mask
      mask-position="left"
      :mask-start="{ratio: 0.3, control: [0.3, 0.2]}"
      :mask-end="{ratio: 0.4, control: [0.4, 0.8]}">
      <div class="bg-transparent fit row">
        <div class="col-4 row items-center q-pa-md">
          <div class="header-text">
            {{ i18n("labels.header") }}
          </div>
        </div>
      </div>
    </BackgroundImage>
    <div class="offset-4 col-grow row justify-center">
      <q-tab-panels
        class="col-6"
        animated
        keep-alive
        v-model="tab">
        <q-tab-panel :name="1">
          <PasswordPanel v-model="tab" class="q-ma-xl" />
        </q-tab-panel>
        <q-tab-panel :name="2">
          <CodePanel v-model="tab" class="q-ma-xl" />
        </q-tab-panel>
        <q-tab-panel :name="3">
          <InfoPanel v-model="tab" class="q-ma-xl" />
        </q-tab-panel>
        <q-tab-panel :name="4">
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import CodePanel from "components/AuthPanels/CodePanel.vue";
import PasswordPanel from "components/AuthPanels/PasswordPanel.vue";
import InfoPanel from "components/AuthPanels/InfoPanel.vue";

export default defineComponent({
  name: "LoginPage",
  components: { BackgroundImage, CodePanel, PasswordPanel, InfoPanel },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const tab = ref(3);

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    return {
      tab,
      i18n
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";

.header-text {
  color: #F1F2F3;
  font-family: 'galaxy-sans-oblique', sans-serif;
  font-weight: 800;
  font-size: 8vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  white-space: pre
}
</style>
