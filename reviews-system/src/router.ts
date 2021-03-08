import Vue from 'vue';
import Router from 'vue-router';
import AdminHome from './views/AdminHome.vue';
import EmployeeHome from './views/EmployeeHome.vue';
import Login from './Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: AdminHome,
    // },
    {
      path: '/adminhome',
      name: 'AdminHome',
      component: AdminHome,
    },
    {
      path: '/employeeHome',
      name: 'EmployeeHome',
      component: EmployeeHome,
    },
  ],
});
