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
          <div
            class="text-color-white text-font-galaxy-oblique-bold"
            style="font-size: 8vw; line-height: 8vw; white-space: pre">
            {{ tabIndex > 3 ? i18n("labels.headerNew") : i18n("labels.header") }}
          </div>
        </div>
      </div>
    </BackgroundImage>
    <div class="row justify-center full-width">
      <q-tab-panels
        v-model="tabIndex"
        animated
        keep-alive
        class="offset-5 col-6">
        <q-tab-panel :name="1">
          <EmailPanel
            :email="email"
            class="q-ma-xl"
            @go="tabIndex += $event"
            @update:email="email = $event" />
        </q-tab-panel>
        <q-tab-panel :name="2">
          <PasswordPanel
            :email="email"
            class="q-ma-xl"
            @go="tabIndex += $event" />
        </q-tab-panel>
        <q-tab-panel :name="3">
          <CodePanel
            :code="code"
            :email="email"
            class="q-ma-xl"
            @go="tabIndex += $event"
            @update:code="code = $event" />
        </q-tab-panel>
        <q-tab-panel :name="4">
          <SetupPanel
            :code="code"
            :email="email"
            class="q-ma-xl"
            @go="tabIndex += $event" />
        </q-tab-panel>
        <q-tab-panel :name="5">
          <InfoPanel
            class="q-ma-xl"
            @go="tabIndex += $event" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import EmailPanel from "components/LoginPanels/EmailPanel.vue";
import PasswordPanel from "components/LoginPanels/PasswordPanel.vue";
import CodePanel from "components/LoginPanels/CodePanel.vue";
import SetupPanel from "components/LoginPanels/SetupPanel.vue";
import InfoPanel from "components/LoginPanels/InfoPanel.vue";

export default defineComponent({
  name: "LoginPage",
  components: { BackgroundImage, EmailPanel, PasswordPanel, CodePanel, SetupPanel, InfoPanel },
  setup() {
    const $i18n = useI18n({ useScope: "global" });

    const tabIndex = ref(1);
    const email = ref("");
    const code = ref("");

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };
    return {
      tabIndex,
      email,
      code,
      i18n
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
