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
      <div class="navTitle">Shipping Address</div>
      <div class="address">
        <div class="addressItem">
          <div class="itemName"><el-radio v-model="radio" label="1"><i class="el-icon-s-custom" style="color: #ccc;"></i> Rosie Eva</el-radio></div>
          <div class="itemAddress">
            <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
            <div class="addressText">bcjkdbsfhniodheiof, cnjdskagvcvn, new york, Alabama, United States, 12456. we are we are we are we are</div>
          </div>
          <div class="itemPone"><i class="el-icon-phone"></i> <span>1234567890</span></div>
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
  name: "orderConfirm",
  data () {
    return {
      radio: '1'
    };
  }
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
  .navTitle{
    width:145px;
    height:22px;
    font-size:18px;
    font-family:Tahoma;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-top: 30px;
  }
  .addressItem{
    width:948px;
    height:60px;
    margin-top: 21px;
    display: flex;
    justify-content: start;
    border:1px solid #E9E9E9;
  }
  .itemName{
    height: 60px;
    width: 190px;
    line-height: 60px;
    padding-left: 20px;
  }
  .itemAddress{
    width: 280px;
    height: 60px;
    line-height: 60px;
    font-size:12px;
    font-family:Tahoma;
    color: #ccc;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .addressText{
    width: 258px;
    height: 40px;
    line-height:18px;
    color: #333;
    float: right;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break:break-word;
  }
  .itemPone{
    width: 200px;
    height: 60px;
    line-height: 60px;
    font-size:12px;
    font-family:Tahoma;
    color: #ccc;
    text-align: center;
  }
  .itemPone span{
    color: #333;
  }
</style>
