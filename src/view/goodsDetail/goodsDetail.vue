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
  <div class="goodsDetail">
    <div class="goodsImg">
      <div class="detailSwiper">
        <div class="swiper-father">
          <div class="banner2 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :class="index === 0?'checkedStyle': ''" v-for="(detailImg, index) in imageListNew" v-bind:key="index" @click="chooseImg($event, detailImg)">
                <img :src="detailImg" class="small">
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
      <div class="soldOut" v-if="soldOut">Sold Out</div>
      <div v-if="!soldOut">
        <div style="min-height:380px">
          <div class="mainImage" v-if="attrList.length === 0">
            <div class="goodsLabelSize isImgLabel"></div>
            <div class="smallSlider2">
              <div class="sliderBox">
                <div class="sliderCont">
                  <div class="sizeSize" :class="img.activeType === 1?'activeType': ''" v-for="(img, index) in mainImageList" v-bind:key="index" @click="getSkuByImage($event, img.sku)">
                    <img :src="img.url" alt="">
                  </div>
                </div>
              </div>
              <div v-if="mainImageList.length > 5" class="el-icon-arrow-left prev" @click="prevPic($event)"></div>
              <div v-if="mainImageList.length > 5" class="el-icon-arrow-right next" @click="nextPic($event)"></div>
            </div>
          </div>
          <div style="display: flex;justify-content: start;margin-top: 20px;" v-if="attr && attr.length>0" v-for="(attr, index5) in attrList" v-bind:key="index5">
            <div class="goodsLabelSize" :class="index5 === 'color'? 'isImgLabel': 'isTextLabel'">{{index5}}:</div>
            <div class="smallSlider2">
              <div class="sliderBox" :class="index5 === 'color'? 'isImg': 'isText'">
                <div class="sliderCont">
                  <div class="sizeSize" :class="item.activeStyle === 1?'active': ''" v-for="(item, index6) in attr" v-bind:key="index6" @click="getSize($event, item.attr_name, item.id, item.val_id)">
                    <div :class="item.disStyle === 2?'disStyle':''" v-if="!item.image_url">{{item.attr_value}}</div>
                    <img :class="item.disStyle === 2?'disStyle':''" v-if="item.image_url" :src="item.image_url">
                    <!--<div v-if="item.image_url" class="model"></div>-->
                  </div>
                </div>
              </div>
              <div :class="index5 === 'color'? 'isImg': 'isText'" v-if="attr.length > 5" class="el-icon-arrow-left prev" @click="prevPic($event)"></div>
              <div :class="index5 === 'color'? 'isImg': 'isText'" v-if="attr.length > 5" class="el-icon-arrow-right next" @click="nextPic($event)"></div>
            </div>
          </div>
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
        </div>
        <div>
          <div class="subBtn shop_cart">
            <div class="add">
                <div v-if="goodDetail.sku_status === 1" class="subType" :class="[isActive ? 'subType' : 'subType disabled']" @click="addToCart($event)">Add to Cart</div>
                <div style="position: relative;width: 45px;height: 45px;">
                  <div v-if="goodDetail.sku_status === 1" class="z_addbtn"></div>
                  <img v-if="goodDetail.sku_status === 1" class="add_img run_top_right" v-show="addShow" :src="mainImgUrl" alt="">
                </div>
            </div>
            <div v-if="goodDetail.sku_status === 2" class="subType out">Out of Stock</div>
            <div class="addWish" @click="tastModel()"><span><img src="@/assets/wish.png" alt></span><span>Add to WishList</span></div>
          </div>
          <div v-if="goodDetail.sku_status === 2" class="restocking">It is restocking now. Once available, you can buy it.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="mainFeature">
    <div class="mainFeatureTitle">Main Feature</div>
    <p v-if="goodDetail.main_feature">- {{goodDetail.main_feature}}</p>
  </div>
  <div class="product">
    <div class="productTitle">Product Details</div>
    <p v-html="pruductDetail.product_detail">{{pruductDetail.product_detail}}</p>
  </div>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper'
