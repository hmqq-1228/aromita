
<template>
  <div class="wrap_1">
    <header-com></header-com>
    <!-- 轮播图 -->
    <div class="wrap">
      <div
        class="banner1 swiper-container"
        @mouseenter="comtainer_enter1"
        @mouseleave="comtainer_leave1"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in arr1" :key="index">
            <img :src="item.img_url" alt>
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>-->
        <!-- 指示点 -->
        <div class="swiper-pagination"></div>
        <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
      </div>
      <!-- 英文 -->
      <p class="word1">Collections</p>
      <div class="collections">
        <div class="collections_one">
          <img src="@/assets/birtstone.png" alt>
        </div>
        <div class="collections_two">
          <img src="@/assets/chains.png" alt>
        </div>
      </div>
      <div class="collections_thr">
        <ul class="collections_thr1">
          <li class="thr1">
            <img src="@/assets/beads.png" alt>
          </li>
          <li class="thr2">
            <img src="@/assets/blanks.png" alt>
          </li>
          <li class="thr3">
            <img src="@/assets/banngles.png" alt>
          </li>
        </ul>
      </div>
      <!-- 热销 -->
      <div class="word2_">
        <div class="word2">Best SELLER</div>
      </div>
      <hr>
      <div class="sell">
        <ul class="sell_">
          <li class="sell_1">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <span class="sell_word1">$19.99</span>
          </li>
          <li class="sell_2">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <span class="sell_word1">$19.99</span>
          </li>
          <li class="sell_3">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <span class="sell_word1">$19.99</span>
          </li>
          <li class="sell_4">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word4">Classic Name NeckIace</p>
            <span class="sell_word41">$19.99</span>
          </li>
        </ul>
      </div>
      <div class="word3_">
        <p class="word3">NEW ARRIVAL</p>
      </div>
      <hr>
      <div class="new">
        <ul class="new_">
          <li class="new_1">
            <img src="@/assets/best seller.png" alt>
            <p class="new_word">Classic Name NeckIace</p>
            <span class="new_word1">$19.99</span>
          </li>
          <li class="new_2">
            <img src="@/assets/best seller.png" alt>
            <p class="new_word">Classic Name NeckIace</p>
            <span class="new_word1">$19.99</span>
          </li>
          <li class="new_3">
            <img src="@/assets/best seller.png" alt>
            <p class="new_word">Classic Name NeckIace</p>
            <span class="new_word1">$19.99</span>
          </li>
          <li class="new_4">
            <img src="@/assets/best seller.png" alt>
            <p class="new_word4">Classic Name NeckIace</p>
            <span class="new_word1">$19.99</span>
          </li>
        </ul>
      </div>
      <p class="word4">Hot Style in Social Medias</p>

      <!-- 下面的轮播 -->
      <div class="banner2 swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width:300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
          <div class="swiper-slide" style="width: 300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
          <div class="swiper-slide" style="width: 300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
          <div class="swiper-slide" style="width: 300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
          <div class="swiper-slide" style="width: 300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
          <div class="swiper-slide" style="width: 300px !important;margin-right: 20px;">
            <img src="@/assets/336-07.png" class="small">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Swiper from "swiper";
