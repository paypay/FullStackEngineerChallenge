import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

class VueInstance {
  constructor() {
    Vue.mixin({});
    new Vue({
      router,
      store,
      i18n,
      vuetify,
      render: (h: any) => h(App),
    }).$mount('#app');
  }
}

const wrapper = new VueInstance();
