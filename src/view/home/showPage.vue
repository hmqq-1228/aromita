
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
          <div class="swiper-slide" v-for="(item,index) in dataBanner" :key="index">
            <img :src="url+item.picture_src" alt>
          </div>
        </div>
        <!-- 指示点 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 英文 -->
      <div class="word1">Collections</div>
      <div class="collections">
        <div class="collections_one">
          <img src="@/assets/birtstone.png" class="collections_birtstone" alt>
          <img src="@/assets/chains.png" alt>
           </div>
        <div class="collections_thr">
          <img src="@/assets/chains.png" class="collections_chains" alt>
          <img src="@/assets/chains.png" class="collections_chains" alt>
          <img src="@/assets/chains.png" class="collections_chains" alt>
        </div>
      </div> -->


      <div class="collections">
        <ul class="collections_thr1">
          <li class="thr2" v-for="(item,index) in dataCollections" :key="index">
            <img :src="url+item.picture_src" alt>
          </li>
        </ul>
      </div>
      <!-- 热销 -->
      <!-- <div class="word2_">
        <div class="word2">Best SELLER</div>
      </div>
      <hr>
      <div class="sell">
        <ul class="sell_box">
          <li class="sell_1">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <p class="sell_word1">$19.99</p>
          </li>
          <li class="sell_2">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <p class="sell_word1">$19.99</p>
          </li>
          <li class="sell_3">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word">Classic Name NeckIace</p>
            <p class="sell_word1">$19.99</p>
          </li>
          <li class="sell_4">
            <img src="@/assets/best seller.png" alt>
            <p class="sell_word4">Classic Name NeckIace</p>
            <p class="sell_word1">$19.99</p>
          </li>
        </ul>
      </div>
      <div class="word3_">
        <p class="word3">NEW ARRIVAL</p>
      </div>
      <hr>
      <div class="new">
        <ul class="new_box">
          <li class="new_1" v-for="(item,index) in homeArr" :key="index">
            <img :src="url+item.products_src" alt>
            <p class="new_word">{{item.products_name}}</p>
            <span class="new_word1">${{ item.products_price }}</span>
          </li>
        </ul>
      </div>
      <div class="word4">Hot Style in Social Medias</div>

      <!-- 下面的轮播 -->
      <!-- <div class="banner2 swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width:300px !important;margin-right: 20px;" v-for="(item,index) in hotStyle" :key="index">
            <img :src="url+item.picture_src" class="small">
          </div>
        </div> -->
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->

        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div> -->

    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Swiper from "swiper";
