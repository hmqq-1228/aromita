<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav activeIndex="4"></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Coupon</h3>
                        <div class="Coupons">
                          <div class="couponRules">coupon rules</div>
                            <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
                                <el-tab-pane :label="'Valid Coupons ('+ validNum + ')'" name="first">
                                  <div class="pointBox">
                                    <div class="coupon">
                                      <div class="couponItem" v-if="showFlag" v-for="(coupon, index) in couponList">
                                        <div class="couponInfo">
                                          <div class="info">
                                            <div class="infoFee"><span class="tag">$</span> <span class="num">{{coupon.cc_amount}}</span></div>
                                            <div class="couponUse">For order ${{coupon.coupon_minimum_order}}+</div>
                                          </div>
                                          <div class="couponTime">
                                            <div class="stateFlag" v-if="coupon.is_expire === 1">soon to expired</div>
                                            <div style="line-height: 34px;width: 120px;">Expired Date:</div>
                                            <div class="timeRange" :class="coupon.cc_coupon_start_time?'':'noStartTime'">
                                              <div v-if="coupon.cc_coupon_start_time">{{coupon.cc_coupon_start_time}}</div>
                                              <div v-if="coupon.cc_coupon_end_time">{{coupon.cc_coupon_end_time}}</div>
                                            </div>
                                          </div>
                                          <div class="yuan"></div>
                                          <div class="yuanRt"></div>
                                        </div>
                                      </div>
                                      <div v-if="!showFlag" style="text-align: center;line-height: 60px;color: #666;width: 100%;">Sorry, your account doesn't have valid coupons.</div>
                                    </div>
                                    <div class="loadMore" v-if="couponNum>40 && couponList.length < couponNum"  @click="addMoreList('1')">Load More</div>
                                  </div>
                                </el-tab-pane>
                                <el-tab-pane :label="'Invalid Coupons (' + invalidNum + ')'" name="second">
                                  <div class="pointBox">
                                    <div class="coupon">
                                      <div class="couponItem" v-if="showFlag" v-for="(coupon, index) in couponList">
                                        <div class="couponInfo overdata">
                                          <div class="info">
                                            <div class="infoFee unUse"><span class="tag">$</span> <span class="num">{{coupon.cc_amount}}</span></div>
                                            <div class="couponUse" style="color: #a7a7a7;">For order ${{coupon.coupon_minimum_order}}+</div>
                                            <div class="Expired" v-if="coupon.cc_coupon_status === 30">Expired</div>
                                            <div class="Expired" v-if="coupon.cc_coupon_status === 20">Used</div>
                                          </div>
                                          <div class="couponTime">
                                            <div style="line-height: 34px;width: 120px;color: #a7a7a7">Expired Date:</div>
                                            <div class="timeRange" style="color: #a7a7a7" :class="coupon.cc_coupon_start_time?'':'noStartTime'">
                                              <div v-if="coupon.cc_coupon_start_time">{{coupon.cc_coupon_start_time}}</div>
                                              <div v-if="coupon.cc_coupon_end_time">{{coupon.cc_coupon_end_time}}</div>
                                            </div>
                                          </div>
                                          <div class="yuan grey"></div>
                                          <div class="yuanRt grey"></div>
                                        </div>
                                      </div>
                                      <div v-if="!showFlag" style="text-align: center;line-height: 100px;color: #666;width: 100%;">your account doesn't have invalid coupons.</div>
                                    </div>
                                    <div class="loadMore" v-if="couponNum>40 && couponList.length < couponNum"  @click="addMoreList('0')">Load More</div>
                                  </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import {couponList} from "@/api/account.js"
import qs from 'qs'
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
          activeName:'first',
          couponList: [],
          expireList: [],
          showFlag: true,
          couponNum: 0,
          validNum: 0,
          invalidNum: 0,
          page: 1
        }
    },
   created () {
      this.getcouponNum()
      this.getCouponList('1')
   },
    methods:{
      getcouponNum () {
        var that = this
        that.$axios.get('api/mycouponcount', {}).then(res => {
          // console.log('kkkkk', res)
          if (res.code === 200) {
            that.validNum = res.data.validcoupon_num
            that.invalidNum = res.data.invalidcoupon_num
          }
        })
      },
      handleClick(name){
        this.couponList = []
        if (name === 'first') {
          this.page = 1
          this.getCouponList('1')
        } else if (name === 'second') {
          this.page = 1
          this.getCouponList('0')
        }
        // console.log('666666', this.activeName)
      },
      addMoreList: function (num) {
        this.page = this.page + 1
        this.getCouponList(num)
      },
      getCouponList: function (num) {
        var that = this
        couponList({page: that.page, status: num}).then((res)=>{
          if (res.code === 200) {
            if(this.page === 1){
              that.couponList = res.data.coupon.data
              that.expireList = res.data.is_expire
            }else{
              that.couponList = that.couponList.concat(res.data.coupon.data);
              that.expireList = that.expireList.concat(res.data.is_expire)
            }
            that.couponNum = res.data.coupon.total
            if (num == 1) {
              for (var i=0;i<that.couponList.length;i++) {
                that.$set(that.couponList[i], 'is_expire', 0)
                for (var j=0;j<that.expireList.length;j++) {
                  if (that.expireList[j] === 1) {
                    that.couponList[j].is_expire = that.expireList[j]
                  }
                }
              }
            }
            // console.log('111111',that.couponList)
            if (that.couponList.length > 0) {
              that.showFlag = true
            } else {
              that.showFlag = false
            }
          }
        })
      },
    }
}
</script>
<style lang="scss" scoped>
  .timeRange.noStartTime{
    line-height: 34px;
  }
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


