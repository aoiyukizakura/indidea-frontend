import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

Vue.use(ViewUI);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

ViewUI.LoadingBar.config({
  height: 4,
  color: "#3399FF"
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach(route => {
  setTimeout(() => {
    ViewUI.LoadingBar.finish();
  }, 500);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
