import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import employees from './employees';
import feedbacks from './feedbacks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    employees,
    feedbacks,
  },
});
