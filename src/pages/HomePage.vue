<script setup lang="ts">
import LogoText from 'components/LogoText.vue';
import OrgPanel from 'components/IntroPanels/OrgPanel.vue';
</script>

<template>
  <q-page class="flex flex-center justify-center q-pa-md">
    <div class="column">
      <div class="row q-gutter-x-lg">
        <OrgPanel class="bg-primary col-5 q-pa-lg" />
        <div class="col-grow column q-gutter-y-lg">
          <div class="col-grow row q-gutter-x-lg">
            <q-card
              class="bg-primary col-5 column justify-end"
              flat
              style="border-radius: 2rem"
            >
              <div class="absolute-left">
                <LogoText :rem="6" style="padding-top: 2rem" />
              </div>
              <img alt="?playOpenly.svg?" src="~assets/images/26f.svg" />
            </q-card>
            <q-card
              class="bg-primary col-grow"
              flat
              style="border-radius: 2rem"
            >
              <div class="absolute-bottom-left q-pl-sm">
                <div class="column">
                  <div
                    class="text-font-redhat-bolder q-pa-sm"
                    style="font-size: 2.2rem; line-height: 1rem"
                  >
                    Check out our
                  </div>
                  <div class="row"></div>
                  <div
                    class="text-font-redhat-bolder q-pa-sm"
                    style="font-size: 2.2rem; line-height: 3rem"
                  >
                    GitHub repos
                  </div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-grow row q-gutter-x-lg">
            <q-card class="bg-primary col-7" flat style="border-radius: 2rem">
              <q-card-section></q-card-section>
            </q-card>
            <q-card
              class="bg-primary col-grow"
              flat
              style="border-radius: 2rem"
            >
              <q-card-section></q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/app.scss';
</style>
