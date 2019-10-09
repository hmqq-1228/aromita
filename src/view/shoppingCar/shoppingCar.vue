<template>
<div class="shoppingCar">
  <div class="carCont">
    <div class="cartHeader">
      <div class="checkState">
        <input type="checkbox" id="Size1" v-model="checkedAll" name="metal" @change="allChecked($event)"><label for="Size1"></label><span>Select All</span>
      </div>
      <div class="product">Product</div>
      <div class="quantity">Quantity</div>
      <div class="total">Total</div>
      <div class="option">Options</div>
    </div>
    <div class="carItem" v-if="goodsListOn.length>0" v-for="(carItem, index) in goodsListOn" v-bind:key="index">
      <div class="checkState item">
        <input type="checkbox" :id="'good'+ carItem.sku_id" :value="carItem.sku_id" v-model="checkedItem"><label :for="'good'+ carItem.sku_id"></label>
        <div class="imgBox" @click="toGoodDetail(carItem.product_id, carItem.sku_id)"><img :src="carItem.sku_image" alt=""></div>
      </div>
      <div class="productCont">
        <div class="textBox" @click="toGoodDetail(carItem.product_id, carItem.sku_id)">{{carItem.sku_name}}</div>
        <div class="goodsType" v-for="goodAttr in JSON.parse(carItem.sku_attrs)">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div>
        <div class="goodsPrice">$ {{carItem.sku_price}}</div>
      </div>
      <div class="goodsNum">
        <div class="addNum"><el-input-number v-model="carItem.goods_count" @change="handleChange($event, carItem.sku_id, carItem.inventory)" :min="1" :max="carItem.inventory"></el-input-number></div>
        <div class="tipOver" v-if="carItem.overTipShow"><span class="el-icon-caret-top sanjiao"></span>Only {{carItem.inventory}} Available</div>
      </div>
      <div class="goodsTotal">$ {{(carItem.goods_count*carItem.sku_price).toFixed(2)}}</div>
      <div class="optionType">
        <span @click="deleteItemCart(carItem.sku_id)"><i class="el-icon-circle-close"></i></span>
        <span class="wishAdd" v-if="carItem.in_wishlist === 10"><img @click="addWish(carItem.sku_id)" src="../../../static/img/loveOut.png" alt=""></span>
        <span class="wishAdd" v-if="carItem.in_wishlist === 20"><img src="../../../static/img/love.png" alt=""></span>
      </div>
    </div>
    <div class="noGoods" v-if="noProduct">
      <div class="noGoodsCont">
        <div class="imgType"><img src="../../assets/Cart-Empty.png" alt=""></div>
        <div class="noGoodsText">The Shopping Cart is Empty!</div>
        <div class="shopBtn" @click="goShopping()">Go Shopping ></div>
      </div>
    </div>
  </div>
  <div class="overTime">
    <div class="overHd">
      <div class="checkState over">
        <input type="checkbox" v-model="checkedAll" name="metal" @change="allChecked($event)"><label for="Size1"></label><span>Select All</span>
      </div>
      <div class="remove" @click="batchDelete()">Remove Select</div>
      <div class="WishList" v-if="false">Move Selected to WishList</div>
    </div>
    <div class="carItem" style="background-color: #fbfbfb;border-top: 1px solid #eee;" v-if="goodsListOff.length > 0" v-for="(unGood, index2) in goodsListOff" v-bind:key="index2">
      <div class="checkState item" style="width: 120px; box-sizing: border-box;">
        <!--<input type="checkbox" :id="'good'+ carItem.id" :value="'good'+ carItem.id" v-model="checkedItem"><label :for="'good'+ carItem.id"></label>-->
        <div class="imgBox" @click="unavailableGoods(unGood.product_id, unGood.sku_id)" style="margin-left: 20px;"><img :src="unGood.sku_image" alt=""></div>
      </div>
      <div class="productCont" style="width: 530px;">
        <div class="textBox" @click="unavailableGoods(unGood.product_id, unGood.sku_id)">{{unGood.sku_name}}</div>
        <div class="goodsType" v-for="goodAttr in JSON.parse(unGood.sku_attrs)">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div>
        <div class="goodsPrice">$ {{unGood.sku_price}}</div>
      </div>
      <div class="goodsNum_goodsTotal">
       Unavailable
      </div>
      <div class="optionType"><span @click="deleteItemCart(unGood.sku_id)"><i class="el-icon-circle-close"></i></span></div>
    </div>
  </div>
  <div class="overTime" style="margin-bottom: 30px;margin-top: 30px;">
    <!--<div class="overHd Points">-->
      <!--Choose Coupon & Points-->
    <!--</div>-->
    <div class="pointCoupon">
      <div class="leftCont">
        <!--<div class="coupon">-->
          <!--<div class="couponItem" @click="useCoupon($event, 1)">-->
            <!--<div class="couponInfo">-->
              <!--<div class="info">-->
                <!--<div>优惠:</div>-->
                <!--<div>满100减20</div>-->
              <!--</div>-->
              <!--<div class="info" style="margin-top: 4px">-->
                <!--<div>Expired Data:</div>-->
                <!--<div>July 23,2019</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="couponItem" @click="useCoupon($event, 2)">-->
            <!--<div class="couponInfo">-->
              <!--<div class="info">-->
                <!--<div>优惠:</div>-->
                <!--<div>满100减20</div>-->
              <!--</div>-->
              <!--<div class="info" style="margin-top: 4px">-->
                <!--<div>Expired Data:</div>-->
                <!--<div>July 23,2019</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="couponItem" @click="useCoupon($event, 3)">-->
            <!--<div class="couponInfo">-->
              <!--<div class="info">-->
                <!--<div>优惠:</div>-->
                <!--<div>满100减20</div>-->
              <!--</div>-->
              <!--<div class="info" style="margin-top: 4px">-->
                <!--<div>Expired Data:</div>-->
                <!--<div>July 23,2019</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="couponItem" @click="useCoupon($event, 4)">-->
            <!--<div class="couponInfo">-->
              <!--<div class="info">-->
                <!--<div>优惠:</div>-->
                <!--<div>满100减20</div>-->
              <!--</div>-->
              <!--<div class="info" style="margin-top: 4px">-->
                <!--<div>Expired Data:</div>-->
                <!--<div>July 23,2019</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="more" @click="getMoreCoupon(pointMore)"><span :class="pointMore"></span></div>-->
        <!--</div>-->
        <!--<div class="point">-->
          <!--<div>Available Points: {{maxPoints}}</div>-->
          <!--<div style="width: 180px;display: flex;justify-content: space-between;"><div>使用积分: </div><input type="number" class="inputVal" min="0" :max="maxPoints"></div>-->
        <!--</div>-->
      </div>
      <div class="orderInfo">
        <div class="payOrder">
          <div style="width: 220px;"></div>
          <div>
            <!--<div class="payItem"><div class="payTitle">Coupon:</div><div class="payNum">$ 3.33</div></div>-->
            <!--<div class="payItem"><div class="payTitle">Points:</div><div class="payNum">$ 53.33</div></div>-->
            <!--<div class="payItem"><div class="payTitle">Subtotal:</div><div class="payNum">$ {{totalPayShow.toFixed(2)}}</div></div>-->
            <div class="payItem"><div class="payTitle">Subtotal:</div><div class="payNum big">$ {{totalPayShow.toFixed(2)}}</div></div>
            <div class="payItem"><div></div><div class="tip">Privacy Policy</div></div>
          </div>
        </div>
        <div>
          <div class="payBtn" :title="btnCanSub===true?'Please choose at least one item':''">
            <div class="payPal"></div>
            <el-button class="payTwo" :class="btnCanSub===true?'ban': ''" :disabled="btnCanSub" :loading="btnLoading" @click="subTotalPay()">Proceed to checkout</el-button>
          </div>
          <div class="payInfoTip">Not Including Taxes & Shopping Fee</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 添加心愿单弹框 -->
  <el-dialog
    :visible.sync="wishVisible"
    width="300px">
    <span>You haven't logged in yet. Please login and add a wish list.</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="wishVisible = false">Cancel</el-button>
      <router-link to="/login"><el-button type="danger">Login</el-button></router-link>
    </span>
  </el-dialog>
  <!--<div class="foot">-->
    <!--<footer-com></footer-com>-->
  <!--</div>-->
