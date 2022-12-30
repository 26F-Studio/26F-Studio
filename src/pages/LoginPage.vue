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
          <div class="title-text text-center" style="font-size: 2vw;">
            {{ i18n("labels.loginWithPassword") }}
          </div>
          <PasswordPanel v-model="tab" class="q-ma-xl" />
          <q-skeleton class="no-pointer-events invisible q-ma-xl" type="QAvatar" />
        </q-tab-panel>
        <q-tab-panel :name="2">
          <div class="title-text text-center" style="font-size: 2vw;">
            {{ i18n("labels.loginWithCode") }}
          </div>
          <CodePanel v-model="tab" class="q-ma-xl" />
          <q-skeleton class="no-pointer-events invisible q-ma-xl" type="QAvatar" />
        </q-tab-panel>
        <q-tab-panel :name="3">
          <div class="title-text text-center" style="font-size: 2vw;">
            {{ i18n("labels.setupPassword") }}
          </div>
          <ResetPanel v-model="tab" class="q-ma-xl" />
          <q-skeleton class="no-pointer-events invisible q-ma-xl" type="QAvatar" />
        </q-tab-panel>
        <q-tab-panel :name="4">
          <div class="title-text text-center" style="font-size: 2vw;">
            {{ i18n("labels.setupInfo") }}
          </div>
          <InfoPanel v-model="tab" class="q-ma-xl" />
          <q-skeleton class="no-pointer-events invisible q-ma-xl" type="QAvatar" />
        </q-tab-panel>
        <q-tab-panel :name="5">
          <div class="title-text text-center" style="font-size: 2vw;">
            {{ i18n("labels.finish") }}
          </div>
          <FinishPanel class="q-ma-xl" />
          <q-skeleton class="no-pointer-events invisible q-ma-xl" type="QAvatar" />
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
import ResetPanel from "components/AuthPanels/ResetPanel.vue";
import FinishPanel from "components/AuthPanels/FinishPanel.vue";

export default defineComponent({
  name: "LoginPage",
  components: { FinishPanel, ResetPanel, BackgroundImage, CodePanel, PasswordPanel, InfoPanel },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const tab = ref(2);

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

.title-text {
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 2vw 4vw rgba(48, 0, 240, 0.31);
  font-family: 'galaxy-sans', sans-serif;
  font-weight: 800;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
