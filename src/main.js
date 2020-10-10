import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";
import { dollarFilter, percentFilter } from "@/filters";

import "@/assets/css/tailwind.css";

const app = createApp(App);
app.config.globalProperties.$filters = {
  dollarFilter,
  percentFilter,
};
app.use(router);
app.mount("#app");