</div>
</template>

<script>
import {getGoodsList,checkLogin} from "../../api/register";
import {addwishlist} from "@/api/wish.js"
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  data () {
    return{
      // wishUrl: '../../../static/img/loveOut.png',
      maxPoints: 300,
      pointMore: 'el-icon-d-arrow-right',
      isLogin: false,
      visible: true,
      checkedAll: false,
      tipOverShow: false,
      wishVisible: false,
      checkedItem: [],
      idList: [],
      payList: [],
      totalPay: 0,
      checkArr: [],
      totalPayShow: 0,
      goodsList: [],
      couponId: '',
      hasChecked: false,
      goodsListOn: [],
      goodsListOff: [],
      btnCanSub: true,
      maxQuality: 0,
      noProduct: false,
      // gLoading: false,
      btnLoading: false,
    }
  },
  watch:{
    delcart: function(del) {
        if(del == true){
          this.getGoodsListFuc()
        }
        this.$store.state.delcartList = false
    },
    checkedItem: function() {
      if (this.checkedItem.length === 0) {
        this.checkArr = []
        this.btnCanSub = true
        this.goodsChecked(this.checkedItem)
      } else {
        this.btnCanSub = false
        this.goodsChecked(this.checkedItem)
      }
      if (this.checkedItem.length === this.idList.length) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
    }
  },
  computed: {
    ...mapGetters([
        'delcart'
    ])
  },
  created(){
    this.checkLoginInfo()
    this.getGoodsListFuc()
  },
  methods:{
    async checkLoginInfo () {
      let data = await checkLogin()
      if(data.code === '200' || data.code === 200) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    // useCoupon: function (e, cpId) {
    //   var obj = e.currentTarget
    //   $(obj).addClass('couponChecked').siblings().removeClass('couponChecked')
    //   this.couponId = cpId
    // },
    // getMoreCoupon: function (type) {
    //   var that = this
    //   if (type === 'el-icon-d-arrow-right') {
    //     that.pointMore = 'el-icon-d-arrow-left'
    //   } else if (type === 'el-icon-d-arrow-left') {
    //     that.pointMore = 'el-icon-d-arrow-right'
    //   }
    // },
    async getGoodsListFuc(tr){
      var that = this
      that.payList = []
      that.totalPay = 0
      if (tr) {
        let data = await getGoodsList();
        this.goodsList = data
        that.idList = []
        let OnList = []
        let OffList = []
        that.goodsListOn = []
        that.goodsListOff = []
        for (var i = 0;i<that.goodsList.length;i++){
          if (that.goodsList[i].sku_status === 1) {
            OnList.push(that.goodsList[i])
            that.goodsListOn = OnList
            that.idList.push(that.goodsList[i].sku_id)
            for (var j = 0;j<that.goodsListOn.length;j++) {
              that.$set(that.goodsListOn[j],'overTipShow',false)
              var itemPay = that.goodsListOn[j].sku_price * that.goodsListOn[j].goods_count
              that.goodsListOn[j].totalPay = itemPay.toFixed(2)
              that.goodsChecked(that.checkedItem)
              if (tr.num >= tr.max) {
                if (that.goodsListOn[j].sku_id === tr.sid) {
                  that.goodsListOn[j].overTipShow = true
                }
              }
            }
          } else if (that.goodsList[i].sku_status === 0 || that.goodsList[i].sku_status === 2){
            OffList.push(that.goodsList[i])
            that.goodsListOff = OffList
          }
        }
        that.$store.state.addCartState = false
      } else {
        let data = await getGoodsList();
        this.goodsList = data
        // console.log('55555', data)
        var onList = []
        var offList = []
        that.goodsListOn = []
        that.goodsListOff = []
        if (this.goodsList.length === 0) {
          that.noProduct = true
          that.goodsListOn = []
        } else {
          that.noProduct = false
          that.idList = []
          for (var i = 0;i<that.goodsList.length;i++){
            if (that.goodsList[i].sku_status === 1) {
              onList.push(that.goodsList[i])
              that.goodsListOn = onList
              that.idList.push(that.goodsList[i].sku_id)
              that.checkedItem = that.idList
              for (var j = 0;j<that.goodsListOn.length;j++) {
                that.$set(that.goodsListOn[j],'overTipShow',false)
                if (that.goodsListOn[j].goods_count === that.goodsListOn[j].inventory) {
                  that.goodsListOn[j].overTipShow = true
                } else if (that.goodsListOn[j].goods_count > that.goodsListOn[j].inventory) {
                  that.goodsListOn[j].inventory = parseInt(that.goodsListOn[j].goods_count)
                }
                var itemPay = parseFloat(that.goodsListOn[j].sku_price) * that.goodsListOn[j].goods_count
                that.goodsListOn[j].totalPay = itemPay.toFixed(2)
              }
            } else if (that.goodsList[i].sku_status === 0 || that.goodsList[i].sku_status === 2){
              offList.push(that.goodsList[i])
              that.goodsListOff = offList
            }
          }
          if (that.goodsListOn.length === 0) {
            that.checkedAll = false
          }
        }
        that.$store.state.addCartState = false
      }
    },
    sumPay: function (arr) {
      var that = this
      that.checkArr = arr
      let totalPay = 0
      for (var i = 0; i < that.checkArr.length; i++) {
        totalPay += that.checkArr[i]
      }
      that.totalPayShow = totalPay
      // that.btnLoading = false
    },
    goodsChecked: function(e){
      var that = this
      // console.log('eeeee',e)
      that.payList = []
      if (e.length > 0) {
        for (var m=0;m<e.length; m++){
          for (var n=0;n<that.goodsListOn.length; n++){
            if (that.goodsListOn[n].sku_id === e[m]){
              that.getPayList(that.goodsListOn[n].totalPay)
            }
          }
        }
      }else if (e.length === 0) {
        that.sumPay(e)
      }
    },
    getPayList: function (e) {
      var that = this
      // var flag = false
      // var k = 0
      // if (that.payList.length > 0) {
      //   for(var i=0;i< that.payList.length; i++) {
      //     if(that.payList[i] === parseFloat(e)){
      //       flag = true
      //       k = i
      //       break
      //     }
      //   }
      //   if (flag) {
      //     that.payList.splice(k, 1, parseFloat(e))
      //   } else {
      //     that.payList.push(parseFloat(e))
      //   }
      // } else {
      //   that.payList.push(parseFloat(e))
      // }
      that.payList.push(parseFloat(e))
      that.sumPay(that.payList)
    },
    // 单个删除
    deleteItemCart: function (skuId) {
      var that = this
      // that.btnLoading = true
      that.$axios.post('api/deltocart/' + skuId, {}).then(res => {
        that.getGoodsListFuc()
        that.$store.state.addCartState = true
        for (var i=0;i<that.checkedItem.length;i++){
          if (that.checkedItem[i] === skuId) {
            that.checkedItem.splice(i,1)
          }
        }
      })
    },
    // 批量删除
    batchDelete: function () {
      var that = this
      var skuList = JSON.stringify(this.checkedItem)
      // that.btnLoading = true
      that.$axios.post('api/batchdeltocart/' + skuList, {}).then(res => {
        that.getGoodsListFuc()
        that.$store.state.addCartState = true
        that.checkedItem = []
      })
    },
    addWish: function(id) {
      if (this.isLogin){
        let pre={
          wl_products_skus_id: id
        }
        addwishlist(pre).then((res)=>{
          if(res.code == 200){
           this.getGoodsListFuc()
          } else {
            this.$confirm('Your wishlist goes over the 100-item limit. Please go to wishlist.', '', {
              cancelButtonText: 'Go shopping',
              confirmButtonText: 'Go to wishlist',
            }).then(() => {
              this.$router.push('/myWishlist')
            }).catch(() => {
            })
          }
        })
      } else {
        this.wishVisible = true
      }
      // var imgName = e.target.currentSrc.split('img/')[1]
      // if (imgName === 'loveOut.png') {
      //   this.wishUrl = '../../../static/img/love.png'
      // } else if (imgName === 'love.png') {
      //   this.wishUrl = '../../../static/img/loveOut.png'
      // }
    },
    handleChange: function (e, skuId, max) {
      var that = this
      var obj = {
        num: e,
        sid: skuId,
        max: max
      }
      that.$axios.post('api/changecartcount/'+ skuId + '/' + e, {}).then(res => {
        that.getGoodsListFuc(obj)
        that.$store.state.addCartState = true
      })
    },
    allChecked: function() {
      var that = this
      this.checkedItem = []
      if (this.checkedAll) {
        this.checkedItem = this.idList
        for (var i = 0;i<that.goodsListOn.length;i++){
          that.payList.push(parseFloat(that.goodsListOn[i].totalPay))
          // console.log('kkkk', that.goodsListOn[i].totalPay)
        }
        that.sumPay(that.payList)
      } else {
        this.checkedItem = []
        that.payList = []
        // that.sumPay(that.payList)
        that.totalPayShow = 0.00
      }
    },
    subTotalPay: function() {
      var that = this
      sessionStorage.setItem('idList', JSON.stringify(that.checkedItem))
      // sessionStorage.setItem('couponId', that.couponId)
      that.$router.push('/orderConfirm')
    },
    toGoodDetail: function(spuid, skuid){
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    unavailableGoods: function(spuid, skuid){
      // console.log('hhhhhh', spuid, skuid)
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    goShopping: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.noGoods{
  height: 300px;
  width: 100%;
  text-align: center;
  font-family: Tahoma;
}
.noGoodsCont{
  width: 230px;
  height: 250px;
  margin: 0 auto;
  color: #333;
  margin-top: 50px;
}
.imgType{
  width: 160px;
  height: 140px;
  margin: 0 auto;
}
.imgType img{
  width: 160px;
  height: 140px;
}
.noGoodsText{
  height: 40px;
  line-height: 40px;
}
.shopBtn{
  width: 230px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-color: #c51015;
  margin-top: 16px;
}
.shopBtn:hover{
  background-color: #B20605;
}
.carCont{
  width: 1440px;
  margin: 0 auto;
}
.remove{
  color: #666;
  cursor: pointer;
}
.remove:hover{
  color: #C51015;
}
.imgBox{
  height: 80px;
  width: 80px;
  margin-top: 6px;
  cursor: pointer;
}
.imgBox img{
  height: 80px;
  width: 80px;
}
.imgBox:hover{
  box-shadow: 1px 1px 6px #ccc;
  transition: all .3s;
}
.cartHeader{
  width: 1440px;
  height: 45px;
  margin-top: 20px;
  background-color: #e7e7e7;
  display: flex;
  line-height: 45px;
  text-align: center;
  color: #333;
  font-family: Tahoma;
}
.checkState.over{
  width: 140px;
  box-sizing: border-box;
}
.overTime{
  width: 1440px;
  color: #333;
  margin: 0 auto;
  font-family: Tahoma;
}
.overHd{
  height: 45px;
  line-height: 45px;
  padding-bottom: 40px;
}
.overHd>div{
  display: inline-block;
}
.overHd.Points{
  padding-bottom: 0;
  margin-top: 20px;
}
.WishList{
  color: #0661ab;
  width: 320px;
  text-align: center;
  cursor: pointer;
}
.checkState{
  width:134px;
  text-align: left;
}
  .product{
    width: 500px;
  }
  .quantity{
    width: 340px;
  }
  .goodsNum{
    width: 340px;
    position: relative;
  }
  .goodsNum .addNum{
    height: 40px;
    width: 180px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    margin-top: 22px;
  }
  /*.addNumTip{*/
    /*margin-top: 20px !important;*/
  /*}*/
  .tipOver{
    color: #333;
    padding: 4px 10px;
    position: absolute;
    bottom: 14px;
    left: 50%;
    margin-left: -54px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #FFD8B1;
    border-radius: 4px;
    background-color: #FEF1E5;
    font-family: Tahoma;
  }
  .sanjiao{
    position: absolute;
    top: -9px;
    left: 46%;
    color: #FFD8B1;
  }
  .total{
    width: 240px;
  }
  .goodsTotal{
    width: 240px;
    line-height: 100px;
    text-align: center;
  }
  .goodsNum_goodsTotal{
    color: #666;
    width: 580px;
    text-align: center;
    line-height: 100px;
  }
  .option{
    width: 200px;
  }
  .optionType{
    width: 200px;
    text-align: center;
    line-height: 100px;
    color: #999;
  }
  .optionType > span{
    display: inline-block;
    cursor: pointer;
    height: 20px;
    width: 20px;
    line-height: 20px;
  }
  .optionType > span:hover{
    color: #666;
  }
  .optionType>span img{
    float: left;
    margin-top: 6px;
  }
  .wishAdd{
    margin-left: 10px;
  }
  .wishAdd img{
    width: 16px;
    height: 16px;
  }
.checkState {
  position: relative;
  line-height: 25px;
  padding: 8px;
}
.item{
  display: flex;
  justify-content: space-between;
}
.checkState.item label{
  position: absolute;
  left: 20px;
  top: 40px;
  z-index:1;
  width: 14px;
  height: 14px;
  border: 1px solid #999;
}
.checkState input {
  vertical-align: middle;
  /* 前面三行代码是为了让radio单选按钮与文字对齐 */
  width: 14px;
  height: 14px;
  appearance: none;/*清楚默认样式*/
  -webkit-appearance: none;
  opacity: 0;
  outline: none;
  margin-left: 8px;
  /* 注意不能设置为display:none*/
}

.checkState label {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index:1;
  /*注意层级关系，如果不把label层级设为最低，会遮挡住input而不能单选*/
  width: 14px;
  height: 14px;
  border: 1px solid #999;
}
.carItem .checkState label{
  border: 1px solid #ccc;
}
.checkState input:checked+label {
  background: #fff;
}

.checkState input:checked+label::after {
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
.checkState span{
  font-size: 14px;
  color: #333;
  font-family: Tahoma;
  padding-left: 10px;
}
  .carItem{
    height: 110px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .productCont{
    width: 500px;
    font-family: Tahoma;
    font-size: 14px;
    color: #333;
    padding: 10px;
    line-height: 20px;
    box-sizing: border-box;
  }
  .textBox{
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    word-wrap: break-word;
  }
.textBox:hover{
  color: #c51015;
}
  .goodsType{
    font-size: 12px;
    color: #999;
    display: inline-block;
    margin-left: 10px;
  }
  .productCont .goodsType:nth-of-type(2){
    margin-left: 0;
  }
  .goodsPrice{
    font-size: 14px;
    color: #333;
    margin-top: 4px;
  }
  .pointCoupon{
    display: flex;
    justify-content: space-between;
  }
  .coupon{
    width: 720px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
    border: 1px solid #eee;
    padding: 0 0 20px 20px;
  }
  .more{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 50%;
    color: #888;
    transform: rotate(-90deg);
  }
  .couponItem{
    width: 240px;
    height: 80px;
    margin-top: 20px;
  }
  .couponItem.couponChecked .couponInfo{
    border: 1px solid #C51015;
  }
  .couponInfo{
    width: 213px;
    height: 80px;
    font-size: 14px;
    border: 1px solid #eee;
    padding: 16px 10px;
    box-sizing: border-box;
  }
  .info{
    width: 203px;
    display: flex;
    justify-content: space-between;
  }
  .info>div{
    width: 50%;
  }
  .info>div:nth-of-type(1){
    color: #888;
  }
  .point{
    height: 40px;
    width: 400px;
    display: flex;
    line-height: 40px;
    justify-content: space-between;
  }
  .inputVal{
    width: 100px;
    height: 30px;
    margin-top: 5px;
    border: 1px solid #ccc;
    padding-left: 6px;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .orderInfo{
    width: 450px;
  }
  .payOrder{
    width: 450px;
    display: flex;
    justify-content: space-between;
  }
  .payItem{
    width: 230px;
    display: flex;
    height: 30px;
    line-height: 30px;
    justify-content: space-between;
  }
  .payTitle{
    font-size: 14px;
    color: #666;
    font-family: Tahoma;
  }
  .payNum{
    font-size: 14px;
    color: #c51015;
    font-family: Tahoma;
  }
  .payNum.big{
    font-size: 18px;
  }
  .tip{
    font-size: 14px;
    color: #999;
    font-family: Tahoma;
  }
  .payBtn{
    width: 450px;
    display: flex;
    justify-content: space-between;
  }
  .payPal{
    height: 43px;
    width: 210px;
  }
  .payTwo{
    color: #fff !important;
    background-color: #c51015 !important;
  }
.payTwo.ban{
  color: #fff !important;
  background-color: #b0b0b0 !important;
}
  /*.payTwo:hover{*/
    /*background-color: #a20e12 !important;*/
  /*}*/
  .payInfoTip{
    font-size: 14px;
    color: #999;
    text-align: right;
    margin-top: 10px;
    font-family: Tahoma;
  }
</style>