import {addToShopCard, getSkuNum, getInStock,getGoodsQuantityInCart} from "../../api/register";
import qs from 'qs'
export default {
  data(){
    return{
      soldOut: false,
      addShow:false,//加入购物车动画显示
      addButton: false,
      showModel: false,
      skuDefult: '',
      numQuality: 1,
      goodDetail: '',
      pruductDetail: '',
      mainImgUrl: '',
      priceOrder: 0,
      totalPay: 0,
      sumIds: [],
      goodsIds: [],
      attrList: [],
      attrListDis: [],
      attrNameList: [],
      mainImageList: [],
      // otherList: [],
      // colorList: [],
      getNewSkuId: 0,
      getSkuList: [],
      imageList: [],
      imageListNew: [],
      skuSpuIdList: [],
      skuList: [],
      maxQuality:1,
      isActive:true,
      skuId:'',
      spuId:''
    }
  },
  watch:{
    $route(){
      this.spuId = this.$route.params.spuId
      this.skuId = this.$route.params.skuId
    },
    spuId(){
      this.getGoodsDetail()
    },
    skuId(){
      this.getGoodsDetail()
    },
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
    this._getInStock()
    this._getGoodsQuantityInCart()
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
      var leftUrl = url.split('_80_80')[0]
      var rightUrl = url.split('_80_80')[1]
      var imgUrl = leftUrl + '_550_550' + rightUrl
      this.mainImgUrl = imgUrl
    },
    // 商品详情
    getGoodsDetail: function (spu, sku) {
      var that = this
      var skuId
      var spuId
      that.skuSpuIdList = []
      that.attrNameList = []
      if (spu && sku) {
        spuId = spu
        skuId = sku
      } else {
        skuId = that.$route.params.skuId
        spuId = that.$route.params.spuId
      }
      that.$axios.get('api/product/'+ spuId + '/' + skuId, {}).then(res => {
        console.log(res)
        if (res.code === "200") {
          console.log('11111', res.data)
          if (res.data.sku.sku_status === 0) {
            that.soldOut = true
          } else {
            that.soldOut = false
          }
          that.goodDetail = res.data.sku
          that.pruductDetail = res.data.detail
          that.imageList = res.data.sku.thumbnail_images
          that.mainImgUrl = res.data.sku.sku_image
          that.maxQuality = res.data.sku.inventory
          that.priceOrder = res.data.sku.sku_price
          that.totalPay = (that.priceOrder * that.numQuality).toFixed(2)
          that.attrList =  res.data.attrs
          that.mainImageList = res.data.main_img
          that.attrId = res.data.sku_ids
          that.skuList = res.data.sku_list
          var list = JSON.parse(res.data.sku.sku_attrs)
          // that.colorList = res.data.data.attrs.color
          var imgList = []
          if (that.mainImageList.length >0) {
            for (var t=0;t<that.mainImageList.length;t++) {
              if (that.mainImageList[t].sku === parseInt(skuId)) {
                that.mainImageList[t].activeType = 1
              }
            }
          }
          console.log('666666', that.mainImageList)
          for(let key in that.imageList){
            var str = that.imageList[key].split('.')
            var strArr = []
            for (var k = 0; k<str.length-1; k++) {
              strArr.push(str[k])
            }
            var strArrJoin = strArr.join('.')
            var imgStr = strArrJoin + '_80_80.' + str[str.length-1]
            console.log('777777777', imgStr)
            imgList.push(imgStr)
          }
          that.imageListNew = imgList
          for (var i = 0; i < list.length; i++){
            var obj = {
              name: list[i].attr_name,
              attr_id: parseInt(list[i].id),
              val_id: parseInt(list[i].value.id)
            }
            that.skuSpuIdList.push(obj)
          }
          console.log('88888888', that.attrList.length)
          for(let key in that.attrList){
            that.attrNameList.push(key)
            for (var x=0; x<that.attrList[key].length; x++) {
              for (var y=0; y< list.length; y++) {
                if (that.attrList[key][x].id === list[y].id && parseInt(that.attrList[key][x].val_id) === parseInt(list[y].value.id)){
                  that.attrList[key][x].activeStyle = 1
                }
              }
            }
          }
          console.log('999999999', that.attrNameList)
          if (that.attrNameList.length > 1) {
            that.getNumbers(that.skuSpuIdList, that.skuSpuIdList.length-1, false)
            that.deleteSameObj(that.skuList, that.getSkuList)
          } else {
            for(let key in that.attrList){
              for (var x=0; x<that.attrList[key].length; x++) {
                that.attrList[key][x].disStyle = 2
              }
            }
          }
        } else {
          console.log(222222)
        }
      })
    },
    getSkuByImage: function (e, sku) {
      var obj = e.currentTarget
      $(obj).addClass('activeType').siblings().removeClass('activeType')
      if (sku) {
        $('.subType').removeClass('ban')
        this.getNewSkuId = sku
      }
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
      for(var i=0;i<objLista.length;i+=that.attrNameList.length){
        resulta.push(objLista.slice(i,i+that.attrNameList.length));
      }
      console.log('aaaaaaa', resulta)
      for(let key in getSkuList){
        // that.arrChange(that.skuList[a], that.getSkuList[key])
        // var flag = that.isContained(that.skuList[a], that.getSkuList[key])
        for (var k=0; k<getSkuList[key].length; k++){
          let obj = getSkuList[key][k].attr_id + '-' + getSkuList[key][k].val_id
          objListb.push(obj)
        }
      }
      for(var i=0;i<objListb.length;i+=that.attrNameList.length-1){
        resultb.push(objListb.slice(i,i+that.attrNameList.length-1));
      }
      // console.log('bbbbbbbb', resultb)
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
            // console.log('ccccccccc', bList)
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
        // isPermutation = true
        console.log('cccc', current)
        if (isPermutation) {
          children = this.getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
        }
        //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
        else {
          console.log('22222222222', source)
          children = this.getNumbers(source.slice(i + 1), count - 1, isPermutation);
          console.log('33333333', children)
        }
        if (children && children.length>0) {
          for (let child of children) {
            that.getSkuList.push([...current, ...child]);
          }
          console.log('4444444', that.getSkuList)
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
      $(obj).addClass('active')
      $(obj).siblings().removeClass('active')
      that.goodsIds = that.skuSpuIdList
      if (that.attrNameList.length > 1) {
        that.getNumbers(that.goodsIds, that.goodsIds.length-1, false)
        that.deleteSameObj(that.skuList, that.getSkuList)
      } else {
        for(let key in that.attrList){
          for (var x=0; x<that.attrList[key].length; x++) {
            that.attrList[key][x].disStyle = 2
          }
        }
      }
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
    },
    //加入购物车
    addToCart: function ($event) {
      this.addShow = true
      setTimeout(() => {
        this.addShow = false
      }, 1000)
      var skuId = this.$route.params.skuId
      var obj = qs.stringify({
        product_id: skuId,
        count: this.numQuality
      })
      this.$axios.post('api/addcart', obj).then(res => {
        console.log('sssssss', res.data)
        this.$store.state.addCartState = true
        if (res.data === 2050) {
          this.showModel = true
          this.numQuality =1
        }
      })
      this._getInStock()
      this._getGoodsQuantityInCart()
    },
    //添加购物车数量显示
    handleChange(val){
      var skuId = this.$route.params.skuId
      if (val) {
        this.totalPay = (val * this.priceOrder).toFixed(2)
      }
      this._getInStock()
      //已加购商品数量
      this._getGoodsQuantityInCart()
      // let pre ={
      //     sku_id:this.$route.params.skuId
      // }
      // getGoodsQuantityInCart(pre).then((res)=>{
      //   if(res == '101'){
          
      //   }else{
      //     var goods_count = res.goods_count
      //     var purchase = this.maxQuality - goods_count
      //     if(purchase <=this.numQuality){
      //       this.$message('购物车已加购数已超过该商品库存数');
      //       this.numQuality = purchase
      //       // this.isActive = false
      //     }
      //   }
      // })
    },
    _getInStock(){
      var skuId = this.$route.params.skuId
        //查库存
      this.$axios.get('api/sku/getInStock/'+ skuId, {}).then(res => {
        if (res.code === '200') {
          this.maxQuality = res.data.inventory
        }
      })
    },
    _getGoodsQuantityInCart(){
      console.log(this.maxQuality)
        //已加购商品数量
        let pre ={
            sku_id:this.$route.params.skuId
        }
        getGoodsQuantityInCart(pre).then((res)=>{
          if(res == '101'){
            
          }else{
            var goods_count = res.goods_count
            var purchase = this.maxQuality - goods_count
            console.log(purchase)
            if(purchase < this.numQuality || purchase<=0){
              this.$message('购物车已加购数已超过该商品库存数');
              //this.numQuality = purchase
              this.isActive = false
            }else{
              this.isActive = true
            }
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
          $(obj).css('left', -89.5 * num)
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
        if (parseInt(obj.style.left) !== 0) {
          var distent = parseInt(obj.style.left) + 89.5 * num
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
<style scoped lang="scss">
  @import "@/assets/css/goodsDatail.scss"
</style>
