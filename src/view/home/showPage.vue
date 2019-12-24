<template>
  <div class="wrap_1">
    <div class="wrap" @click="hidePanel($event)">
      <!-- 轮播图 -->
      <div class="subscribe" :style="{left:(showActivity==true?'0':'-575px')}">
        <div class="subscribeCon">
          <div class="subscribeCart">
            <div class="subTitle">Subscribe To Get</div>
            <div class="money">$10 OFF</div>
            <div class="condition">No Limit Coupon</div>
          </div>
          <div class="subscribeInput">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <div class="demo-ruleForm">
                <el-form-item class="search isfooter" prop="name">
                  <el-input placeholder="Enter your email" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <div>
                  <div class="subButton" @click="submitForm('ruleForm')">SUBSCRIBE</div>
                </div>
              </div>
              <el-checkbox class="policeStyle" v-model="agreenSub" label="I have read and agreed to the"></el-checkbox> <span class="policy">Privacy Policy</span>
            </el-form>
          </div>
        </div>
        <div class="subscribeBtn" @click="subscribe(showActivity)">
          <span><i :class="subscribeIcon"></i> Get $10 OFF</span>
        </div>
      </div>
      <div class="home_banner">
          <el-carousel height="500px">
              <el-carousel-item v-for="(item,index) in dataBanner" :key="index">
                <img style="cursor: pointer;" v-lazy="item.picture_src" alt @click="linkHref(item.picture_href)">
              </el-carousel-item>
          </el-carousel>
      </div>
      <!-- 英文 -->
      <p class="word1">COLLECTIONS</p>
      <div class="collections">
        <ul class="collections_thr1">
          <li class="thr2" v-for="(item,index) in dataCollections" :key="index">
            <img v-lazy="item.picture_src" alt @click="linkHref(item.picture_href)">
          </li>
        </ul>
      </div>
      <!-- 热销 -->
      <div class="word2_">
        <div class="word2">BEST SELLER</div>
      </div>
      <div class="sell">
        <div class="sell_1" v-for="(item,index) in homeData" :key="index" @click="link(item.products_id,item.spu_id)">
          <div class="imgBox">
            <div class="tagBox" v-if="item.activity_id > 0">
              <div class="cheap" v-if="item.activity_type == 1">
                <div class="cheapLeft"></div>
                <div class="cheapRight">${{parseFloat(item.activity_price).toFixed(2)}}</div>
              </div>
              <div class="disPrice" v-if="item.activity_type == 2">%{{parseInt(item.activity_intensity)}} OFF</div>
            </div>
            <img v-lazy="item.products_src" alt>
          </div>
          <p class="sell_word">{{item.products_name}}</p>
          <p class="sell_word1">${{item.activity_id > 0?item.activity_price:item.products_price}}<span v-if="item.activity_id > 0">${{item.products_price}}</span></p>
        </div>
      </div>
      <div class="word3_">
        <div class="word3">NEW ARRIVAL</div>
      </div>
      <div class="new">
        <div class="new_1" v-for="(item,index) in homeArr" :key="index" @click="link(item.products_id,item.spu_id)">
          <div class="imgBox">
            <div class="tagBox" v-if="item.activity_id > 0">
              <div class="cheap" v-if="item.activity_type == 1">
                <div class="cheapLeft"></div>
                <div class="cheapRight">${{parseFloat(item.activity_price).toFixed(2)}}</div>
              </div>
              <div class="disPrice" v-if="item.activity_type == 2">%{{parseInt(item.activity_intensity)}} OFF</div>
            </div>
            <img v-lazy="item.products_src" alt>
          </div> 
          <p class="new_word">{{item.products_name}}</p>
          <p class="new_word1">${{item.activity_id > 0?item.activity_price:item.products_price}}<span v-if="item.activity_id > 0">${{item.products_price}}</span></p>
        </div>
      </div>
      <div class="word4">Hot Style in Social Medias</div>
      <!-- 下面的轮播 -->
      <div class="banner2 swiper-container" dir="rtl">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in hotStyle" :key="index">
            <img v-lazy="item.picture_src" class="small2" @click="linkHref(item.picture_href)">
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
import {Nosubscribe} from '../../api/subscription'
export default {
  data() {
    return {
      swiper1: "",
      agreenSub: false,
      showActivity: false,
      subscribeIcon: 'el-icon-caret-top',
      url: "https://arapi.panduo.com.cn/uploads/",
      homeData: [], //Best Seller商品信息
      dataBanner: [], //首页banner信息
      homeArr: [], //NEW Arrivai 信息
      homeFoot: [],
      dataCollections: [], //Collections信息
      hotStyle: [], //Hot Style 信息
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
        ]
      }
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
  watch:{
    showActivity (val, Ov) {
      if (!val) {
        this.$refs['ruleForm'].resetFields();
        this.agreenSub = false
        $('.policeStyle').removeClass('errorSub')
      }
    }
  },
  methods: {
    submitForm (formName) {
      var that = this
      if (this.agreenSub) {
        $('.policeStyle').removeClass('errorSub')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.subSubscribe()
          } else {
            return false;
          }
        });
      }else {
        $('.policeStyle').addClass('errorSub')
      }
    },
    subSubscribe () {
      var that = this
      Nosubscribe({customer_email_address: that.ruleForm.name}).then((res) => {
        if (res.code === 200) {
          this.$alert('Subscriptions Successful', '', {
            center: true,
            confirmButtonText: 'OK',
            callback: action => {
              that.showActivity = false
            }
          })
        } else if (res.code === 10001) {
          this.$alert('Your email address is already subscribed.', '', {
            center: true,
            confirmButtonText: 'OK',
          })
        } else {
          this.$alert('Subscription failed, please try again', '', {
            center: true,
            confirmButtonText: 'OK',
          })
        }
      })
    },
    subscribe (stute) {
      if (stute) {
        this.showActivity = false
        this.subscribeIcon = 'el-icon-caret-top'
      } else {
        this.showActivity = true
        this.subscribeIcon = 'el-icon-caret-bottom'
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
