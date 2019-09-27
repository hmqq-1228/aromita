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
          <div class="stateItem active">
            <div class="jianTouLt"></div>
            <div class="stateText end">Succeed</div>
          </div>
        </div>
        <div class="succeed">
          <div class="titlePaySucceed"><i class="el-icon-success"></i> <span>Payment Successful</span></div>
          <div class="payInfo">
            <div class="payItem">
              <div class="itemName">Order:</div>
              <div class="itemCont">{{orderNumber}}</div>
            </div>
            <div class="payItem">
              <div class="itemName">Status:</div>
              <div class="itemCont">Processing</div>
            </div>
            <div class="payItem">
              <div class="itemName">Award Point:</div>
              <div class="itemCont">{{getScore}}</div>
            </div>
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
import {succeedState} from "../../api/register";
export default {
  components: {
    "aheader-com": Header,
    "afooter-com": Footer
  },
  name: "paySucceed",
  data(){
    return{
      orderNumber: '',
      getScore: 0
    }
  },
  created(){
    this.getSucceedState()
  },
  methods:{
    getSucceedState: function () {
    // console.log('kkkk', this.$route.query.order_number)
      this.orderNumber = this.$route.query.order_number
      this.getScore = this.$route.query.score
    }
    // async getSucceedState () {
    //   let data = await succeedState()
    //   this.orderNumber = data.data
    // }
  }
}
</script>

<style scoped>
  .payItem{
    height: 36px;
    line-height: 36px;
    display: flex;
    margin-left: 60px;
    justify-content: start;
  }
  .foot{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .itemName{
    color: #666;
    width: 100px;
    text-align: right;
  }
  .itemCont{
    color: #333;
    margin-left: 40px;
  }
  .payInfo{
    width: 400px;
    clear: both;
  }
  .succeed{
    width: 400px;
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
    color: #7cd35f;
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
