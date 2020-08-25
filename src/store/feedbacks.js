import Vue from 'vue';
import feedbacksList from '@/mocks/feedbacksList.json';

export default {
  namespaced: true,
  state: {
    feedbacksList: [],
  },
  getters: {
    feedbacksByUserId: state => state.feedbacksList.filter(it => it.from === 'User1'),
  },
  mutations: {
    SET_FEEDBACKS_LIST(state, list) {
      state.feedbacksList.push(...list);
    },
  },
  actions: {
    async fetchFeedbacksList({ commit }) {
      try {
        const result = await new Promise(resolve => setTimeout(
          () => resolve(feedbacksList), 800,
        ));
        commit('SET_FEEDBACKS_LIST', result);
      } catch (error) {
        console.log(error);
      }
    },

    async updateFeedback({ state }, { id, to, from }) {
      try {
        const result = await new Promise(resolve => setTimeout(
          () => resolve(true), 300,
        ));
        if (result) {
          const editing = state.feedbacksList.find(it => it.id === id);
          Vue.set(editing, 'to', to);
          Vue.set(editing, 'from', from);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async createFeedbackTask({ state, commit }, { to, from }) {
      try {
        const result = await new Promise(resolve => setTimeout(
          () => resolve(true), 300,
        ));
        if (result) {
          const index = state.feedbacksList.length + 1;
          commit('SET_FEEDBACKS_LIST', [{
            to,
            from,
            id: index,
          }]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addFeedback({ state }, { id, text }) {
      try {
        const result = await new Promise(resolve => setTimeout(
          () => resolve(true), 300,
        ));
        if (result) {
          const item = state.feedbacksList.find(it => it.id === id);
          Vue.set(item, 'text', text);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
