import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    signedIn: false,
    csrf: null,
    shows: [],
    show: {},
    seats: []
  },
  getters: {
    isAdmin(state) {
      return state.currentUser && state.currentUser.role === "admin";
    },
    showId(state) {
      return state.show.id;
    }
  },
  mutations: {
    setCurrentUser(state, { currentUser, csrf }) {
      state.currentUser = currentUser;
      state.signedIn = true;
      state.csrf = csrf;
    },
    unsetCurrentUser(state) {
      state.currentUser = {};
      state.signedIn = false;
      state.csrf = null;
    },
    refresh(state, csrf) {
      state.signedIn = true;
      state.csrf = csrf;
    },
    setShowsList(state, response) {
      state.shows = response.data.data;
    },
    setCurrentShow(state, show) {
      state.show = show;
    },
    setSeats(state, seats) {
      state.seats = seats;
    },
    selectSeat(state, index) {
      if (state.seats[index]["selected"])
        state.seats[index]["selected"] = false;
      else state.seats[index]["selected"] = true;
    }
  },
  plugins: [createPersistedState()]
});
