<template>
  <!-- 头部 -->
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
                <div class="login_left" v-if="login_status == false">
                  <img src="@/assets/login.png" @click="HandleLogin" alt>
                  <span>{{userName}}</span>
                </div>
                <el-dropdown v-if="login_status == true">
                  <div class="login_right" :title="userName">
                    <router-link to="/myAccount">{{userName}}</router-link>
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
        <div class="nav">
          <ul class="content_box">
            <li class="navListLi" v-for="(item,index) in nav_arr" :key="index" @mouseover="getNavList(index, $event)">
              <div class="data">{{item.cate_name}}</div>
              <div class="content_box1" :style="'left: -' + leftVal + 'px'">
                <div class="box-item" v-for="(nav, index2) in nav_arrList" v-bind:key="index2" @click="checkGoodsType(nav.id, nav.parent_id)">{{nav.cate_name}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 购物车缩略版 -->
    <div class="cart_list" v-on:mouseenter="visible" v-on:mouseleave="invisible" :style="{right:(show==true?'0':'-560px')}">
      <div class="cart_title">
        <i class="el-icon-close" @click="invisible"></i>
        <p v-if="goodsListOn.length!=0">{{this.goodsNum}} Items</p>
      </div>
      <div class="cart_center">
        <ul v-if="goodsListOn.length!=0">
          <li v-for="(item,index) in goodsListOn" :key="index">
            <img :src="item.sku_image" alt>
            <div class="list_detail">
              <p class="detail_title">{{item.sku_name}}</p>
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
        <div v-else class="empty_cart">
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
  import {getcartgoodscount, category,getGoodsList,userLogout,checkLogin} from "../api/register";
  export default {
    data() {
      return {
        login_status:false,//用户登录状态
        userName:'Login',
        TotalPrice:0,//购物车总价
        show:false,
        goodsList:[],
        goodsListOn:[],
        goodsListOff:[],
        idList: [],
        input:'',
        nav_arr: [],
        nav_arrList: [],
        leftVal: 100,
        theNum: 5,
        goodsNum: 0,
        showNavList: false,
        interval: null,
        maxShowNum: 12,
        maxRow: 4,
        column: '',
        array:[1,2,3,4,5,6,7,8,9,10,11,12,13]
      };
    },
    watch: {
      'show': function(){
        if(this.show == true){
          this.getGoodsListFuc()
        }else{
          this.goodsListOn = []
        }
      },
    },
    created() {
      this._checkLogin()
      // this.login_status = localStorage.getItem("userToken")?true:false
      this.column = this.array.length % this.maxRow ? parseInt (this.array.length / this.maxRow) + 1 : this.array.length / this.maxRow; //这个是算会有几列
      this.column = this.column > this.maxRow ? this.maxRow : this.column;
      this.getGoodsCont()
      this.getUserName()
      this.getCategory()
    },
    computed: {
      addCartState: function () {
        var that = this
        if (that.$store.state.addCartState === true) {
          that.getGoodsCont(this.nodeId)
        }
        that.$store.state.addCartState = false
        return that.$store.state.addCartState
      }
    },
    methods: {
      // 退出登录
      logout(){
        userLogout().then((res)=>{
          if(res.code == '200'){
            localStorage.removeItem("userToken")
            localStorage.removeItem("userName")
            this.$router.go(0)
          }
        })
      },
      //判断用户登录状态
      _checkLogin(){
        checkLogin().then((res)=>{
          if(res.code == '200'){
            this.login_status = true;
          }else{
            this.login_status = false;
            localStorage.removeItem("userToken")
            localStorage.removeItem("userName")
          }
        })
      },
      goShopping: function () {
        this.$router.push('/')
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
          if (this.goodsList[i].sku_status == 1) {
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
        this.TotalPrice = total
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
      getUserName: function () {
        if(localStorage.getItem('userName')){
          this.userName = localStorage.getItem('userName')
        }else {
          this.userName = 'Login'
        }
      },
      getNavList: function(event, e) {
        this.leftVal = event*150
        this.nav_arrList = this.nav_arr[event].sub
      },
      async getGoodsCont(){
        let data = await getcartgoodscount()
        this.goodsNum = data
      },
      async getCategory(){
        let data = await category()
        if (data.code === '200') {
          this.nav_arr = data.data
        }
      },
      checkGoodsType: function(id, parentId){
        this.$router.push({
          path: '/goodsList',
          query: {
            s_cate_id: id
          }
        })
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
