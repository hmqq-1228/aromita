<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <Left-Nav activeIndex="1"></Left-Nav>
        <div class="navCount">
          <h3 class="my_title">Order Refund</h3>
          <div class="refund_apply">
            <ul class="refund_nav">
              <li :class="{'active':activeIndex>=1}">Request Return</li>
              <li :class="{'active':activeIndex>=2}">Under review</li>
              <li :class="{'active':activeIndex>=3}">Return items</li>
              <li :class="{'active':activeIndex>=4}">Refund successful</li>
            </ul>
            <div class="refund_examine">
              <div class="examine_tip" v-if="status == 10 || status == 20">
                <div style="line-height: 26px;">
                  <h5>We've received your request, and someone from our team will be in touch soon. It will take about 1-2 business days to processe your request. Please wait.</h5>
                  <p>We will notify you through email when the request has been processed.</p>
                  <p>Sorry, your request was rejected. Please see the details attached. Any question, please contact <span class="email">Aromita@gmail.com</span></p>
                </div>
                <div class="status2"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span> <span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
                <div class="cancel_refund" @click="cancelledBtn()">Cancelled request</div>
              </div>
              <div class="examine_tip" v-if="status == 100">
                <div style="height: 78px;">
                  <div class="cancelOrderFlag">
                    <span class="el-icon-success" style="color: #67C23A;"></span>
                    <div>Cancelled after sales service successfully.</div>
                  </div>
                </div>
                <div class="status2"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span> <span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
              </div>
              <!--<div class="examine_tip" v-if="status == 3">-->
              <!--<h5>您的退货申请已审核通过，请等待商家审核处理，1-2个工作日之内会完成处理</h5>-->
              <!--</div>-->
              <div class="examine_tip" v-if="status == 50">
                <h5>Your refund request hasn't been approved for the following reasons: {{feedbackRefund}}</h5>
                <p style="margin-top: 10px">If you are in any doubt, please contact <span class="email">Aromita@gmail.com</span></p>
                <div class="status2"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span><span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
              </div>
              <div class="examine_tip" v-if="status == 51">
                <h5>Your refund request hasn't been approved for the following reasons: {{feedbackRefund}}</h5>
                <p style="margin-top: 10px">If you are in any doubt, please contact <span class="email">Aromita@gmail.com</span></p>
                <div class="status2"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span><span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
              </div>
              <div class="examine_tip" v-if="status == 31">
                <h5>Your return request is approved. Please ship them back in time, and let us know the tracking number. Thank you.</h5>
                <div class="status6"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span>
                  <el-popover
                    placement="right"
                    width="220"
                    trigger="hover">
                    <div class="feeInfo">
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund items amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.subtotal}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund tax amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.tax}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund shipping fee:</div>
                        <div style="color: #C51015">$ {{refundMoney.ship_fee}}</div>
                      </div>
                    </div>
                    <i slot="reference" v-if="refundMoney.refund_total"> <img style="margin-left: 4px;" src="../../../../../static/img/detail.png" alt=""></i>
                  </el-popover>
                </div>
                <div class="status6" style="height: 55px;">
                  <span>Tracking number：</span>
                  <el-input style="width: 380px;" v-model="inputTracking" placeholder="Please enter the tracking number to expedite the refund."></el-input>
                  <div class="trackSub" @click="trackNumSub">Submit</div>
                  <div class="inputTrackingTip" v-if="inputTrackingTip">请输入订单号</div>
                </div>
              </div>
              <div class="examine_tip" v-if="status == 30">
                <p>Your return request is approved. And you don't need to ship them back. We will refund you ASAP. Any question, please contact <span class="email">Aromita@gmail.com</span></p>
                <div class="status6"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span>
                  <el-popover
                    placement="right"
                    width="220"
                    trigger="hover">
                    <div class="feeInfo">
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund items amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.subtotal}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund tax amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.tax}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund shipping fee:</div>
                        <div style="color: #C51015">$ {{refundMoney.ship_fee}}</div>
                      </div>
                    </div>
                    <i slot="reference" v-if="refundMoney.refund_total"><img style="margin-left: 4px;" src="../../../../../static/img/detail.png" alt=""></i>
                  </el-popover>
                </div>
              </div>
              <div class="examine_tip" v-if="status == 40">
                <p>We've received your tracking number. Once receive the parcel, we will refund you ASAP.</p>
                <div class="status6"><span>Tracking number：</span>{{return_num}}</div>
                <div class="status6"><span>Refund：</span><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span>
                  <el-popover
                    placement="right"
                    width="220"
                    trigger="hover">
                    <div class="feeInfo">
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund items amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.subtotal}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund tax amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.tax}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund shipping fee:</div>
                        <div style="color: #C51015">$ {{refundMoney.ship_fee}}</div>
                      </div>
                    </div>
                    <i slot="reference" v-if="refundMoney.refund_total"> <img style="margin-left: 4px;" src="../../../../../static/img/detail.png" alt=""></i>
                  </el-popover>
                </div>
              </div>
              <div class="examine_tip" v-if="status == 60">
                <div><div class="status6" style="display: inline-block;margin-top: 0;"><span class="pay" v-if="refundMoney.refund_total">$ {{refundMoney.refund_total}} </span>
                  <el-popover
                    placement="right"
                    width="220"
                    trigger="hover">
                    <div class="feeInfo">
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund items amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.subtotal}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund tax amount:</div>
                        <div style="color: #C51015">$ {{refundMoney.tax}}</div>
                      </div>
                      <div style="display: flex;justify-content: space-between;">
                        <div>Refund shipping fee:</div>
                        <div style="color: #C51015">$ {{refundMoney.ship_fee}}</div>
                      </div>
                    </div>
                    <i slot="reference" v-if="refundMoney.refund_total"><img style="margin: 0 4px;" src="../../../../../static/img/detail.png" alt=""></i>
                  </el-popover>
                </div> We have intiated a refund to <span v-if="refundMoney.refund_account">{{refundMoney.refund_account}}</span> on {{refundMoney.refund_at}}, Please check it later.</div>
                <p style="margin-top: 10px">Any question, please contact  <span class="email">Aromita@panduo.com.cn</span></p>
              </div>
              <div class="Products_Details">
                <div class="cancel">
                  <h4>The items I want to return：</h4>
                </div>
                <el-table
                  :data="tableData"
                  style="width: 100%;border:1px solid #E9E9E9"
                  size="medium"
                  :header-cell-style="{
                                'background-color': '#F5F5F5',
                                'color': '#333'
                            }">
                  <el-table-column
                    prop="date"
                    label="Product">
                    <template slot-scope="scope">
                      <div class="product">
                        <img :src="scope.row.products_pic" alt="">
                        <div class="detail">
                          <h5>{{scope.row.products_name}}</h5>
                          <p><span v-for="(attr, index) in JSON.parse(scope.row.sku_attrs)"><span>{{attr.attr_name}}: </span>{{attr.value.attr_value}};</span></p>
                          <p>$ {{scope.row.products_price}}</p>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="Quantity"
                    width="220">
                    <template slot-scope="scope">
                      <h5>{{scope.row.refund_quantity}}</h5>
                    </template>
                  </el-table-column>
                </el-table>
                <!--v-if="status != 20 && status != 10"-->
                <!--<p class="price" v-if="status != 20 && status != 10">-->
                  <!--Refund：<b>$ {{refundMoney.refund_total}}</b><span>（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span>-->
                <!--</p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Left from "../../element/leftNav"
  import qs from 'qs'
  export default {
    components: {
      "Left-Nav":Left
    },
    data(){
      return{
        status: '',
        refund_id: '',
        refundMoney: '',
        activeIndex: 1,
        inputTracking: '',
        return_num: '',
        // refundAccount: '',
        feedbackRefund: '',
        cancelOrderFlag: false,
        inputTrackingTip: false,
        tableData: [],
      }
    },
    watch:{

    },
    mounted () {
      if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed () {
      window.removeEventListener('popstate', this.goBack, false);
    },
    created(){
      this.refund_id = this.$route.query.orders_refund_id
      this.getRefundDetail()
    },
    methods:{
      goBack () {
        // sessionStorage.clear();
        // console.log("点击了浏览器的返回按钮", this.$store.state.isApplication);
        if (this.$store.state.isApplication) {
          // console.log("点击了浏览器的返回按钮222");
          window.history.go(-2);
        } else {
          window.history.go(-1);
          // console.log("点击了浏览器的返回按钮111");
        }
        this.$store.state.isApplication = false
      },
      getRefundDetail () {
        var that = this
        that.$axios.get('api/refund/step2/' + that.refund_id, {}).then(res => {
          if (res.code === 200) {
            that.status = res.data.status
            if (that.status == 10 || that.status == 20 || that.status == 50 || that.status == 100) {
              that.activeIndex = 2
            } else if (that.status == 30 || that.status == 31 || that.status == 40 || that.status == 51) {
              that.activeIndex = 3
            } else if (that.status == 60) {
              that.activeIndex = 4
            }
            if (res.data.refund_total) {
              that.refundMoney = res.data.refund_total
            }
            if (res.data.return_num) {
              that.return_num = res.data.return_num
            }
            if (res.data.feedback_for_refund){
              that.feedbackRefund = res.data.feedback_for_refund
            }
            that.tableData = res.data.products_list
          }
        })
      },
      cancelledBtn () {
        var that = this
        that.$axios.get('api/refund/cancel/' + that.refund_id, {}).then(res => {
          if (res.code === 200) {
            that.getRefundDetail()
          }
        })
      },
      // 提交订单号
      trackNumSub () {
        var that = this
        var obj = qs.stringify({
          orders_refund_id: that.refund_id,
          return_num: that.inputTracking
        })
        if (that.inputTracking) {
          that.inputTrackingTip = false
          that.$axios.post('api/refund/commitReturnNum', obj).then(res => {
            if (res.code === 200) {
              that.getRefundDetail()
            }
          })
        } else {
          that.inputTrackingTip = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>
