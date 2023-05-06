<template>
  <q-page
    :class="$q.screen.gt.md ? 'flex-center' : 'flex-block'"
    class="flex column"
  >
    <BackgroundImage
      :class="$q.screen.gt.md ? 'absolute-full' : undefined"
      :full-height="$q.screen.gt.md"
      mask
      :mask-end="maskEnd"
      :mask-position="$q.screen.gt.md ? 'left' : 'top'"
      :mask-start="maskStart"
    >
      <div class="bg-transparent fit row items-center">
        <div
          class="col-grow col-lg-4 text-center text-color-white text-font-galaxy-oblique-bold"
          style="font-size: 5rem; line-height: 5rem; white-space: pre-wrap"
        >
          {{ tabIndex > 3 ? i18n("labels.headerNew") : i18n("labels.header") }}
        </div>
      </div>
    </BackgroundImage>
    <div class="row justify-center full-width">
      <q-tab-panels
        class="full-height"
        :class="$q.screen.gt.md ? 'offset-4 offset-lg-5 col-6' : 'col-grow'"
        animated
        keep-alive
        v-model="tabIndex"
      >
        <q-tab-panel :name="1">
          <EmailPanel
            :email="email"
            @go="updateTabIndex"
            @update:email="updateEmail"
          />
        </q-tab-panel>
        <q-tab-panel :name="2">
          <PasswordPanel :email="email" @go="updateTabIndex" />
        </q-tab-panel>
        <q-tab-panel :name="3">
          <CodePanel
            :code="code"
            :email="email"
            @go="updateTabIndex"
            @update:code="updateCode"
          />
        </q-tab-panel>
        <q-tab-panel :name="4">
          <SetupPanel :code="code" :email="email" @go="updateTabIndex" />
        </q-tab-panel>
        <q-tab-panel :name="5">
          <InfoPanel @go="updateTabIndex" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import EmailPanel from "components/LoginPanels/EmailPanel.vue";
import PasswordPanel from "components/LoginPanels/PasswordPanel.vue";
import CodePanel from "components/LoginPanels/CodePanel.vue";
import SetupPanel from "components/LoginPanels/SetupPanel.vue";
import InfoPanel from "components/LoginPanels/InfoPanel.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    BackgroundImage,
    EmailPanel,
    PasswordPanel,
    CodePanel,
    SetupPanel,
    InfoPanel,
  },
  setup() {
    const $i18n = useI18n({ useScope: "global" });
    const $q = useQuasar();

    const tabIndex = ref(1);
    const email = ref("");
    const code = ref("");

    const maskEnd = computed(() => {
      switch ($q.screen.name) {
        case "xs":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "sm":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "md":
          return { ratio: 0.8, control: [0.6, 0.8] };
        case "lg":
          return { ratio: 0.45, control: [0.45, 0.8] };
        default:
          return { ratio: 0.4, control: [0.4, 0.8] };
      }
    });

    const maskStart = computed(() => {
      switch ($q.screen.name) {
        case "xs":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "sm":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "md":
          return { ratio: 1.0, control: [0.4, 0.9] };
        case "lg":
          return { ratio: 0.35, control: [0.35, 0.2] };
        default:
          return { ratio: 0.3, control: [0.3, 0.2] };
      }
    });

    const i18n = (relativePath) => {
      return $i18n.t("pages.login." + relativePath);
    };

    const updateTabIndex = (delta) => {
      tabIndex.value += delta;
    };

    const updateEmail = (value) => {
      email.value = value;
    };

    const updateCode = (value) => {
      code.value = value;
    };

    return {
      tabIndex,
      email,
      code,
      maskEnd,
      maskStart,
      i18n,
      updateTabIndex,
      updateEmail,
      updateCode,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/css/app.scss";
</style>
