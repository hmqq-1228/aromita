<template>
  <div class="wrap_1">
    <div class="wrap" @click="hidePanel($event)">
      <!-- 轮播图 -->
      <div class="home_banner">
          <el-carousel height="500px">
              <el-carousel-item v-for="(item,index) in dataBanner" :key="index">
                <img style="cursor: pointer;" :src="item.picture_src" alt @click="linkHref(item.picture_href)">
              </el-carousel-item>
          </el-carousel>
          <div class="subscribe" :style="{left:(showActivity==true?'0':'-264px')}">
            <div class="subscribeCon"></div>
            <div class="subscribeBtn" @click="subscribe(showActivity)">
              <span>Get $10 OFF</span>
            </div>
          </div>
      </div>
      <!-- 英文 -->
      <p class="word1">COLLECTIONS</p>
      <div class="collections">
        <ul class="collections_thr1">
          <li class="thr2" v-for="(item,index) in dataCollections" :key="index">
            <img :src="item.picture_src" alt @click="linkHref(item.picture_href)">
          </li>
        </ul>
      </div>
      <!-- 热销 -->
      <div class="word2_">
        <div class="word2">BEST SELLER</div>
      </div>
      <div class="sell">
        <div class="sell_1" v-for="(item,index) in homeData" :key="index" @click="link(item.products_id,item.spu_id)">
          <img :src="item.products_src" alt>
          <p class="sell_word">{{ item.products_name }}</p>
          <p class="sell_word1">$ {{ item.products_price }}</p>
        </div>
      </div>
      <div class="word3_">
        <div class="word3">NEW ARRIVAL</div>
      </div>
      <div class="new">
        <div class="new_1" v-for="(item,index) in homeArr" :key="index" @click="link(item.products_id,item.spu_id)">
          <img :src="item.products_src" alt>
          <p class="new_word">{{item.products_name}}</p>
          <p class="new_word1">$ {{ item.products_price }}</p>
        </div>
      </div>
      <div class="word4">Hot Style in Social Medias</div>
      <!-- 下面的轮播 -->
      <div class="banner2 swiper-container" dir="rtl">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in hotStyle" :key="index">
            <img :src="item.picture_src" class="small2" @click="linkHref(item.picture_href)">
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev swiper-button-black"></div>
        <div class="swiper-button-next swiper-button-black"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { setTimeout } from "timers";
import {
  homeSeller,
  homeBanner,
  homeArrivai,
  homeCollections,
  homeHotStyle
} from "../../api/home";
export default {
  data() {
    return {
      swiper1: "",
      showActivity: false,
      url: "https://arapi.panduo.com.cn/uploads/",
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
    subscribe (stute) {
      if (stute) {
        this.showActivity = false
      } else {
        this.showActivity = true
      }
    },
    // 点击任意区域
    hidePanel (event) {
      let sp2 = document.querySelector('.subscribe')
      if (sp2) {
        if (!sp2.contains(event.target)) {
          this.showActivity = false
        }
      }
    },
    //运营配置活动页
    linkHref(link){
      //window.open(link)
      window.location.href = link
    },
    //跳转到商品详情
    link(skuid,spuid){
      // console.log('111111', skuid)
      // console.log('22222', spuid)
      if(skuid && spuid){
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    // 首页banner信息
    async homeBanner() {
      let data = await homeBanner();
      this.dataBanner = data.data;
    },
    // async homeFoote() {
    //   let data = await homeFoote();
    //   for (this.homeFoot in data.data) {
    //     this.homeFoot = data.data;
    //   }
    // },
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
    // this.homeFoote();
    this.homeHotStyle();
    this.homeCollections();
  }
};
</script>
<style lang="scss" scoped>
  @import "@/assets/css/home.scss"
</style>
