<template>
  <q-img class="absolute-top" src="images/home-header.png" />
  <q-page class="flex flex-center">
    <div class="col-12 col-sm-11 col-md-10 self-start column q-gutter-y-sm">
      <div
        v-for="index in 1000"
        :key="index">
        <br />
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
