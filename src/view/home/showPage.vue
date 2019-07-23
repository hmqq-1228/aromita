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
            <img :src="url+item.picture_src" alt @click="link(item.picture_href)">
          </li>
        </ul>
      </div>
      <!-- 热销 -->
      <div class="word2_">
        <div class="word2">Best SELLER</div>
      </div>
      <div class="sell">
        <div class="sell_1" v-for="(item,index) in homeData" :key="index" @click="link(item.picture_href)">
          <img :src="url+item.products_src" alt>
          <p class="sell_word">{{ item.products_name }}</p>
          <p class="sell_word1">${{ item.products_price }}</p>
        </div>
      </div>
      <div class="word3_">
        <div class="word3">NEW ARRIVAL</div>
      </div>
      <div class="new">
        <div class="new_1" v-for="(item,index) in homeArr" :key="index" @click="link(item.picture_href)">
          <img :src="url+item.products_src" alt>
          <p class="new_word">{{item.products_name}}</p>
          <p class="new_word1">${{ item.products_price }}</p>
        </div>
      </div>
      <div class="word4">Hot Style in Social Medias</div>
      <!-- 下面的轮播 -->
      <div class="banner2 swiper-container" dir="rtl">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in hotStyle" :key="index">
            <img :src="url+item.picture_src" class="small" @click="link(item.picture_href)">
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
  data() {
    return {
      swiper1: "",
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
      slidesPerGroup: 1,
      spaceBetween: 0,
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
      link(url){
        window.open(url,'_blank')
      },
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
}
  .demo-carousel {
    width: 80%;
    height: 500px;
    padding-top: 25px;
    margin: 0 auto;
  }

  .collections {
    width: 1445px;
    height: 630px;
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
    width: 450px;
    height: 48px;
    font-size: 30px;
    font-weight: 400;
    line-height: 48px;
    margin: 30px auto;
    color: #333333;
    text-align: center;
  }
  .collections_thr1 {
    width: 1440px;
    height: 300px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // justify-content: center;
  }
  .thr2 > img {
    width: 100%;
    height: 100%;
  }
  .thr2:nth-child(1) {
     width: 950px;
     height: 300px;
     margin-top: 0;
   }
.thr2:nth-child(2){
  margin-top: 0;
}
  .thr2{
    width: 460px;
    height: 300px;
    margin-top: 30px;
  }
  .word2_,.word3_{
    width: 1440px;
    margin: 0 auto;
    height: 48px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
  }
  .word2,.word3{
    width: 260px;
    height: 48px;
    font-size: 30px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 48px;
    text-align: center;
    color: #333;
    position: absolute;
    top: 24px;
    left: 590px;
    background-color: #fff;
  }
  .sell,.new{
    width: 1440px;
    height: 420px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .sell_1,.new_1{
    width: 336px;
    height: 388px;
    text-align: center;
    margin-top: 30px;
  }
  .sell_1>img,.new_1>img{
    width: 336px;
    height: 336px;
  }
  .sell_word,.new_word{
    font-size: 14px;
    color: #333333;
    font-weight: 400;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .sell_word1,.new_word1{
    font-size: 14px;
    color: #333333;
    font-weight: 400;
  }
  .swiper-container {
    width: 78%;
    height: 500px;
    margin: 20px auto;
  }
  .banner2 {
    width: 1440px;
    height: 336px;
    margin: 0 auto 30px auto;
  }
  .word4 {
    width: 1440px;
    height: 48px;
    font-size: 30px;
    font-weight: 400;
    line-height: 48px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 30px;
    color: #333;
  }
  .small {
    width: 336px !important;
    height: 336px !important;
  }
  .element.style {
    width: 345px;
    margin-right: 165px;
  }
  .banner2 .swiper-slide{
    width: 336px !important;
    margin-right: 20px !important;
  }
</style>
