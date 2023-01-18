<template>
  <q-drawer
    v-model="isOpen"
    elevated
    overlay>
    <BackgroundImage>
      <div class="absolute-bottom bg-transparent">
        <div class="row">
          <q-card
            class="q-mb-sm"
            style="border-radius: 0.75rem; height: 3rem; width: 3rem">
            <div
              class="text-color-primary text-font-galaxy-slim text-shadow-purple absolute-center"
              style="font-size: 3rem; top: 1.25rem">
              {{ "\u{0FFFFF}" }}
            </div>
          </q-card>
        </div>
        <div class="text-weight-bold">26F Studio</div>
      </div>
    </BackgroundImage>
    <q-list>
      <template v-for="(category, categoryIndex) in categories" :key="categoryIndex">
        <q-expansion-item
          :content-inset-level="1"
          group="drawer_categories"
          :icon="category.icon"
          :label="i18n(`labels.${category.label}`)">
          <q-list>
            <template v-for="(item, itemIndex) in category.list" :key="itemIndex">
              <q-item
                clickable
                v-ripple
                @click="$router.push(item.to)">
                <q-item-section>
                  {{ i18n(`labels.${item.label}`) }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-expansion-item>
      </template>
      <q-separator />
      <q-expansion-item
        :label="i18n('labels.languageMenu')"
        group="drawer_extras"
        icon="language">
        <LanguageList />
      </q-expansion-item>
      <q-expansion-item
        :content-inset-level="1"
        :label="i18n('labels.settingsMenu')"
        group="drawer_extras"
        icon="settings">
        <SettingList />
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";
import LanguageList from "components/LanguageList.vue";
import SettingList from "components/SettingList.vue";

export default defineComponent({
  name: "MainDrawer",
  components: { BackgroundImage, LanguageList, SettingList },
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, { emit }) {
    const $i18n = useI18n({ useScope: "global" });

    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const categories = [
      {
        label: "products",
        icon: "mdi-apps",
        list: [{
          label: "techminoGalaxy",
          to: "/products/techmino-galaxy"
        }, {
          label: "techmino",
          to: "/products/techmino"
        }, {
          label: "quatrack",
          to: "/products/quatrack"
        }, {
          label: "miscellaneous",
          to: "/products/miscellaneous"
        }]
      },
      {
        label: "support",
        icon: "mdi-help-circle-outline",
        list: [{
          label: "accountSettings",
          to: "/account/settings"
        }, {
          label: "gameManuals",
          to: "/support/manuals"
        }, {
          label: "glossary",
          to: "/support/glossary"
        }, {
          label: "utilities",
          to: "/support/utilities"
        }]
      },
      {
        label: "about",
        icon: "mdi-information-outline",
        list: [{
          label: "whoWeAre",
          to: "/about/us"
        }, {
          label: "brandingGuidelines",
          to: "/about/guidelines"
        }]
      },
      {
        label: "contact",
        icon: "mdi-face-agent",
        list: [{
          label: "joinUs",
          to: "/contact/join"
        }]
      }
    ];

    const i18n = (relativePath) => {
      return $i18n.t("layouts.drawers.main." + relativePath);
    };
    return { isOpen, categories, i18n };
  }
});
</script>

<style scoped>

</style>
