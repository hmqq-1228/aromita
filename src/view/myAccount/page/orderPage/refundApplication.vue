<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <Left-Nav activeIndex="1"></Left-Nav>
        <div class="navCount">
            <h3 class="my_title">Order Refund</h3>
            <div class="refund_apply">
                <ul class="refund_nav">
                    <li :class="{'active':status>=1}">Request Return</li>
                    <li :class="{'active':status>=2}">Under review</li>
                    <li :class="{'active':status>=4}">Return items</li>
                    <li :class="{'active':status>=7}">Refund successful</li>
                </ul>
                <div class="refund_form" v-if="status ==1">
                    <el-form label-position="right" label-width="200px" :model="formLabelAlign">
                        <el-form-item label="Return reason：">
                            <ul class="refund_reason">
                                <li class="active">商品质量问题</li>
                                <li>不想要了</li>
                                <li>快递一直未到</li>
                            </ul>
                        </el-form-item>
                        <el-form-item label="Refund：">
                            <p class="price">
                              <b>$ 148</b><span>（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="comments：">
                            <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="1000 Characters"
                                show-word-limit
                                maxlength="1000"
                                v-model="formLabelAlign.type">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="File attachments：">
                            <div class="imglist">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :limit="3"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <span class="rule">(3 max)</span>
                            </div>
                            <p class="tip"><i>*</i>In order to accelerate refund process, please attach the file.</p>
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
                      <div style="line-height: 26px;" v-if="!cancelOrderFlag">
                        <h5>We've received your request, and someone from our team will be in touch soon. It will take about 1-2 business days to processe your request. Please wait.</h5>
                        <p>We will notify you through email when the request has been processed.</p>
                        <p>Sorry, your request was rejected. Please see the details attached. Any question, please contact <span class="email">Aromita@gmail.com</span></p>
                      </div>
                      <div style="height: 78px;" v-if="cancelOrderFlag">
                        <div class="cancelOrderFlag">
                          <span class="el-icon-success" style="color: #67C23A;"></span>
                          <div>Cancelled after sales service successfully.</div>
                        </div>
                      </div>
                        <div class="status2"><span>Refund：</span><span class="pay">$ 148.00 </span> <span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
                        <div class="cancel_refund" v-if="!cancelOrderFlag" @click="cancelledBtn()">Cancelled request</div>
                    </div>
                    <!--<div class="examine_tip" v-if="status == 3">-->
                      <!--<h5>您的退货申请已审核通过，请等待商家审核处理，1-2个工作日之内会完成处理</h5>-->
                    <!--</div>-->
                    <div class="examine_tip" v-if="status == 3">
                      <h5>Your refund request hasn't been approved for the following reasons:</h5>
                      <p style="margin-top: 10px">If you are in any doubt, please contact <span class="email">Aromita@gmail.com</span></p>
                      <div class="status2"><span>Refund：</span><span class="pay">$ 148.00 </span><span class="status2_tip">（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span></div>
                    </div>
                    <div class="examine_tip" v-if="status === 4">
                      <h5>Your return request is approved. Please ship them back in time, and let us know the tracking number. Thank you.</h5>
                      <div class="status6"><span>Refund：</span><span class="pay">$ 148.00 </span>
                        <el-popover
                          placement="right"
                          width="220"
                          trigger="hover">
                          <div class="feeInfo">
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund items amount:</div>
                              <div style="color: #C51015">$ 128.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund tax amount:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund shipping fee:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                          </div>
                          <i style="color: #FF9D3B" class="el-icon-warning-outline" slot="reference"></i>
                        </el-popover>
                      </div>
                      <div class="status6">
                        <span>Tracking number：</span>
                        <el-input style="width: 380px;" v-model="inputTracking" placeholder="Please enter the tracking number to expedite the refund."></el-input>
                        <div class="trackSub">Submit</div>
                      </div>
                    </div>
                    <div class="examine_tip" v-if="status == 5">
                      <p>Your return request is approved. And you don't need to ship them back. We will refund you ASAP. Any question, please contact <span class="email">Aromita@gmail.com</span></p>
                      <div class="status6"><span>Refund：</span><span class="pay">$ 148.00 </span>
                        <el-popover
                          placement="right"
                          width="220"
                          trigger="hover">
                          <div class="feeInfo">
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund items amount:</div>
                              <div style="color: #C51015">$ 128.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund tax amount:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund shipping fee:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                          </div>
                          <i style="color: #FF9D3B" class="el-icon-warning-outline" slot="reference"></i>
                        </el-popover>
                      </div>
                    </div>
                    <div class="examine_tip" v-if="status == 6">
                      <p>We've received your tracking number. Once receive the parcel, we will refund you ASAP.</p>
                      <div class="status6"><span>Tracking number：</span>JD89454575115HN</div>
                      <div class="status6"><span>Refund：</span><span class="pay">$ 148.00 </span>
                        <el-popover
                          placement="right"
                          width="220"
                          trigger="hover">
                          <div class="feeInfo">
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund items amount:</div>
                              <div style="color: #C51015">$ 128.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund tax amount:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund shipping fee:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                          </div>
                          <i style="color: #FF9D3B" class="el-icon-warning-outline" slot="reference"></i>
                        </el-popover>
                      </div>
                    </div>
                    <div class="examine_tip" v-if="status == 7">
                      <div><div class="status6" style="display: inline-block;margin-top: 0;"><span class="pay">$ 148.00 </span>
                        <el-popover
                          placement="right"
                          width="220"
                          trigger="hover">
                          <div class="feeInfo">
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund items amount:</div>
                              <div style="color: #C51015">$ 128.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund tax amount:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                            <div style="display: flex;justify-content: space-between;">
                              <div>Refund shipping fee:</div>
                              <div style="color: #C51015">$ 10.00</div>
                            </div>
                          </div>
                          <i style="color: #FF9D3B" class="el-icon-warning-outline" slot="reference"></i>
                        </el-popover>
                      </div> We have intiated a refund to your pay account on 1234@gmailpaypal, Please check it later.</div>
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
                          Refund：<b>$ 148</b><span>（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span>
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
import Left from "../../element/leftNav"
export default {
  components: {
    "Left-Nav":Left
  },
  data(){
    return{
        status:1  ,//售后状态
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        inputTracking: '',
        dialogImageUrl: '',
        dialogVisible: false,
        cancelOrderFlag: false,
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
    this.status = this.$route.query.status
  },
  methods:{
    cancelledBtn () {
      this.cancelOrderFlag = true
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
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
