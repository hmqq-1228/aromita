import Vue from 'vue'
import Router from 'vue-router'
const ShowPage = () => import('@/view/home/showPage.vue')
const Login = () => import('@/view/login/login.vue')
const codetest = () => import('@/view/test/codetest.vue')
const Register_ok = () => import('@/view/register/register_ok.vue')
const Apply_reset_password = () => import('@/view/register/apply_reset_password.vue')
const Psd_reset_ok = () => import('@/view/register/psd_reset_ok.vue')
const Sort_out_warn = () => import('@/view/register/sort_out_warn.vue')
const Register = () => import('@/view/register/register.vue')
const Forgot_password = () => import('@/view/register/forgot_password.vue')
const Erqi = () => import('@/view/Kongbai/erqi.vue')
// hm api newPassword
const goodsList = () => import('@/view/goodsList/goodsList.vue')
const searchList = () => import('@/view/goodsList/searchList.vue')
const goodsDetail = () => import('@/view/goodsDetail/goodsDetail.vue')
const shoppingCar = () => import('@/view/shoppingCar/shoppingCar.vue')
const newPassword = () => import('@/view/register/newPassword.vue')
const unavailable = () => import('@/view/Kongbai/unavailable.vue')
const productUn = () => import('@/view/Kongbai/productUn.vue')
const over_time_order = () => import('@/view/Kongbai/over_time_order.vue')
const myAccount = () => import('@/view/myAccount/myAccount.vue')//个人中心首页
const myOrder = () =>import('@/view/myAccount/page/myOrder.vue')//我的订单
const orderDetail = () =>import('@/view/myAccount/page/orderPage/orderDetail.vue')
const orderRefund = () =>import('@/view/myAccount/page/orderPage/refund.vue')
const orderRefundApply = () =>import('@/view/myAccount/page/orderPage/refundApplication.vue')
const myWishlist = () =>import('@/view/myAccount/page/myWishlist.vue')
const myCoupon = () =>import('@/view/myAccount/page/myCoupon.vue')
const couponCenter = () =>import('@/view/myAccount/page/couponCenter.vue')
const myPoints = () =>import('@/view/myAccount/page/myPoints.vue')
const mySubscription = () =>import('@/view/myAccount/page/mySubscription.vue')
const outSubscription = () =>import('@/view/order/outSubscription.vue')
const addressBook = () =>import('@/view/myAccount/page/addressBook.vue')
const accountSetting = () =>import('@/view/myAccount/page/accountSetting.vue')
const trackInfo = () =>import('@/view/myAccount/page/trackInfo.vue')
const orderConfirm = () => import('@/view/order/orderConfirm.vue')
const paySucceed = () => import('@/view/order/paySucceed.vue')
const payFailed = () => import('@/view/order/payFailed.vue')
const payAgain = () => import('@/view/order/payAgain.vue')
const noprojuct = () => import('@/view/errorPage/noprojuct.vue')

//静态页
const aboutus = () => import('@/view/staticpage/aboutus.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showPage',
      component: ShowPage,
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
      path: '/productUn',
      name: 'productUn',
      component: productUn,
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path: '/over_time_order',
      name: 'over_time_order',
      component: over_time_order,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
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
      component: Erqi
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList,
      meta:{
        keepAlive: true,
        hasNav: false,
    }
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList,
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path: '/goodsDetail/:spuId/:skuId',
      name: 'goodsDetail',
      component: goodsDetail,
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path: '/shoppingCar',
      name: 'shoppingCar',
      component: shoppingCar,
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path: '/unavailable',
      name: 'unavailable',
      component: unavailable
    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: myAccount,
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/myOrder',
      component:myOrder,
      name:'myOrder',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/myWishlist',
      component:myWishlist,
      name:'myWishlist',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/myCoupon',
      component:myCoupon,
      name:'myCoupon',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/couponCenter',
      component:couponCenter,
      name:'couponCenter',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/myPoints',
      component:myPoints,
      name:'myPoints',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/mySubscription',
      component:mySubscription,
      name:'mySubscription',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/addressBook',
      component:addressBook,
      name:'addressBook',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/accountSetting',
      component:accountSetting,
      name:'accountSetting',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/trackInfo',
      component: trackInfo,
      name:'trackInfo',
      meta:{
        keepAlive: true,
        requireAuth:true,
        hasNav: true,
      }
    },
    {
      path:'/orderDetail',
      component:orderDetail,
      name:'orderDetail',
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path:'/orderRefund',
      component:orderRefund,
      name:'orderRefund',
      meta:{
        keepAlive: true,
        hasNav: true,
      }
    },
    {
      path:'/orderRefundApply',
      component:orderRefundApply,
      name:'orderRefundApply'
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/paySucceed',
      name: 'paySucceed',
      component: paySucceed
    },
    {
      path: '/payFailed',
      name: 'payFailed',
      component: payFailed
    },
    {
      path: '/payAgain',
      name: 'payAgain',
      component: payAgain
    },
    {
      path:'/outSubscription',
      component:outSubscription,
      name:'outSubscription',
    },
    {
      path: '/noprojuct',
      name: 'noprojuct',
      component: noprojuct
    },
    //静态页
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    }
  ]
})
