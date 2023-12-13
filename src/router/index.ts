import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index.vue";

const views = import.meta.glob("@/views/*.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Index,
    },
    ...Object.keys(views).map((key: string) => {
      // Extract the name from the file path
      const name = (key.match(/\/([^\/]+)\.vue$/) as string[])[1];

      return {
        path: `/${name}`,
        name: name,
        component: views[key],
      };
    }),
  ],
});

export default router;
