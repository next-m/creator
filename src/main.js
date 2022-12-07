import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { formatDate } from '@/utils/filters';
import vuetify from '@/plugins/vuetify';
import Notifications from 'vue-notification';
import VueCookies from 'vue-cookies';

Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueCookies, { expire: '7d' });
new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
