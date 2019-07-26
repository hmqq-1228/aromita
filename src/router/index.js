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
// hm api newPassword
const goodsList = () => import('@/view/goodsList/goodsList.vue')
const goodsDetail = () => import('@/view/goodsDetail/goodsDetail.vue')
const shoppingCar = () => import('@/view/shoppingCar/shoppingCar.vue')
const newPassword = () => import('@/view/register/newPassword.vue')
const unavailable = () => import('@/view/Kongbai/unavailable.vue')
const myAccount = () => import('@/view/myAccount/myAccount.vue')//个人中心首页
const myOrder = () =>import('@/view/myAccount/page/myOrder.vue')//我的订单
const orderDetail = () =>import('@/view/myAccount/page/orderPage/orderDetail.vue')
const orderRefund = () =>import('@/view/myAccount/page/orderPage/refund.vue')
const orderRefundApply = () =>import('@/view/myAccount/page/orderPage/refundApplication.vue')
const myWishlist = () =>import('@/view/myAccount/page/myWishlist.vue')
const myCoupon = () =>import('@/view/myAccount/page/myCoupon.vue')
const myPoints = () =>import('@/view/myAccount/page/myPoints.vue')
const mySubscription = () =>import('@/view/myAccount/page/mySubscription.vue')
const addressBook = () =>import('@/view/myAccount/page/addressBook.vue')
const accountSetting = () =>import('@/view/myAccount/page/accountSetting.vue')
const orderConfirm = () => import('@/view/order/orderConfirm.vue')
const paySucceed = () => import('@/view/order/paySucceed.vue')
const payFailed = () => import('@/view/order/payFailed.vue')
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
      path: '/newPassword',
      name: 'newPassword',
      component: newPassword,
    },
    {
      path: '/erqi',
      name: 'erqi',
      component: Erqi,
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList,
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail,
    },
    {
      path: '/goodsDetail/:spuId/:skuId',
      name: 'goodsDetail',
      component: goodsDetail,
    },
    {
      path: '/shoppingCar',
      name: 'shoppingCar',
      component: shoppingCar,
    },
    {
      path: '/unavailable',
      name: 'unavailable',
      component: unavailable,
    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: myAccount,
      children:[
        {
            path:'/myOrder',
            component:myOrder,
            name:'myOrder'
        },
        {
          path:'/myWishlist',
          component:myWishlist,
          name:'myWishlist'
        },
        {
          path:'/myCoupon',
          component:myCoupon,
          name:'myCoupon'
        },
        {
          path:'/myPoints',
          component:myPoints,
          name:'myPoints'
        },
        {
          path:'/mySubscription',
          component:mySubscription,
          name:'mySubscription'
        },
        {
          path:'/addressBook',
          component:addressBook,
          name:'addressBook'
        },
        {
          path:'/accountSetting',
          component:accountSetting,
          name:'accountSetting'
        },
      ]
    },
    {
      path:'/orderDetail',
      component:orderDetail,
      name:'orderDetail'
    },
    {
      path:'/orderRefund',
      component:orderRefund,
      name:'orderRefund'
    },
    {
      path:'/orderRefundApply',
      component:orderRefundApply,
      name:'orderRefundApply'
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm,
    },
    {
      path: '/paySucceed',
      name: 'paySucceed',
      component: paySucceed,
    },
    {
      path: '/payFailed',
      name: 'payFailed',
      component: payFailed,
    }
  ]
})
