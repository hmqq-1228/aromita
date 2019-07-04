<template>
<div class="detail">
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="goodsDetail">
    <div class="goodsImg">
      <div class="detailSwiper">
        <div class="swiper-father">
          <div class="banner2 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(detailImg, index) in goodDetail.thumbnail_images" v-bind:key="index">
                <img :src="picUrl + detailImg" class="small">
              </div>
              <!--<div class="swiper-slide">-->
                <!--<img src="@/assets/modelGoods.png" class="small">-->
              <!--</div>-->
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black swiper-button-prev1"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next1"></div>
        </div>
      </div>
      <div class="largerBox">
        <div class="largePic">
          <img :src="picUrl + goodDetail.sku_image" alt="">
        </div>
        <div class="shareList">
          <div class="shareBox">
            <div class="shareText">Share:</div>
            <div class="shareTo">
              <div><img src="@/assets/g.png" alt=""></div>
              <div><img src="@/assets/pinterest1.png" alt=""></div>
              <div><img src="@/assets/twitter1.png" alt=""></div>
              <div><img src="@/assets/facebook-01.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsInfo">
      <div class="goodsTitle">
        {{goodDetail.sku_name}}
      </div>
      <div class="goodsPrice">
        <div class="goodsLabel">Price:</div>
        <div class="priceCon"><span style="color: #c51015">$ {{goodDetail.sku_price}}</span></div>
        <!--<span class="disCont"> $ 8.88</span> <span class="disContTag">50% OFF</span>-->
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;" v-if="colorList">
        <div class="goodsLabelColor">Color:</div>
        <div class="swiper-fatherColor">
          <div class="goodsDetail2 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(color, index2) in colorList" v-bind:key="index2" @click="getColor($event, color.attr_name, color.id)">
                <img class="ColorPic" :src="color.value.image_url">
                <!--<div class="checkedTag"></div>-->
              </div>
              <!--<div class="swiper-slide" @click="getColor($event)">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<img class="ColorPic" src="@/assets/modelGoods.png">-->
              <!--</div>-->
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black swiper-button-prev2"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next2"></div>
        </div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;" v-if="sizeList">
        <div class="goodsLabelSize">Size:</div>
        <!--<div class="smallSlider2">-->
          <!--<div class="sliderBox">-->
            <!--<div class="sliderCont">-->
              <!--<div class="sizeSize" v-for="(size, index2) in attr" v-bind:key="index2">888</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="el-icon-arrow-left prev" @click="prevPic($event)"></div>-->
          <!--<div class="el-icon-arrow-right next" @click="nextPic($event)"></div>-->
        <!--</div>-->
        <div class="swiper-fatherSize">
          <div class="goodsDetailSize swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide smallText" v-for="(attr, index) in sizeList" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id)">
                <div class="sizeSize">{{attr.value.attr_value}} cm</div>
                <!--<div class="checkedTag"></div>-->
              </div>
              <!--<div class="swiper-slide" @click="getSize($event)">-->
                <!--<div class="sizeSize">2.7cm</div>-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<div class="sizeSize">2.8cm</div>-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<div class="sizeSize">2.9cm</div>-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<div class="sizeSize">3.0cm</div>-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<div class="sizeSize">3.2cm</div>-->
              <!--</div>-->
              <!--<div class="swiper-slide">-->
                <!--<div class="sizeSize">3.5cm</div>-->
              <!--</div>-->
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black swiper-button-prev3"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next3"></div>
        </div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;" v-if="weightList">
        <div class="goodsLabelWeight">Weight:</div>
        <div class="swiper-fatherSize">
          <div class="goodsDetailWeight swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide smallText" v-for="(attr, index) in weightList" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id)">
                <div class="sizeSize">{{attr.value.attr_value}} g</div>
                <!--<div class="checkedTag"></div>-->
              </div>
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black swiper-button-prev4"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next4"></div>
        </div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;" v-if="materialList">
        <div class="goodsLabelWeight">Material:</div>
        <div class="swiper-fatherSize">
          <div class="goodsDetailMat swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide smallText" v-for="(attr, index) in materialList" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id)">
                <div class="sizeSize">{{attr.value.attr_value}} g</div>
                <!--<div class="checkedTag"></div>-->
              </div>
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black swiper-button-prev5"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next5"></div>
        </div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;">
        <div class="goodsLabelSize">Quality:</div>
        <div> <el-input-number v-model="numQuality" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number></div>
      </div>
      <div class="goodsPrice">
        <div class="goodsLabel">Total Price:</div>
        <div class="priceCon" style="font-weight: 400">$ {{totalPay}}</div>
      </div>
      <div class="subBtn">
        <div class="subType" @click="addToCart()">Add to Cart</div>
        <div class="addWish"><span><img src="@/assets/wish.png" alt></span><span>Add to WishList</span></div>
      </div>
    </div>
  </div>
  <div class="mainFeature">
    <div class="mainFeatureTitle">Main Feature</div>
    <p>- Clear true Beat Tool List: This feature is good hug feature is good hug.</p>
    <p>- Clear true Beat Tool List: This feature is good hug feature is good hug.</p>
    <p>- Clear true Beat Tool List: This feature is good hug feature is good hug.</p>
    <p>- Clear true Beat Tool List: This feature is good hug feature is good hug.</p>
  </div>
  <div class="product">
    <div class="productTitle">Main Feature</div>
    <p><span>Materials: </span>This feature is good hug feature is good hug.</p>
    <p><span>Materials: </span>This feature is good hug feature is good hug.</p>
    <p><span>Color: </span>red</p>
    <p><span>Size: </span>3.00cm</p>
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
import {getGoodsDetail} from "../../api/home";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "goodsDetail",
  data(){
    return{
      numQuality: 1,
      goodDetail: '',
      priceOrder: 0,
      totalPay: 0,
      sizeList: [],
      attrList: [],
      colorList: [],
      weightList: [],
      materialList: []
    }
  },
  watch:{
    // numQuality: function (val, old) {
    //   var that = this
    //   if (val) {
    //     that.totalPay = val * that.priceOrder
    //   }
    // }
  },
  computed: {
    picUrl: function () {
      var that = this
      return that.$store.state.baseServiceUrl
    }
  },
  mounted() {
    setTimeout(function () {
      var swiper = new Swiper('.banner2',{
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerGroup: 1,
        watchOverflow: true,
        navigation:{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        }
      })
      var swiper2 = new Swiper('.goodsDetail2',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        navigation:{
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        }
      })
      var swiper3 = new Swiper('.goodsDetailSize',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        navigation:{
          nextEl: '.swiper-button-next3',
          prevEl: '.swiper-button-prev3',
        }
      })
      var swiper3 = new Swiper('.goodsDetailWeight',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        navigation:{
          nextEl: '.swiper-button-next4',
          prevEl: '.swiper-button-prev4',
        }
      })
    }, 200)
  },
  created(){
    this.getGoodsDetail()
  },
  methods:{
    // async getGoodsDetail() {
    //   var skuId = this.$route.params.skuId
    //   var spuId = this.$route.params.spuId
    //   console.log('8888', this.$route.params.skuId)
    //   let goodsList = await getGoodsDetail({
    //     sku: skuId,
    //     spu: spuId
    //   });
    //   this.goodsDetail = goodsList.data.data[0]
    //   console.log('goodsList', this.goodsDetail)
    // },
    getGoodsDetail: function () {
      var that = this
      var skuId = this.$route.params.skuId
      var spuId = this.$route.params.spuId
      this.$axios.get(this.$store.state.localUrl+'api/product/'+ spuId + '/' + skuId, {}).then(res => {
        if (res.data.code === "200") {
          console.log('11111', res.data)
          that.goodDetail = res.data.data.sku
          that.priceOrder = res.data.data.sku.sku_price
          that.totalPay = that.priceOrder * that.numQuality
          that.attrList =  res.data.data.attrs
          that.attrId = res.data.data.sku_ids
          that.colorList = res.data.data.attrs.color
          that.sizeList = res.data.data.attrs.size
          that.weightList = res.data.data.attrs.weight
          that.materialList = res.data.data.attrs.material
          for(let key  in that.attrList){
            console.log('key', key)
            // if (key === 'color') {
            //   delete that.attrList.color
            // }
          }
          for(let key in that.attrId){
            console.log('key2222555', that.attrId[key])
            var t = that.attrId[key].indexOf('1:1')
            console.log('88888', that.attrId[key].indexOf('1:1'))
            if (t > -1) {
              console.log('key2222', key)
            }
          }
          // var t = string.indexOf('xxx');
          console.log('3333333', that.colorList)
        } else {
          console.log(222222)
        }
        //
        console.log('77777',that.colorList)
      })
    },
    getSize: function (e, name, id) {
      console.log('8888', name, id)
      var obj = e.currentTarget
      $(obj).children().addClass('active')
      $(obj).siblings().children().removeClass('active')
    },
    getColor: function (e, name, id) {
      console.log('8888', name, id)
      var obj = e.currentTarget
      $(obj).children().addClass('active')
      $(obj).siblings().children().removeClass('active')
    },
    addToCart: function() {
      // this.$router.push('/shoppingCar')
      $('.global').css('')
    },
    handleChange: function (val) {
      console.log('num', val)
      var that = this
      if (val) {
        that.totalPay = val * that.priceOrder
      }
    },
    nextPic:function (e) {
      console.log(e)
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var obj = e.target.offsetParent.firstChild.firstChild
      var objBtn = e.currentTarget
      var prev = e.target.offsetParent.children[1]
      if (picNum > 5) {
        var num = picNum - 5
        // this.$store.state.contPrev = this.$store.state.contPrev + 1
        console.log('88888', this.$store.state.contPrev)
        // if (this.$store.state.contPrev <= num) {
          $(obj).css('left', -88*num)
          $(obj).css('transition', '0.3s')
          $(prev).css('color', '#333')
          // $(objBtn).css('pointer-events', 'auto')
        // } else {
          $(objBtn).css('color', '#999')
          // $(objBtn).css('pointer-events', 'none')
          // this.$store.state.contPrev = 0
        // }
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
          var distent = parseInt(obj.style.left) + 88 * num
          $(obj).css('left', distent)
          $(obj).css('transition', '0.3s')
          // this.$store.state.contPrev = 0
          $(nextBtn).css('color', '#333')
          $(prevBtn).css('color', '#999')
          // $(nextBtn).css('pointer-events', 'auto')
        } else {
          // $(prevBtn).css('color', '#999')
          // $(prevBtn).css('pointer-events', 'none')
          // this.$store.state.contPrev = 0
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
    height: 38px;
    width: 506px;
    position: relative;
  }
  .sliderBox{
    height: 38px;
    width: 445px;
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
    height: 38px;
    width: 445px;
    margin: 0 auto;
  }
  .sliderCont div{
    width: 79px;
    height: 32px;
    margin-right: 4px;
    display: inline-block;
  }
  .prev{
    color: #999;
    position: absolute;
    left: 0;
    top: 6px;
    font-size: 24px;
  }
  .next{
    color: #333;
    position: absolute;
    right: 0;
    top:6px;
    font-size: 24px;
  }
  .ColorPic{
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 1px solid #eee;
  }
.sizeSize.active,.ColorPic.active{
  border: 1px solid #B20605;
  transition: all .3s;
}
.small{
  width: 80px;
  height: 80px;
}
.goodsDetail{
  width: 1440px;
  margin: 10px auto;
  margin-top: 10px;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.mainFeature,.product{
  width: 1440px;
  margin: 0 auto;
  color: #333;
  font-size: 14px;
  font-family: Tahoma;
  line-height: 30px;
}
.mainFeature{
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.product span{
  color: #999;
}
.product{
  margin-bottom: 30px;
}
.mainFeatureTitle,.productTitle{
  color: #333;
  font-size: 18px;
  font-family: Tahoma;
  margin-top: 21px;
  margin-bottom: 6px;
}
.goodsImg{
  width: 650px;
  height: 620px;
  display: flex;
  justify-content: space-between;
}
.sizeSize{
  height: 32px;
  width: 80px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  line-height: 32px;
  text-align: center;
  font-family: Tahoma;
  border: 1px solid #eee;
}
.detailSwiper{
  width: 80px;
  height: 506px;
}
.swiper-father{
  position: relative;
  top: 25px;
  height: 445px;
}
.swiper-fatherColor{
  position: relative;
  width: 506px;
}
.swiper-fatherSize{
  position: relative;
  width: 506px;
}
.goodsImg .swiper-container{
  height: 445px;
  width: 80px;
}
.goodsDetail2.swiper-container{
  height: 82px;
  width: 445px;
}
.swiper-container{
  height: 38px;
  width: 445px;
}
.swiper-fatherColor .swiper-button-prev {
  color: #333;
  position: absolute;
  top: 50px;
  left: 0;
  width: 18px;
  height: 28px;
  /* margin-top: -13px; */
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-fatherSize .swiper-button-prev {
  color: #333;
  position: absolute;
  top: 24px;
  left: 0;
  width: 18px;
  height: 28px;
  /* margin-top: -13px; */
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.goodsImg .swiper-button-prev{
  color: #333;
  position: absolute;
  top: -5px;
  left: 30px;
  width: 18px;
  height: 28px;
  /* margin-top: -13px; */
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 	/* Opera */
  background-repeat: no-repeat;
}
.goodsImg .swiper-button-next {
  color: #333;
  position: absolute;
  top: 450px;
  right: 30px;
  width: 18px;
  height: 28px;
  margin-top: -10px;
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg);
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-fatherColor .swiper-button-next {
  color: #333;
  position: absolute;
  top: 50px;
  right: 5px;
  width: 18px;
  height: 28px;
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-fatherSize .swiper-button-next {
  color: #333;
  position: absolute;
  top: 24px;
  right: 5px;
  width: 18px;
  height: 28px;
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.goodsDetail2 .swiper-slide{
  width: 82px !important;
  margin-right: 8px;
  position: relative;
  overflow: hidden;
}
.checkedTag.active{
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: 0;
  height: 0;
  border-color: #B20605 transparent;
  border-width: 0px 0px 20px 20px;
  border-style: solid;
}
  .goodsDetailSize .checkedTag.active{
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 0;
    height: 0;
    border-color: #B20605 transparent;
    border-width: 0px 0px 10px 10px;
    border-style: solid;
  }
.smallText.swiper-slide{
  width: 82px !important;
  margin-right: 8px;
  position: relative;
  overflow: hidden;
  height: 34px;
}
.goodsImg .swiper-slide {
  width: 82px !important;
  height: 90px !important;
}
  .largePic{
    width: 550px;
    height: 550px;
  }
  .shareTo{
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .shareTo img{
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
  .shareList{
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
  .shareBox{
    height: 40px;
    width: 250px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }
  .shareText{
    width: 50px;
    font-size: 14px;
    font-family: Tahoma;
    line-height: 40px;
  }
  .goodsInfo{
    width: 760px;
  }
  .goodsTitle{
    font-size: 18px;
    color: #333;
    font-family: Tahoma;
  }
  .goodsPrice{
    margin-top: 20px;
    display: flex;
    justify-content: start;
  }
  .goodsLabel{
    width: 100px;
    height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    font-family: Tahoma;
  }
  .goodsLabelColor{
    width: 100px;
    height: 80px;
    font-size: 14px;
    color: #333;
    line-height: 80px;
    font-family: Tahoma;
  }
.goodsLabelSize,.goodsLabelWeight{
  width: 100px;
  height: 32px;
  font-size: 14px;
  color: #333;
  line-height: 32px;
}
  .priceCon{
    height: 40px;
    font-size: 18px;
    color: #333;
    font-weight: 600;
    line-height: 40px;
    font-family: Tahoma;
  }
  .priceCon .disCont{
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #888;
    font-weight: normal;
    text-decoration:line-through;
  }
.disContTag{
  display: inline-block;
  color: #c30808;
  font-family: Tahoma;
  font-size: 14px;
  height: 20px;
  width: 70px;
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
  font-weight: normal;
  border: 1px solid chocolate;
}
  .subBtn{
    margin-top: 20px;
    display: flex;
    justify-content: start;
  }
  .subType{
    width: 300px;
    height: 45px;
    color: #fff;
    background-color: #c51015;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }
.subType:hover{
  cursor: pointer;
  background-color: #B20605;
}
.addWish{
  width: 160px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  font-family: Tahoma;
  color: #333;
  margin-left: 60px;
}
  .addWish span:nth-of-type(1){
    margin-top: 4px;
    cursor: pointer;
  }
</style>
