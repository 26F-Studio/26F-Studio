import { createPinia } from "pinia";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "@/App.vue";
import messages from "@/i18n";
import router from "@/router";

import "@/assets/main.scss";
import "preline";

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages,
});

const pinia = createPinia();

const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.use(router);
app.mount("#app");
