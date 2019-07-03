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
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(item,index) in dataBanner" :key="index">
            <img :src="url+item.picture_src" alt>
          </div>
        </div>
        <!-- 指示点 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 英文 -->
      <p class="word1">THEME PRODUCT</p>

      <!-- <div class="collections">
        <div class="collections_one">
          <img src="@/assets/birtstone.png" class="collections_birtstone" alt>
          <img src="@/assets/chains.png" alt>
           </div>
        <div class="collections_thr">
          <img src="@/assets/chains.png" class="collections_chains" alt>
          <img src="@/assets/chains.png" class="collections_chains" alt>
          <img src="@/assets/chains.png" class="collections_chains" alt>
        </div>
      </div>-->

      <div class="collections">
        <ul class="collections_thr1">
          <li class="thr2" v-for="(item,index) in dataCollections" :key="index">
            <img :src="url+item.picture_src" alt>
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
          <li class="sell_1" v-for="(item,index) in homeData" :key="index">
            <img :src="url+item.products_src" alt>
            <p class="sell_word">{{ item.products_name }}</p>
            <span class="sell_word1">${{ item.products_price }}</span>
          </li>
        </ul>
      </div>
      <div class="word3_">
        <p class="word3">NEW ARRIVAL</p>
      </div>
      <hr>
      <div class="new">
        <ul class="new_">
          <li class="new_1" v-for="(item,index) in homeArr" :key="index">
            <img :src="url+item.products_src" alt>
            <p class="new_word">{{item.products_name}}</p>
            <span class="new_word1">${{ item.products_price }}</span>
          </li>
        </ul>
      </div>
      <p class="word4">Hot Style in Social Medias</p>

      <!-- 下面的轮播 -->
      <div class="banner2 swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            style="width:300px !important;margin-right: 20px;"
            v-for="(item,index) in hotStyle"
            :key="index"
          >
            <img :src="url+item.picture_src" class="small">
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
import {
  homeSeller,
  homeBanner,
  homeArrivai,
  homeFoote,
  homeCollections,
  homeHotStyle
} from "../../api/home";
import { constants } from 'fs';
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
      ],
      url: "http://arapi.panduo.com.cn/uploads/",
      homeData: [], //Best Seller商品信息
      dataBanner: [], //首页banner信息
      homeArr: [], //NEW Arrivai 信息
      homeFoot: [],
      dataCollections: [], //Collections信息
      hotStyle: [] //Hot Style 信息
    };
  },
  mounted() {
    this.homeBanner();
    this.homeHotStyle();
    var mySwiper = new Swiper(".banner2", {
      slidesPerView: 4,
      spaceBetween: 8,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      //spaceBetween : '10%',按container的百分比
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  },
  methods: {
      initSwiper(){
        this.swiper1 = new Swiper(".banner1", {
      loop: true,
      autoplay: {
        disableOnInteraction: false //当设置为false时，用户操作之后（swipes,arrow以及pagination 点击）autoplay不会被禁掉，用户操作之后每次都会重新启动autoplay。
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        //指示点
        el: ".swiper-pagination",
        clickable: true //为true时点击指示点会切换slide
      }
        });
      },
    /*鼠标移入停止轮播,5秒后继续轮播，鼠标离开 继续轮播*/
    comtainer_enter1() {
      this.swiper1.autoplay.stop();
      setTimeout(this.comtainer_leave1, 2000); //两秒加上默认的三秒
    },
    comtainer_leave1() {
      this.swiper1.autoplay.start();
    },
    async homeFoote() {
      let data = await homeFoote();
      //console.log(data.data) 
      for (this.homeFoot in data.data) {
        this.homeFoot = data.data;
        //  console.log(this.homeFoot)
      }
    },
    // Best Seller商品信息
    async homeSeller() {
      let data = await homeSeller();
      for (let homeData of data.data) {
        this.homeData = data.data;
      }
    },
    // NEW Arrivai 信息
    async homeArrivai() {
      let data = await homeArrivai();
      this.homeArr = data.data;
      // for (let homeArr of data){
      //  this.homeArr = data
      // }
    },
    // 首页banner信息
    async homeBanner() {
      let data = await homeBanner();
      this.dataBanner = data.data;
      this.$nextTick(() => {
        this.initSwiper();
      });
      // for (let dataBanner of data){
      //  this.dataBanner = data
      // }
    },
    //Collections区信息
    async homeCollections() {
      let data = await homeCollections();
      for (let dataCollections of data.data) {
        this.dataCollections = data.data;
      }
    },
    // Hot Style 信息
    async homeHotStyle() {
      let data = await homeHotStyle();
      for (let hotStyle of data.data) {
        this.hotStyle = data.data;
      }
    }
  },
  created() {
    this.homeSeller();
    this.homeArrivai();
    this.homeFoote();
    this.homeCollections();
  }
};
</script>
<style lang="scss">
.wrap_1 {
  margin: 0 auto;

  .demo-carousel {
    width: 80%;
    height: 500px;
    padding-top: 25px;
    margin: 0 auto;
  }

  .collections {
    width: 80%;
    height: 330px;
    margin: 0 auto;
  }
  .collections_one {
    width: 950px;
    height: 300px;
    margin-left: 78px;
    margin-top: 30px;
    display: flex;
    padding-left: 10px;
    .collections_birtstone {
      margin-right: 16px;
    }
  }
  .word1 {
    width: 465px;
    height: 48px;
    font-size: 40px;
    font-weight: 400;
    line-height: 48px;
    margin-left: 733px;
    margin-top: 39px;
    margin-bottom: 30px;
    color: rgba(51, 51, 51, 1);
  }
  .collections_thr1 {
    width: 117%;
    height: 300px;
    margin-left: 83px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: center;
  }
  .thr2 > img {
    width: 100%;
    height: 100%;
  }
  .thr2:nth-child(1) {
    width: 930px;
    height: 300px;
    margin-right: 20px;
  }
  .thr2:nth-child(2) {
    width: 430px;
    height: 300px;
  }
  .thr2:nth-child(3) {
    width: 430px;
    height: 300px;
    margin-top: 20px;
  }
  .thr2:nth-child(4) {
    width: 430px;
    height: 300px;
    margin-top: 20px;
    padding-left: 45px;
    padding-right: 45px;
  }
  .thr2:nth-child(5) {
    width: 430px;
    height: 300px;
    margin-top: 20px;
  }
  // .thr2:nth-child(2){
  //   width: 460px;
  //   height: 300px;
  //   // float: right;
  //   margin-top: 300px;
  // }
  // .thr2:nth-child(3){
  //   width: 460px;
  //   height: 300px;

  // }
  // .thr1 {
  //   width: 460px;
  //   height: 300px;
  //   float: left;
  //   margin-right: 35px;
  // }
  // .thr2 {
  //   width: 460px;
  //   height: 300px;
  //   float: left;
  //   margin-right: 25px;
  // }
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
    margin-top: 308px;
    // margin-bottom: 30px;
    // margin: 308px auto;
    color: rgba(3, 3, 3, 1);
  }
  .sell {
    width: 76%;
    height: 388px;
    margin-top: 60px;
    margin-left: 241px;
  }
  .sell_1 {
    float: left;
    padding-right: 24px;
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
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
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
    margin-left: 14px;
    color: rgba(3, 3, 3, 1);
  }

  .new {
    width: 80%;
    height: 388px;
    margin-top: 42px;
    margin-left: 245px;
    // margin: 42px auto;
  }
  .new_1 {
    float: left;
    padding-right: 24px;
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
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
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
    width: 78%;
    height: 500px;
    margin: 20px auto;
  }
  .banner2 {
    width: 63%;
    height: 336px;
    margin: 0 auto 30px auto;
  }
  .word4 {
    width: 500px;
    height: 48px;
    font-size: 40px;
    font-weight: 400;
    line-height: 48px;
    margin-left: 667px;
    margin-top: 39px;
    margin-bottom: 30px;
    color: rgba(51, 51, 51, 1);
  }
  .small {
    width: 300px !important;
    height: 300px !important;
    margin-top: 3px;
  }
  .element.style {
    width: 345px;
    margin-right: 165px;
  }
  .swiper-slide {
    flex-shrink: 1;
  }
}
</style>