import { setTimeout } from "timers";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "HelloWorld",
  data() {
    return {
      swiper1: "",
      arr1: [
        { img_url: require("@/assets/banner.png") },
        { img_url: require("@/assets/banner.png") },
        { img_url: require("@/assets/banner.png") },
        { img_url: require("@/assets/banner.png") },
        { img_url: require("@/assets/banner.png") }
      ]
    };
  },
  mounted() {
    this.swiper1 = new Swiper(".banner1", {
      autoplay: {
        //自动轮播
        disableOnInteraction: false //当设置为false时，用户操作之后（swipes,arrow以及pagination 点击）autoplay不会被禁掉，用户操作之后每次都会重新启动autoplay。
      },
      pagination: {
        //指示点
        el: ".swiper-pagination",
        clickable: true //为true时点击指示点会切换slide
      },
      loop: true
    });
    var mySwiper = new Swiper(".banner2", {
      slidesPerView: 4,
      spaceBetween: 20,
      //spaceBetween : '10%',按container的百分比
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  },
  methods: {
    /*鼠标移入停止轮播,5秒后继续轮播，鼠标离开 继续轮播*/
    comtainer_enter1() {
      this.swiper1.autoplay.stop();
      setTimeout(this.comtainer_leave1, 2000); //两秒加上默认的三秒
    },
    comtainer_leave1() {
      this.swiper1.autoplay.start();
    }
  }
};
</script>
<style lang="scss">
.demo-carousel {
  width: 80%;
  height: 500px;
  padding-top: 25px;
  margin: 0 auto;
}
.word1 {
  width: 188px;
  height: 48px;
  font-size: 40px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 48px;
  margin-left: 625px;
  margin-top: 25px;
  margin-bottom: 30px;
  color: rgba(51, 51, 51, 1);
}
.collections {
  width: 1440px;
  height: 330px;
  margin: 0 auto;
  // background-color:antiquewhite;
  display: flex;
}
.collections_one {
  width: 950px;
  height: 300px;
  margin-right: 30px;
}
.collections_thr {
  width: 1440px;
  height: 300px;
  margin: 0 auto;
  // margin-right: 30px;
  // margin-top: 25px;
  // background-color:aquamarine;
}
.thr1 {
  width: 460px;
  height: 300px;
  float: left;
  margin-right: 35px;
}
.thr2 {
  width: 460px;
  height: 300px;
  float: left;
  margin-right: 25px;
}
hr {
  width: 1440px;
  margin: 0 auto;
  border: 1px solid #333333;
}
.word2_ {
  width: 279px;
  height: 48px;
  background-color: #fff;
  position: relative;
  top: 28px;
  left: 41%;
  z-index: 1111;
  // padding-bottom:42px;
}
.word2 {
  width: 237px;
  height: 48px;
  font-size: 40px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 48px;
  margin: 0 auto;
  color: rgba(3, 3, 3, 1);
}
.sell {
  width: 1440px;
  height: 388px;
  margin: 42px auto;
}
.sell_1 {
  float: left;
  padding-right: 32px;
}
.sell_2 {
  float: left;
  padding-right: 32px;
}
.sell_3 {
  float: left;
  padding-right: 32px;
}
.sell_word {
  font-size: 14px;
  margin-left: 90px;
  color: #333333;
  font-weight: 400;
  width: 180px;
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.sell_word1 {
  font-size: 14px;
  margin-left: 140px;
  color: #333333;
  font-weight: 400;
}
.sell_word4 {
  display: inline;
  font-size: 14px;
  margin-left: 90px;
  color: #333333;
  font-weight: 400;
}
.sell_word41 {
  font-size: 14px;
  margin-left: 140px;
  color: #333333;
  font-weight: 400;
}
hr {
  width: 1440px;
  margin: 0 auto;
  border: 1px solid #333333;
}
.word3_ {
  width: 292px;
  height: 48px;
  background-color: #fff;
  position: relative;
  top: 28px;
  left: 41%;
  z-index: 1111;
  // padding-bottom:42px;
}
.word3 {
  width: 292px;
  height: 48px;
  font-size: 40px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 48px;
  margin-left: 32px;
  color: rgba(3, 3, 3, 1);
}

.new {
  width: 1440px;
  height: 388px;
  margin: 42px auto;
}
.new_1 {
  float: left;
  padding-right: 32px;
}
.new_2 {
  float: left;
  padding-right: 32px;
}
.new_3 {
  float: left;
  padding-right: 32px;
}
.new_word {
  font-size: 14px;
  margin-left: 90px;
  color: #333333;
  font-weight: 400;
  width: 180px;
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.new_word1 {
  font-size: 14px;
  margin-left: 140px;
  color: #333333;
  font-weight: 400;
}
.new_word4 {
  display: inline;
  font-size: 14px;
  margin-left: 90px;
  color: #333333;
  font-weight: 400;
}
.new_word41 {
  font-size: 14px;
  margin-left: 140px;
  color: #333333;
  font-weight: 400;
}
.swiper-container {
  width: 1440px;
  height: 500px;
  margin: 20px auto;
}
.banner2 {
  width: 78%;
  height: 336px;
  margin: 0 auto 30px auto;
}
.word4 {
  width: 465px;
  height: 48px;
  font-size: 40px;
  font-weight: 400;
  line-height: 48px;
  margin-left: 590px;
  margin-top: 39px;
  margin-bottom: 30px;
  color: rgba(51, 51, 51, 1);
}
.small {
  width: 300px !important;
  height: 300px !important;
  margin-top: 60px;
}
.element.style {
  width: 345px;
  margin-right: 20px;
}
.swiper-slide {
  flex-shrink: 1;
}
</style>