<template>
  <q-footer class="row justify-center bg-dark text-light q-py-xl q-px-xs-md q-px-sm-xl">
    <q-btn
      class="col-xs-12 col-sm-auto"
      flat
      no-caps
      no-wrap
      :size="$q.screen.gt.sm ? '1.5vw' : undefined"
      square
      to="/home"
      :stretch="$q.screen.gt.sm">
      <div
        class="title-text self-center"
        :style="`font-size: ${$q.screen.xs ? '10vw' : '3vw'}`">
        {{ '\u{0FFFFF}' + ($q.screen.sm ? '' : '  ' + i18n("labels.title")) }}
      </div>
    </q-btn>
    <q-space v-if="$q.screen.gt.xs"/>
    <div class="row col-xs-12 col-sm-auto q-py-xs-lg">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="column col-xs-6 col-sm-auto q-pl-xs-lg q-gutter-sm-y-md">
        <div
          class="label-text text-capitalize q-pt-xs-lg q-pl-xs"
          style="font-weight: 700; font-size: 1.5rem">
          {{ i18n(`labels.${column.category}`) }}
        </div>
        <q-btn
          v-for="(item, itemIndex) in column.list"
          :key="itemIndex"
          class="ellipsis label-text q-py-xs-sm"
          align="left"
          dense
          flat
          :label="i18n(`labels.${item.label}`)"
          no-caps
          no-wrap
          square
          :to="item.to"
          style="font-weight: 400"/>
      </div>
    </div>
  </q-footer>
</template>

<script>
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "MainFooter",
  setup() {
    const $i18n = useI18n({useScope: "global"});
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

    const i18n = (relativePath) => {
      return $i18n.t("layouts.footers.main." + relativePath);
    };

    return {columns, i18n};
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.label-text {
  font-family: 'inter', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.title-text {
  font-family: 'galaxy-sans', sans-serif;
  font-feature-settings: 'pnum' on, 'lnum' on;
  font-weight: 206;
  -webkit-font-smoothing: antialiased;
}
</style>
