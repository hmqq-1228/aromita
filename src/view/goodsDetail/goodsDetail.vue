<template>
<div class="detail">
  <div class="bgModel" v-if="showModel">
    <div class="modelCont">
      <div class="modelClose" @click="closeModel"><i class="el-icon-close"></i></div>
      <div class="modelTitle">Failed to add to cart</div>
      <div class="modelText">Sorry, your shopping cart goes over the 50-item limit.</div>
      <div class="modelText">Place view your cart firstly.</div>
      <div class="toCart" @click="toGoodsCart()">Go to Cart</div>
    </div>
  </div>
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="goodsDetail">
    <div class="goodsImg">
      <div class="detailSwiper">
        <div class="swiper-father">
          <div class="banner2 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(detailImg, index) in imageList" v-bind:key="index" @click="chooseImg($event, detailImg)" :class="index === 0? 'checkedStyle': ''">
                <img :src="detailImg.split('.jpg')[0] + '_80_80.jpg'" class="small">
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
          <img :src="mainImgUrl" alt="">
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
        <div class="goodsLabel">price:</div>
        <div class="priceCon"><span style="color: #c51015" v-if="goodDetail.sku_price">$ {{goodDetail.sku_price}}</span></div>
        <!--<span class="disCont"> $ 8.88</span> <span class="disContTag">50% OFF</span>-->
      </div>
      <!--<div style="display: flex;justify-content: start;margin-top: 20px;">-->
        <!--<div class="goodsLabelColor">color:</div>-->
        <!--<div class="swiper-fatherColor">-->
          <!--<div class="goodsDetail2 swiper-container">-->
            <!--<div class="swiper-wrapper">-->
              <!--<div class="swiper-slide" v-for="(color, index2) in colorList" v-bind:key="index2" @click="getSize($event, color.attr_name, color.id, color.val_id)">-->
                <!--<img class="ColorPic" :class="color.activeStyle === 1?'active': ''" :src="color.image_url">-->
                <!--&lt;!&ndash;<div class="checkedTag"></div>&ndash;&gt;-->
              <!--</div>-->
              <!--&lt;!&ndash;<div class="swiper-slide" @click="getColor($event)">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="swiper-slide">&ndash;&gt;-->
                <!--&lt;!&ndash;<img class="ColorPic" src="@/assets/modelGoods.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="colorList.length > 5" class="swiper-button-prev swiper-button-black swiper-button-prev2"></div>-->
          <!--<div v-if="colorList.length > 5" class="swiper-button-next swiper-button-black swiper-button-next2"></div>-->
        <!--</div>-->
      <!--</div>-->
      <div style="display: flex;justify-content: start;margin-top: 20px;" v-for="(attr, index5) in attrList" v-bind:key="index5">
        <div class="goodsLabelSize" :class="index5 === 'color'? 'isImgLabel': 'isTextLabel'">{{index5}}:</div>
        <div class="smallSlider2">
          <div class="sliderBox" :class="index5 === 'color'? 'isImg': 'isText'">
            <div class="sliderCont">
              <div class="sizeSize" :class="item.activeStyle === 1?'active': ''" v-for="(item, index6) in attr" v-bind:key="index6" @click="getSize($event, item.attr_name, item.id, item.val_id)">
                <div :class="item.disStyle === 2?'disStyle':''" v-if="!item.image_url">{{item.attr_value}}</div>
                <img :class="item.disStyle === 2?'disStyle':''" v-if="item.image_url" :src="item.image_url">
                <!--<div v-if="item.image_url" class="model"></div>-->
              </div>
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
              <!--<div class="sizeSize">2.5mm</div>-->
            </div>
          </div>
          <div v-if="attr.length > 5" class="el-icon-arrow-left prev" @click="prevPic($event)"></div>
          <div v-if="attr.length > 5" class="el-icon-arrow-right next" @click="nextPic($event)"></div>
        </div>
        <!--<div class="swiper-fatherSize">-->
          <!--<div class="goodsDetailSize swiper-container">-->
            <!--<div class="swiper-wrapper">-->
              <!--<div class="swiper-slide smallText" v-for="(attr, index) in level_size" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id, attr.value.id)">-->
                <!--<div class="sizeSize" :class="attr.activeStyle === 1?'active': ''">{{attr.value.attr_value}} cm</div>-->
                <!--&lt;!&ndash;<div class="checkedTag"></div>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-button-prev swiper-button-black swiper-button-prev3"></div>-->
          <!--<div class="swiper-button-next swiper-button-black swiper-button-next3"></div>-->
        <!--</div>-->
      </div>
      <!--<div style="display: flex;justify-content: start;margin-top: 20px;" v-if="level_weight.length > 0">-->
        <!--<div class="goodsLabelWeight">Weight:</div>-->
        <!--<div class="swiper-fatherSize">-->
          <!--<div class="goodsDetailWeight swiper-container">-->
            <!--<div class="swiper-wrapper">-->
              <!--<div class="swiper-slide smallText" v-for="(attr, index) in level_weight" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id, attr.value.id)">-->
                <!--<div class="sizeSize" :class="attr.activeStyle === 1?'active': ''">{{attr.value.attr_value}} g</div>-->
                <!--&lt;!&ndash;<div class="checkedTag"></div>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-button-prev swiper-button-black swiper-button-prev4"></div>-->
          <!--<div class="swiper-button-next swiper-button-black swiper-button-next4"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div style="display: flex;justify-content: start;margin-top: 20px;" v-if="level_material.length > 0">-->
        <!--<div class="goodsLabelWeight">Material:</div>-->
        <!--<div class="swiper-fatherSize">-->
          <!--<div class="goodsDetailMat swiper-container">-->
            <!--<div class="swiper-wrapper">-->
              <!--<div class="swiper-slide smallText" v-for="(attr, index) in level_material" v-bind:key="index" @click="getSize($event, attr.attr_name, attr.id, attr.value.id)">-->
                <!--<div class="sizeSize" :class="attr.activeStyle === 1?'active': ''">{{attr.value.attr_value}} g</div>-->
                <!--&lt;!&ndash;<div class="checkedTag"></div>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-button-prev swiper-button-black swiper-button-prev5"></div>-->
          <!--<div class="swiper-button-next swiper-button-black swiper-button-next5"></div>-->
        <!--</div>-->
      <!--</div>-->
      <div style="display: flex;justify-content: start;margin-top: 20px;">
        <div class="goodsLabelSize" style="width: 130px;">quality:</div>
        <div style="display: flex;">
          <el-input-number v-model="numQuality" @change="handleChange" :min="1" :max="maxQuality"></el-input-number>
          <div class="kuCun">{{maxQuality}} available</div>
        </div>
      </div>
      <div class="goodsPrice">
        <div class="goodsLabel">Total Price:</div>
        <div class="priceCon" style="font-weight: 400">$ {{totalPay}}</div>
      </div>
      <div>
        <div class="subBtn">
          <div v-if="goodDetail.sku_status === 1" class="subType" @click="addToCart()">Add to Cart</div>
          <div v-if="goodDetail.sku_status === 2" class="subType out">Out of Stock</div>
          <div class="addWish" @click="tastModel()"><span><img src="@/assets/wish.png" alt></span><span>Add to WishList</span></div>
        </div>
        <div v-if="goodDetail.sku_status === 2" class="restocking">It is restocking now. Once available, you can buy it.</div>
      </div>
    </div>
  </div>
  <div class="mainFeature">
    <div class="mainFeatureTitle">Main Feature</div>
    <p>- {{goodDetail.main_feature}}</p>
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
import {addToShopCard, getSkuNum, getInStock} from "../../api/register";
import qs from 'qs'
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "goodsDetail",
  data(){
    return{
      addButton: false,
      showModel: false,
      skuDefult: '',
      numQuality: 1,
      goodDetail: '',
      mainImgUrl: '',
      priceOrder: 0,
      totalPay: 0,
      sumIds: [],
      goodsIds: [],
      attrList: [],
      attrListDis: [],
      // otherList: [],
      // colorList: [],
      getNewSkuId: 0,
      getSkuList: [],
      imageList: [],
      skuSpuIdList: [],
      skuList: [],
      maxQuality: 0
    }
  },
  watch:{
    showModel: function(val, ov){
      if (val) {
        document.documentElement.style.overflowY = 'hidden';
      } else {
        document.documentElement.style.overflowY = 'scroll';
      }
    },
    getNewSkuId: function (val, old) {
      var that = this
      if (val) {
        var spuId = that.$route.params.spuId
        console.log('44444444', spuId, val)
        that.$router.push('/goodsDetail/'+ spuId + '/'+ val)
        console.log('我已经跳转了', spuId)
        // that.goodDetail = ''
        // that.attrList = []
        // that.colorList = []
        that.getGoodsDetail(spuId, val)
        document.location.reload()
        // window.location.href='http://localhost:8080/goodsDetail/'+ spuId + '/'+ val
      }
    },
    skuDefult: function (val, oV) {
      var that = this
      if (val) {
        console.log('我已经更新了', val)
      }
    }
  },
  computed: {
    // picUrl: function () {
    //   var that = this
    //   return that.$store.state.baseServiceUrl
    // }
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
    }, 500)
  },
  created(){
    this.getGoodsDetail()
  },
  methods:{
    tastModel: function(){
      this.showModel = true
    },
    closeModel: function(){
      this.showModel = false
    },
    toGoodsCart: function(){
      this.$router.push('/shoppingCar')
    },
    chooseImg: function (e, url) {
      var obj = e.currentTarget
      $(obj).addClass('checkedStyle').siblings().removeClass('checkedStyle')
      var leftUrl = url.split('.jpg')[0]
      console.log('jpg', leftUrl)
      var imgUrl = leftUrl + '_500_500.jpg'
      this.mainImgUrl = imgUrl
    },
    // 商品详情
    getGoodsDetail: function (spu, sku) {
      var that = this
      var skuId
      var spuId
      that.skuSpuIdList = []
      if (spu && sku) {
        spuId = spu
        skuId = sku
        console.log('5555', spu, sku)
      } else {
        skuId = this.$route.params.skuId
        spuId = this.$route.params.spuId
      }
      this.$axios.get(this.$store.state.localUrl+'api/product/'+ spuId + '/' + skuId, {}).then(res => {
        console.log(res)
        if (res.code === "200") {
          console.log('11111', res.data)
          if (res.data.sku.sku_status === 0) {
            that.$router.push('/unavailable')
          } else {
            that.goodDetail = res.data.sku
            that.imageList = res.data.sku.thumbnail_images
            that.mainImgUrl = res.data.sku.sku_image
            that.maxQuality = res.data.sku.inventory
            that.priceOrder = res.data.sku.sku_price
            that.totalPay = (that.priceOrder * that.numQuality).toFixed(2)
            that.attrList =  res.data.attrs
            that.attrId = res.data.sku_ids
            that.skuList = res.data.sku_list
            var list = JSON.parse(res.data.sku.sku_attrs)
            // that.colorList = res.data.data.attrs.color
            for(let key in that.imageList){
              console.log('66666666', that.imageList[key])
              var str = that.imageList[key].split('.')
              var str2 = ''
              for (var k = 0; k<str.length-1; k++) {

              }
              console.log('77777777', str)
            }
            for (var i = 0; i < list.length; i++){
              var obj = {
                name: list[i].attr_name,
                attr_id: parseInt(list[i].id),
                val_id: parseInt(list[i].value.id)
              }
              that.skuSpuIdList.push(obj)
            }
            that.getNumbers(that.skuSpuIdList, that.skuSpuIdList.length-1, false)
            that.deleteSameObj(that.skuList, that.getSkuList)
            for(let key in that.attrList){
              for (var x=0; x<that.attrList[key].length; x++) {
                for (var y=0; y< list.length; y++) {
                  if (that.attrList[key][x].id === list[y].id && parseInt(that.attrList[key][x].val_id) === parseInt(list[y].value.id)){
                    that.attrList[key][x].activeStyle = 1
                  }
                }
              }
            }
          }
        } else {
          console.log(222222)
        }
      })
    },
    deleteSameObj: function (skuList, getSkuList) {
      var that = this
      let objLista = []
      let objListb = []
      var resulta = []
      var resultb = []
      var flag = false
      for (var a=0; a<skuList.length; a++){
        for (var b=0; b<skuList[a].length; b++) {
          let obj = skuList[a][b].attr_id + '-' + skuList[a][b].val_id
          objLista.push(obj)
        }
      }
      for(var i=0;i<objLista.length;i+=3){
        resulta.push(objLista.slice(i,i+3));
      }
      for(let key in getSkuList){
        // that.arrChange(that.skuList[a], that.getSkuList[key])
        // var flag = that.isContained(that.skuList[a], that.getSkuList[key])
        for (var k=0; k<getSkuList[key].length; k++){
          let obj = getSkuList[key][k].attr_id + '-' + getSkuList[key][k].val_id
          objListb.push(obj)
        }
      }
      for(var i=0;i<objListb.length;i+=2){
        resultb.push(objListb.slice(i,i+2));
      }
      for (var aa=0; aa<resulta.length; aa++) {
        for (var bb=0; bb<resultb.length; bb++) {
          flag = that.isContained(resulta[aa], resultb[bb])
          if (flag) {
            var aList = []
            var bList = []
            for (let k in resulta[aa]) {
              let Aobj = {
                attr_id: resulta[aa][k].split('-')[0],
                val_id: resulta[aa][k].split('-')[1],
                name: resulta[aa][k]
              }
              aList.push(Aobj)
            }
            for (let kb in resultb[bb]) {
              let Bobj = {
                attr_id: resultb[bb][kb].split('-')[0],
                val_id: resultb[bb][kb].split('-')[1],
                name: resultb[bb][kb]
              }
              bList.push(Bobj)
            }
            that.arrChange(aList, bList)
          }
        }
      }
    },
    getNumbers: function (source, count, isPermutation = true) {
      var that = this
      //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
      let currentList = source.map((item) => [item]);
      if (count === 1) {
        return currentList;
      }
      //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
      for (let i = 0; i < currentList.length; i++) {
        let current = currentList[i];
        //如果是排列的方式，在取count-1时，源数组中排除当前项
        let children = [];
        if (isPermutation) {
          children = this.getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
        }
        //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
        else {
          children = this.getNumbers(source.slice(i + 1), count - 1, isPermutation);
        }
        for (let child of children) {
          that.getSkuList.push([...current, ...child]);
        }
      }
    },
    isContained: function (a, b){
      if(!(a instanceof Array) || !(b instanceof Array)) return false;
      if(a.length < b.length) return false;
      var aStr = a.toString();
      for(var i = 0, len = b.length; i < len; i++){
        if(aStr.indexOf(b[i]) === -1) return false;
      }
      return true;
    },
    arrChange: function (a, b){
      var that = this
      a = a.filter(item => {
        let idList= b.map(v => v.name)
        return !idList.includes(item.name)
      })
      for(let key in that.skuList) {
        for (var n = 0; n < that.skuList[key].length; n++) {
          for (var m = 0; m < a.length; m++) {
            if (parseInt(that.skuList[key][n].attr_id) === parseInt(a[m].attr_id) && parseInt(that.skuList[key][n].val_id) === parseInt(a[m].val_id)) {
              a[m].disStyle = 2
            }
          }
        }
      }
      for(let key in that.attrList){
        for (var x=0; x<that.attrList[key].length; x++) {
          for (var y=0; y< a.length; y++) {
            if (parseInt(that.attrList[key][x].id) === parseInt(a[y].attr_id) && parseInt(that.attrList[key][x].val_id) === parseInt(a[y].val_id)){
              that.attrList[key][x].disStyle = 2
            }
          }
        }
      }
      console.log('samegggggggg', that.attrList)
    },
    getSize: function (e, name, spid, skid) {
      var that = this
      var sumList = []
      var obj = e.currentTarget
      var flag = false
      var k = 0
      var FileIdStr = ''
      var info = {
        name: name,
        attr_id: spid,
        val_id: skid
      }
      that.goodsIds = that.skuSpuIdList
      that.getNumbers(that.goodsIds, that.goodsIds.length-1, false)
      that.deleteSameObj(that.skuList, that.getSkuList)
      if (that.goodsIds.length > 0) {
        for(var i=0;i< that.goodsIds.length; i++) {
          if(that.goodsIds[i].name === info.name){
            flag = true
            k = i
            break
          }
        }
        if (flag) {
          that.goodsIds.splice(k, 1, info)
        } else {
          that.goodsIds.push(info)
        }
      } else {
        that.goodsIds.push(info)
      }
      flag = false
      that.sumIds = that.goodsIds
      console.log('hhhhhhhh', that.goodsIds)
      for (var n=0; n<that.sumIds.length; n++){
        let sum = that.sumIds[n].attr_id + '-' + that.sumIds[n].val_id
        sumList.push(sum)
      }
      for (var t=0; t<sumList.length; t++){
        var splitIcon = ';'
        if (t === sumList.length - 1) {
          splitIcon = ''
        }
        FileIdStr = FileIdStr + sumList[t] + splitIcon
      }
      for(let key in that.attrId){
        if (that.attrId[key] === FileIdStr) {
          if(key){
            $('.subType').removeClass('ban')
            that.getNewSkuId = key
          }
        } else {
          $('.subType').addClass('ban')
        }
      }
      $(obj).addClass('active')
      $(obj).siblings().removeClass('active')
    },
    addToCart: function () {
      var that = this
      var skuId = that.$route.params.skuId
      this.$axios.post(this.$store.state.localUrl+'api/addcart/'+ skuId + '/' +that.numQuality, {}).then(res => {
        console.log('sssssss', res.data)
        that.$store.state.addCartState = true
        if (res.data === 2050) {
          that.showModel = true
        }
      })
    },
    handleChange: function (val) {
      console.log('num', val)
      var that = this
      var skuId = that.$route.params.skuId
      if (val) {
        that.totalPay = (val * that.priceOrder).toFixed(2)
      }
      this.$axios.get(this.$store.state.localUrl+'api/sku/getInStock/'+ skuId, {}).then(res => {
        console.log('sssssss', res.data)
        if (res.code === '200') {
          that.maxQuality = res.data.inventory
        }
      })
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
          $(objBtn).css('color', '#ccc')
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
          $(prevBtn).css('color', '#ccc')
          // $(nextBtn).css('pointer-events', 'auto')
        } else {
          // $(prevBtn).css('color', '#999')
          // $(prevBtn).css('pointer-events', 'none')
          // this.$store.state.contPrev = 0
        }
      }
    }
  }
}
</script>

