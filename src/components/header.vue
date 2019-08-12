<template>
  <!-- 头部 -->
  <div>
    <!-- 大头部 -->
    <div class="wrap1">
        <div>{{addCartState?'':''}}</div>
        <div class="wrap">
          <div class="title">
            <div class="title_word">Contact Us: 1-626-586-3448 (Mon-Fri 9am-6pm PST.)</div>
          </div>
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
                  <el-input></el-input>
                  <p class="search_word">Search</p>
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
                        <router-link to="/myAccount"><span>Hello, {{userName}}</span></router-link>
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
                  <router-link to="myWishlist">
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
                    <el-badge :hidden="goodsNum === 0?true:false" :value="goodsNum" class="item">
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
            <el-badge :hidden="goodsNum === 0?true:false" :value="goodsNum" class="item">
                <img src="@/assets/cart.png" alt>
            </el-badge>
          </div>
      </div>
      <div class="search_box" v-if="searchShow == true">
        <div class="search">
            <i class="el-icon-search"></i>
            <el-input v-model="keyword"></el-input>
            <i class="el-icon-close" @click="searchIcon()"></i>
        </div>
      </div>
    </div>
    <!-- 购物车缩略版 -->
    <div class="cart_list" v-on:mouseenter="visible" v-on:mouseleave="invisible" :style="{right:(show==true?'0':'-560px')}">
        <div class="cart_title">
          <i class="el-icon-close" @click="invisible"></i>
          <p>{{this.goodsNum}} Items</p>
        </div>
        <div class="cart_center">
          <ul v-if="goodsListOn.length!=0">
            <li v-for="(item,index) in goodsListOn" :key="index">
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
                <div class="price">${{item.sku_price}}</div>
              </div>
            </li>
          </ul>
          <ul v-if="goodsListOff.length!=0" class="offGoodList">
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
                <div class="price">${{item.sku_price}}</div>
              </div>
            </li>
          </ul>
          <div v-if="this.goodsList.length == 0" class="empty_cart">
            <div class="noGoodsText">The Shopping Cart is Empty!</div>
            <div class="shopBtn" @click="goShopping()">Go Shopping ></div>
          </div>
        </div>
        <div class="total" v-if="goodsListOn.length!=0">
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
  export default {
    components:{
      "nav-com":Nav
    },
    data() {
      return {
        keyword:'',//搜索关键字
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
      };
    },
    mounted() {
        window.addEventListener("scroll", this.showIcon);
    },
    watch: {
      'show': function(){
        if(this.show == true){
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
    },
    computed: {
      addCartState: function () {
        var that = this
        if (that.$store.state.addCartState === true) {
          that.getGoodsCont()
        }
        that.$store.state.addCartState = false
        return that.$store.state.addCartState
      }
    },
    methods: {
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
      // 退出登录
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
          if(res.code === '200'){
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
        this.getGoodsListFuc()
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
    width: 220px;
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
