<template>
  <div class="paySucceed">
    <aheader-com></aheader-com>
    <div class="orderCont">
      <div class="orderInfo">
        <div class="orderState">
          <div class="stateItem active">
            <div class="stateText">Place Order</div>
            <div class="jianTou"></div>
          </div>
          <div class="stateItem active">
            <div class="jianTouLt"></div>
            <div class="stateText">Payment</div>
            <div class="jianTou"></div>
          </div>
          <div class="stateItem">
            <div class="jianTouLt"></div>
            <div class="stateText end">Succeed</div>
          </div>
        </div>
        <div class="succeed">
          <div class="titlePaySucceed"><i class="el-icon-warning"></i> <span>Payment Failed</span></div>
          <div class="payInfo">
            <div class="payItem">Sorry, your payment was not successfully</div>
            <div class="payItem">
              <div class="itemName">Reason:</div>
              <div class="itemCont">your payment was not successfully</div>
            </div>
            <div class="payItem">Please double check the details or try a different payment method.</div>
            <div class="tryAgain">Try again</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <afooter-com></afooter-com>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/aheader.vue";
  import Footer from "@/components/afooter.vue";
  export default {
    components: {
      "aheader-com": Header,
      "afooter-com": Footer
    },
    name: "payFailed"
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>

