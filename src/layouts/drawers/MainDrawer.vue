<template>
  <q-drawer
    v-model="isOpen"
    elevated
    overlay>
    <BackgroundImage>
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm" icon="person"/>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
    </BackgroundImage>
    <q-list>
      <template v-for="(category, categoryIndex) in categories" :key="categoryIndex">
        <q-expansion-item
          :content-inset-level="1"
          expand-separator
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
    </q-list>
  </q-drawer>
</template>

<script>
import {computed, defineComponent} from 'vue'
import {useI18n} from "vue-i18n";

import BackgroundImage from "components/BackgroundImage";

export default defineComponent({
  name: 'MainDrawer',
  components: {BackgroundImage},
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    }
  },
  setup(props, {emit}) {
    const $i18n = useI18n({useScope: "global"});

    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    const categories = [
      {
        label: 'products',
        icon: 'mdi-apps',
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
        label: 'support',
        icon: 'mdi-help-circle-outline',
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
        label: 'about',
        icon: 'mdi-information-outline',
        list: [{
          label: "whoWeAre",
          to: "/about/us"
        }, {
          label: "brandingGuidelines",
          to: "/about/guidelines"
        }]
      },
      {
        label: 'contact',
        icon: 'mdi-face-agent',
        list: [{
          label: "joinUs",
          to: "/contact/join"
        }]
      },
    ];

    const i18n = (relativePath) => {
      return $i18n.t('layouts.drawers.main.' + relativePath);
    };
    return {isOpen, categories, i18n};
  }
})
</script>

<style scoped>

</style>
