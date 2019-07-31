<template>
  <div class="myAccount">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="account">
      <div class="accountBox">
        <Left-Nav></Left-Nav>  
        <div class="navCount">
          <div class="account_home">
            <div class="home_top">
              <img src="@/assets/images/user.jpg" alt="" class="user">
              <div class="user_detail">
                <h4 v-if="!userDetail.firstname">请前往Account Setting</h4>
                <h4 v-else>{{userDetail.firstname}} {{userDetail.lastname}}</h4>
                <p><img src="@/assets/images/Settings.png" alt=""><router-link to="/addressBook">Address Book</router-link></p>
                <p><img src="@/assets/images/Address.png" alt=""><router-link to="/accountSetting">Account Setting</router-link></p>
              </div>
              <div class="user_list">
                  <div class="list">
                    <p>5</p>
                    <h5>Wishlist</h5>
                  </div>
                  <div class="list">
                    <p>5</p>
                    <h5>Coupon</h5>
                  </div>
                  <div class="list">
                    <p>{{userDetail.score}}</p>
                    <h5>Points</h5>
                  </div>
                  <div class="list">
                    <p>5</p>
                    <h5>Subscribe</h5>
                  </div>
              </div>
            </div>
            <div class="home_bot">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Left from "./element/leftNav"
import {myAccount} from "@/api/account.js"; 
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer,
    "Left-Nav":Left
  },
  data(){
    return{
      userDetail:{}
    }
  },
  watch:{
  },
  created(){
    this._myAccount()
  },
  methods:{
    _myAccount(){
      myAccount().then((res)=>{
        this.userDetail = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
