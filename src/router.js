import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";
import store from "@/store/store";

const Cards = resolve => {
  require.ensure(["./views/Cards"], () => {
    resolve(require("./views/Cards"));
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/cards",
      name: "cards",
      component: Cards,
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    { path: "*", component: Home }
  ],
  mode: "history",
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }
  }
});
