<template>
  <!-- 头部 -->
  <div>
    <!-- 大头部 -->
    <div class="wrap1">
        <div class="wrap">
          <div class="title">
            <div class="title_word">Contact Us: 1-626-586-3448 (Mon-Fri 9am-6pm PST.)</div>
          </div>
          <div>{{Refresh?'':''}}</div>
          <!-- 中间内容 -->
          <div class="content">
            <div class="contentHd">
              <!-- 左边logo -->
              <div class="LOGO2" @click="handleGoHome">
                <img src="@/assets/LOGO2.png" alt>
              </div>
              <div class="searchBox">
                <!-- 搜索框 -->
                <div class="search">
                  <el-input :placeholder="searchInput" v-model="searchVal" @keyup.enter.native="searchOver()"></el-input>
                  <!--<el-input v-if="searchInput" v-model="searchVal"></el-input>-->
                  <p class="search_word" @mousedown="search($event)" @mouseup="searchOver($event)">Search</p>
                </div>
                <div class="optionList">
                  <!-- 登录 -->
                  <div class="login">
                    <div class="login_left" @click="HandleLogin" v-if="!login_status">
                      <img src="@/assets/login.png" alt>
                      <span>{{userName}}</span>
                    </div>
                    <el-dropdown v-if="login_status">
                      <div class="login_right" :title="userName">
                        <router-link to="/myAccount">
                          <span v-if="!userName">Hello,Welcome</span>
                          <span v-if="userName">Hello,{{userName.substring(0,7)}}</span>
                          <span v-if="userName && userName.length>7">...</span>
                        </router-link>
                      </div>
                      <div class="dropdown">
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item><router-link to="/myOrder">My Orders</router-link></el-dropdown-item>
                          <el-dropdown-item><router-link to="/myCoupon">My Coupons</router-link></el-dropdown-item>
                          <el-dropdown-item><router-link to="/myPoints">My Points</router-link></el-dropdown-item>
                          <el-dropdown-item><span @click="logout()">Logout</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </div>
                    </el-dropdown>
                  </div>
                  <!-- 心愿单 -->
                  <router-link to="/myWishlist">
                    <div class="wish">
                      <div class="wish_left">
                        <img src="@/assets/wish.png" alt>
                      </div>
                      <div class="wish_right">
                        <p class="wish_word">Wish</p>
                      </div>
                    </div>
                  </router-link>
                  <!-- 购物车 -->
                  <div class="cart" v-on:click="visible">
                    <el-badge :hidden="goodsNum === 0?true:false" :value="goodsNum" :max="99" class="item">
                      <div class="cart_left">
                        <img src="@/assets/cart.png" alt>
                        <div>cart</div>
                      </div>
                    </el-badge>
                  </div>
                </div>
              </div>
            </div>
            <nav-com></nav-com>
          </div>
        </div>
    </div>
    <!-- 小头部 -->
    <div class="small_header" :style="{top:(headerShow==true?'0':'-60px')}">
      <div class="box">
          <img src="@/assets/LOGO2.png" alt @click="handleGoHome" class="logo">
          <nav-com></nav-com>
          <i class="el-icon-search" @click="searchIcon()" v-if="searchShow == false"></i>
          <div class="login">
            <div class="login_left" @click="HandleLogin" v-if="!login_status">
              <img src="@/assets/login.png" alt>
            </div>
            <el-dropdown v-if="login_status">
              <div class="login_right" :title="userName">
                <router-link to="/myAccount"><span>{{userName}}</span></router-link>
              </div>
              <div class="dropdown">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><router-link to="/myOrder">My Orders</router-link></el-dropdown-item>
                  <el-dropdown-item><router-link to="/myCoupon">My Coupons</router-link></el-dropdown-item>
                  <el-dropdown-item><router-link to="/myPoints">My Points</router-link></el-dropdown-item>
                  <el-dropdown-item><span @click="logout()">Logout</span></el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </el-dropdown>
          </div>
          <div class="cart" v-on:click="visible">
            <el-badge :hidden="goodsNum === 0?true:false" :value="goodsNum" :max="99" class="item">
                <img src="@/assets/cart.png" alt>
            </el-badge>
          </div>
      </div>
      <div class="search_box" v-if="searchShow == true">
        <div class="search">
            <i class="el-icon-search" style="cursor: pointer;" @click="searchOver()"></i>
            <el-input v-model="searchVal" @keyup.enter.native="searchOver()"></el-input>
            <i class="el-icon-close" @click="searchIcon()"></i>
        </div>
      </div>
    </div>
    <!-- 购物车缩略版 -->
    <div class="cart_list" v-on:mouseenter="visible" v-on:mouseleave="invisible" :style="{right:(show==true?'0':'-560px')}">
        <div class="cart_title">
          <i class="el-icon-close" @click="invisible"></i>
          <p>Your Cart Has {{this.goodsNum}} Items</p>
        </div>
        <div class="cart_center">
          <ul v-if="goodsListOn.length!=0">
            <li v-for="(item,index) in goodsListOn" :key="index">
              <img :src="item.sku_image" alt @click="link(item.sku_id,item.product_id)">
              <div class="list_detail">
                <p class="detail_title" @click="link(item.sku_id,item.product_id)">{{item.sku_name}}</p>
                <div class="spec_color">
                  <p class="size" @mouseenter="attrshow(index)" @mouseleave="attrhidden()">
                      <span v-for="(item1,index1) in JSON.parse(item.sku_attrs)" :key="index1">
                        <span v-if="index1<2">
                            {{item1.attr_name}}:<span style="color: #333;">{{item1.value.attr_value}}</span>;
                        </span>
                        <span v-if="index1>=2">...</span>
                      </span>
                  </p>
                  <p class="sizevisible" v-if="JSON.parse(item.sku_attrs).length>=2" v-show="attrShowindex == index">
                      <span v-for="(item1,index2) in JSON.parse(item.sku_attrs)" :key="index2">
                        {{item1.attr_name}}:<span style="color: #333;">{{item1.value.attr_value}}</span>;
                      </span>
                  </p>
                  <p class="qty"><span>QTY:</span>{{item.goods_count}}</p>
                </div>
              </div>
              <div class="price_del">
                <i class="el-icon-error" @click="delList(item.sku_id)"></i>
                <div class="price">${{(item.sku_price*item.goods_count).toFixed(2)}}</div>
              </div>
            </li>
          </ul>
          <!-- <ul v-if="goodsListOff.length!=0" class="offGoodList">
            <li v-for="(item,index) in goodsListOff" :key="index">
              <img :src="item.sku_image" alt @click="link(item.sku_id,item.product_id)">
              <div class="list_detail">
                <p class="detail_title" @click="link(item.sku_id,item.product_id)">{{item.sku_name}}</p>
                <div class="spec_color">
                  <p class="size"><span v-for="(item1,index) in JSON.parse(item.sku_attrs)" :key="index">{{item1.attr_name}}:<span style="color: #333;">{{item1.value.attr_value}}</span>; </span></p>
                  <p class="qty"><span>QTY:</span>{{item.goods_count}}</p>
                </div>
              </div>
              <div class="price_del">
                <i class="el-icon-error" @click="delList(item.sku_id)"></i>
                <div class="price">${{item.sku_price*item.goods_count}}</div>
              </div>
            </li>
          </ul> -->
          <div v-if="this.goodsList.length != 0 && goodsListOn.length == 0" class="empty_cart">
            <div class="noGoodsText">{{this.goodsNum}}items are unavailable, please check your shopping cart. </div>
            <div class="shopBtn" @click="goShopping()">Go Shopping ></div>
          </div>
          <div v-if="this.goodsList.length == 0" class="empty_cart">
            <div class="noGoodsText">The Shopping Cart is Empty!</div>
            <div class="shopBtn" @click="goShopping()">Go Shopping ></div>
          </div>
        </div>
        <div class="total" v-if="this.goodsList.length!=0">
          <div class="total_price">
            <span>Total Price:</span>
            <b>${{TotalPrice}}</b>
          </div>
          <div class="view_cart" @click="toShopCart()"><span>View Cart</span></div>
        </div>
    </div>
  </div>
