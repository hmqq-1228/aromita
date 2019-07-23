<template>
  <div class="myAccount">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="account">
      <div class="accountBox">
        <div class="accountNav">
          <div class="navTitle">My Account</div>
          <div class="navItem">My Orders</div>
          <div class="navItem">My Wishlist</div>
          <div class="navItem">My Coupon</div>
          <div class="navItem">My Points</div>
          <div class="navItem">My Subscription</div>
          <div class="navItem">Address Book</div>
          <div class="navItem">Account Setting</div>
        </div>
        <div class="navCount"></div>
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
  name: "myAccount"
}
</script>

<style scoped>
.account{
  min-height: 300px;
  width: 100%;
  margin: 0 auto;
  background-color: #f5f8fa;
}
.accountBox{
  width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.accountNav{
  width: 200px;
  height: 260px;
  padding: 12px 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.navCount{
  width: 1200px;
  background-color: #ffff;
}
.navTitle{
  font-size: 16px;
  font-family: Tahoma;
  color: #333;
  font-weight: 500;
  margin-bottom: 6px;
}
.navItem{
  color: #666;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  font-family: Tahoma;
  padding-left: 20px;
}
</style>