<style scoped>
  .bgModel{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .modelClose{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    top: 5px;
    color: #666;
    cursor: pointer;
  }
  .modelClose:hover{
    color: #333;
  }
  .modelCont{
    width: 345px;
    height: 130px;
    padding: 20px 10px;
    text-align: center;
    font-family: Tahoma;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 6px #666;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .modelText{
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }
  .modelTitle{
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
  }
  .toCart{
    color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #c51015;
    margin: 0 auto;
    cursor: pointer;
    margin-top: 18px;
  }
  .toCart:hover{
    cursor: pointer;
    background-color: #B20605;
  }
  .smallSlider2{
    /*height: 38px;*/
    width: 506px;
    position: relative;
  }
  .sliderBox{
    /*height: 38px;*/
    width: 445px;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    left:0;
    top: 0;
  }
  .sliderBox.isImg{
    height: 82px;
  }
  .sliderBox.isImg .sizeSize{
    height: 82px;
  }
  .sliderBox.isText{
    height: 38px;
  }
  .sliderCont{
    position: absolute;
    left: 0;
    top: 0;
    width: 445px;
    margin: 0 auto;
  }
  .sliderCont div{
    width: 82px;
    /*height: 32px;*/
    margin-right: 8px;
    display: inline-block;
  }
  .prev{
    color: #ccc;
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
.sizeSize.active div,.sizeSize.active img{
  border: 1px solid #B20605;
  transition: all .3s;
}
.sizeSize .disStyle{
  color: #333;
  border: 1px solid #999;
  background-color: #fff;
}
.sizeSize.active .disStyle{
  color: #333;
  border: 1px solid #C51015;
  background-color: #fff;
}
.sizeSize.active div{
  color: #999;
  border: 1px solid #C51015;
  background-color: #f5f5f5;
}
.checkedStyle .small{
  border: 1px solid #C51015;
}
.small{
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
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
  font-size: 14px;
  cursor: pointer;
  line-height: 32px;
  text-align: center;
  font-family: Tahoma;
  /*position: relative;*/
}
/*.sizeSize .model{*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*background: rgba(0,0,0,0.1);*/
/*}*/
.sizeSize div{
  color: #888;
  height: 32px;
  width: 80px;
  border: 1px dashed #ccc;
}
  .sizeSize img{
    height: 80px;
    width: 80px;
    border: 1px dashed #ccc;
  }
.sizeSize .textStyle{
  color: #333;
}
.sizeSize div{
  color: #999;
  border: 1px dashed #ccc;
  background-color: #f5f5f5;
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
  width: 82px;
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
.goodsImg .swiper-slide {
  width: 82px !important;
  height: 90px !important;
}
  .largePic{
    width: 550px;
    height: 550px;
  }
  .largePic img{
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
    width: 130px;
    height: 40px;
    font-size: 16px;
    color: #333;
    line-height: 40px;
    font-family: Tahoma;
  }
.goodsLabelSize.isTextLabel,.goodsLabelSize{
  width: 100px;
  height: 32px;
  font-size: 16px;
  color: #333;
  line-height: 32px;
}
  .goodsLabelSize.isImgLabel{
    width: 100px;
    height: 80px;
    font-size: 16px;
    color: #333;
    line-height: 80px;
    font-family: Tahoma;
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
  .subType.out{
    width: 300px;
    height: 45px;
    color: #888;
    background-color: #fff;
    line-height: 45px;
    text-align: center;
    border: 1px solid #e1e1e1;
    cursor: not-allowed;
  }
  .subType.ban{
    pointer-events: none;
    background-color: #d48386;
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
  .kuCun{
    line-height: 40px;
    font-size: 14px;
    color: #666;
    margin-left: 10px;
  }
  .restocking{
    font-size: 14px;
    font-family: Tahoma;
    color: #888;
    margin-top: 4px;
  }
</style>
