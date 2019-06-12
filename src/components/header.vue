<template>
  <!-- 头部 -->
  <div class="wrap1">
    <div class="wrap">
      <div class="title">
        <p class="title_word">Contact Us: 1-626-586-3448 (Mon-Fri 9am-6pm PST.)</p>
      </div>
      <!-- 中间内容 -->
      <div class="content">
        <div class="content_box">
          <!-- 左边logo -->
          <div class="LOGO2" @click="handleGoHome">
            <img src="@/assets/LOGO2.png" alt>
          </div>

          <!-- 搜索框 -->
          <div class="search">
            <div class="search_right">
              <p class="search_word">Search</p>
            </div>
          </div>
          <!-- 登录 -->
          <div class="login">
            <div class="login_left" @click="HandleLogin">
              <img src="@/assets/login.png" alt>
            </div>
            <div class="login_right">
              <p class="login_word">login</p>
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
          <div class="cart">
            <div class="cart_left">
              <img src="@/assets/cart.png" alt>
            </div>
            <div class="cart_right">
              <p class="cart_word">cart</p>
            </div>
          </div>
        </div>
        <div class="nav">
          <ul class="content_box">
            <li v-for="(item,index) in nav_arr" :key="index">
              {{item.nav}}
              <div class="content_box1" v-for=" i in column">
                <div class="box-item" v-if="array[(i-1)*column+(j-1)] != undefined" v-for="j in maxRow">{{ array[(i-1)*column+(j-1)]}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        nav_arr: [{
            nav: 'STANLESS STEEL'
          },
          {
            nav: 'FINISHED JEWELRY'
          },
          {
            nav: 'ACCESSORIES'
          },
          {
            nav: 'SILVER JEWELRY'
          }
        ],
        // list: new Array(11).fill(111),
        // sel_arr: [{
        //     name: "111111111111111"
        //   },
        //   {
        //     name: "2111111111111111"
        //   },
        //   {
        //     name: "3111111111111111"
        //   },
        //   {
        //     name: "4111111111111111"
        //   },
        //   {
        //     name: "5111111111111111"
        //   },
        //   {
        //     name: "6111111111111111"
        //   },
        //   {
        //     name: "7111111111111111"
        //   },
        //   {
        //     name: "8111111111111111"
        //   },
        //   {
        //     name: "9111111111111111"
        //   },
        //   {
        //     name: "1011111111111111"
        //   },
        //   {
        //     name: "111111111111111"
        //   },
        //   {
        //     name: "121111111111111"
        //   },
        //   {
        //     name: "131111111111111"
        //   },
        //   {
        //     name: "141111111111111"
        //   },
         
        // ],
        // activeNav: '',
        theNum: 5,
        interval: null,
        maxShowNum: 12,
        maxRow: 4,
        column: '',
        array:[1,2,3,4,5,6,7,8,9,10,11,12,13]
      };
    },
     methods: {
      // 鼠标移入
      sel_enter(nav) {
        // this.activeNav = nav
      },
      sel_leave() {
        // this.activeNav = ''
      },
      handleGoHome(){
         this.$router.push({
        path: "/"
      });
      },
      HandleLogin(){
         this.$router.push({
        path: "/login"
      });
      },
    },
  created() {
    this.column = this.array.length % this.maxRow ? parseInt (this.array.length / this.maxRow) + 1 : this.array.length / this.maxRow; //这个是算会有几列
    this.column = this.column > this.maxRow ? this.maxRow : this.column;
    // for(var i=0;i<this.column;i++){  
    //     for(var j=0;j<this.maxRow;j++){
    //         this.array[i*this.column+j]
    //     }
    // }
  }
};
</script>
<style lang="scss">
li {
  list-style: none;
}
.wrap_1 {
  width: 100%;
}
.wrap {
  width: 85%;
  margin-left: 140px;
  // margin: 0 auto;
}
.title {
  // width: 85%;
  height: 40px;
  background: rgba(18, 16, 55, 1);
}
.title_word {
  width: 404px;
  height: 16px;
  font-size: 13px;
  font-family: Tahoma;
  font-weight: 400;
  padding-left: 93px;
  padding-top: 12px;
  color: rgba(255, 255, 255, 1);
}

.content {
  width: 100%;
  position: relative;
  .content_box {
    box-sizing: border-box;
    padding: 0 100px;
  }
  .content_box1 {
    box-sizing: border-box;
    padding: 0 100px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    line-height: 35px;
    z-index: 1111;
  }
  .LOGO2 {
    width: 160px;
    height: 39px;
    background: rgba(0, 0, 0, 0);
    margin-left: -1px;
    margin-top: 19px;
    float: left;
  }
  .search {
    // display: inline-block;
    width: 280px;
    height: 32px;
    display: inline-block;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(18, 16, 55, 1);
    margin-left: 703px;
    margin-top: 27px;
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
    font-family: "微软雅黑";
    font-weight: 400;
    margin: 5px 5px 5px 14px;
    color: rgba(255, 255, 255, 1);
  }
  .login {
    width: 60px;
    height: 40px;
    display: flex;
    margin-left: 1170px;
    margin-top: -31px;
  }
  .login_left > img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0);
  }
  .login_right {
    padding-left: 5px;
    width: 30px;
    height: 17px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    line-height: 28px;
    color: rgba(3, 3, 3, 1);
  }
  .wish {
    width: 60px;
    height: 40px;
    display: flex;
    margin-left: 1275px;
    margin-top: -39px;
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
    width: 60px;
    height: 40px;
    display: flex;
    margin-left: 1385px;
    margin-top: -41px;
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
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid gainsboro;
  }
  .content_box li {
    float: left;
    position: relative;
    margin-left: 20px;
    list-style: none;
    cursor: pointer;
  }
  .content_box1 {
    display: none;
  }
  .content_box1 .box-item {
    height: 10px;
  }
  .content_box li:hover .content_box1 {
    position: absolute;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 10px;
    height: 60px;
  }
  .box-item {
    font-size: 16px;
    margin-top: 10px;
    padding-right: 80px;
  }
  .nav span {
    font-size: 17px;
    margin-right: 60px;
  }
}
</style>