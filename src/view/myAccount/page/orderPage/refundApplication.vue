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
            <div class="refund_apply">
                <ul class="refund_nav">
                    <li :class="{'active':status>=1}">填写退款申请</li>
                    <li :class="{'active':status>=2}">卖家审核</li>
                    <li :class="{'active':status==3}">完成退款</li>
                </ul>
                <div class="refund_form" v-if="status ==1">
                    <el-form label-position="right" label-width="120px" :model="formLabelAlign">
                        <el-form-item label="退款理由：">
                            <ul class="refund_reason">
                                <li class="active">商品质量问题</li>
                                <li>不想要了</li>
                                <li>快递一直未到</li>
                            </ul>
                        </el-form-item>
                        <el-form-item label="退款金额：">
                            <p class="price">
                                <b>$ 148</b><span>（包含商品金额、运费、税费）</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="退款说明：">
                            <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="1000 Characters"
                                v-model="formLabelAlign.type">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="上传凭证：">
                            <div class="imglist">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <span class="rule">(3 max) 上传凭证可加速退款</span>
                            </div>
                            <p class="tip"><i>*</i>一定要提供凭证</p>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                    <div class="apply_btn">
                        <div class="sub">Submit</div>
                        <div class="Cancel">Cancel</div>
                    </div>
                </div>
                <div class="refund_examine" v-if="status != 1">
                    <div class="examine_tip" v-if="status == 2">
                        <h5>您的退货申请已提交，请等待商家审核处理，1-2个工作日之内会完成处理</h5>
                        <p>您的申请一旦处理，我们会发送邮件通知您，请注意查收邮件。审核不通过，买家会反馈驳回理由，如有异议，请和客服联系</p>
                    </div>
                    <div class="examine_tip" v-if="status == 3">
                        <h5>您的退货申请已审核通过，请等待商家审核处理，1-2个工作日之内会完成处理</h5>
                    </div>
                    <div class="examine_tip" v-if="status == 4">
                        <h5>$ 148 退款已于2019-12-20 19：00退至您的1234@gmailpaypal银行账户，请注意查收。</h5>
                        <p>如有其他问题，请联系<span class="email">Aromita@panduo.com.cn</span></p>
                    </div>
                    <div class="examine_tip" v-if="status == 5">
                        <h5>您的退款申请审核不通过，不通过原因为：经过核对您提供的退款凭证，您的订单不符合退款要求。</h5>
                    </div>
                    <div class="Products_Details">
                        <div class="cancel">
                            <h4>申请退款商品明细：</h4>
                            <div class="cancel_refund" v-if="status == 2">取消退款</div>
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
                                label="Quantity"
                                width="220">
                                <template slot-scope="scope">
                                    <h5>{{scope.row.name}}</h5>
                                </template>
                            </el-table-column>
                        </el-table>
                        <p class="price">
                            退款金额：<b>$ 148</b><span>（包含商品金额、运费、税费）</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        status:5  ,//售后状态
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
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
    }
  },
  watch:{
    
  },
  created(){
  },
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
