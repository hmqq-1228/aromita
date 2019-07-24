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
              <div class="search_right">
                <p class="search_word">Search</p>
              </div>
              <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
            </div>
            <div class="optionList">
              <!-- 登录 -->
              <div class="login">
                <div class="login_left" @click="HandleLogin">
                  <img src="@/assets/login.png" alt>
                </div>
                <div class="login_right" :title="userName">
                  {{userName}}
                </div>
              </div>
              <!-- 心愿单 -->
              <div class="wish">
                <div class="wish_left">
                  <img src="@/assets/wish.png" alt>
                </div>
                <div class="wish_right">
                  <p class="wish_word">Wish</p>
                </div>
              </div>
              <!-- 购物车 -->
              <div class="cart" @click="toShopCart()" v-on:mouseenter="visible">
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
          <li v-for="item in goodsListOn">
            <img :src="item.sku_image" alt>
            <div class="list_detail">
              <p class="detail_title">{{item.sku_name}}</p>
              <div class="spec_color">
                <p class="size"><span v-for="goodAttr in JSON.parse(item.sku_attrs)">{{goodAttr.attr_name}}:{{goodAttr.value.attr_value}}; </span></p>
                <p class="qty"><span>QTY:</span>{{item.goods_count}}</p>
              </div>
            </div>
            <div class="price_del">
              <i class="el-icon-error" @click="delList()"></i>
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
          <b>$ 108.27</b>
        </div>
        <div class="view_cart" @click="toShopCart()"><span>View Cart</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getcartgoodscount, category,getGoodsList} from "../api/register";
  export default {
    data() {
      return {
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
      goShopping: function () {
        this.$router.push('/')
      },
      visible:function(){
        this.show = true;
      },
      invisible:function(){
        this.show = false;
      },
      async getGoodsListFuc(){
        var that = this
        // that.payList = []
        // that.totalPay = 0
        var goodsListOn = []
        var goodsListOff = []
        let data = await getGoodsList();
        this.goodsList = data
        for (var i = 0;i<that.goodsList.length;i++){
          var obj = that.goodsList[i]
          if (that.goodsList[i].sku_status == 1) {
            goodsListOn.push(obj)
          } else if (that.goodsList[i].sku_status === 0){
            goodsListOff.push(obj)
          }
        }
        this.goodsListOn = goodsListOn
        this.goodsListOff = goodsListOff
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
          console.log('888889999', data.data)
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
<style lang="scss" scoped>
  .cart_list{
    transition: all .5s ease;
  }
  .cart_list{
    width:560px;
    min-height: 300px;
    background:#fff;
    position: fixed;
    top: 0;
    right: 0px;
    z-index: 999;
    .cart_title{
      height:60px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      padding:0 20px;
      box-sizing: border-box;
      p{
        width:500px;
        text-align: center;
        float: right;
        font-size: 18px;
        color: #333;
      }
      i{
        font-size: 16px;
      }
    }
    .cart_center{
      max-height:80vh;
      overflow-y:scroll;
      ul{
        padding-bottom: 120px;
        li{
          height: 80px;
          margin:20px 0;
          padding:0 20px;
          box-sizing: border-box;
          img{
            width: 80px;
            height: 80px;
            border:1px solid #e5e5e5;
            float: left;
            margin-right: 20px;
          }
          .list_detail{
            float: left;
            .detail_title{
              width:260px;
              font-size: 14px;
              color: #333;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom:8px;
            }
            .spec_color{
              font-size:14px;
              color: #333;
              span{
                color: #666;
              }
            }
          }
          .price_del{
            float:left;
            height: 100%;
            margin-left: 100px;
            position: relative;
            i{
              color: #aca9a9;
              font-size: 20px;
              cursor: pointer;
            }
            .price{
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
      .empty_cart{
        width:100%;
        height:300px;
        padding:100px 0;
        box-sizing: border-box;
        text-align:center;
        .noGoodsText{
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }
        .shopBtn{
          font-size: 14px;
          color: #121037;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .total{
      position:absolute;
      bottom: 0;
      z-index: 100;
      background: #fff;
      width: 100%;
      .total_price{
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #e5e5e5;
        padding:0 20px;
        box-sizing: border-box;
        span{
          font-size: 18px;
          color: #333;
          font-weight: bolder;
        }
        b{
          float: right;
          font-size: 18px;
          color: #c51015;
        }
      }
      .view_cart{
        width: 100%;
        display: flex;
        justify-content: center;
        height: 45px;
        line-height: 45px;
        background: #c51015;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  li {
    list-style: none;
  }
  .searchBox{
    width: 700px;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .optionList{
    width: 340px;
    display: flex;
    padding-top: 6px;
    justify-content: space-between;
  }
  .wrap_1 {
    width: 100%;
  }
  .nav{
    width: 1440px;
    /*margin-left: 140px;*/
    margin: 0 auto;
    height: 30px;
    position: relative;
  }
  .wrap {
    width: 100%;
    /*margin-left: 140px;*/
    margin: 0 auto;
  }
  .list_box{
    height: 100px;
  }
  .list_box>div{
    height: 30px;
    font-size: 12px;
    color: #999999;
  }
  .title {
    // width: 85%;
    height: 40px;
    background: rgba(18, 16, 55, 1);
  }
  .title_word {
    width: 1440px;
    height: 40px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 40px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 1);
  }
  .content {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .contentHd{
    width: 1440px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }
  .content_box {
    box-sizing: border-box;
    width: 1440px;
    margin: 0 auto;
  }
  .LOGO2 {
    width: 160px;
    height: 39px;
    background: rgba(0, 0, 0, 0);
    margin-left: -1px;
    margin-top: 20px;
    float: left;
    cursor: pointer;
  }
  .search {
    // display: inline-block;
    width: 300px;
    height: 32px;
    display: inline-block;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(18, 16, 55, 1);
  }
  .search_right {
    // display: inline-block;
    width: 80px;
    height: 32px;
    float: right;
    background: rgba(18, 16, 55, 1);
  }
  .search_word {
    width: 48px;
    height: 19px;
    font-size: 16px;
    font-family: Tahoma;
    font-weight: 400;
    margin: 5px 5px 5px 14px;
    color: rgba(255, 255, 255, 1);
  }
  .login {
    width: 110px;
    height: 40px;
    display: flex;
    cursor: pointer;
  }
  .login_left > img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0);
  }
  .login_right {
    padding-left: 5px;
    width: 80px;
    height: 18px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 18px;
    margin-top: 6px;
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .wish {
    width: 110px;
    height: 40px;
    display: flex;
    cursor: pointer;
    padding-left: 20px;
  }
  .wish_left > img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0);
  }
  .wish_right {
    padding-left: 5px;
    width: 30px;
    height: 17px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 28px;
    color: rgba(3, 3, 3, 1);
  }
  .cart {
    width: 110px;
    height: 40px;
    display: flex;
    cursor: pointer;
    padding-left: 20px;
  }
  .cart_left{
    display: flex;
  }
  .cart_left > img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0);
  }
  .cart_right {
    padding-left: 5px;
    width: 30px;
    height: 17px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 28px;
    color: rgba(3, 3, 3, 1);
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #333333;
    padding-right: 93px;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
  .el-dropdown-menu {
    position: absolute;
    top: 126px;
    left: 0;
    padding: 10px 0;
    margin: 5px 0;
    border: none;
  }
  element.style {
    /* transform-origin: center top; */
    z-index: 2015;
    display: none;
  }
  .nav {
    width: 100%;
    height: 30px;
    margin-top: 30px;
    border-bottom: 1px solid gainsboro;
  }
  .data{
    width: 150px;
    color: #333;
    height: 30px;
    font-family: Tahoma;
    text-align: center;
  }
  .data:hover{
    color: #c51015;
  }
  .content_box1 {
    box-sizing: border-box;
    padding-left: 120px;
    width: 1440px;
    height: 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 35px;
    z-index: 1111;
    background-color: #fff;
  }
  .content_box li {
    float: left;
    position: relative;
    font-size: 14px;
    list-style: none;
    cursor: pointer;
  }
  .content_box1 {
    display: none;
  }
  .content_box li:hover .content_box1 {
    width: 1440px;
    height: 200px;
    position: absolute;
    top: 30px;
    display: block;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    margin: 0 auto;
    box-shadow:0 2px 0 0 #f1f1f5;
    border-top: 1px solid gainsboro;
    padding: 20px;
  }
  .box-item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    font-family: Tahoma;
  }
  .box-item:hover{
    color: #c51015;
  }
  .nav span {
    font-size: 14px;
  }
</style>
