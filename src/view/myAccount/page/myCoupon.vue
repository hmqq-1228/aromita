<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Coupon</h3>
                        <div class="Coupons">
                            <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
                                <el-tab-pane label="Valid Coupons" name="first">
                                  <div class="pointBox">
                                    <div class="coupon">
                                      <div class="couponItem" v-if="showFlag" v-for="(coupon, index) in couponList">
                                        <div class="couponInfo">
                                          <div class="info">
                                            <div class="infoFee"><span class="tag">$</span> <span class="num">{{coupon.cc_amount}}</span></div>
                                            <div class="couponUse">For order ${{coupon.coupon_minimum_order}}+</div>
                                          </div>
                                          <div class="couponTime">
                                            <div class="stateFlag">soon to expired</div>
                                            <div style="line-height: 34px;width: 120px;">Expired Date:</div>
                                            <div class="timeRange">
                                              <div>{{coupon.cc_coupon_start_time}}</div>
                                              <div>{{coupon.cc_coupon_end_time}}</div>
                                            </div>
                                          </div>
                                          <div class="yuan"></div>
                                          <div class="yuanRt"></div>
                                        </div>
                                      </div>
                                      <div v-if="!showFlag" style="text-align: center;line-height: 60px;color: #666;width: 100%;">Sorry, your account doesn't have valid coupons.</div>
                                    </div>
                                  </div>
                                </el-tab-pane>
                                <el-tab-pane label="Invalid Coupons" name="second">
                                  <div class="pointBox">
                                    <div class="coupon">
                                      <div class="couponItem" v-if="showFlag" v-for="(coupon, index) in couponList">
                                        <div class="couponInfo overdata">
                                          <div class="info">
                                            <div class="infoFee unUse"><span class="tag">$</span> <span class="num">{{coupon.cc_amount}}</span></div>
                                            <div class="couponUse" style="color: #a7a7a7;">For order ${{coupon.coupon_minimum_order}}+</div>
                                          </div>
                                          <div class="couponTime">
                                            <div style="line-height: 40px;width: 120px;color: #a7a7a7">Expired Date:</div>
                                            <div class="timeRange" style="color: #a7a7a7">
                                              <div>{{coupon.cc_coupon_start_time}}</div>
                                              <div>{{coupon.cc_coupon_end_time}}</div>
                                            </div>
                                          </div>
                                          <div class="yuan grey"></div>
                                          <div class="yuanRt grey"></div>
                                        </div>
                                      </div>
                                      <div v-if="!showFlag" style="text-align: center;line-height: 100px;color: #666;width: 100%;">your account doesn't have invalid coupons.</div>
                                    </div>
                                  </div>
                                </el-tab-pane>
                            </el-tabs>
                            <!--<div class="page_list">-->
                                <!--<el-pagination-->
                                    <!--background-->
                                    <!--layout="prev, pager, next"-->
                                    <!--:total="1000">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import qs from 'qs'
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
          activeName:'first',
          couponList: [],
          showFlag: true,
          couponNum: 0
        }
    },
   created () {
      this.getCouponList('10')
   },
    methods:{
        handleClick(name){
          this.couponList = []
          if (name === 'first') {
            this.getCouponList('10')
          } else if (name === 'second') {
            this.getCouponList('30')
          }
          // console.log('666666', this.activeName)
        },
      getCouponList: function (num) {
        var that = this
        var payMon = qs.stringify({
          subtotal: 999999999,
          coupon_status: num
        })
        that.$axios.post('api/getCustomerCoupon', payMon).then(res => {
          // console.log('hhhhh666',res)
          if (res.code === 200) {
            that.couponList = res.data
            that.couponNum = res.data.length
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
@import "@/assets/css/account.scss"
</style>


