<template>
  <div class="myAccount">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="account">
      <div class="accountBox">
        <div class="accountNav">
          <router-link to="myAccount"><div class="navTitle">My Account</div></router-link>
          <router-link to="myOrder"><div class="navItem">My Orders</div></router-link>
          <router-link to="myWishlist"><div class="navItem">My Wishlist</div></router-link>
          <router-link to="myCoupon"><div class="navItem">My Coupon</div></router-link>
          <router-link to="myPoints"><div class="navItem">My Points</div></router-link>
          <router-link to="mySubscription"><div class="navItem">My Subscription</div></router-link>
          <router-link to="addressBook"><div class="navItem">Address Book</div></router-link>
          <router-link to="accountSetting"><div class="navItem">Account Setting</div></router-link>
        </div>
        <div class="navCount">
          <div class="account_home" v-if="pathName == 'myAccount'">
            <div class="home_top">
              <img src="@/assets/images/user.jpg" alt="" class="user">
              <div class="user_detail">
                <h4>Hello Rosie</h4>
                <p><img src="@/assets/images/Settings.png" alt="">Address Book</p>
                <p><img src="@/assets/images/Address.png" alt="">Account Setting</p>
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
                    <p>5</p>
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
          <router-view/>
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
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  data(){
    return{
      pathName:''
    }
  },
  watch:{
    $route(to,from){
      var pathName = to.name
      this.pathName = pathName
    }
  },
  created(){
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
