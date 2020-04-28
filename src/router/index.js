import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Login/Register.vue")
  },
  {
    path: "/start",
    name: "start",
    component: () => import("../views/StartProject/index.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/editProject/:projectId",
    name: "editProject",
    component: () => import("../views/EditProject/index.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: "/editDetail/:projectId",
    name: "ediDetail",
    component: () => import("../views/EditDetail/index.vue"),
    redirect: "/editDetail/:projectId/basicInfo",
    meta: {
      auth: true
    },
    children: [
      {
        path: "basicInfo",
        name: "basicInfo",
        component: () => import("../views/EditDetail/Basic.vue")
      },
      {
        path: "rewardInfo",
        name: "rewardInfo",
        component: () => import("../views/EditDetail/Reward.vue")
      },
      {
        path: "storyInfo",
        name: "storyInfo",
        component: () => import("../views/EditDetail/Story.vue")
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search/index.vue")
  },
  {
    path: "/project-detail/:projectId",
    name: "projectDetail",
    component: () => import("../views/ProjectDetail/index.vue"),
    redirect: "/project-detail/:projectId/Story",
    children: [
      {
        path: "Story",
        name: "Story",
        component: () => import("../views/ProjectDetail/Story.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "FQA",
        name: "FQA",
        component: () => import("../views/ProjectDetail/FQA.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "Log",
        name: "Log",
        component: () => import("../views/ProjectDetail/Log.vue"),
        meta: {
          notTop: true
        }
      },
      {
        path: "Msgboard",
        name: "Msgboard",
        component: () => import("../views/ProjectDetail/Msgboard.vue"),
        meta: {
          notTop: true
        }
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/index.vue"),
    redirect: "/user/user-info",
    meta: {
      auth: true
    },
    children: [
      {
        path: "myInfo",
        name: "myInfo",
        component: () => import("../views/User/UserInfo.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("../views/User/UserSetting.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "saved-project",
        name: "saved-project",
        component: () => import("../views/User/UserSaved.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "user-support",
        name: "user-support",
        component: () => import("../views/User/UserSupport.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "point-history",
        name: "point-history",
        component: () => import("../views/User/PointRecord.vue"),
        meta: {
          auth: true
        }
      },
      {
        path: "top-up",
        name: "top-up",
        component: () => import("../views/User/TopUp.vue"),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: "/more",
    name: "more",
    component: () => import("../views/More/index.vue"),
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
    component: () => import("../views/404/index.vue")
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
