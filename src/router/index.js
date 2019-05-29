import Vue from 'vue'
import Router from 'vue-router'
import ShowPage from '@/view/home/showPage.vue'
import Login from '@/view/login/login.vue'
import Register_ok from '@/view/register/register_ok.vue' 
import Apply_reset_password from '@/view/register/apply_reset_password.vue' 
import Psd_reset_ok from '@/view/register/psd_reset_ok.vue' 
import Sort_out_warn from '@/view/register/sort_out_warn.vue' 
import Register from '@/view/register/register.vue' 
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Forgot_password from '@/view/register/forgot_password.vue' 
import A from '@/view/home/a.vue'
import Test from "@/components/test.vue"
import Select from "@/components/select.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/showPage',
      name: 'showPage',
      component: ShowPage,

    },
    {
      path: '/select',
      name: 'select',
      component: Select,
    },
    {
      path: '/header',
      name: 'header',
      component: Header,

    },
    {
      path: '/footer',
      name: 'footer',
      component: Footer,

    },
    {
      path: '/a',
      name: 'a',
      component: A,

    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {    
      path: '/register_ok',
      name: 'register_ok',
      component: Register_ok,
    },
    {    
      path: '/apply_reset_password',
      name: 'apply_reset_password',
      component: Apply_reset_password,
    },
    {    
      path: '/psd_reset_ok',
      name: 'psd_reset_ok',
      component: Psd_reset_ok,
    },
    {    
      path: '/sort_out_warn',
      name: 'sort_out_warn',
      component: Sort_out_warn,
    },
    {    
      path: '/register',
      name: 'register',
      component: Register,
    },
    {    
      path: '/forgot_password',
      name: 'forgot_password',
      component: Forgot_password,
    },
    {    
      path: '/',
      name: 'test',
      component: Test,
    },

  ]
})
