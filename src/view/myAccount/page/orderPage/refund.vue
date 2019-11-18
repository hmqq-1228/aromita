<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <Left-Nav activeIndex="1"></Left-Nav>
        <div class="navCount">
            <h3 class="my_title">Order Refund</h3>
            <div class="refund">
              <p class="refund_rule">If you are unsatisfied with your items for any reason, please initiate returns.
                After the application has been approved, you need to return them back in its original packaging.
                A refund will be issued upon receipt of the returned items.</p>
              <div class="label">
                <p style="color: #333;font-weight: bold;">Please select the type of service：</p>
                <div class="classify">
                  <div class="classification" :class="{'active':status=='Refund'}" @click="changeStatus('Refund')">
                      <img src="@/assets/images/Refund_active.png" v-if="status=='Refund'" alt="" class="refund">
                      <img src="@/assets/images/inRefund.png" v-else alt="" class="refund">
                      <div style="padding-top: 6px;">
                          <h5>Refund</h5>
                          <!--<p>未收到货（包括丢件）/收到货后需要退款</p>-->
                      </div>
                  </div>
                  <!--<div class="classification" :class="{'active':status=='Exchange'}" @click="changeStatus('Exchange')">-->
                      <!--<img src="@/assets/images/Exchange.png" alt="" v-if="status=='Exchange'" class="refund">-->
                      <!--<img src="@/assets/images/inExchange.png" alt="" v-else class="refund">-->
                      <!--<div>-->
                          <!--<h5>Exchange</h5>-->
                          <!--<p>已收到货/未收到货，需要货品更换或补发</p>-->
                      <!--</div>-->
                  <!--</div>-->
                </div>
                <div class="refundPolice"><el-checkbox class="policeStyle" v-model="checked">I have rend and agreed to the</el-checkbox> <span>Return Policy</span></div>
                <div class="Continue" :class="multipleSelection.length>0?'canSub': ''" @click="orderRefundApply()">Continue</div>
                </div>
                <div class="Products_Details">
                    <h4>The items I want to return：</h4>
                    <el-table
                        :data="tableData"
                        size="medium"
                        :row-class-name="tableRowClassName"
                        @selection-change="handleSelectionChange"
                        :header-cell-style="{
                            'background-color': '#F5F5F5',
                            'color': '#333'
                        }">
                        <el-table-column
                            type="selection"
                            :selectable="checkSelectable"
                            width="40">
                        </el-table-column>
                      <el-table-column
                        prop="date"
                        label="Select All"
                        width="150">
                        <template slot-scope="scope">
                          <div class="product">
                            <div class="tip" v-if="!scope.row.can_refund">closed</div>
                            <img style="margin-right: 0;" :src="scope.row.products_pic" alt="">
                          </div>
                        </template>
                      </el-table-column>
                        <el-table-column
                            prop="date"
                            label="Product"
                            width="560">
                            <template slot-scope="scope">
                                <div class="product">
                                    <div class="detail">
                                        <h5>{{scope.row.products_name}}</h5>
                                        <p style="height: 23px;"><span v-for="(attr, index) in JSON.parse(scope.row.sku_attrs)"><span>{{attr.attr_name}}: </span>{{attr.value.attr_value}}; </span></p>
                                        <p>$ {{scope.row.products_price}}</p>
                                      <!--<span class="old_price">$ 4.99</span>-->
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Quantity">
                            <template slot-scope="scope">
                                <el-input-number v-if="scope.row.refund_count>0" v-model="scope.row.numQuality" @change="handleChange" :min="1" :max="scope.row.refund_count"></el-input-number>
                                <!--<h4 v-if="status == 'Exchange'">{{scope.row.name}}</h4>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="换后物品"
                            v-if="status == 'Exchange'">
                            <template slot-scope="scope">
                                <div class="Exchange_btn" @click="addExchange()">添加换后物品</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <p class="price">
                      Refund：<b>$ {{totalPay.toFixed(2)}}</b><span> Not including shipping fee and sale tax. (Sale tax will be calculated in next step. As to the shipping fee, it will depend on our Return Policy)</span>
                    </p>
                </div>
            </div>
        </div>
        <!--<el-dialog title="添加换后商品" :visible.sync="dialogFormVisible" center>-->
            <!--<el-form :model="form">-->
                <!--<el-form-item label="商品1" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商品2" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商品3" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<div class="footer_btn">-->
                    <!--<div class="sub" @click="dialogFormVisible = false">Submit</div>-->
                    <!--<div class="Cancel" @click="dialogFormVisible = false">Cancel</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</el-dialog>-->
      </div>
    </div>
  </div>
</template>

<script>
import Left from "../../element/leftNav"
export default {
  components: {
    "Left-Nav":Left
  },
  data(){
    return{
      status:'Refund',//判断是退款还是换货
      tableData: [],
      numQuality: 1,
      totalPay: 0,
      checked: false,//同意退款条约
      selectInfoList: [],
      multipleSelection: [],
      dialogFormVisible:false,
      formLabelWidth:'120px',
      orderId: this.$route.query.order_id,
      form: {
        name: '',
      }
    }
  },
  watch:{

  },
  created(){
    this.orderId = this.$route.query.order_id
    this.getAfterSaleList()
  },
  methods:{
    getAfterSaleList () {
      var that = this
      that.$axios.get('api/refund/step1/' + this.orderId, {}).then(res => {
        if (res.code === 200) {
          that.tableData = res.data
          for (var i=0; i<that.tableData.length; i++) {
            this.$set(this.tableData[i],'numQuality',1)
          }
        }
      })
    },
    checkSelectable (row,index) {
      // console.log(row, index)
      if (!row.can_refund) {
        return false
      } else {
        return true
      }
    },
    tableRowClassName ({row, rowIndex}) {
      if (!row.can_refund) {
        return 'warning-row';
      } else{
        return '';
      }
    },
    handleChange() {
      this.handleSelectionChange(this.multipleSelection)
    },
    orderRefundApply(){
      if (this.checked) {
        $('.policeStyle').removeClass('errorSub')
        if (this.multipleSelection) {
          this.$router.push({
            path:'/orderRefundApply',
            query: {
              status: 1,
              orderId: this.orderId
            }
          })
          sessionStorage.setItem('selectInfo', JSON.stringify(this.multipleSelection))
        }
      } else {
        $('.policeStyle').addClass('errorSub')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      var payList = []
      var totalPay = 0
      var sumBill = 0
      if (val.length>0){
        for (var i=0; i<val.length; i++) {
          totalPay = val[i].numQuality * parseFloat(val[i].actual_price)
          payList.push(totalPay)
        }
      }
      for (var i=0;i<payList.length;i++) {
        sumBill = sumBill + payList[i]
      }
      this.totalPay = sumBill
    },
    //改变售后状态
    changeStatus(str){
      this.status = str
    },
    //添加换后商品
    addExchange(){
      this.dialogFormVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
