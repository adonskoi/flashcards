import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import auth from "./modules/auth";

export default new Vuex.Store({
  state: {
    cards: []
  },
  mutations: {
    addCard: (state, card) => {
      state.cards.push(card);
    },
    removeCard: (state, cardId) => {
      const card = state.cards.find(el => el.id === cardId);
      state.cards.splice(state.cards.indexOf(card), 1);
    },
    updateCard: (state, card) => {
      let updatedCard = state.cards.find(el => el.id === card.id);
      for (let key in updatedCard) {
        updatedCard[key] = card[key];
      }
    },
    clearCards: state => {
      state.cards = [];
    }
  },
  actions: {
    addCard: ({ getters, commit }, card) => {
      card.nextShow = new Date(Date.now());
      card.counter = 0;
      card.user = getters.getUser;
      axios
        .post("/cards.json", card, { params: getters.getAuthParams })
        .then(res => {
          card.id = res.data.name;
          commit("addCard", card);
        })
        .catch(err => alert(err));
    },
    removeCard: ({ commit, getters }, cardId) => {
      const url = "/cards/" + cardId + ".json";
      axios.delete(url, { params: getters.getAuthParams });
      commit("removeCard", cardId);
    },
    nextCard: ({ commit, getters }, card) => {
      // try make a promise: commit, then put
      commit("removeCard", card.id);
      const url = "/cards/" + card.id + ".json";
      card.counter += 1;
      card.nextShow = card.nextShow.addDays(card.counter * 2);
      card.user = getters.getUser;
      axios.put(url, card, { params: getters.getAuthParams });
    },
    updateCard: ({ commit, getters }, card) => {
      const url = "/cards/" + card.id + ".json";
      card.user = getters.getUser;
      axios
        .put(url, card, { params: getters.getAuthParams })
        .then(() => commit("updateCard", card))
        .catch(err => {
          alert(err);
        });
    },
    getTodayCards: ({ commit, getters }) => {
      const url = "/cards.json";
      const params = {
        ...getters.getAuthParams,
        orderBy: `"user"`,
        equalTo: `"${getters.getUser}"`
      };
      axios
        .get(url, { params })
        .then(res => {
          for (let key in res.data) {
            const card = res.data[key];
            card.id = key;
            card.nextShow = new Date(card.nextShow);
            const today = new Date(Date.now());
            if (card.nextShow.isLessOrEqualDate(today)) {
              commit("addCard", card);
            }
          }
        })
        .catch(err => alert(err));
    },
    getAllCards: ({ state, commit, getters }) => {
      const params = {
        ...getters.getAuthParams,
        orderBy: `"user"`,
        equalTo: `"${getters.getUser}"`
      };
      const url = "/cards.json";
      axios
        .get(url, { params })
        .then(res => {
          for (let key in res.data) {
            const existingCard = state.cards.find(el => el.id === key);
            if (!existingCard) {
              const card = res.data[key];
              card.id = key;
              card.nextShow = new Date(card.nextShow);
              commit("addCard", card);
            }
          }
        })
        .catch(err => alert(err));
    },
    clearOldCards({ state, commit }) {
      const today = new Date(Date.now());
      state.cards.forEach(card => {
        if (!card.nextShow.isLessOrEqualDate(today)) {
          commit("removeCard", card.id);
        }
      });
    }
  },
  getters: {
    getCards(state) {
      return state.cards;
    },
    getCard(state) {
      return state.cards[0];
    }
  },
  modules: {
    auth
  }
});

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.getFormatDate = function() {
  const dd = this.getDate();
  const mm = this.getMonth() + 1; //January is 0!
  const yyyy = this.getFullYear();

  const date = `${dd}.${mm}.${yyyy}`;

  return date;
};

Date.prototype.isEqualDate = function(date) {
  return (
    this.getFullYear() == date.getFullYear() &&
    this.getMonth() == date.getMonth() &&
    this.getDate() == date.getDate()
  );
};

Date.prototype.isLessOrEqualDate = function(date) {
  return this.getTime() <= date.getTime();
};
