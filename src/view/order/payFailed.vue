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
    <afooter-com></afooter-com>
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

<style scoped>
  .tryAgain{
    color: #fff;
    width: 132px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    font-family:Tahoma;
    border-radius: 4px;
    background-color: #121037;
    margin-left: 60px;
    margin-top: 10px;
  }
  .payItem{
    height: 30px;
    line-height: 30px;
    display: flex;
    margin-left: 60px;
    justify-content: start;
  }
  .itemName{
    color: #666;
    width: 50px;
    text-align: right;
  }
  .itemCont{
    color: #333;
    margin-left: 20px;
  }
  .payInfo{
    width: 500px;
    clear: both;
  }
  .succeed{
    width: 500px;
    font-size: 14px;
    font-family: Tahoma;
    font-weight: 400;
    margin: 0 auto;
    margin-top: 30px;
  }
  .titlePaySucceed{
    font-size: 18px;
    font-weight:bold;
    color: #333;
    line-height: 60px;
  }
  .titlePaySucceed i{
    font-size: 60px;
    float: left;
    color: #c51015;
  }
  .titlePaySucceed span{
    float: left;
    margin-left: 10px;
  }
  .orderCont{
    width: 1440px;
    margin: 0 auto;
    min-height: 400px;
    display: flex;
    justify-content: space-between;
  }
  .orderInfo{
    width: 1020px;
  }
  .orderState{
    height: 32px;
    width: 1020px;
    display: flex;
    justify-content: start;
    margin-top: 24px;
  }
  .stateItem{
    width: 340px;
    height: 32px;
    display: flex;
    justify-content: start;
    position: relative;
  }
  .stateText{
    width: 320px;
    height: 32px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    font-family: Tahoma;
    background-color: #e1e1e1;
  }
  .stateText.end{
    width: 340px;
  }
  .jianTou{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 888;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 20px solid #e1e1e1;
  }
  .jianTouLt{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 666;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 20px solid #fff;
  }
  .active .stateText{
    background-color: #c51015;
  }
  .active .jianTou{
    border-left: 20px solid #c51015;
  }
  .stateItem:nth-of-type(2){
    margin-left: -16px;
  }
  .stateItem:nth-of-type(3){
    margin-left: -16px;
  }
</style>

