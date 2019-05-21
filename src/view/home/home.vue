<template>
  <!-- 外套 -->
  <div class="wrap">
    <!-- 头部 -->
    <div class="title">
      <p class="title_word">Contact Us: 1-626-586-3448 (Mon-Fri 9am-6pm PST.)</p>
    </div>
    <!-- 中间内容 -->
    <div class="content">
      <!-- 左边logo -->
      <div class="LOGO2">
        <img src="@/assets/LOGO2.png" alt>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <div class="search_right">
          <p class="search_word">Search</p>
        </div>
      </div>
      <!-- 登录 -->
      <div class="login">
        <div class="login_left">
          <img src="@/assets/login.png" alt>
        </div>
        <div class="login_right">
          <p class="login_word">login</p>
        </div>
      </div>
      <!-- 心愿单 -->
      <div class="wish">
        <div class="wish_left">
          <img src="@/assets/wish.png" alt>
        </div>
        <div class="wish_right">
          <p class="wish_word">Wish</p>
        </div>
      </div>
      <!-- 购物车 -->
      <div class="cart">
        <div class="cart_left">
          <img src="@/assets/cart.png" alt>
        </div>
        <div class="cart_right">
          <p class="cart_word">cart</p>
        </div>
      </div>
      <!-- 二级菜单 -->
      <el-dropdown placement="top-start">
        <span class="el-dropdown-link">STANLESS STEEL</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top-start">
        <span class="el-dropdown-link">FINISHED JEWELRY</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top-start">
        <span class="el-dropdown-link">ACCESSORIES</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="top-start">
        <span class="el-dropdown-link">SILVER JEWELRY</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
          <el-dropdown-item>TANLESS STEEL</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 尾巴 -->
      <div class="footer">
        <!-- 社交 -->
        <div class="img">
          <img src="@/assets/facebook.png" alt>
          <img src="@/assets/ins.png" alt>
          <img src="@/assets/pinterest.png" alt>
          <img src="@/assets/twitter.png" alt>
        </div>
        <!-- 服务 -->
        <div class="xian">
          <div class="sixty">
            <img src="@/assets/01.png" alt="">
            <div class="sixty_word">
            <p class="sixty_word1">RETURN & EXCHANGE</p>
            <span class="sixty_word2">RETURN & EXCHANGE within 60 Days</span>
            </div>
        </div>
         <div class="payment">
            <img src="@/assets/02.png" alt="">
            <div class="payment_word">
            <p class="payment_word1">PAYMENT</p>
            <span class="payment_word2">100%Secure</span>
            </div>
        </div>
        <div class="order">
            <img src="@/assets/03.png" alt="">
            <div class="order_word">
            <p class="order_word1">OREDERS SHIP</p>
            <span class="order_word2">ORDERS SHIP within 48 Hours</span>
            </div>
        </div>
        <div class="price">
            <img src="@/assets/04.png" alt="">
            <div class="price_word">
            <p class="price_word1">BEST PRICE</p>
            <span class="price_word2">Guaranteed</span>
            </div>
        </div>
        </div>

        <!-- <div class="footer_left">
          <div class="left_one">
          <p class="left_one1">COMPANY INFO</p>
            <ul class="left_one2">
              <li>About Aromita</li>
              <li>Download Catalog</li>
              <li>Affiliate program</li>
              <li>Reseller Inquiry</li>
              <li>Tradeshow Plan</li>
              </ul>
            </div>
          <div class="left_two">
          <p class="left_two1">STORE POLICY</p>
            <ul class="left_two2">
              <li>TERMS &</li>
              <li>CONDITIONS</li>
              <li>Privacy Policy</li>
              <li>Return & Exchange</li>
              <li>FAQ</li>
              </ul>
            </div>
             <div class="left_thr">
          <p class="left_thr1">MY Account</p>
            <ul class="left_thr2">
              <li>Account Overview</li>
              <li>Track My Order</li>
              <li>My Bouns Poins</li>
              <li>Log In</li>
              </ul>
            </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scope>
