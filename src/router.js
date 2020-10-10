import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Error404 from "@/views/Error404";
import CoinDetail from "@/views/CoinDetail";

const history = createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetail,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error404",
      component: Error404,
    },
  ],
});

export default router;
