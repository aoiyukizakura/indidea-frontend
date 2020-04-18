import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "./assets/css/hover.css";
import { TOKEN } from "./utils/Constants";
import { imageIsExist } from "./utils/FunctionUtils";
import BaseUrl from "./utils/BaseUrl";
import "../src/assets/scss/global.scss";

Vue.use(ViewUI);

Vue.prototype.$axios = axios;
Vue.prototype.$url = BaseUrl;
Vue.config.productionTip = false;

ViewUI.LoadingBar.config({
  height: 4,
  color: "#3399FF",
  duration: 350
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();

  if (localStorage.getItem(TOKEN) !== null) {
    if (to.name === "login" || to.name === "register") {
      // ViewUI.LoadingBar.finish();
      location.href = "/";
    }
  }

  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem(TOKEN) !== null) {
      next();
    } else {
      if (to.name === "login") {
        next();
        return;
      }
      ViewUI.LoadingBar.finish();
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

Vue.directive("real-img", async (el, binding) => {
  let imgUrl = BaseUrl.imgUrl + binding.value;
  if (binding.value) {
    imageIsExist(imgUrl)
      .then(res => {
        if (res) {
          el.setAttribute("src", imgUrl);
        }
      })
      .catch(e => {
        console.log("e :", e);
      });
  }
});

Vue.filter("numCheck", function(value) {
  if (!value) {
    return 1;
  } else {
    return value;
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
