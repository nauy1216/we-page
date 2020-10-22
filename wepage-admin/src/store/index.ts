import Vue from "vue";
import Vuex from "vuex";
import page from "./page";
import editor from "./editor";
Vue.use(Vuex);

const state = {};
const mutations = {};
const getters = {};
const actions = {};
export type State = typeof state;
export type Mutations = typeof mutations;
export type Getters = typeof getters;
export type Actions = typeof actions;

const store = new Vuex.Store<{}>({
  state,
  mutations,
  getters,
  actions,
  modules: {
    page,
    editor
  }
});

export default store;
