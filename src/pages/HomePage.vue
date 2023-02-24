<script setup lang="ts">
import { ref } from "vue";

import PButton from "@/components/PButton.vue";
import PCheckBox from "@/components/forms/PCheckBox.vue";
import PRadio from "@/components/forms/PRadio.vue";

const isOutlined = ref(false);
const buttonType = ref("primary");
</script>
<template>
  <div class="flex flex-col items-center gap-3">
    <div class="flex flex-row items-center gap-10">
      <div
        class="flex flex-col items-center bg-white shadow-sm rounded-xl p-4 md:p-5 dark:bg-zinc-600 dark:text-zinc-50">
        <div class="flex flex-col justify-center gap-5">
          <p-radio label="primary" value="primary" v-model="buttonType" />
          <p-radio label="secondary" value="secondary" v-model="buttonType" />
          <p-radio label="positive" value="positive" v-model="buttonType" />
          <p-radio label="negative" value="negative" v-model="buttonType" />
          <p-check-box label="outline" v-model="isOutlined" />
        </div>
      </div>
      <div class="flex flex-row justify-center gap-5">
        <p-button :type="buttonType" :outline="isOutlined">
          Button
        </p-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
