import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("../views/Mine.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/start",
    name: "start",
    component: () => import("../views/StartProject.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/editProject/:projectId",
    name: "editProject",
    component: () => import("../views/EditProject.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/editDetail/:path",
    name: "ediDetail",
    component: () => import("../views/EditDetail.vue"),
    meta: {
      auth: true
    }
  },

  {
    path: "*",
    redirect: "/404",
    name: "notfound"
  },
  {
    path: "/404",
    name: "page404",
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});

export default router;
