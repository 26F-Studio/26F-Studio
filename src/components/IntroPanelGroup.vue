<script setup lang="ts">
import ChattingPanel from 'components/IntroPanels/ChattingPanel.vue';
import LoginPanel from 'components/IntroPanels/LoginPanel.vue';
import LogoPanel from 'components/IntroPanels/LogoPanel.vue';
import GithubPanel from 'components/IntroPanels/GithubPanel.vue';
import OrgPanel from 'components/IntroPanels/OrgPanel.vue';
</script>

<template>
  <div class="row q-gutter-x-lg">
    <OrgPanel class="bg-primary col-5 q-pa-lg" />
    <div class="col-grow column q-col-gutter-y-lg">
      <div class="col-6 row q-gutter-x-lg">
        <LogoPanel class="bg-primary col-5 column justify-end" />
        <GithubPanel class="bg-primary col-grow" />
      </div>
      <div class="col-6 row q-gutter-x-lg">
        <ChattingPanel class="bg-primary col-7" />
        <LoginPanel class="bg-primary col-grow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