import { setTimeout } from "timers";
import {homeSeller,homeBanner,homeArrivai,homeFoote,homeCollections,homeHotStyle,} from "../../api/home";
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
      url:'http://arapi.panduo.com.cn/uploads/',
      homeData: [], //Best Seller商品信息
      dataBanner: [], //首页banner信息
      homeArr: [], //NEW Arrivai 信息
      homeFoot: [],
      dataCollections: [], //Collections信息
      hotStyle: [], //Hot Style 信息
    };
  },
  mounted() {
    this.homeBanner()
    this.homeHotStyle()
    this.swiper1 = new Swiper(".banner1", {
      loop: true,
      autoplay: {

        disableOnInteraction: false //当设置为false时，用户操作之后（swipes,arrow以及pagination 点击）autoplay不会被禁掉，用户操作之后每次都会重新启动autoplay。
      },
       observer:true,//修改swiper自己或子元素时，自动初始化swiper
       observeParents:true,//修改swiper的父元素时，自动初始化swiper
      pagination: {
        //指示点
        el: ".swiper-pagination",
        clickable: true //为true时点击指示点会切换slide
      },
    });
    // var mySwiper = new Swiper(".banner2", {
    //   slidesPerView: 4,
    //   spaceBetween: 20,
    //   observer:true,//修改swiper自己或子元素时，自动初始化swiper
    //    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    //   //spaceBetween : '10%',按container的百分比
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   }
    // });
  },
  // methods: {
  //   /*鼠标移入停止轮播,5秒后继续轮播，鼠标离开 继续轮播*/
  //   comtainer_enter1() {
  //     this.swiper1.autoplay.stop();
  //     setTimeout(this.comtainer_leave1, 2000); //两秒加上默认的三秒
  //   },
  //   comtainer_leave1() {
  //     this.swiper1.autoplay.start();
  //   },
  //   async homeFoote() {
  //     let data = await homeFoote()
  //     for (this.homeFoot in data){
  //      this.homeFoot = data
  //     //  console.log(this.homeFoot)
  //     }
  //   },
  //   // Best Seller商品信息
  //   async homeSeller() {
  //     let data = await homeSeller()
  //     for (let homeData of data){
  //      this.homeData = data
  //     }
  //   },
  //   // NEW Arrivai 信息
  //   async homeArrivai() {
  //     let data = await homeArrivai()
  //     this.homeArr = data
  //     // for (let homeArr of data){
  //     //  this.homeArr = data
  //     // }
  //   },
  //   // 首页banner信息
  //   async homeBanner() {
  //     let data = await homeBanner()
  //     this.dataBanner = data
  //     // for (let dataBanner of data){
  //     //  this.dataBanner = data
  //     // }
  //   },
    //Collections区信息
    async homeCollections() {
      let data = await homeCollections()
      for (let dataCollections of data){
       this.dataCollections = data
      }
    },
  //   // Hot Style 信息
  //   async homeHotStyle() {
  //     let data = await homeHotStyle()
  //     for (let hotStyle of data){
  //      this.hotStyle = data
  //     }
  //   },
  // },
  created(){
    // this.homeSeller()
    // this.homeArrivai()
    // this.homeFoote()
    this.homeCollections()
  },
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
  width: 80%;
  height: 330px;
  // margin: 0 auto;

}
.collections_one {
  width: 950px;
  height: 300px;
  margin-left: 78px;
  margin-top: 30px;
  display: flex;
  padding-left: 10px;
}
  .collections_birtstone{
    margin-right:16px;
  }
.word1 {
  height: 48px;
  font-size: 40px;
  font-weight: 400;
  line-height: 48px;
  margin-top: 25px;
  margin-bottom: 30px;
  text-align: center;
  color: rgba(51, 51, 51, 1);
}
.collections_thr {
  height: 300px;
  margin-left: 83px;
  margin-top: 20px;
  display: flex;
}
  .collections_chains{
    margin-left: 20px;
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
  left: 42%;
  z-index: 1111;
  // padding-bottom:42px;
}
.word2 {
  width: 237px;
  height: 48px;
  text-align: center;
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
  width: 90%;
  height: 388px;
  margin-top: 60px;
  margin-left: 102px;
  // margin: 50px auto;
}
.sell_box{
  display: flex;
  justify-content: space-between;
}
.sell_box li{
  text-align: center;
}
.sell_word {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.sell_word1 {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
}
.sell_word4 {
  font-size: 14px;
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
  left: 42%;
  z-index: 1111;
  text-align: center;
  // padding-bottom:42px;
}
.word3 {
  height: 48px;
  font-size: 40px;
  font-family: Tahoma;
  font-weight: 400;
  line-height: 48px;
  color: rgba(3, 3, 3, 1);
}

.new {
  width: 1440px;
  height: 388px;
  margin: 42px auto;
}
.new_box{
  display: flex;
  justify-content: space-between;
}
.new_box li{
  text-align: center;
}
.new_word {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.new_word1 {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
}
.new_word4 {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
}
.new_word1 {
  font-size: 14px;
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
  height: 48px;
  font-size: 40px;
  font-weight: 400;
  line-height: 48px;
  margin-top: 39px;
  text-align: center;
  margin-bottom: 30px;
  color: rgba(51, 51, 51, 1);
}
.small {
  width: 300px !important;
  height: 300px !important;
}
.element.style {
  width: 345px;
  margin-right: 20px;
}
.swiper-slide {
  flex-shrink: 1;
}
</style>
