import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import axios from "axios";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
axios.defaults.baseURL = "https://flash-cards-407f0.firebaseio.com";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
