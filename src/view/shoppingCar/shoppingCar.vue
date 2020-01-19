<template>
<div class="shoppingCar">
  <el-dialog
    title="Redemption Area"
    width="800px"
    :visible.sync="goodsVisible">
    <div class="loadingData" v-if="chooseList.length == 0"><img src="../../../static/img/loadingData.gif" alt=""></div>
    <div class="addBox" v-if="chooseList.length>0">
      <div class="addGoodsItem" v-for="(addItem,index) in chooseList" :key="index">
        <div class="imgBox2">
          <img :src="addItem.sku_image" alt="">
        </div>
        <div>
          <div class="addModelTitle">{{addItem.sku_name}}</div>
          <div class="add_md addModelAttr"><div class="goodsType" v-for="goodAttr in JSON.parse(addItem.sku_attrs)" :key="goodAttr.id+'-'+goodAttr.value.id">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div></div>
          <div class="goodsPrice">$ {{addItem.activity_price?addItem.activity_price:addItem.sku_price}} <span v-if="addItem.activity_price">${{addItem.sku_price}}</span></div>
          <div class="addModelBtn" v-if="addItem.have_in_cart == 2" @click="addMoreTocart(addItem.sku_id)">Add to Cart</div>
          <div class="addModelBtn Added" v-if="addItem.have_in_cart == 1">Added</div>
        </div>
      </div>
    </div>
  </el-dialog>
  <div class="carCont">
    <div class="detailLoad" v-if="loadingShow">
      <div>
        <img src="../../../static/img/loadingData.gif" alt="">
        <!-- <div style="margin-top: 20px">Loading...</div> -->
      </div>
    </div>
    <div class="cartHeader" v-if="!loadingShow">
      <!--<div class="checkState">-->
        <!--<input type="checkbox" id="Size1" v-model="checkedAll" name="metal" @change="allChecked($event)"><label for="Size1"></label><span>Select All</span>-->
      <!--</div>-->
      <div class="product">Product</div>
      <div class="quantity">Quantity</div>
      <div class="total">Total</div>
      <div class="option">Options</div>
    </div>
    <div class="bayCont" v-if="!loadingShow && totalLevel && totalPayShow>=totalLevel && goodsListOn.length>0">
      <div class="bayFlag">加购</div>
      <div class="bayTitle">Order over ${{totalLevel}}</div>
      <div class="addBayBtn" @click="addMoreGoods()"><span>立即加购&gt;</span></div>
    </div>
    <div class="carItem" v-if="goodsListOn.length>0 && !loadingShow" v-for="(carItem, index) in goodsListOn" v-bind:key="index">
      <div class="checkState item">
        <!--<div style="width: 20px;"></div>-->
        <!--<input type="checkbox" :id="'good'+ carItem.sku_id" :value="carItem.sku_id" v-model="checkedItem"><label :for="'good'+ carItem.sku_id"></label>-->
        <div class="imgBox" @click="toGoodDetail(carItem.product_id, carItem.sku_id)">
          <img :src="carItem.sku_image" alt="">
           <div class="tagBox" v-if="carItem.activity_type">
              <div class="cheap" v-if="carItem.activity_type == 1">
                <div class="cheapLeft"></div>
                <div class="cheapRight">${{carItem.activity_price}}</div>
              </div>
              <div class="disPrice" v-if="carItem.activity_type == 2">%{{parseInt(carItem.activity_intensity)}} OFF</div>
            </div>
        </div>
      </div>
      <div class="productCont">
        <div class="textBox" @click="toGoodDetail(carItem.product_id, carItem.sku_id)">{{carItem.sku_name}}</div>
        <div v-if="carItem.sku_attrs"><div class="goodsType" v-for="goodAttr in JSON.parse(carItem.sku_attrs)" :key="goodAttr.id+'-'+goodAttr.value.id">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div></div>
        <div class="goodsPrice">$ {{carItem.activity_price?carItem.activity_price:carItem.sku_price}} <span v-if="carItem.activity_type">${{carItem.sku_price}}</span></div>
      </div>
      <div class="goodsNum">
        <div class="addNum">
          <el-input-number v-model="carItem.goods_count" @change="handleChange($event, carItem.sku_id, carItem.inventory)" :min="1" :max="carItem.inventory"></el-input-number>
        </div>
        <div class="tipOver" v-if="carItem.overTipShow"><span class="el-icon-caret-top sanjiao"></span>Only {{carItem.inventory}} Available</div>
      </div>
      <div class="goodsTotal">$ {{(carItem.goods_count*parseFloat(carItem.activity_price?carItem.activity_price:carItem.sku_price)).toFixed(2)}}</div>
      <div class="optionType">
        <span @click="deleteItemCart(carItem.sku_id)"><i class="el-icon-circle-close"></i></span>
        <span class="wishAdd" title="add wishlist" v-if="carItem.in_wishlist === 10"><img @click="addWish(carItem.sku_id)" src="../../../static/img/loveOut.png" alt=""></span>
        <span class="wishAdd" style="cursor: auto" v-if="carItem.in_wishlist === 20"><img src="../../../static/img/love.png" alt=""></span>
      </div>
    </div>
    <div class="noGoods" v-if="noProduct && !loadingShow">
      <div class="noGoodsCont">
        <div class="imgType"><img src="../../assets/Cart-Empty.png" alt=""></div>
        <div class="noGoodsText">The Shopping Cart is Empty!</div>
        <div class="shopBtn" @click="goShopping()">Go Shopping ></div>
      </div>
    </div>
  </div>
  <div class="overTime" v-if="!loadingShow && anotherGoodsList.length>0">
    <div class="overHd" style="border-bottom: 1px dashed #eee;"></div>
    <div class="carItem" v-for="(item, index) in anotherGoodsList" :key="index">
      <div class="sendGoods">
        <div class="bayFlag">加购</div>
        <div class="sendTitle">Order over ${{item.activity_intensity}}</div>
      </div>
      <div class="checkState item" style="width: 106px; box-sizing: border-box;">
        <!--<input type="checkbox" :id="'good'+ carItem.id" :value="'good'+ carItem.id" v-model="checkedItem"><label :for="'good'+ carItem.id"></label>-->
        <div class="imgBox">
          <img :src="item.sku_image" alt="" @click="toGoodDetail(item.product_id, item.sku_id)">
        </div>
      </div>
      <div class="productCont" style="width: 500px;">
        <div class="textBox" @click="toGoodDetail(item.product_id, item.sku_id)">{{item.sku_name}}</div>
        <div><div class="goodsType" v-for="goodAttr in JSON.parse(item.sku_attrs)" :key="goodAttr.id+'-'+goodAttr.value.id">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div></div>
        <div class="goodsPrice">$ {{item.activity_price}} <span>${{item.sku_price}}</span></div>
      </div>
      <div class="goodsNum"><div class="addNum">{{item.goods_count}}</div></div>
      <div class="goodsTotal">$ {{item.totalPay.toFixed(2)}}</div>
      <div class="optionType">
        <span @click="deleteItemCartOther(item.sku_id)"><i class="el-icon-circle-close"></i></span>
        <span class="wishAdd" title="add wishlist" v-if="item.in_wishlist==10" @click="addWish(item.sku_id, 'other')"><img src="../../../static/img/loveOut.png" alt=""></span>
        <span class="wishAdd isWished" v-if="item.in_wishlist == 20"><img src="../../../static/img/love.png" alt=""></span>
      </div>
    </div>
  </div>
  <div class="overTime" v-if="!loadingShow && fullGiveList && fullGiveList.length>0">
    <div class="overHd" style="border-bottom: 1px dashed #eee;"></div>
    <div class="carItem" v-for="(item, index) in fullGiveList" :key="index">
      <div class="sendGoods">
        <div>
          <div class="sendName">Gift</div>
          <div class="sendTag"></div>
        </div>
        <!-- <div class="bayFlag">加购</div> -->
        <div class="sendTitle">Order over ${{item.act_type}}</div>
      </div>
      <div class="checkState item" style="width: 106px; box-sizing: border-box;">
        <!--<input type="checkbox" :id="'good'+ carItem.id" :value="'good'+ carItem.id" v-model="checkedItem"><label :for="'good'+ carItem.id"></label>-->
        <div class="imgBox" @click="toGoodDetail(item.product_id, item.sku_id)">
          <img :src="item.sku_image" alt="">
        </div>
      </div>
      <div class="productCont" style="width: 500px;">
        <div class="textBox" @click="toGoodDetail(item.product_id, item.sku_id)">{{item.sku_name}}</div>
        <div v-if="item.sku_attrs"><div class="goodsType" v-for="goodAttr in JSON.parse(item.sku_attrs)" :key="goodAttr.id+'-'+goodAttr.value.id">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div></div>
        <div class="goodsPrice">$ {{item.activity_price}} <span>${{item.sku_price}}</span></div>
      </div>
      <div class="goodsNum"><div class="addNum">1</div></div>
      <div class="goodsTotal">$ {{item.activity_price}}</div>
      <div class="optionType">
        <span></span>
        <!-- <span class="wishAdd" title="add wishlist"><img src="../../../static/img/loveOut.png" alt=""></span> -->
        <!-- <span class="wishAdd isWished" v-if="unGood.sku_status===2 && unGood.in_wishlist === 20"><img src="../../../static/img/love.png" alt=""></span> -->
      </div>
    </div>
  </div>
  <div class="overTime">
    <div class="overHd" v-if="goodsListOff.length > 0">
      <!--<div class="checkState over">-->
        <!--<input type="checkbox" v-model="checkedAll" name="metal" @change="allChecked($event)"><label for="Size1"></label><span>Select All</span>-->
      <!--</div>-->
      <!--<div class="remove" @click="batchDelete()">Remove Select</div>-->
      <!--<div class="WishList" v-if="false">Move Selected to WishList</div>-->
    </div>
    <div class="carItem" style="background-color: #fbfbfb;" v-if="goodsListOff.length > 0 && !loadingShow" v-for="(unGood, index2) in goodsListOff" v-bind:key="index2">
      <div class="checkState item" style="width: 106px; box-sizing: border-box;">
        <!--<input type="checkbox" :id="'good'+ carItem.id" :value="'good'+ carItem.id" v-model="checkedItem"><label :for="'good'+ carItem.id"></label>-->
        <div class="imgBox" @click="unavailableGoods(unGood.product_id, unGood.sku_id)">
          <img :src="unGood.sku_image" alt="">
          <div class="tagBox" v-if="unGood.activity_type">
            <div class="cheap" v-if="unGood.activity_type == 1">
              <div class="cheapLeft"></div>
              <div class="cheapRight">${{unGood.activity_price}}</div>
            </div>
            <div class="disPrice" v-if="unGood.activity_type == 2">%{{parseInt(unGood.activity_intensity)}} OFF</div>
          </div>
          </div>
      </div>
      <div class="productCont" style="width: 500px;">
        <div class="textBox" @click="unavailableGoods(unGood.product_id, unGood.sku_id)">{{unGood.sku_name}}</div>
        <div v-if="unGood.sku_attrs"><div class="goodsType" v-for="goodAttr in JSON.parse(unGood.sku_attrs)" :key="goodAttr.id+'-'+goodAttr.value.id">{{goodAttr.attr_name}}: {{goodAttr.value.attr_value}};</div></div>
        <div class="goodsPrice">$ {{unGood.activity_price?unGood.activity_price:unGood.sku_price}} <span v-if="unGood.activity_type">${{unGood.sku_price}}</span></div>
      </div>
      <div class="goodsNum_goodsTotal">
        <span v-if="unGood.sku_status == 0 || unGood.is_delete == 1 || unGood.product_status == 0">Invalid</span>
        <span v-if="unGood.sku_status == 2">Restocking</span>
      </div>
      <div class="optionType">
        <span @click="deleteItemCart(unGood.sku_id)"><i class="el-icon-circle-close"></i></span>
        <span class="wishAdd" title="add wishlist" v-if="unGood.sku_status===2 && unGood.in_wishlist === 10"><img @click="addWish(unGood.sku_id)" src="../../../static/img/loveOut.png" alt=""></span>
        <span class="wishAdd isWished" v-if="unGood.sku_status===2 && unGood.in_wishlist === 20"><img src="../../../static/img/love.png" alt=""></span>
      </div>
    </div>
  </div>
  <div class="overTime" style="margin-bottom: 30px;margin-top: 30px;">
    <!--<div class="overHd Points">-->
      <!--Choose Coupon & Points-->
    <!--</div>-->
    <div class="pointCoupon">
      <div class="leftCont">
      </div>
      <div class="orderInfo">
        <div class="payOrder">
          <div style="width: 220px;"></div>
          <div>
            <!--<div class="payItem"><div class="payTitle">Coupon:</div><div class="payNum">$ 3.33</div></div>-->
            <!--<div class="payItem"><div class="payTitle">Points:</div><div class="payNum">$ 53.33</div></div>-->
            <!--<div class="payItem"><div class="payTitle">Subtotal:</div><div class="payNum">$ {{totalPayShow.toFixed(2)}}</div></div>-->
            <div class="payItem"><div class="payTitle">Subtotal:</div><div class="payNum big">$ {{totalPayShow.toFixed(2)}}</div></div>
            <div class="payItem"><div></div><div class="police" @click="toPolice">Privacy Policy</div></div>
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
  <div class="my_order">
    <el-dialog
      title="Logn in to Check out/Check out as Guest"
      :visible.sync="payDialogVisible"
      width="800px"
      center>
      <div class="tipBox">
        <div class="tipLeft">
          <div class="tipText">If you are already a member, please sign in to speed up the checkout process. And you can enjoy the rights and interests in the same time, like coupons, ponits. </div>
          <div class="footerBtn">
            <el-button size="medium" type="primary" @click="toLogin()">Login</el-button>
          </div>
        </div>
        <div class="tipRight">
          <div class="tipText">If you don't want to create an account, please check out as continue as guest.</div>
          <div class="footerBtn">
            <el-button size="medium" @click="toOrderConfirm()">Guest</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  <!--<div class="foot">-->
    <!--<footer-com></footer-com>-->
  <!--</div>-->
