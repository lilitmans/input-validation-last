/* eslint semi: "error" */

import Vue from 'vue';
import App from './App.vue';
// import router from './router';
import axios from 'axios';
import { VueMask, VueMaskDirective } from 'v-mask';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios, VueMask);
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
