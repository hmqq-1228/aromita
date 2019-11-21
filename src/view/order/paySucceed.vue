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
        <div class="suggestion">
          <div class="name">Your Suggestion</div>
          <el-input
            type="textarea"
            :rows="4"
            maxlength="2000"
            show-word-limit
            placeholder="please enter your any suggestion."
            v-model="textarea">
          </el-input>
          <div style="text-align: right; margin-top: 20px;">
            <el-button :disabled="subFlag" size="medium" type="primary" @click="subSuggestion">Submit</el-button>
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
      getScore: 0,
      textarea: '',
      subFlag: true
    }
  },
  created(){
    this.getSucceedState()
  },
  watch:{
    textarea (val ,Ov) {
      if (val) {
        this.subFlag = false
      } else {
        this.subFlag = true
      }
    }
  },
  methods:{
    getSucceedState: function () {
    // console.log('kkkk', this.$route.query.order_number)
      this.orderNumber = this.$route.query.order_number
      this.getScore = this.$route.query.score
    },
    subSuggestion: function () {
      alert('ssssss')
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
