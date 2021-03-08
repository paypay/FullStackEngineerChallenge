import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // default
  fallbackLocale: 'en',
  messages : {
  }
});

(() => {
  i18n.setLocaleMessage('en', require('@/locale/en.json'));
  const local = localStorage.getItem('lang');
  const langCode = local && require(`@/locale/${local}.json`) ? local : 'en';
  const lang = require(`@/locale/${langCode}.json`);
  i18n.setLocaleMessage(langCode, lang);
  i18n.locale = langCode;
})();

export default i18n;
