import Vue from 'vue'
import Router from 'vue-router'
const ShowPage = () => import('@/view/home/showPage.vue')
const Login = () => import('@/view/login/login.vue')
const codetest = () => import('@/view/test/codetest.vue')
// import Login from '@/view/login/login.vue'
const Register_ok = () => import('@/view/register/register_ok.vue')
// import Register_ok from '@/view/register/register_ok.vue'
const Apply_reset_password = () => import('@/view/register/apply_reset_password.vue')
// import Apply_reset_password from '@/view/register/apply_reset_password.vue'
const Psd_reset_ok = () => import('@/view/register/psd_reset_ok.vue')
// import Psd_reset_ok from '@/view/register/psd_reset_ok.vue'
const Sort_out_warn = () => import('@/view/register/sort_out_warn.vue')
// import Sort_out_warn from '@/view/register/sort_out_warn.vue'
const Register = () => import('@/view/register/register.vue')
// import Register from '@/view/register/register.vue'
const Header = () => import('@/components/header.vue')
// import Header from '@/components/header.vue'
const Footer = () => import('@/components/footer.vue')
// import Footer from '@/components/footer.vue'
const Forgot_password = () => import('@/view/register/forgot_password.vue')
// import Forgot_password from '@/view/register/forgot_password.vue'
const Erqi = () => import('@/view/Kongbai/erqi.vue')
// import Erqi from '@/view/Kongbai/erqi.vue'
// hm api
const goodsList = () => import('@/view/goodsList/goodsList.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showPage',
      component: ShowPage,
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
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/codetest',
      name: 'codetest',
      component: codetest,
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
      path: '/erqi',
      name: 'erqi',
      component: Erqi,
    },
    // hm
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList,
    }
  ]
})
