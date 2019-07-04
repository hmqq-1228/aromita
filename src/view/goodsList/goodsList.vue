<template>
  <div class="goodsList">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="listBox">
      <div class="listNav">
        <div class="navTitle">Sort By</div>
        <div class="navItem">Most Recent</div>
        <div class="navItem">Best Selling</div>
        <div class="navItem">Highest Price</div>
        <div class="navItem">Lowest Price</div>
        <div class="navTitle">Price</div>
        <div class="price">
          <div class="priceRange">
            <input type="number">
            <div>	&#8764;</div>
            <input type="number">
          </div>
          <button>APPLY</button>
        </div>
        <div class="navTitleTwo">
          <div>Filter</div>
          <div style="color: #999;">Clear</div>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesMetal">
            <el-collapse-item title="Metal" name="Metal">
              <div class="metalChecked"><input type="radio" id="metal1" name="metal" checked><label for="metal1"></label><span>Stainless Steel</span></div>
              <div class="metalChecked"><input type="radio" id="metal2" name="metal"><label for="metal2"></label><span>Silver</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesColor">
            <el-collapse-item title="Color" name="Color">
              <div class="metalChecked"><input type="radio" id="Color1" name="metal"><label for="Color1"></label><span>Silver</span></div>
              <div class="metalChecked"><input type="radio" id="Color2" name="metal"><label for="Color2"></label><span>Gold</span></div>
              <div class="metalChecked"><input type="radio" id="Color3" name="metal"><label for="Color3"></label><span>Black</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesSize">
            <el-collapse-item title="Size" name="Size">
              <div class="metalChecked"><input type="radio" id="Size1" name="metal"><label for="Size1"></label><span>Small</span></div>
              <div class="metalChecked"><input type="radio" id="Size2" name="metal"><label for="Size2"></label><span>Model</span></div>
              <div class="metalChecked"><input type="radio" id="Size3" name="metal"><label for="Size3"></label><span>Large</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="listGoods">
        <!--<div class="goodsItem" v-for="(goods, index) in goodsList" v-bind:key="'spu' + goods.id">-->
          <!--<div class="goodInner">-->
            <!--<div class="goodsPic" @click="toGoodsDetail(goods.id)">-->
              <!--&lt;!&ndash;<div class="disCont">50% OFF</div>&ndash;&gt;-->
              <!--<img :src="picUrl + goods.firstLargePic" alt="">-->
            <!--</div>-->
            <!--<div class="smallSlider">-->
              <!--<div class="swiper-father">-->
                <!--<div class="swiper-container goods2">-->
                  <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide" v-for="(pic, index2) in goods.skus" v-bind:key="'sku'+ pic.id" @click="getColorPicture($event, index, pic.sku_image, pic.sku_name, pic.sku_price)">-->
                     <!--<img :src="pic.sku_color_img" class="smallPic" :class="index2 === 0 ? 'active': ''">-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                      <!--&lt;!&ndash;<img src="@/assets/smallPic.png" class="smallPic">&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="swiper-button-prev swiper-button-black swiper-button-prev2"></div>-->
                <!--<div class="swiper-button-next swiper-button-black swiper-button-next2"></div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="goodsInfo">-->
              <!--{{goods.defultTitle}}-->
            <!--</div>-->
            <!--<div class="goodsPrice">$ {{goods.defultPrice}}</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="goodsItem"  v-for="(goods, index) in goodsList" v-bind:key="'spu' + goods.id">
          <div class="goodInner">
            <div class="goodsPic" @click="toGoodsDetail(goods.id, goods.skuId)">
              <div class="cheap">
                <!--<div class="cheapLeft"></div>-->
                <!--<div class="cheapRight">$2.99</div>-->
              </div>
              <img :src="goods.firstLargePic" alt="">
            </div>
            <div class="smallSlider2">
              <div class="sliderBox">
                <div class="sliderCont">
                  <div v-if="goods.skus.length>0" v-for="(pic, index2) in goods.skus" v-bind:key="'sku'+ pic.id" @click="getColorPicture($event, index, pic.sku_image, pic.sku_name, pic.sku_price, pic.id)">
                    <img :src="pic.sku_color_img" class="smallPic" :class="index2 === 0 ? 'active': ''">
                  </div>
                </div>
              </div>
              <div class="el-icon-arrow-left prev" v-if="goods.skus.length > 5" @click="prevPic($event)"></div>
              <div class="el-icon-arrow-right next" v-if="goods.skus.length > 5" @click="nextPic($event)"></div>
            </div>
            <div class="goodsInfo">
              {{goods.defultTitle}}
            </div>
            <div class="goodsPrice">$ {{goods.defultPrice}}</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner77 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black swiper-button-prev77"></div>
                <div class="swiper-button-next swiper-button-black swiper-button-next77"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper'
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import {getGoodsList} from "../../api/home";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "goodsList",
  data () {
    return {
      activeNamesMetal: '',
      activeNamesColor: '',
      activeNamesSize: '',
      picNum: 5,
      goodsList: [],
      // navigation:{
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // }
    }
  },
  watch: {

  },
  computed: {
    picUrl: function () {
      var that = this
      return that.$store.state.baseServiceUrl
    }
  },
  mounted() {
      var swiper2 = new Swiper('.goods2',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        watchOverflow: true,
        navigation:{
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        }
      })
    // var swiper4 = new Swiper('.goods4',{
    //   slidesPerView: 5,
    //   slidesPerGroup: 1,
    //   watchOverflow: true,
    //   navigation:{
    //     nextEl: '.swiper-button-next4',
    //     prevEl: '.swiper-button-prev4',
    //   }
    // })
    var swiper4 = new Swiper('.banner66',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextEl: '.swiper-button-next66',
        prevEl: '.swiper-button-prev66',
      }
    })
    var swiper4 = new Swiper('.banner77',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextEl: '.swiper-button-next77',
        prevEl: '.swiper-button-prev77',
      }
    })
  },
  created() {
    this.getGoodsList()
    console.log('8888', this.picUrl)
  },
  methods: {
    toGoodsDetail: function (spuid, skuid) {
      console.log('spuId', spuid)
      console.log('skuId', skuid)
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    // getGoodsList: function () {
    //   axios.get()
    // }
    async getGoodsList() {
      let goodsList = await getGoodsList();
      this.goodsList = goodsList.data.data
      for (var i = 0;i < this.goodsList.length; i++) {
        if (this.goodsList[i].skus.length > 0) {
          this.goodsList[i].firstLargePic = this.goodsList[i].skus[0].sku_image
          this.goodsList[i].defultTitle = this.goodsList[i].skus[0].sku_name
          this.goodsList[i].defultPrice = this.goodsList[i].skus[0].sku_price
          this.goodsList[i].skuId = this.goodsList[i].skus[0].id
        }
      }
      console.log('goodsList', this.goodsList)
    },
    getColorPicture: function (e, index1, url, title, price, id) {
      var obj = e.currentTarget
      var that = this
      var newGoodList = []
      $(obj).children().addClass('active')
      $(obj).siblings().children().removeClass('active')
      console.log(index1)
      console.log(price)
      that.goodsList[index1].firstLargePic = url
      that.goodsList[index1].defultTitle = title
      that.goodsList[index1].defultPrice = price
      that.goodsList[index1].skuId = id
      for (var t = 0; t < that.goodsList.length; t++) {
        newGoodList.push(that.goodsList[t])
      }
      that.goodsList = []
      that.goodsList = newGoodList
      console.log('44444', that.goodsList[index1].firstLargePic)
    },
    nextPic:function (e) {
      console.log(e)
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var obj = e.target.offsetParent.firstChild.firstChild
      var objBtn = e.currentTarget
      var prev = e.target.offsetParent.children[1]
      if (picNum > 5) {
        var num = picNum - 5
        this.$store.state.cont = this.$store.state.cont + 1
        console.log('88888', this.$store.state.cont)
        if (this.$store.state.cont <= num) {
          $(obj).css('left', -45*this.$store.state.cont)
          $(obj).css('transition', '0.3s')
          $(prev).css('color', '#333')
        } else {
          $(objBtn).css('color', '#999')
        }
      }
      // console.log('n', n)
    },
    prevPic:function (e) {
      console.log(e)
      console.log(e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length)
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var obj = e.target.offsetParent.firstChild.firstChild
      var nextBtn = e.target.offsetParent.lastChild
      var prevBtn = e.currentTarget
      if (picNum > 5) {
        var num = picNum - 5
        if (parseInt(obj.style.left) != 0) {
          var distent = parseInt(obj.style.left) + 45 * num
          $(obj).css('left', distent)
          $(obj).css('transition', '0.3s')
          this.$store.state.cont = 0
          $(nextBtn).css('color', '#333')
        } else {
          $(prevBtn).css('color', '#999')
        }
      }
      // this.$store.state.contPrev = this.$store.state.contPrev + 1
      // if (parseInt(obj.style.left) != 0) {
      //   if (this.$store.state.contPrev <= num) {
      //     var distent = parseInt(obj.style.left) + 45
      //     $(obj).css('left', distent)
      //     $(obj).css('transition', '0.5s')
      //   }
      // }
      console.log('n', this.$store.state.cont)
      console.log('dis', num)
      console.log('5555', distent)
    }
  }
}
</script>

