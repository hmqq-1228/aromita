// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css';
import $ from 'jquery'
import axios from 'axios';

import qs from 'qs'
Vue.use(ElementUI);
Vue.prototype.$axios = axios

router.afterEach((to,from,next)=>{
  　window,scrollTo(0,0)
})

router.beforeEach((to,from,next)=>{
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('userToken')) { // 判断本地是否存在access_token
      next()
    } else {
      // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  $,
  store,
  router,
  components: { App },
  template: '<App/>'
})
