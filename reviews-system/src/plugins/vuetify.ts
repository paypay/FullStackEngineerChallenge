import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';
import {en, ja} from '../locale';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {en, ja},
    current: 'en'
  },
  // icons: {
  //   iconfont: 'md',
  // }
});
