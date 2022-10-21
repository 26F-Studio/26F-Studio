<template>
  <q-page class="flex column">
    <div class="relative-position full-width" style="height:fit-content; margin-top: -50px">
      <img class="full-width" src="images/home-header.png" alt="home-header" style="object-fit: contain;"/>
      <div class="row absolute-center full-width">
        <div class="offset-1 header-text">
          This is just <br>
          an example of <br>
          filler texts.
        </div>
      </div>
    </div>
    <div class="self-center title-text">
      Our products
    </div>
    <div class="row">
      <img src="images/TechminoGalaxy-icon.png" alt="TechminoGalaxy-icon" style="height: 55vw;margin-top: -10vw"/>
      <div class="q-py-lg" style="margin-left: -5vw">
        <div class="product-text">
          Techmino Galaxy
        </div>
        <div class="description-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting <br>
          industry. Lorem Ipsum has been the industry's standard dummy text <br>
          ever since the 1500s, when an unknown printer took a galley of type <br>
          and scrambled it to make a type specimen book.
        </div>
        <div class="row q-gutter-x-xl items-center" style="margin-top:2vw">
          <q-btn-dropdown
            class="download-btn text-white"
            split
            size="1.5vw"
            flat
            no-caps
            @click="onDownloadClick">
            <template v-slot:label>
              <div class="column items-center no-wrap q-ma-sm">
                <div style="font-weight: 700; font-size: 1.5vw">
                  Download Now
                </div>
                <div style="font-weight: 400; font-size: 1vw">
                  macOS, Universal
                </div>
              </div>
            </template>

            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="folder" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber"/>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="secondary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vacation</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div>
            <q-btn
              class="product-btn q-px-xl"
              size="1.5vw"
              flat
              no-caps
              @click="onProductClick">
              Learn More
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const productIndexes = [
      "techminoGalaxy",
      "techmino",
      "quatrack",
    ]
  }
});
</script>

<style scoped lang="scss">
@import "src/css/app.scss";

.newsreader {
  font-family: 'newsreader', sans-serif;
}

.newsreader-italic {
  font-family: 'newsreader-italic', sans-serif;
}

.header-text {
  @extend .newsreader-italic;
  color: #F1F2F3;
  font-style: italic;
  font-weight: 800;
  font-size: 8vw;
  line-height: 12vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.title-text {
  @extend .newsreader;
  background: linear-gradient(90.8deg, #BF55D4 26.21%, #6271CD 86.62%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-style: normal;
  font-weight: 800;
  font-size: 6vw;
  line-height: 18vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-text {
  @extend .newsreader;
  background: linear-gradient(90.8deg, #5580D4 4.29%, #7162CD 97.82%);
  text-shadow: 0 1vw 2vw rgba(48, 0, 240, 0.31);
  font-style: normal;
  font-weight: 600;
  font-size: 5vw;
  line-height: 8vw;
  font-feature-settings: 'pnum' on, 'lnum' on;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description-text {
  font-style: normal;
  font-weight: 400;
  font-size: 1.8vw;
  line-height: 3vw;
}

.download-btn {
  background: linear-gradient(81.97deg, #B14FFF -3.99%, #474EEE 90.36%);
  box-shadow: 0 15px 35px rgba(36, 0, 182, 0.21);
  border-radius: 1vw;
  font-family: 'inter', sans-serif;
  font-style: normal;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.product-btn {
  background: #CCD4FF;
  border-radius: 1vw;
  font-family: 'inter', sans-serif;
  font-style: normal;
  font-size: 1.5vw;
  font-weight: 700;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #636DD0;
}
</style>
