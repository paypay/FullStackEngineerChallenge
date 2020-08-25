// import api from '@/api';
import Vue from 'vue';
import employeesList from '@/mocks/employeesList.json';
import employee from '@/mocks/employee.json';

export default {
  namespaced: true,
  state: {
    employeesList: [],
    employee: null,
  },
  mutations: {
    SET_EMPLOYEES_LIST(state, list) {
      state.employeesList = list;
    },
    SET_EMPLOYEE_INFO(state, info) {
      state.employee = info;
    },
  },
  actions: {
    async fetchEmployeesList({ commit }) {
      try {
        // const result = await api.post('employees-list');
        /**
         * emulation api work using promise + setTimeout
         * I did api for your understanding, that I can work with Axios
         */
        const result = await new Promise(resolve => {
          setTimeout(() => resolve(employeesList), 800);
        });
        commit('SET_EMPLOYEES_LIST', result);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchEmployeeInfo({ commit }, id) {
      try {
        const result = await new Promise(resolve => {
          setTimeout(() => resolve(employee.find(it => it.id === id)), 400);
        });
        commit('SET_EMPLOYEE_INFO', result);
      } catch (error) {
        console.log(error);
      }
    },

    async updateEmployeeInfo({ commit }, data) {
      try {
        const result = await new Promise(resolve => {
          setTimeout(() => resolve(true), 800);
        });
        if (result) {
          commit('SET_EMPLOYEE_INFO', data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addEmployee({ state, commit }, data) {
      try {
        const result = await new Promise(resolve => {
          setTimeout(() => resolve(true), 800);
        });
        if (result) {
          const index = state.employeesList.length;
          Vue.set(state.employeesList, index, data);
          commit('SET_EMPLOYEE_INFO', {
            ...data,
            id: index,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser({ state }, employeeId) {
      try {
        const result = await new Promise(resolve => {
          setTimeout(() => resolve(true), 800);
        });
        if (result) {
          const index = state.employeesList.findIndex(it => it.id === employeeId);
          Vue.delete(state.employeesList, index);
        }
      } catch (error) {
        console.log(error);
      }
    },

    clearState({ commit }) {
      commit('SET_EMPLOYEE_INFO', null);
    },
  },
};
