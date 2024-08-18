<script setup lang="ts">
export interface Navigation {
  label: string;
  href: string;
}

export interface NavigationGroup {
  label: string;
  items: Navigation[];
}

const props = defineProps<NavigationGroup>();
</script>

<template>
  <q-btn-dropdown
    content-style="box-shadow: none; border: 1px solid rgba(0, 0, 0, 0.12);"
    dropdown-icon="expand_more"
    flat
    :label="props.label"
    no-caps
    stretch
  >
    <q-list v-for="(item, index) in props.items" :key="index">
      <q-item clickable :href="item.href">
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped lang="scss"></style>
