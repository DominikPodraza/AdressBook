import { createWebHistory, createRouter } from "vue-router";
import Details from "@/views/Details.vue";
import Home from "@/views/Home.vue";
const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/details/:entryId",
    name: "details",
    component: Details,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
