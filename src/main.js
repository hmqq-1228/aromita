// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<<<<<<< HEAD



import 'swiper/dist/css/swiper.css';
// import Swiper from 'swiper'

=======
// import iView from 'iview';
import $ from 'jquery'
// import 'iview/dist/styles/iview.css';
import 'swiper/dist/css/swiper.css';
// import Swiper from 'swiper'
// import ajax from './assets/ajax/ajax.js'
>>>>>>> ca007b74c2533ddff8f664fed255b0ac3a37271a
import axios from 'axios';
import qs from 'qs';
import VueAxios from 'vue-axios';

<<<<<<< HEAD

=======
// Vue.use(ajax)
>>>>>>> ca007b74c2533ddff8f664fed255b0ac3a37271a
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios
/* eslint-disable no-new */
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
