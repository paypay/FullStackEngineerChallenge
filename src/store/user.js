import { USER_ROLES } from '@/utils/globalEnums';
// eslint-disable-next-line import/no-cycle

export default {
  namespaced: true,
  state: {
    role: USER_ROLES.ADMIN,
  },
  getters: {
    isAdmin: state => state.role === USER_ROLES.ADMIN,
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role;
    },
  },
  actions: {
    async changeRole({ getters, commit }) {
      try {
        const role = await new Promise(resolve => setTimeout(
          resolve(getters.isAdmin ? USER_ROLES.USER : USER_ROLES.ADMIN), 300,
        ));
        commit('SET_ROLE', role);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
