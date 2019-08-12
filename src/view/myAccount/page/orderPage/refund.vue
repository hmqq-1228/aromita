<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <div class="accountNav">
          <router-link to="myAccount"><div class="navTitle">My Account</div></router-link>
          <router-link to="myOrder"><div class="navItem">My Orders</div></router-link>
          <router-link to="myWishlist"><div class="navItem">My Wishlist</div></router-link>
          <router-link to="myCoupon"><div class="navItem">My Coupon</div></router-link>
          <router-link to="myPoints"><div class="navItem">My Points</div></router-link>
          <router-link to="mySubscription"><div class="navItem">My Subscription</div></router-link>
          <router-link to="addressBook"><div class="navItem">Address Book</div></router-link>
          <router-link to="accountSetting"><div class="navItem">Account Setting</div></router-link>
        </div>
        <div class="navCount">
            <h3 class="my_title">Order Refund</h3>
            <div class="refund">
                <P class="refund_rule">我们提供退款与换货入口，如果您对商品不满意，可先进行换货，换货除质量问题外需退回货品，您自己承担退回运费。
如果您不需要换货，可进行退款操作，退款除质量问题外需退回货品，您自己承担运费
</P>
                <div class="label">
                    <p>请选择服务类型：</p>
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
                    <el-checkbox v-model="checked">同意退款条约</el-checkbox>
                </div>
                <div class="Products_Details">
                    <h4>申请退款商品：</h4>
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
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="Product"
                            width="680">
                            <template slot-scope="scope">
                                <div class="product">
                                    <img src="@/assets/images/1.jpg" alt="">
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
                        退款金额：<b>$ 148</b><span>（包含商品金额、运费、税费）</span>
                    </p>
                    <div class="Continue" @click="orderRefundApply()">Continue</div>
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
export default {
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
            console.log(value);
        },
        orderRefundApply(){
            this.$router.push({
                path:'/orderRefundApply'
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