</div>
</template>

<script>
import {getGoodsList,checkLogin} from "../../api/register";
import {addwishlist} from "@/api/wish.js"
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie';
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
      loadingShow: false,
      goodsVisible: false,
      payDialogVisible: false,
      checkedItem: [],
      idList: [],
      payList: [],
      totalPay: 0,
      realTotal: 0, // 正常商品价格
      checkArr: [],
      totalPayShow: 0,
      totalLevel: 0,
      goodsList: [],
      couponId: '',
      timeIndex: -1,
      goodsCount: 1,
      // numDisabled: false,
      hasChecked: false,
      goodsListOn: [],
      goodsListOff: [],
      fullGiftList: [],
      addGoodsList: [],
      // 满赠数据
      fullGiveList: [],
      // 满送
      chooseList: [],
      // 加购
      anotherGoodsList: [],
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
    // 商品选中集合（一期，目前不用管）
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
    },
    // 当金额减少时，删除不符合条件的满加商品
    realTotal: function (val, oV) {
      var that = this
      var delList = []
      if (val < oV) {
        // console.log('jjjjvvvv', val, oV)
        for (var i=0;i<that.anotherGoodsList.length;i++) {
          if (val >= parseFloat(that.anotherGoodsList[i].activity_intensity)) {
            // console.log("*****555555", that.anotherGoodsList[i].activity_intensity)
          } else {
            // console.log("*****44444", that.anotherGoodsList[i].sku_id)
            delList.push(that.anotherGoodsList[i].sku_id)
          }
        }
        // console.log('xxxxxxxx', delList)
        if (delList.length > 0) {
          that.deleteDataSub(delList)
        }
      }
    },
    // 满加范围变化时关闭满加弹框
    totalLevel (val,OV) {
      if (val) {
        this.goodsVisible = false
      }
    },
    // 满赠条件变化，当金额满足一个新的满赠档次的时候重新调用接口
    timeIndex: function(val, oV){
      var that = this
      if (val){
        // console.log('kk666777', val)
        // that.goodsVisible = false
        if (that.fullGiftList.length > 0) {
          that.getActivityGoods(that.fullGiftList[val])
        }
        // console.log('hhhh777', that.fullGiftList)
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
    getActivityGoods (type) {
      var that = this
      // console.log('000000', type)
      var obj = qs.stringify({
        activity_type: 3,
        subtotal: that.totalPayShow
      })
      // console.log('lllll', type)
      that.$axios.post('api/cartactivityitembysubtotal', obj).then(res => {
        if (res.length > 0) {
          // console.log('2222222', res)
          for (var i=0;i<res.length;i++) {
            that.$set(res[i],'act_type',0)
            res[i].act_type = type
          }
          that.fullGiveList = res
        } else {
          that.fullGiveList = []
        }
        // console.log('mmmmm', res)
      })
    },
    // 加购添加
    addMoreTocart(id){
      var that = this
      // that.isExistAddMore(id)
      that.addActivityToCart(id)
    },
    // 校验是否已经添加
    // isExistAddMore(id){
    //   var that = this
    //   var obj = qs.stringify({
    //     sku_id: id
    //   })
    //   that.$axios.post('api/checkactivitycartskuexist', obj).then(res => {
    //     console.log("*****", res)
    //     if (res.code == 102) {
    //       that.addActivityToCart(id)
    //     }
    //   })
    // },
    addActivityToCart (id) {
      var that = this
      var obj = qs.stringify({
        sku_id: id,
        goods_count: 1
      })
      that.$axios.post('api/anotheraddtoactivitycart', obj).then(res => {
        // console.log("*****", res)
        if (!res.code) {
          that.getActivityGoodsList()
          that.getAddMoreGoods()
          that.$store.state.addCartState = true
        } else {
          this.$alert("Sorry, this item are invalid., Please add it again.", '', {
          confirmButtonText: 'OK',
          callback: action => {
            that.getActivityGoodsList()
          }
        })
        }
      })
    },
    toPolice(){
      this.$router.push('/police')
    },
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
    // 查询满加商品列表
    getActivityGoodsList () {
      var that = this
      that.$axios.post('api/getmyactivitycartsku', {}).then(res => {
        if(res instanceof Array){
          for (var i=0;i<res.length;i++) {
            that.$set(res[i],'totalPay', 0)
            if (res[i].activity_price) {
              res[i].totalPay = parseFloat(res[i].activity_price) * res[i].goods_count
            } else {
              res[i].totalPay = parseFloat(res[i].sku_price) * res[i].goods_count
            }
          }
          that.anotherGoodsList = res
          console.log("kkkkkk")
          that.getPayList(that.payList)
        }
      })
    },
    // 查购物车数据
    async getGoodsListFuc(tr){
      var that = this
      that.payList = []
      that.totalPay = 0
      let itemPay = 0
      // that.getActivityGoods()
      if (tr) {
        let data = await getGoodsList();
        if (data) {
          // that.numDisabled = false
          this.goodsList = data
          that.loadingShow = false
          that.idList = []
          let OnList = []
          let OffList = []
          let goodsPay = []
          that.goodsListOn = []
          that.goodsListOff = []
          if (this.goodsList.length == 0) {
            // that.noProduct = true
            that.btnCanSub = true
          } else {
            // that.noProduct = false
            that.btnCanSub = false
          }
          for (var i = 0;i<that.goodsList.length;i++){
            if (that.goodsList[i].sku_status == 1 && that.goodsList[i].product_status != 0 && that.goodsList[i].is_delete != 1) {
              OnList.push(that.goodsList[i])
              that.goodsListOn = OnList
              that.idList.push(that.goodsList[i].sku_id)
              for (var j = 0;j<that.goodsListOn.length;j++) {
                that.$set(that.goodsListOn[j],'overTipShow',false)
                itemPay = parseFloat(that.goodsListOn[j].activity_price?that.goodsListOn[j].activity_price:that.goodsListOn[j].sku_price) * that.goodsListOn[j].goods_count
                that.goodsListOn[j].totalPay = itemPay.toFixed(2)
                if (tr.num >= tr.max) {
                  if (that.goodsListOn[j].sku_id === tr.sid) {
                    that.goodsListOn[j].overTipShow = true
                  }
                }
              }
            } else if (that.goodsList[i].sku_status == 0 || that.goodsList[i].sku_status == 2 || that.goodsList[i].product_status == 0 || that.goodsList[i].is_delete == 1){
              OffList.push(that.goodsList[i])
              that.goodsListOff = OffList
            }
          }
          // console.log('ppppp00000', that.goodsListOn)
          that.$store.state.addCartState = false
          that.goodsChecked(that.checkedItem)
          var realTotal = 0
          if (that.goodsListOn) {
            for (var k = 0;k<that.goodsListOn.length;k++) {
              goodsPay.push(parseFloat(that.goodsListOn[k].totalPay))
            }
          }
          // console.log('jjjjj', goodsPay)
          for (var i = 0; i < goodsPay.length; i++) {
            realTotal += goodsPay[i]
          }
          that.realTotal = realTotal
        }
      } else {
        that.loadingShow = true
        let data = await getGoodsList();
        if (data) {
          this.goodsList = data
          // console.log('55555', data)
          that.loadingShow = false
          var onList = []
          var offList = []
          that.goodsListOn = []
          that.goodsListOff = []
          if (this.goodsList.length === 0) {
            that.noProduct = true
            that.btnCanSub = true
            that.goodsListOn = []
          } else {
            that.noProduct = false
            that.btnCanSub = false
            that.idList = []
            for (var i = 0;i<that.goodsList.length;i++){
              if (that.goodsList[i].sku_status === 1 && that.goodsList[i].product_status != 0 && that.goodsList[i].is_delete != 1) {
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
                  itemPay = parseFloat(that.goodsListOn[j].activity_price?that.goodsListOn[j].activity_price:that.goodsListOn[j].sku_price) * that.goodsListOn[j].goods_count
                  that.goodsListOn[j].totalPay = itemPay.toFixed(2)
                }
              } else if (that.goodsList[i].sku_status == 0 || that.goodsList[i].sku_status == 2 || that.goodsList[i].product_status == 0 || that.goodsList[i].is_delete == 1){
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
      }
    },
    // 计算总金额
    sumPay: function (arr) {
      var that = this
      that.checkArr = arr
      that.fullGiftList = []
      that.addGoodsList = []
      let totalPay = 0
      for (var i = 0; i < that.checkArr.length; i++) {
        totalPay += that.checkArr[i]
      }
      that.totalPayShow = totalPay
      // console.log('kkk00', totalPay)
      // that.btnLoading = false
      // 获取活动价格梯度Object
      that.$axios.post('api/cartactivityladder', {}).then(res => {
        // if (res instanceof Array) {
        //   for (var i=0;i<res.length;i++){
        //     if (res[i].activity_type == 3) { // 满赠
        //       that.fullGiftList.push(parseFloat(res[i].activity_intensity))
        //     } else if (res[i].activity_type == 4) { // 加购
        //       that.addGoodsList.push(parseFloat(res[i].activity_intensity))
        //     }
        //   }
        // }
        if (res instanceof Object) {
          for (var index in res){
            // console.log('bbbbbbb', res[index])
            if (res[index].activity_type == 3) { // 满赠
              that.fullGiftList.push(parseFloat(res[index].activity_intensity))
            } else if (res[index].activity_type == 4) { // 加购
              that.addGoodsList.push(parseFloat(res[index].activity_intensity))
            }
          }
        }
        if (that.fullGiftList) {
          var temp = []
          that.fullGiftList.sort(function(a, b){return a - b});
          for(var i = 0; i < that.fullGiftList.length; i++){
            if(temp.indexOf(that.fullGiftList[i]) == -1){
                temp.push(that.fullGiftList[i]);
            }
          }
          // console.log('temp', temp)
          that.getTimeIndex(temp, totalPay)
          that.fullGiftList = temp
        }
        if (that.addGoodsList) {
          var temp = []
          that.addGoodsList.sort(function(a, b){return a - b});
          for(var i = 0; i < that.addGoodsList.length; i++){
            if(temp.indexOf(that.addGoodsList[i]) == -1){
                temp.push(that.addGoodsList[i]);
            }
          } 
          // console.log('temp2', temp)
          that.getTimeIndex22(temp, totalPay)
          that.addGoodsList = temp
        }
      })
    },
    // 查询金额满足满加条件
    getTimeIndex22: function (timeArr,totalPay) {
      // var level = 0
      // console.log('hhhhhhh', timeArr)
      if (timeArr.length > 0) {
        for(var index in timeArr){
          if(totalPay>=timeArr[index]){
            // console.log('kkk555', timeArr[index])
            this.totalLevel = timeArr[index]
          }
          if (totalPay < timeArr[0]) {
            this.totalLevel = timeArr[0]
          }
        }
      } else {
        this.totalLevel = ''
      }
      // this.totalLevel = level
      // console.log('kkkkk99999', this.totalLevel)
      // this.goodsVisible = false
    },
    // 查询金额满足满赠条件
    getTimeIndex: function (timeArr,totalPay) {
      var timeIndex = -1;
      for(var index in timeArr){
        if(totalPay>=timeArr[index] ){
          // console.log('000000', timeArr[index])
          timeIndex = index;
        }
      }
      this.timeIndex = timeIndex
      // console.log('kkk22333', timeIndex)
    },
    // 选中的商品
    goodsChecked: function(e){
      var that = this
      // console.log('eeeee', e)
      that.payList = []
      if (e.length > 0) {
        for (var m=0;m<e.length; m++){
          for (var n=0;n<that.goodsListOn.length; n++){
            if (that.goodsListOn[n].sku_id === e[m]){
              that.payList.push(parseFloat(that.goodsListOn[n].totalPay))
            }
          }
        }
        that.getActivityGoodsList()
      }else if (e.length === 0) {
        // console.log(111111)
        that.sumPay(e)
      }
    },
    getPayList: function (e) {
      var that = this
      var otherList = []
      var allPayList = []
      if (that.anotherGoodsList.length > 0) {
        for (var n=0;n<that.anotherGoodsList.length; n++){
          otherList.push(parseFloat(that.anotherGoodsList[n].totalPay))
        }
      }
      allPayList = e.concat(otherList)
      // that.payList.push(parseFloat(e))
      that.sumPay(allPayList)
    },
    // 单个删除
    deleteItemCart: function (skuId) {
      var that = this
      // that.btnLoading = true
      that.$axios.post('api/deltocart/' + skuId, {}).then(res => {
        that.getGoodsListFuc('1')
        that.$store.state.addCartState = true
        // for (var i=0;i<that.checkedItem.length;i++){
        //   if (that.checkedItem[i] == skuId) {
        //     that.checkedItem.splice(i,1)
        //   }
        // }
      })
    },
    // 删除满加的商品
    deleteItemCartOther(id){
      var delList = []
      delList.push(id)
      // console.log('delList', delList)
      this.deleteDataSub(delList)
    },
    deleteDataSub (list) {
       var that = this
      // that.btnLoading = true
      // console.log("yyyyyy", list)
      var obj = qs.stringify({
        sku_ids: list
      })
      that.$axios.post('api/deltoactivitycart', obj).then(res => {
        that.getActivityGoodsList()
        that.$store.state.addCartState = true
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
    // 添加心愿单
    addWish: function(id, type) {
      if (this.isLogin){
        let pre={
          wl_products_skus_id: id
        }
        addwishlist(pre).then((res)=>{
          if(res.code == 200){
            if (type) {
              this.getActivityGoodsList()
            } else {
              this.getGoodsListFuc('1')
            }
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
    },
    // 修改商品数量
    handleChange: function (e, skuId, max) {
      var that = this
      // that.numDisabled = true
      // that.goodsCount = e
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
    // 全选
    allChecked: function() {
      var that = this
      this.checkedItem = []
      if (this.checkedAll) {
        this.checkedItem = this.idList
        for (var i = 0;i<that.goodsListOn.length;i++){
          that.payList.push(parseFloat(that.goodsListOn[i].totalPay))
          // console.log('kkkk', that.goodsListOn[i].totalPay)
        }
        // console.log(3333333)
        that.sumPay(that.payList)
      } else {
        this.checkedItem = []
        that.payList = []
        // that.sumPay(that.payList)
        that.totalPayShow = 0.00
      }
    },
    // 点击进入订单确认页面
    subTotalPay: function() {
      var that = this
      var sku_num = []
      var otherSku = []
      var sendList = []
      var allSkuList = []
      if (that.goodsListOn) {
        for(var i=0;i<that.goodsListOn.length;i++){
          for (var j=0;j<that.checkedItem.length;j++){
            if(that.goodsListOn[i].sku_id == that.checkedItem[j]){
              if (that.goodsListOn[i].activity_id) {
                sku_num.push(that.goodsListOn[i].activity_id +'-'+that.checkedItem[j]+'-'+that.goodsListOn[i].goods_count)
              } else {
                sku_num.push(0+'-'+that.checkedItem[j]+'-'+that.goodsListOn[i].goods_count)
              }
            }
          }
        }
      }
      if (that.anotherGoodsList) {
        for(var k=0;k<that.anotherGoodsList.length;k++){
          if (that.anotherGoodsList[k].activity_id) {
            otherSku.push(that.anotherGoodsList[k].activity_id +'-'+that.anotherGoodsList[k].sku_id+'-'+that.anotherGoodsList[k].goods_count)
          } else {
            otherSku.push(0+'-'+that.anotherGoodsList[k].sku_id+'-'+that.anotherGoodsList[i].goods_count)
          }  
        }
      }
      if (that.fullGiveList) {
        for(var n=0;n<that.fullGiveList.length;n++){
          if (that.fullGiveList[n].activity_id) {
            sendList.push(that.fullGiveList[n].activity_id +'-'+that.fullGiveList[n].sku_id+'-'+ 1)
          } else {
            sendList.push(0+'-'+that.fullGiveList[n].sku_id+'-'+ 1)
          }  
        }
      }
      // console.log('mmmmm', otherSku)
      allSkuList = sku_num.concat(otherSku)
      allSkuList = allSkuList.concat(sendList)
      // console.log('zzzzzz', allSkuList)
      if (that.isLogin) {
        sessionStorage.setItem('idList', JSON.stringify(that.checkedItem))
        sessionStorage.setItem('sku_num', JSON.stringify(allSkuList))
        // console.log('kkkkk', that.goodsListOn)
        that.$router.push('/orderConfirm')
      } else {
        that.payDialogVisible = true
      }
    },
    toLogin () {
      var that = this
      var roterHistory = that.$route.path
      that.$store.state.fromUrl = roterHistory
      that.$router.push('/Login')
    },
    // 未登录用户继续进订单确认页面
    toOrderConfirm () {
      var that = this
      var sku_num = []
      var otherSku = []
      var sendList = []
      var allSkuList = []
      if (that.goodsListOn) {
        for(var i=0;i<that.goodsListOn.length;i++){
          for (var j=0;j<that.checkedItem.length;j++){
            if(that.goodsListOn[i].sku_id == that.checkedItem[j]){
              if (that.goodsListOn[i].activity_id) {
                sku_num.push(that.goodsListOn[i].activity_id +'-'+that.checkedItem[j]+'-'+that.goodsListOn[i].goods_count)
              } else {
                sku_num.push(0+'-'+that.checkedItem[j]+'-'+that.goodsListOn[i].goods_count)
              }
            }
          }
        }
      }
      if (that.anotherGoodsList) {
        for(var k=0;k<that.anotherGoodsList.length;k++){
          if (that.anotherGoodsList[k].activity_id) {
            otherSku.push(that.anotherGoodsList[k].activity_id +'-'+that.anotherGoodsList[k].sku_id+'-'+that.anotherGoodsList[k].goods_count)
          } else {
            otherSku.push(0+'-'+that.anotherGoodsList[k].sku_id+'-'+that.anotherGoodsList[i].goods_count)
          }  
        }
      }
      if (that.fullGiveList) {
        for(var n=0;n<that.fullGiveList.length;n++){
          if (that.fullGiveList[n].activity_id) {
            sendList.push(that.fullGiveList[n].activity_id +'-'+that.fullGiveList[n].sku_id+'-'+ 1)
          } else {
            sendList.push(0+'-'+that.fullGiveList[n].sku_id+'-'+ 1)
          }  
        }
      }
      // 正常商品、满加商品、赠品数据传到订单确认页面
      // 格式活动id + sku_id + 商品数量
      allSkuList = sku_num.concat(otherSku)
      allSkuList = allSkuList.concat(sendList)
      sessionStorage.setItem('idList', JSON.stringify(that.checkedItem))
      sessionStorage.setItem('sku_num', JSON.stringify(allSkuList))
      that.$router.push('/orderConfirm')
    },
    // 商品详情
    toGoodDetail: function(spuid, skuid){
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    // 商品详情
    unavailableGoods: function(spuid, skuid){
      // console.log('hhhhhh', spuid, skuid)
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    addMoreGoods(){
      this.goodsVisible = true
      if (this.goodsVisible) {
        this.getAddMoreGoods()
      }
    },
    getAddMoreGoods () {
       var that = this
      var obj = qs.stringify({
        activity_type: 4,
        subtotal: that.totalPayShow
      })
      that.$axios.post('api/cartactivityitembysubtotal', obj).then(res => {
        if (res.length > 0) {
          // console.log('#####', res)
          that.chooseList = res
        }
      })
    },
    goShopping: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/shopcar.scss"
</style>
