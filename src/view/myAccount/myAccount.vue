<template>
  <div class="myAccount">
    <div class="account">
      <div class="accountBox">
        <Left-Nav></Left-Nav>
        <div class="navCount" style="background-color: #E9E9E9">
          <div class="account_home">
            <div class="home_top">
              <div class="user_detail">
                <div class="name">
                    <h4 v-if="!userDetail.firstname">Please Account Setting</h4>
                    <h4 v-else class="user_name" @mouseenter="nameShow()" @mouseleave="nameHidden()">Hello,{{userDetail.firstname}} {{userDetail.lastname}}</h4>
                    <p class="name_hidden" v-if="name_show == true">{{userDetail.firstname}} {{userDetail.lastname}}</p>
                </div>
                <div class="other_link">
                    <p style="margin-right:26px"><img src="@/assets/images/Address.png" alt=""><router-link to="/accountSetting">Account Setting</router-link></p>
                    <p><img src="@/assets/images/Settings.png" alt=""><router-link to="/addressBook">Address Book</router-link></p>
                </div>
              </div>
              <div class="processing_link">
                <span><img src="@/assets/images/ProcessingOrders.png" alt=""></span>
                <span class="text">{{num.order}}</span>
                <router-link to="/myOrder"><span>Processing Orders</span></router-link>
              </div>
              <div class="processing_link">
                <span><img src="@/assets/images/Wishlist.png" alt=""></span>
                <span class="text">{{num.wishlist}}</span>
                <router-link to="/myWishlist"><span>Wishlist</span></router-link>
              </div>
              <div class="user_list">
                  <div class="list">
                    <router-link to="/myCoupon"><h5>Coupon （{{num.coupon}}）</h5></router-link>
                  </div>
                  <div class="list">
                    <!-- <p>{{userDetail.score}}</p> -->
                    <router-link to="/myPoints"><h5>Points （{{userDetail.score}}）</h5></router-link>
                    <!--<h5>Points <span v-if="userDetail.score!=null">({{userDetail.score}})</span></h5>-->
                  </div>
              </div>
            </div>
            <!-- <div class="home_bot">
              <div class="order_list">
                  <div class="list">
                    <img src="@/assets/images/All-Orders.png" alt="">
                    <p>All Orders(3)</p>
                  </div>
                  <div class="list">
                    <img src="@/assets/images/Processing.png" alt="">
                    <p>Processing(1)</p>
                  </div>
                  <div class="list">
                    <img src="@/assets/images/Shipped.png" alt="">
                    <p>Shipped(2)</p>
                  </div>
                  <div class="list">
                    <img src="@/assets/images/Delivered.png" alt="">
                    <p>Delivered(0)</p>
                  </div>
                  <div class="list">
                    <img src="@/assets/images/Refund.png" alt="">
                    <p>Refund(0)</p>
                  </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Left from "./element/leftNav"
import {myAccount,couponcount} from "@/api/account.js";
export default {
  components: {
    "Left-Nav":Left
  },
  data(){
    return{
      userDetail:{},//用户信息
      num:{},//优惠券等信息
      name_show:false,//用户名显示状态
    }
  },
  watch:{
  },
  created(){
    this._myAccount()
  },
  methods:{
    //用户名显示隐藏
    nameShow(){
      this.name_show = true
    },
    nameHidden(){
      this.name_show = false;
    },
    _myAccount(){
      myAccount().then((res)=>{
        this.userDetail = res.data
      })
      couponcount().then((res)=>{
        this.num = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
