<script setup lang="ts">
import LogoText from 'components/LogoText.vue';
</script>

<template>
  <q-page class="flex row justify-center q-pa-md">
    <div class="col-grow column" style="max-width: 1440px">
      <div class="row q-gutter-x-lg">
        <q-card
          class="bg-primary col-5 q-pa-lg"
          flat
          style="border-radius: 2rem"
        >
          <div class="absolute-top-left q-pl-md">
            <div class="row items-center q-gutter-x-xs q-pa-sm">
              <LogoText :rem="3.5" />
              <div class="text-font-redhat-bolder" style="font-size: 2.3rem">
                26F Studio
              </div>
            </div>
          </div>
          <div class="absolute-bottom-right q-pa-sm">
            <q-icon
              name="r_arrow_outward"
              size="5rem"
              style="font-weight: bolder"
            />
          </div>
          <img alt="?playOpenly.svg?" src="~assets/images/playOpenly.svg" />
        </q-card>
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
                  <div class="text-font-redhat-bolder q-pa-sm" style="font-size: 2.2rem;line-height: 1rem">
                    Check out our
                  </div>
                  <div class="row">

                  </div>
                  <div class="text-font-redhat-bolder q-pa-sm" style="font-size: 2.2rem;line-height: 3rem">
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
