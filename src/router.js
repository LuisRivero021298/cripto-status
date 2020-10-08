import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Error404 from "@/views/Error404";

const history = createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error404",
      component: Error404,
    },
  ],
});

export default router;

