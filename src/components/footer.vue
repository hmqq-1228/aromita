<template>
<div class="wrap_1">
    <div class="footer">
        <!-- 社交 -->
        <div class="img">
          <div  v-for="(item,index) in icon" :key="index">
            <a :href="item.picture_href">
              <img :src="url+item.picture_src" alt>
            </a>
          </div>
        </div>
        <!-- 服务 -->
        <div class="xian">
          <div class="sixtyCont">
            <div class="sixty" v-for="(item,index) in footTitle" :key="index">
              <div>
                <a :href="item.picture_href">
                <img :src="url+item.picture_src" alt>
                </a>
              </div>
              <div class="sixty_word">
                <a :href="item.picture_href"><p class="sixty_word1">{{item.picture_title}}</p></a>
                <span class="sixty_word2">{{item.picture_title}}</span>
              </div>
            </div>
          <!-- <div class="payment">
            <img src="@/assets/02.png" alt>
            <div class="payment_word">
              <p class="payment_word1">PAYMENT</p>
              <span class="payment_word2">100%Secure</span>
            </div>
          </div>
          <div class="order">
            <img src="@/assets/03.png" alt>
            <div class="order_word">
              <p class="order_word1">OREDERS SHIP</p>
              <span class="order_word2">ORDERS SHIP within 48 Hours</span>
            </div>
          </div>
          <div class="price">
            <img src="@/assets/04.png" alt>
            <div class="price_word">
              <p class="price_word1">BEST PRICE</p>
              <span class="price_word2">Guaranteed</span>
            </div>
          </div> -->
          </div>
        </div>
        <div class="footBox">
          <div class="footer_left">
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

            <div class="left_for">
              <p class="left_for1">Contact Us</p>
              <ul class="left_for2">
                <li>Mon.-Fri 9:00 AM - 6:00 PM,PST.</li>
                <li>AromitaJewellery</li>
                <li>1001S Lawson ST,City of Industry,CA</li>
                <li>91748</li>
              </ul>
            </div>
          </div>
          <div class="footer_right">
            <p class="know">Stay In The Know</p>
            <span class="deals">Be the first to see our new arrivals & exclusive deals</span>
            <div class="footInput">
              <el-input placeholder="Enter your email" v-model="input10" clearable></el-input>
            </div>
            <button class="btn">
              <p class="btn_word">SUBSCRIBE</p>
            </button>
          </div>
        </div>
        <div class="xian2"></div>
        <div class="pay-02">
          <img src="@/assets/pay-02.png" alt="">
        </div>
      </div>
      </div>
</template>
<script>
import {homeIcon,homeFootTitle} from '../api/home'
export default {
   data() {
    return {
      url:'https://arapi.panduo.com.cn/uploads/',
      input10: "",
       icon: [], //40
       footTitle: [], //50
    };
  },
  mounted(){
    this.homeIcon()
    this.homeFootTitle()
  },
  methods: {
    // 40
    async homeIcon() {
      let data = await homeIcon()
      for (let icon of data.data){
       this.icon = data.data
      }
    },
    //  50
    async homeFootTitle() {
      let data = await homeFootTitle()
      for (let footTitle of data.data){
       this.footTitle = data.data
      }
    },
  }
}
</script>
<style lang="scss">
ul li{
  list-style: none;
}
.wrap_1{
  width: 100%;
  margin: auto;
}
  .footer {
  width: 100%;
  height: 480px;
  background:rgba(251,251,251,1);
  /* background:red; */
  /* margin-left: 139px; */
  border-top: 1px solid gainsboro;

}
.footer > .img {
  text-align: center;
  margin: 30px auto;
  display: flex;
  width: 280px;
  justify-content: space-between;
}
.footer > .img > div {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
}
.xian {
  border-bottom: 1px solid gainsboro;
}
.sixtyCont{
  width: 1440px;
  margin: 20px auto;
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
}
.sixty{
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.sixty  img {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.sixty_word > a{
  text-decoration: none;
}
.sixty_word1 {
  font-size: 18px;
  font-family: Tahoma;
  color: #030303;
  padding-bottom: 5px;
}
.sixty_word2 {
  font-size: 14px;
  font-family: Tahoma;
  color: #666666;
}
.footBox{
  width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.footer_left {
  width: 60%;
  padding-top: 30px;
  height: 174px;
  display: flex;
  justify-content: space-between;
}
.left_one1 {
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
  font-weight: bold;
}
.left_one2 {
  line-height: 24px;
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
}
.left_two1 {
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
  font-weight: bold;
}
.left_two2 {
  line-height: 24px;
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
}
.left_thr1 {
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
  font-weight: bold;
}
.left_thr2 {
  line-height: 24px;
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
}
.left_for1 {
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
  font-weight: bold;
}
.left_for2 {
  line-height: 24px;
  font-size: 14px;
  color: #030303;
  font-family: Tahoma;
}
.footer_right {
  width: 340px;
  margin-top: 30px;
}
.know {
  font-size: 14px;
  font-family: Tahoma;
  font-weight: bold;
  line-height: 17px;
  color: rgba(3, 3, 3, 1);
  padding-bottom: 15px;
}
.deals {
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 17px;
  color: rgba(3, 3, 3, 1);
}
.footInput .el-input__inner {
  width: 340px;
  position: relative;
  border: 1px solid #121037;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
}
.btn {
  width: 150px;
  height: 32px;
  margin-top: 20px;
  border: 0;
  outline: none;
  background: rgba(18, 16, 55, 1);
}
.footInput{
  margin-top: 10px;
}
.btn_word {
  font-size: 14px;
  font-family: Tahoma;
  font-weight: bold;
  line-height: 17px;
  color: rgba(255, 255, 255, 1);
}
.xian2 {
  border-bottom: 1px solid gainsboro;
}
.pay-02{
  text-align: center;
  padding-top: 25px;
  margin-bottom: 20px;
}
</style>
