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
    path: "/editDetail/:projectId",
    name: "ediDetail",
    component: () => import("../views/EditDetail.vue"),
    meta: {
      auth: true
    },
    children: [
      {
        path: "basicInfo",
        name: "basicInfo",
        component: () => import("../views/editdetail/Basic.vue")
      },
      {
        path: "rewardInfo",
        name: "rewardInfo",
        component: () => import("../views/editdetail/Reward.vue")
      },
      {
        path: "storyInfo",
        name: "storyInfo",
        component: () => import("../views/editdetail/Story.vue")
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search/Search.vue")
  },
  {
    path: "/project-detail/:projectId",
    name: "projectDetail",
    component: () => import("../views/ProjectDetail/ProjectDetail.vue"),
    redirect: "/project-detail/:projectId/Story",
    children: [
      {
        path: "Story",
        name: "Story",
        component: () => import("../views/ProjectDetail/children/Story.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "FQA",
        name: "FQA",
        component: () => import("../views/ProjectDetail/children/FQA.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "Log",
        name: "Log",
        component: () => import("../views/ProjectDetail/children/Log.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "Msgboard",
        name: "Msgboard",
        component: () => import("../views/ProjectDetail/children/Msgboard.vue"),
        meta: {
          notTop: true
        }
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/User.vue"),
    redirect: "/user/user-info",
    children: [
      {
        path: "user-info",
        name: "user-info",
        component: () => import("../views/User/UserInfo/UserInfo.vue")
      },
      {
        path: "user-setting",
        name: "user-setting",
        component: () => import("../views/User/UserSetting/UserSetting.vue")
      }
    ]
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
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (from.path.indexOf("project-detail") !== -1)
      if (to.path.indexOf("project-detail") !== -1) return { y: 745 };
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  }
});

export default router;