</template>
<script>
import {getcartgoodscount,getGoodsList,userLogout,checkLogin} from "../api/register";
import Nav from "@/components/nav.vue"
import { mapGetters } from 'vuex';
  export default {
    components:{
      "nav-com":Nav
    },
    data() {
      return {
        keyword:'',//搜索关键字
        searchVal: '',
        searchInput: '',
        f_cate_id: '',
        s_cate_id: '',
        login_status:true,//用户登录状态
        userName: 'Welcome',
        TotalPrice:0,//购物车总价
        show:false,//购物车显示状态
        goodsList:[],//购物车列表
        goodsListOn:[],//上架商品列表
        goodsListOff:[],//已下架商品列表
        goodsNum: 0,//购物车商品数量
        headerShow:false,//头部显示状态
        searchShow:false,//搜索框显示状态
        attrShowindex:-1,//缩略版购物车属性值显示状态
      };
    },
    mounted() {
        window.addEventListener("scroll", this.showIcon);
    },
    watch: {
      addCart(add){
        if(add == true){
          this.getGoodsCont()
        }
        this.$store.state.addCartState = false
      },
      $route(){
        this.s_cate_id = this.$route.query.s_cate_id
        this.f_cate_id = this.$route.query.f_cate_id
      },
      s_cate_id() {
        this.searchVal = ''
      },
      f_cate_id () {
        this.searchVal = ''
      },
      // searchVal: function (val, oV) {
      //   console.log(val, oV)
      //   // if (val) {
      //   //   this.searchInput = true
      //   // }
      // },
      changeusername(user){
        if(user == true){
          this._checkLogin()
        }
        this.$store.state.username = false
      },
      'show': function(val, ov){
        if(val){
          this.getGoodsListFuc()
        }else{
          this.goodsListOn = []
          this.goodsListOff = []
        }
      }
    },
    created() {
      this._checkLogin()
      this.getGoodsCont()
      if (this.$route.query.keyword){
        this.searchVal = this.$route.query.keyword
      }
      // console.log('rrrrr', this.searchVal)
    },
    computed: {
      ...mapGetters([
        'addCart',
        'changeusername'
      ]),
      Refresh: function () {
        var that = this
        if (this.$route.name === 'searchList') {
          if (that.$store.state.keyWordFlag) {
            that.searchVal = that.$store.state.keyWord
            that.$store.state.keyWordFlag = false
          }
        } else {
          that.$store.state.keyWord = ''
          that.searchVal = that.$store.state.keyWord
          that.$store.state.keyWordFlag = false
        }
        return this.$store.state.keyWordFlag
      }
    },
    methods: {
      searchOver: function(e) {
        if (e) {
          var obj = e.currentTarget
          $(obj).css({"transform":"scale(1)","transition":"all .3s"})
        }
        if (this.searchVal) {
          // console.log('ssss', this.searchVal)
          if (this.$route.name !== 'searchList'){
            this.$router.push({
              path: '/searchList',
              query: {
                keyword: this.searchVal
              }
            })
          } else {
            this.$store.state.searchVal = this.searchVal
            this.$store.state.searchFlag = true
            this.$router.push({
              path: '/searchList',
              query: {
                keyword: this.searchVal
              }
            })
          }
        } else {
          if (this.$route.name !== 'searchList'){
            this.$router.push({
              path: '/searchList',
              query: {
                keyword: this.searchVal
              }
            })
          } else {
            this.$store.state.searchVal = ''
            this.$store.state.searchFlag = true
            this.$router.push({
              path: '/searchList',
              query: {
                keyword: this.searchVal
              }
            })
          }
          // alert('gogogogogoog')
          // this.$router.push('/')
        }
      },
      search: function (e) {
        var obj = e.currentTarget
        $(obj).css({"transform":"scale(1.06)","transition":"all .3s","font-stretch": "normal"})
      },
      attrshow(num){
        this.attrShowindex = num
      },
      attrhidden(){
        this.attrShowindex = -1
      },
      //小头部搜索框显示
      searchIcon(){
        this.searchShow = !this.searchShow
      },
      // 头部切换
      showIcon() {
        if (!!document.documentElement.scrollTop && document.documentElement.scrollTop > 120) {
            this.headerShow = true;
        } else {
            this.headerShow = false;
            this.searchShow = false;
        }
      },
      //购物车到商品详情
      link(skuid,spuid){
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      },
      //退出登录
      logout(){
        userLogout().then((res)=>{
          if(res.code === 200){
            this.$message({
              message: "success",
              type: "success"
            });
            localStorage.removeItem("userToken")
            this.userName = 'Login'
            this._checkLogin()
            this.getGoodsCont()
            this.$router.push('/')
          }
        })
      },
      //判断用户登录状态
      _checkLogin(){
        checkLogin().then((res)=>{
          if(res.code === '200' || res.code === 200){
            this.login_status = true;
            this.userName = res.data
          }else{
            this.login_status = false;
            this.userName = 'Login'
            localStorage.removeItem("userToken")
          }
        })
      },
      goShopping: function () {
        this.$router.push('/')
        this.show = false
      },
      visible:function(){
        this.show = true;
      },
      invisible:function(){
        this.show = false;
      },
      //获取购物车商品
      async getGoodsListFuc(){
        var goodsListOn = []
        var goodsListOff = []
        var total = 0
        let data = await getGoodsList();
        this.goodsList = data
        for (var i = 0;i<this.goodsList.length;i++){
          var obj = this.goodsList[i]
          if (this.goodsList[i].sku_status === 1) {
            goodsListOn.push(obj)
            for (var j = 0;j<goodsListOn.length;j++) {
              var itemPay = goodsListOn[j].sku_price * goodsListOn[j].goods_count
              goodsListOn[j].totalPay = itemPay.toFixed(2)
            }
          } else if (this.goodsList[i].sku_status === 0){
            goodsListOff.push(obj)
          }
        }
        for(var i = 0;i<goodsListOn.length;i++){
            total += Number(goodsListOn[i].totalPay)
        }
        this.TotalPrice = total.toFixed(2)
        this.goodsListOn = goodsListOn
        this.goodsListOff = goodsListOff
      },
      //删除购物车商品
      delList(skuId) {
        this.$axios.post('api/deltocart/' + skuId).then(res => {
          this.getGoodsListFuc()
          this.getGoodsCont()
          this.$store.state.delcartList = true
          // if (res.status === 200) {
          //   this.getGoodsListFuc()
          //   this.getGoodsCont()
          // }
        })
      },
      //获取购物车商品总量
      async getGoodsCont(){
        let data = await getcartgoodscount()
        this.goodsNum = data
      },
      handleGoHome(){
        this.$router.push({
          path: '/'
        })
      },
      toShopCart: function(){
        this.$router.push('/shoppingCar')
        this.show = false;
      },
      HandleLogin(){
        this.$router.push({
          path: '/login'
        })
      },
    }
  };
</script>
<style scoped>
.search .el-input{
    width: 280px;
    border:none;
}
.qty{
  font-size: 14px;
  font-family: Tahoma;
  margin-top: 10px;
}
</style>
<style lang="scss" scoped>
    @import "@/assets/css/header.scss"
</style>
