<template>
  <div class="account">
    <div class="accountBox">
      <Left-Nav activeIndex="3"></Left-Nav>
      <div class="navCount">
        <div class="my_order">
          <div class="my_title" style="margin-bottom: 0;font-weight: bold;">Coupon center</div>
          <!--<div class="tipFlag"><i class="el-icon-check" ></i> <span>successfully, please check it in My Coupons</span></div>-->
          <div class="couponCont">
            <div class="couponCenterItem" v-for="coupon in couponCenterList">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>{{coupon.coupon_amount}}</span></div>
                  <div class="useType">For order ${{coupon.coupon_minimum_order}}+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">{{coupon.coupon_start_time}}-{{coupon.coupon_end_time}}</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType got" v-if="coupon.is_receive === 1">Your coupon</div>
                  <div v-if="coupon.is_receive === 0">
                    <div v-if="coupon.coupon_number === coupon.coupon_number_receive" class="buttonType got">No left</div>
                    <div v-if="coupon.coupon_number>coupon.coupon_number_receive" class="buttonType" @click="getCoupon(coupon.id)">Get it now</div>
                  </div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="loadMore" v-if="totalNum>40 && couponCenterList.length < totalNum"  @click="addMoreList()">Load More</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Left from "../element/leftNav"
import {couponListCenter} from "@/api/account.js"
import qs from 'qs'
export default {
  components: {
    "Left-Nav":Left
  },
  name: "couponCenter",
  data(){
    return{
      page: 1,
      totalNum: 0,
      couponCenterList: []
    }
  },
  created(){
   this.getCouponList()
  },
  methods: {
    addMoreList: function () {
      this.page = this.page + 1
      this.getCouponList()
    },
    // test(){
    //   this.$message.warning('successfully, please check it in My Coupons')
    //   // this.$message.success('successfully, please check it in My Coupons')
    // },
    getCouponList() {
      var that = this
      couponListCenter({page: that.page}).then((res)=>{
        if (res.code === 200) {
          if(this.page === 1){
            that.couponCenterList = res.data.coupon.data
          }else{
            that.couponCenterList = that.couponCenterList.concat(res.data.coupon.data);
          }
          that.totalNum = res.data.coupon.total
          for (var i=0;i<that.couponCenterList.length;i++) {
            that.$set(that.couponCenterList[i], 'is_receive', 0)
            for (var j=0;j<res.data.is_receive.length;j++) {
              if (i===j) {
                that.couponCenterList[i].is_receive = res.data.is_receive[j]
              }
            }
          }
          // console.log('hhhhh666',that.couponCenterList)
        }
      })
    },
    getCoupon(id) {
      var that = this
      var obj = {
        coupon_id: id,
        coupon_count: 1,
      }
      that.$axios.post('api/sendcoupontocustomer', qs.stringify(obj)).then(res => {
        if (res > 0) {
          that.getCouponList()
          this.$message.success('successfully, please check it in My Coupons')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    // getCoupon(){
    //   $('.tipFlag').css('opacity',1)
    //   setTimeout(function () {
    //     $('.tipFlag').css('opacity',0)
    //   }, 2000)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .loadMore{
    height: 40px;
    width: 360px;
    color: #333;
    line-height: 40px;
    text-align: center;
    border: 1px solid #666;
    margin: 30px auto;
    cursor: pointer;
    font-family: Tahoma;
  }
  .loadMore:hover{
    background-color: #121037;
    color: #fff;
  }
  @import "@/assets/css/account.scss"
</style>
