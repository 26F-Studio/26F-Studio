<template>
  <q-img class="absolute-top" src="images/home-header.png" />
  <q-page class="flex flex-center column q-pa-md">
    <div class="self-start row">
      <div class="offset-1 col-5 header-text text-weight-bolder">
        This is just
        a example of
        filler texts.
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage"

});
</script>

<style lang="scss">
@import "src/css/app.scss";

.header-text {
  font-family: 'newsreader-italic', serif;
  font-style: italic;
  font-size: 152px;
  line-height: 152px;
  font-feature-settings: 'pnum' on, 'lnum' on;
}
</style>
