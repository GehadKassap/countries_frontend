import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddCountryView from "../views/AddCountryView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addCountry",
    name: "addCountry",
    component: AddCountryView,
  },
  {
    path: "/:pathMatch(.*)*",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
