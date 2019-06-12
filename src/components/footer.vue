<template>
<div class="wrap_1">
    <div class="footer">
        <!-- 社交 -->
        <div class="img" @click="handleErqi">
          <img src="@/assets/facebook.png" alt>
          <img src="@/assets/ins.png" alt>
          <img src="@/assets/pinterest.png" alt>
          <img src="@/assets/twitter.png" alt>
        </div>
        <!-- 服务 -->
        <div class="xian">
          <div class="sixty">
            <img src="@/assets/01.png" alt>
            <div class="sixty_word">
              <p class="sixty_word1">RETURN & EXCHANGE</p>
              <span class="sixty_word2">RETURN & EXCHANGE within 60 Days</span>
            </div>
          </div>
          <div class="payment">
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
          </div>
        </div>

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
          <el-input placeholder="Enter your email" v-model="input10" clearable></el-input>
          <button class="btn">
            <p class="btn_word">SUBSCRIBE</p>
          </button>
        </div>
        <div class="xian2"></div>
        <div class="pay-02">
          <img src="@/assets/pay-02.png" alt="">
        </div>
      </div>
      </div>
</template>
<script>
export default {
   data() {
    return {
      input10: ""
    };
  },
  methods: {
    handleErqi () {
      this.$router.push({
        path: "/erqi"
      });
    }
  }
}
</script>
<style lang="scss">
ul li{
  list-style: none;
}
.wrap_1{
  width: 100%;
}
  .footer {
  width: 85%;
  height: 503px;
  background:rgba(251,251,251,1);
  /* background:red; */
  /* margin-left: 139px; */
 margin-left: 140px;

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
.xian {
  widows: 85%;
  height: 140px;
  border-bottom: 1px solid gainsboro;
}
.sixty > img {
  width: 60px;
  height: 60px;
  margin-left: 100px;
  margin-top: 62px;
}
.sixty_word {
  width: 308px;
  height: 60px;
  margin-left: 170px;
  margin-top: -54px;
}
.sixty_word1 {
  font-size: 18px;
  font-family: Tahoma;
  color: #030303;
  padding-bottom: 5px;
}
.sixty_word2 {
  width: 234px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  color: #666666;
}
.payment > img {
  display: block;
  width: 60px;
  height: 60px;
  margin-left: 595px;
  margin-top: -71px;
}
.payment_word {
  width: 308px;
  height: 60px;
  margin-left: 664px;
  margin-top: -54px;
}
.payment_word1 {
  font-size: 18px;
  font-family: Tahoma;
  color: #030303;
  padding-bottom: 5px;
}
.payment_word2 {
  width: 234px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  color: #666666;
}
.order > img {
  display: block;
  width: 60px;
  height: 60px;
  margin-left: 938px;
  margin-top: -66px;
}
.order_word {
  width: 308px;
  height: 60px;
  margin-left: 1013px;
  margin-top: -54px;
}
.order_word1 {
  font-size: 18px;
  font-family: Tahoma;
  color: #030303;
  padding-bottom: 5px;
}
.order_word2 {
  width: 234px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  color: #666666;
}
.price > img {
  display: block;
  width: 60px;
  height: 60px;
  margin-left: 1357px;
  margin-top: -68px;
}
.price_word {
  width: 308px;
  height: 60px;
  margin-left: 1432px;
  margin-top: -54px;
}
.price_word1 {
  font-size: 18px;
  font-family: Tahoma;
  color: #030303;
  padding-bottom: 5px;
}
.price_word2 {
  width: 234px;
  height: 17px;
  font-size: 14px;
  font-family: Tahoma;
  color: #666666;
}
.footer_left {
  width: 1100px;
  height: 174px;
  margin-bottom: 23px;
}
.left_one {
  width: 138px;
  height: 175px;
  margin-left: 90px;
  margin-top: 38px;
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
.left_two {
  float: left;
  margin-left: 340px;
  margin-top: -176px;
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
.left_thr {
  float: left;
  margin-left: 588px;
  margin-top: -176px;
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
.left_for {
  width: 231px;
  height: 175px;
  margin-left: 800px;
  margin-top: -177px;
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
  height: 143px;
  margin-left: 1206px;
  margin-top: -197px;
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
.el-input__inner {
  width: 340px;
  position: relative;
  top: 15px;
  border: 1px solid #121037;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
}
.btn {
  width: 150px;
  height: 32px;
  margin-top: 30px;
  border: 0;
  outline: none;
  background: rgba(18, 16, 55, 1);
}
.btn_word {
  font-size: 14px;
  font-family: Tahoma;
  font-weight: bold;
  line-height: 17px;
  color: rgba(255, 255, 255, 1);
}
.xian2 {
  widows: 85%;
  height: 30px;
  border-bottom: 1px solid gainsboro;
}
.pay-02>img{
  margin-left: 640px;
  margin-top: 25px;
}
</style>