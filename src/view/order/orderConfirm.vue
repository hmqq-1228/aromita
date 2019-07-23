<template>
<div class="orderConfirm">
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="orderBox">
    <div class="orderCont">
      <div class="orderState">
        <div class="stateItem active">
          <div class="stateText">Place Order</div>
          <div class="jianTou"></div>
        </div>
        <div class="stateItem">
          <div class="jianTouLt"></div>
          <div class="stateText">Payment</div>
          <div class="jianTou"></div>
        </div>
        <div class="stateItem">
          <div class="jianTouLt"></div>
          <div class="stateText end">Succeed</div>
        </div>
      </div>
    </div>
  </div>
  <div class="foot">
    <footer-com></footer-com>
  </div>
</div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "orderConfirm"
}
</script>

<style scoped>
  .orderCont{
    width: 1440px;
    margin: 0 auto;
    min-height: 300px;
  }
  .orderState{
    height: 32px;
    width: 1020px;
    display: flex;
    justify-content: start;
    margin-top: 24px;
  }
  .stateItem{
    width: 350px;
    height: 31px;
    display: flex;
    justify-content: start;
    position: relative;
  }
  .stateText{
    width: 330px;
    height: 31px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    background-color: #e1e1e1;
  }
  .stateText.end{
    width: 350px;
  }
  .jianTou{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 888;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 20px solid #e1e1e1;
  }
  .jianTouLt{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 666;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
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
