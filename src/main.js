import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import VueAxios from "vue-axios";
import { securedAxiosInstance, plainAxiosInstance } from "./api/axios";
import BootstrapVue from "bootstrap-vue";
import "./assets/stylesheets/base.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
});

new Vue({
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount("#app");
