<template>
  <q-footer class="row bg-dark text-light q-px-xl q-py-lg q-gutter-x-xl">
    <q-space/>
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="q-gutter-y-md">
      <div class="text-capitalize text-weight-bold">
        {{ i18n(`labels.${column.category}`) }}
      </div>
      <div
        v-for="(item, itemIndex) in column.list"
        :key="itemIndex"
        class="text-weight-thin"
        @click="$router['push'](item.to)">
        {{ i18n(`labels.${item.label}`) }}
      </div>
    </div>
  </q-footer>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainFooter",
  setup() {
    const $q = useQuasar();
    const footerClass = computed(() => {
      if ($q.dark.isActive) {
        return "bg-light text-dark";
      } else {
        return "";
      }
    });
    const columns = [
      {
        category: "products",
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
        category: "support",
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
        category: "about",
        list: [{
          label: "whoWeAre",
          to: "/about/us"
        }, {
          label: "brandingGuidelines",
          to: "/about/guidelines"
        }]
      },
      {
        category: "contact",
        list: [{
          label: "joinUs",
          to: "/contact/join"
        }]
      }
    ];
    return { columns };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.footers.main." + relativePath);
    }
  }
});
</script>
