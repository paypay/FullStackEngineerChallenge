import Vue from 'vue';
import Vuex from 'vuex';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import * as types from '../typedef';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    api: {},
    staff: {},
    reviews: {},
    allStaffs: []
  },
  getters: {
    staff: (state: any) => state.staff,
    reviews: (state: any) => state.reviews,
    allStaffs: (state: any) => state.allStaffs,
  },
  actions: {
    initAPI: async (helper: any) => {
      try {
        const {commit} = helper;
        const api: AxiosInstance = axios.create({baseURL: `http://${window.location.hostname}:5000`});
        // const response: AxiosResponse = await api.get('/staffs');
        // console.log(response);
        commit('commit_api', api);
      } catch (err) {
        console.error(`initAPI fail, ${err.massage}`);
      }
    },
    getAllStaff: async (helper: any) => {
      try {
        const {state, commit} = helper;
        const api: AxiosInstance = state.api;
        const response: AxiosResponse = await api.get('/staffs');
        if (response.status !== 200) return;
        else {
          const data: types.StaffResponse = response.data;
          commit('commit_allStaffs', data);
        }
      } catch (err) {
        console.error(`getAllStaff fail, ${err.massage}`);
      }
    },
    getStaffByName: async (helper: any, name: string) => {
      try {
        const {state, commit} = helper;
        const api: AxiosInstance = state.api;
        const response: AxiosResponse = await api.get('/staff', {params: {name}});
        if (response.status !== 200) return;
        else {
          const data: types.StaffResponse = response.data;
          commit('commit_staff', data);
        }
      } catch (err) {
        console.error(`getStaffByName fail, ${err.massage}`);
      }
    },
    getReviewByName: async (helper: any, name: string) => {
      try {
        const {state, commit} = helper;
        const api: AxiosInstance = state.api;
        const response: AxiosResponse = await api.get('/review', {params: {name}});
        if (response.status !== 200) return;
        else {
          const data: types.StaffResponse = response.data;
          console.log(data);
          commit('commit_review', data);
        }
      } catch (err) {
        console.error(`getReviewByName fail, ${err.massage}`);
      }
    },
    updateReviewByName: async (helper: any, input: types.UpdateReviewInput) => {
      try {
        console.log(input);
        const {state, dispatch} = helper;
        const api: AxiosInstance = state.api;
        const response: AxiosResponse = await api.put('/review', {
          params: {name: input.name},
          data: {reviews: input.reviews}
        });
        if (response.status !== 200) return;
        else {
          const data: types.StaffResponse = response.data;
          console.log(data);
          await dispatch('getReviewByName', input.name);
          // commit('commit_review', data);
        }
      } catch (err) {
        console.error(`updateReviewByName fail, ${err.massage}`);
      }
    },
  },
  mutations: {
    commit_api(state: any, api: any) {
      Vue.set(state, 'api', api);
    },
    commit_staff(state: any, staff: types.StaffResponse) {
      Vue.set(state, 'staff', staff);
    },
    commit_review(state: any, reviews: types.ReviewResponse) {
      Vue.set(state, 'reviews', reviews);
    },
    commit_allStaffs(state: any, allStaffs: types.ReviewResponse[]) {
      Vue.set(state, 'allStaffs', allStaffs);
    },
  }
});
