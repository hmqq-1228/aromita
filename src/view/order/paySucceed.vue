<template>
  <div class="paySucceed2">
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

<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