<style scoped>
  .smallSlider2{
    height: 42px;
    width: 100%;
    position: relative;
  }
  .sliderBox{
    height: 42px;
    width: 240px;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    left:0;
    top: 0;
  }
  .sliderCont{
    position: absolute;
    left: 0;
    top: 0;
    height: 42px;
    width: 240px;
    margin: 0 auto;
  }
  .sliderCont div{
    width: 42px;
    height: 42px;
    margin-right: 6px;
    display: inline-block;
  }
  .prev{
    color: #999;
    position: absolute;
    left: 0;
    top: 10px;
    font-size: 24px;
  }
  .next{
    color: #333;
    position: absolute;
    right: 0;
    top:10px;
    font-size: 24px;
  }
  .listBox{
    width: 1440px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .listNav{
    width: 210px;
  }
  .navTitle{
    font-family: Tahoma;
    color: #666;
    font-size: 14px;
    height: 36px;
    line-height: 42px;
    padding: 0 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .navTitleTwo{
    font-family: Tahoma;
    color: #666;
    display: flex;
    font-size: 14px;
    height: 36px;
    line-height: 42px;
    padding: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
  }
  .navItem{
    font-family: Tahoma;
    color: #333;
    font-size: 14px;
    height: 30px;
    cursor: pointer;
    padding: 0 10px;
    line-height: 30px;
  }
  .listGoods{
    width: 1200px;
    min-height: 500px;
  }
  .goodsItem{
    width: 300px;
    height: 425px;
    float: left;
  }
  .goodInner{
    width: 282px;
    height: 407px;
    margin: 0 auto;
    box-shadow: none;
    transition: all .3s;
    border: 1px solid #e8e8e8;
  }
  .goodInner:hover{
    border: 1px solid #c30808;
    box-shadow: 0 0 8px 5px #e7e7e7;
  }
  .price{
    padding: 10px;
  }
  .priceRange{
    display: flex;
    justify-content: start;
    margin-bottom: 10px;
  }
  .priceRange input{
    width: 60px;
    height: 28px;
  }
  .priceRange>div{
    width: 25px;
    height: 28px;
    text-align: center;
    line-height: 28px;
  }
  .price>button{
    width: 145px;
    height: 28px;
    color: #fff;
    border: none;
    outline: none;
    font-family: Tahoma;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
    transition: all .3s;
    background-color: #121037;
  }
  .price>button:hover{
    background-color: #121059;
  }
  .priceRange input::-webkit-outer-spin-button,
  .priceRange input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .priceRange input[type="number"]{
    -moz-appearance: textfield;
  }
  .metalChecked {
    position: relative;
    padding-left: 10px;
    line-height: 25px;
    /*margin-right: 12px;*/
  }

  .metalChecked input {
    vertical-align: middle;
    /* 前面三行代码是为了让radio单选按钮与文字对齐 */
    width: 14px;
    height: 14px;
    appearance: none;/*清楚默认样式*/
    -webkit-appearance: none;
    opacity: 0;
    outline: none;
    /* 注意不能设置为display:none*/
  }

  .metalChecked label {
    position: absolute;
    left: 10px;
    top: 6px;
    z-index:1;
    /*注意层级关系，如果不把label层级设为最低，会遮挡住input而不能单选*/
    width: 14px;
    height: 14px;
    border: 1px solid #999;
  }

  .metalChecked input:checked+label {
    background: #fff;
  }

  .metalChecked input:checked+label::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 1px;
    width: 5px;
    height: 8px;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .metalChecked span{
    font-size: 14px;
    color: #333;
    font-family: Tahoma;
    padding-left: 10px;
  }
  .goodsPic{
    width: 280px;
    height: 280px;
    cursor: pointer;
    position: relative;
  }
  .goodsPic img{
    width: 100%;
    height: 280px;
  }
  .cheap{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    display: flex;
  }
  .cheapLeft{
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:10px solid #c30808;
  }
  .cheapRight{
    color: #fff;
    height: 20px;
    padding: 0 4px;
    text-align: center;
    line-height: 20px;
    font-family: Tahoma;
    font-size: 14px;
    background-color: #c30808;
  }
  .disCont{
    color: #c30808;
    font-family: Tahoma;
    font-size: 14px;
    height: 20px;
    width: 70px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    border: 1px solid chocolate;
  }
  .goodsPic>img{
    width: 100%;
  }
  .smallPic{
    width: 40px;
    height: 40px;
    border: 1px solid #e7e7e7;
  }
  .smallPic.active{
    border: 1px solid #c30808;
  }
  .smallSlider{
    height: 42px;
    margin: 0 auto;
  }
  .swiper-father{
    position: relative;
  }
  .swiper-container{
    height: 42px;
    width: 240px;
  }
  .swiper-button-prev{
    position: absolute;
    top: 50%;
    left: 0;
    width: 18px;
    height: 28px;
    margin-top: -13px;
    z-index: 10;
    cursor: pointer;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .swiper-button-next {
    color: #333;
    position: absolute;
    top: 50%;
    right: 0;
    width: 18px;
    height: 28px;
    margin-top: -13px;
    z-index: 10;
    cursor: pointer;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .swiper-slide {
    width: 42px !important;
    margin-right: 7px;
  }
  .goodsInfo{
    font-family: Tahoma;
    font-size: 14px;
    color: #333;
    width: 260px;
    height: 34px;
    margin-top: 6px;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goodsPrice{
    color: #c30808;
    font-size: 16px;
    font-family: Tahoma;
    width: 280px;
    margin-top: 6px;
    padding: 0 10px;
  }
</style>
