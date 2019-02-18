import axios from "@/auth-axios";
import router from "@/router";
const API_KEY = "AIzaSyAFsyvKlHi_MbZbVjmFPJIjv2yxJkswRDE";

const state = {
  idToken: null,
  localId: null,
  email: null
};
const mutations = {
  authUser: (state, userData) => {
    state.idToken = userData.idToken;
    state.localId = userData.localId;
    state.email = userData.email;
  },
  clearUserData: state => {
    (state.idToken = null), (state.localId = null), (state.email = null);
  }
};
const actions = {
  signUp: ({ commit }, payload) => {
    const url = `/signupNewUser?key=${API_KEY}`;
    const request = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    };
    axios
      .post(url, request)
      .then(res => {
        const userData = {
          idToken: res.data.idToken,
          localId: res.data.localId,
          email: res.data.email
        };
        commit("authUser", userData);
      })
      .catch(err => {
        alert(err);
      });
  },
  login({ commit, dispatch }, userData) {
    const url = `/verifyPassword?key=${API_KEY}`;
    const request = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    };
    axios
      .post(url, request)
      .then(res => {
        const userData = {
          idToken: res.data.idToken,
          localId: res.data.localId,
          email: res.data.email
        };
        commit("authUser", userData);
        dispatch("getTodayCards");
        router.push("/home");
      })
      .catch(err => {
        alert(err);
      })
      .then();
  },
  logout({ commit }) {
    commit("clearUserData");
    commit("clearCards");
    router.push("/");
  }
};
const getters = {
  isAuthenticated: state => state.idToken != null,
  getAuthParams: state => {
    return { auth: state.idToken };
  },
  getUser: state => state.localId
};

export default {
  state,
  actions,
  getters,
  mutations
};
