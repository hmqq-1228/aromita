<template>
  <div class="wrap_1">
    <header-com></header-com>
    <div class="wrap">
      <!-- 轮播图 -->
      <div class="home_banner">
          <el-carousel height="500px">
              <el-carousel-item v-for="(item,index) in dataBanner" :key="index">
                <img :src="url+item.picture_src" alt>
              </el-carousel-item>
          </el-carousel>
      </div>
      <!-- 英文 -->
      <p class="word1">THEME PRODUCT</p>
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
            <img :src="url+item.picture_src" class="small2" @click="link(item.picture_href)">
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
    // 首页banner信息
    async homeBanner() {
      let data = await homeBanner();
      this.dataBanner = data.data;
    },
    async homeFoote() {
      let data = await homeFoote();
      for (this.homeFoot in data.data) {
        this.homeFoot = data.data;
      }
    },
    // Best Seller商品信息
    async homeSeller() {
      let data = await homeSeller();
      this.homeData = data.data;
    },
    // NEW Arrivai 信息
    async homeArrivai() {
      let data = await homeArrivai();
      this.homeArr = data.data;
    },
    //Collections区信息
    async homeCollections() {
      let data = await homeCollections();
      this.dataCollections = data.data;
    },
    // Hot Style 信息
    async homeHotStyle() {
      let data = await homeHotStyle();
      this.hotStyle = data.data;
    }
  },
  created() {
    this.homeBanner();
    this.homeSeller();
    this.homeArrivai();
    this.homeFoote();
    this.homeHotStyle();
    this.homeCollections();
  }
};
</script>
<style lang="scss" scoped>
.wrap_1 {
  margin: 0 auto;
}
.home_banner{
  width: 1440px;
  margin:0 auto;
  .el-carousel__button{
    background: #333;
    width:8px;
    height: 8px;
    border-radius: 50%;
  }
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
  .small2 {
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
