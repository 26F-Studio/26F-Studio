<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin hide-scrollbar"
      style="min-width: 30rem; max-width: 90vw"
    >
      <q-card-section>
        <div class="text-h6">{{ i18n(`labels.titles.${type}`) }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-tab-panels
          class="full-height q-px-lg"
          :class="$q.screen.gt.md ? 'offset-4 offset-lg-5 col-6' : 'col-grow'"
          animated
          keep-alive
          v-model="tabIndex"
        >
          <q-tab-panel :name="-1">
            <EmailPanel
              :email="emailValue"
              @update:email="emailValue = $event"
              @submit="setTabIndex"
            />
          </q-tab-panel>
          <q-tab-panel :name="0">
            <DeactivatePanel v-if="type === 'deactivate'" :email="emailValue" />
          </q-tab-panel>
          <q-tab-panel :name="2">
            <ResetPanel v-if="type === 'reset'" :email="emailValue" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="i18n('labels.cancel')" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import DeactivatePanel from "components/AuthPanels/DeactivatePanel.vue";
import ResetPanel from "components/AuthPanels/ResetPanel.vue";
import EmailPanel from "components/AuthPanels/EmailPanel.vue";

const validOptions = ["deactivate", "migrate", "reset"];

export default defineComponent({
  name: "AuthDialog",
  components: { EmailPanel, DeactivatePanel, ResetPanel },
  emits: [...useDialogPluginComponent.emits],
  props: {
    type: {
      type: String,
      options: validOptions,
      required: true,
    },
    email: {
      type: String,
    },
    finishCallback: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { dialogRef, onDialogCancel, onDialogHide } =
      useDialogPluginComponent();
    const $i18n = useI18n({ useScope: "global" });

    const tabIndex = ref(-1);
    const emailValue = ref(props.email ? props.email : "");

    const i18n = (relativePath) => {
      return $i18n.t("components.authDialog." + relativePath);
    };

    const setTabIndex = () => {
      tabIndex.value = validOptions.indexOf(props.type);
    };

    if (emailValue.value) {
      setTabIndex();
    }

    return {
      dialogRef,
      onDialogCancel,
      onDialogHide,
      tabIndex,
      emailValue,
      i18n,
      setTabIndex,
    };
  },
});
</script>

<style scoped></style>
