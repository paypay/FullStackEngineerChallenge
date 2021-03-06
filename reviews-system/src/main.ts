import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';

Vue.config.productionTip = false;

class VueInstance {
  constructor() {
    Vue.mixin({});
    new Vue({
      router,
      store,
      vuetify,
      render: (h: any) => h(App),
    }).$mount('#app');
  }
}

const wrapper = new VueInstance();
