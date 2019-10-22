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
                            <div>
                                <h5>Refund</h5>
                                <p>未收到货（包括丢件）/收到货后需要退款</p>
                            </div>
                        </div>
                        <div class="classification" :class="{'active':status=='Exchange'}" @click="changeStatus('Exchange')">
                            <img src="@/assets/images/Exchange.png" alt="" v-if="status=='Exchange'" class="refund">
                            <img src="@/assets/images/inExchange.png" alt="" v-else class="refund">
                            <div>
                                <h5>Exchange</h5>
                                <p>已收到货/未收到货，需要货品更换或补发</p>
                            </div>
                        </div>
                    </div>
                    <el-checkbox v-model="checked">I have rend and agreed to the Return Policy</el-checkbox>
                  <div class="Continue" @click="orderRefundApply()">Continue</div>
                </div>
                <div class="Products_Details">
                    <h4>The items I want to return：</h4>
                    <el-table
                        :data="tableData"
                        style="width: 100%;border:1px solid #E9E9E9"
                        size="medium"
                        :header-cell-style="{
                            'background-color': '#F5F5F5',
                            'color': '#333'
                        }">
                        <el-table-column
                            type="selection"
                            label="Sealect all"
                            width="40">
                        </el-table-column>
                      <el-table-column
                        prop="date"
                        label="Select All"
                        width="150">
                        <template slot-scope="scope">
                          <div class="product">
                            <img style="margin-right: 0;" src="@/assets/images/1.jpg" alt="">
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
                                        <h5>Wholesale - (Grade D) Blue Sand Stone (Imitation) Yoga Healing Gemstone Pen dants Silver Tone Deep Blue</h5>
                                        <p><span>Size:</span>3.0mm</p>
                                        <p>$ 1.99<span class="old_price">$ 4.99</span></p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Quantity">
                            <template slot-scope="scope">
                                <el-input-number v-if="status == 'Refund'" v-model="scope.row.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                                <h4 v-if="status == 'Exchange'">{{scope.row.name}}</h4>
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
                      Refund：<b>$ 148</b><span>（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span>
                    </p>
                </div>
            </div>
        </div>
        <el-dialog title="添加换后商品" :visible.sync="dialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="商品1" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品2" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品3" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="footer_btn">
                    <div class="sub" @click="dialogFormVisible = false">Submit</div>
                    <div class="Cancel" @click="dialogFormVisible = false">Cancel</div>
                </div>
            </div>
        </el-dialog>
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
        tableData: [{
            date: '2016-05-02',
            name: '1',
            address: '$ 64.00'
        },{
            date: '2016-05-02',
            name: '1',
            address: '$ 64.00'
        },{
            date: '2016-05-02',
            name: '1',
            address: '$ 64.00'
        },{
            date: '2016-05-02',
            name: '1',
            address: '$ 64.00'
        }],
        checked:'',//同意退款条约
        dialogFormVisible:false,
        formLabelWidth:'120px',
        form: {
          name: '',
        }
    }
  },
  watch:{

  },
  created(){
  },
  methods:{
        handleChange(value) {
            // console.log(value);
        },
        orderRefundApply(){
            this.$router.push({
              path:'/orderRefundApply',
              query: {
                status: 1
              }
            })
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
