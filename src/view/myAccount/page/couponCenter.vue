<template>
  <div class="account">
    <div class="accountBox">
      <Left-Nav></Left-Nav>
      <div class="navCount">
        <div class="my_order">
          <div class="my_title" style="float: left;margin-bottom: 0;">Coupon center</div>
          <div class="tipFlag"><i class="el-icon-check" ></i> <span>successfully, please check it in My Coupons</span></div>
          <div class="couponCont">
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <!--<div class="buttonType">Get it now</div>-->
                  <div class="buttonType got">Your coupon</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType" @click="getCoupon()">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType" @click="getCoupon()">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
            <div class="couponCenterItem">
              <div class="couponCenterInfo">
                <div class="centerInfo">
                  <div class="centerValue"><i>$</i> <span>50</span></div>
                  <div class="useType">For order $100+</div>
                  <div class="useType" style="margin-top: 6px;">Vaild:</div>
                  <div class="useType time">2019-09-23 00:00:00-2019-10-23 23:59:59</div>
                </div>
                <div class="centerBut">
                  <div class="buttonType">Get it now</div>
                </div>
                <div class="yuan"></div>
                <div class="yuanRt"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Left from "../element/leftNav"
export default {
  components: {
    "Left-Nav":Left
  },
  name: "couponCenter",
  created(){
   this.getCouponList()
  },
  methods: {
    getCouponList() {
      var that = this
      that.$axios.get('api/couponcenter',{}).then(res => {
        console.log('hhhhh666',res)
        if (res.code === 200) {

        }
      })
    },
    getCoupon(){
      $('.tipFlag').css('opacity',1)
      setTimeout(function () {
        $('.tipFlag').css('opacity',0)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>
