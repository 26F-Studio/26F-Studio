<template>
  <q-footer
    class="row justify-center bg-dark text-color-white q-py-xl q-px-xs-md q-px-sm-xl"
  >
    <q-btn
      flat
      no-caps
      no-wrap
      :padding="$q.screen.gt.sm ? '0.25rem' : '1.5rem'"
      square
      to="/home"
      :stretch="$q.screen.gt.sm"
    >
      <div
        class="text-font-galaxy-slim self-center"
        :style="`font-size: ${
          $q.screen.gt.sm ? '2rem' : '4rem'
        }; margin-bottom: ${$q.screen.gt.sm ? '0.3rem' : '0.6rem'}`"
      >
        {{ "\u{0FFFFF}" + "  " + i18n("labels.title") }}
      </div>
    </q-btn>
    <q-space v-if="$q.screen.gt.sm" />
    <div class="row col-12 col-md-auto q-py-lg">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="column col-6 col-md-auto items-center items-md-start q-pl-none q-pl-md-lg q-gutter-y-md"
      >
        <div
          class="text-font-inter-bold q-pt-lg q-pl-md-xs"
          style="font-size: 1.25rem"
        >
          {{ i18n(`labels.${column.category}`) }}
        </div>
        <q-btn
          v-for="(item, itemIndex) in column.list"
          :key="itemIndex"
          class="text-font-inter-slim ellipsis"
          align="left"
          dense
          flat
          :label="i18n(`labels.${item.label}`)"
          no-caps
          no-wrap
          square
          :to="item.to"
          style="font-size: 0.75rem"
        />
      </div>
    </div>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MainFooter",
  setup() {
    const $i18n = useI18n({ useScope: "global" });
    const columns = [
      {
        category: "products",
        list: [
          {
            label: "techminoGalaxy",
            to: "/products/techmino-galaxy",
          },
          {
            label: "techmino",
            to: "/products/techmino",
          },
          {
            label: "quatrack",
            to: "/products/quatrack",
          },
          {
            label: "miscellaneous",
            to: "/products/miscellaneous",
          },
        ],
      },
      {
        category: "support",
        list: [
          {
            label: "accountSettings",
            to: "/account/settings",
          },
          {
            label: "gameManuals",
            to: "/support/manuals",
          },
          {
            label: "glossary",
            to: "/support/glossary",
          },
          {
            label: "utilities",
            to: "/support/utilities",
          },
        ],
      },
      {
        category: "about",
        list: [
          {
            label: "whoWeAre",
            to: "/about/us",
          },
          {
            label: "brandingGuidelines",
            to: "/about/guidelines",
          },
        ],
      },
      {
        category: "contact",
        list: [
          {
            label: "joinUs",
            to: "/contact/join",
          },
        ],
      },
    ];

    const i18n = (relativePath) => {
      return $i18n.t("layouts.footers.main." + relativePath);
    };

    return { columns, i18n };
  },
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";
</style>
