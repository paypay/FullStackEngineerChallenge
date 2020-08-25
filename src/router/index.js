import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home';
import EmployeesList from '../views/EmployeesList';
import ReviewsList from '../views/ReviewsList';
import EmployeePage from '../views/EmployeePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      const isAdmin = store.getters['user/isAdmin'];

      if (isAdmin) {
        next({ name: 'EmployeesList' });
        return;
      }
      next({ name: 'EmployeePage' });
    },
  }, {
    path: '/employees-list',
    name: 'EmployeesList',
    component: EmployeesList,
  }, {
    path: '/reviews',
    name: 'ReviewsList',
    component: ReviewsList,
  }, {
    path: '/employee-page',
    name: 'EmployeePage',
    component: EmployeePage,
    beforeEnter(to, from, next) {
      const isAdmin = store.getters['user/isAdmin'];

      if (isAdmin) {
        next({ name: 'EmployeesList' });
        return;
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
