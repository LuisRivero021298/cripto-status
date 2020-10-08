import { createApp } from "vue";
import router from "@/router";
import App from "./App.vue";

import "@/assets/css/tailwind.css";
import { dollarFilter, percentFilter } from "@/filters";

const app = createApp(App);
app.config.globalProperties.$filters = {
  dollarFilter,
  percentFilter,
};
app.use(router).mount("#app");