li {
  list-style: none;
}
.wrap {
  width: 1640px;
  margin: 0 auto;
}
.title {
  width: 1640px;
  height: 40px;
  background: rgba(18, 16, 55, 1);
}
.title_word {
  width: 310px;
  height: 16px;
  font-size: 13px;
  font-family: Tahoma;
  font-weight: 400;
  padding-left: 93px;
  padding-top: 12px;
  color: rgba(255, 255, 255, 1);
}
.content {
  width: 1440px;
  // background-color: antiquewhite;
  margin: auto;
}
.LOGO2 {
  width: 160px;
  height: 39px;
  background: rgba(0, 0, 0, 0);
  margin-left: -1px;
  margin-top: 19px;
  float: left;
}
.search {
  // display: inline-block;
  width: 280px;
  height: 32px;
  display: inline-block;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(18, 16, 55, 1);
  margin-left: 703px;
  margin-top: 27px;
}
.search_right {
  // display: inline-block;
  width: 80px;
  height: 32px;
  float: right;
  background: rgba(18, 16, 55, 1);
}
.search_word {
  width: 48px;
  height: 19px;
  font-size: 16px;
  font-family: "微软雅黑";
  font-weight: 400;
  margin: 5px 5px 5px 14px;
  color: rgba(255, 255, 255, 1);
}
.login {
  width: 60px;
  height: 40px;
  display: flex;
  margin-left: 1170px;
  margin-top: -31px;
}
.login_left > img {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0);
}
.login_right {
  padding-left: 5px;
  width: 30px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 28px;
  color: rgba(3, 3, 3, 1);
}
.wish {
  width: 60px;
  height: 40px;
  display: flex;
  margin-left: 1275px;
  margin-top: -39px;
}
.wish_left > img {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0);
}
.wish_right {
  padding-left: 5px;
  width: 30px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 28px;
  color: rgba(3, 3, 3, 1);
}
.cart {
  width: 60px;
  height: 40px;
  display: flex;
  margin-left: 1385px;
  margin-top: -41px;
}
.cart_left > img {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0);
}
.cart_right {
  padding-left: 5px;
  width: 30px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 28px;
  color: rgba(3, 3, 3, 1);
}
.el-dropdown-link {
  cursor: pointer;
  color: #333333;
  padding-right: 93px;
}
.el-icon-arrow-down {
  font-size: 14px;
}
.el-dropdown-menu {
  position: absolute;
  top: 126px;
  left: 0;
  padding: 10px 0;
  margin: 5px 0;
  border: none;
}
element.style {
  /* transform-origin: center top; */
  z-index: 2015;
  display: none;
}
.footer {
  width: 1640px;
  height: 438px;
  margin-left: 139px;
  background-color: antiquewhite;
  position: fixed;
  bottom: 115px;
  left: 0;
}
.footer > .img {
  margin-left: 675px;
}
.footer > .img > img {
  margin-top: 31px;

  width: 40px;
  height: 40px;
  margin-right: 40px;
}
.xian{
  widows: 1640px;
  height: 140px;
  border-bottom: 1px solid gainsboro;
}
.sixty>img{
  width:60px;
  height: 60px;
  margin-left: 100px;
  margin-top: 62px;
}
.sixty_word{
  width:308px;
  height: 60px;
  margin-left: 170px;
  margin-top:-54px;
}
.sixty_word1{
  font-size:18px;
  font-family:Tahoma; 
  color:#030303;  
  padding-bottom: 5px;
}
.sixty_word2{
  width: 234px;
  height: 17px;
  font-size:14px;
  font-family:Tahoma; 
  color:#666666;  
}
.payment>img{
  display: block;
  width:60px;
  height: 60px;
  margin-left: 595px;
  margin-top:-71px;
}
.payment_word{
  width:308px;
  height: 60px;
  margin-left:664px;
  margin-top:-54px;
}
.payment_word1{
  font-size:18px;
  font-family:Tahoma; 
  color:#030303;  
  padding-bottom: 5px;
}
.payment_word2{
  width: 234px;
  height: 17px;
  font-size:14px;
  font-family:Tahoma; 
  color:#666666;  
}
.order>img{
  display: block;
  width:60px;
  height: 60px;
  margin-left: 938px;
  margin-top:-66px;
}
.order_word{
  width:308px;
  height: 60px;
  margin-left:1013px;
  margin-top:-54px;
}
.order_word1{
  font-size:18px;
  font-family:Tahoma; 
  color:#030303;  
  padding-bottom: 5px;
}
.order_word2{
  width: 234px;
  height: 17px;
  font-size:14px;
  font-family:Tahoma; 
  color:#666666;  
}
.price>img{
  display: block;
  width:60px;
  height: 60px;
  margin-left: 1357px;
  margin-top:-68px;
}
.price_word{
  width:308px;
  height: 60px;
  margin-left:1432px;
  margin-top:-54px;
}
.price_word1{
  font-size:18px;
  font-family:Tahoma; 
  color:#030303;  
  padding-bottom: 5px;
}
.price_word2{
  width: 234px;
  height: 17px;
  font-size:14px;
  font-family:Tahoma; 
  color:#666666;  
}
.footer_left{
  width: 841px;
  height:174px;
  background-color: aqua;
  margin-bottom: 23px;
}
// .left_one{
//   display: inline-block;
//     width: 138px;
//     height: 175px;
//     margin-left:90px;
//     margin-top:-176px;
// }
// .left_one1{

//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
//   font-weight: bold;
// }
// .left_one2{
//   line-height: 24px;
//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
// }
// .left_two{
//     display: inline-block;
//     // width: 138px;
//     // height: 175px;
//     margin-left:340px;
//     margin-top: 33px;
// }
// .left_two1{
//     display: inline-block;
//   margin-left:340px;
//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
//   font-weight: bold;
// }
// .left_two2{
//     display: inline-block;
//   margin-left:340px;
//   line-height: 24px;
//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
// }
// .left_thr{
//     display: inline-block;
//     // width: 138px;
//     // height: 175px;
//     margin-left:340px;
//     margin-top: 33px;
// }
// .left_thr1{
//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
//   font-weight: bold;
// }
// .left_thr2{
//   line-height: 24px;
//   font-size: 14px;
//   color: #030303;
//   font-family: Tahoma;
// }
</style>


