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
                <div class="refund_form">
                    <el-form label-position="right" label-width="200px">
                        <el-form-item label="Return reason：">
                            <ul class="refund_reason">
                                <li v-for="(reason, index) in reasonList" :key="index" :class="index===0? 'active':''" @click="selectReasion($event,reason.id,reason.return_reason,reason.is_upload)">{{reason.return_reason}}</li>
                            </ul>
                        </el-form-item>
                        <el-form-item label="Refund：">
                            <p class="price" style="margin-top: 7px;">
                              <b v-if="orderList.refund_total">$ {{(orderList.refund_total).toFixed(2)}}</b>
                              <el-popover v-if="orderList.refund_total"
                                placement="right"
                                width="220"
                                trigger="hover">
                                <div class="feeInfo">
                                  <div style="display: flex;justify-content: space-between;">
                                    <div>Refund items amount:</div>
                                    <div style="color: #C51015" v-if="orderList.subtotal">$ {{(orderList.subtotal).toFixed(2)}}</div>
                                  </div>
                                  <div style="display: flex;justify-content: space-between;">
                                    <div>Refund tax amount:</div>
                                    <div style="color: #C51015" v-if="orderList.tax>=0">$ {{(orderList.tax).toFixed(2)}}</div>
                                  </div>
                                </div>
                                <i slot="reference"> <img style="margin-left: 4px;" src="../../../../../static/img/detail.png" alt=""></i>
                              </el-popover>
                              <span>（This amount not including the shipping fee.We will refund the shipping cost base on the Refund Policy.）</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="comments：">
                            <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="1000 Characters"
                                show-word-limit
                                maxlength="1000"
                                v-model="describe">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="File attachments：" style="margin-top: 20px;">
                            <div class="imglist" :class="uploadImageList.length>=5? 'notUpload': ''">
                              <div :class="!canSub?'errSub': ''">
                                <el-upload
                                    action="api/upload"
                                    list-type="picture-card"
                                    name="image"
                                    :limit="5"
                                    :data="dataType"
                                    accept=".jpg,.png,.JPG,.PNG"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                              </div>
                                <!--<span class="rule">(5 max)</span>-->
                            </div>

                            <p class="tip"><i>*</i>In order to accelerate refund process, please attach the file.</p>
                            <p class="tip"><i>*</i>Only upload images in JPG and PNG formats.</p>
                            <!--<p class="tip" v-if="isUploadImg==1" style="color: #C51015"><i>*</i>In order to accelerate refund process, please attach the file.</p>-->
                            <el-dialog :visible.sync="dialogVisible">
                              <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                    <div class="apply_btn">
                        <div class="sub" @click="refundSub()">Submit</div>
                        <!--<div class="Cancel">Cancel</div>-->
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
        status:1  ,//售后状态
        describe: '',
        order_id: '',
        reasonId: [],
        rList: [],
        tokenStr: {
          Token: ''
        },
        reasonList: [],
        orderList: [],
        payLoadList:[],
        savePayLoad:[],
        isUploadImg: [],
        nameList: [],
        canSub: true,
        dataType: {
          type: 'refund',
          token: ''
        },
        uploadImageList: [],
        inputTracking: '',
        dialogImageUrl: '',
        dialogVisible: false,
        cancelOrderFlag: false,
    }
  },
  watch:{
    uploadImageList(val,oV){
      if (val.length > 0) {
         this.canSub = true
      }
    }
  },
  created(){
    this.getDataFun()
  },
  methods:{
    getDataFun () {
      var obj = {}
      var selectList = []
      var objSub = {}
      var listSub = []
      this.status = this.$route.query.status
      this.order_id = this.$route.query.orderId
      this.rList = JSON.parse(sessionStorage.getItem('selectInfo'))
      // console.log('jjjj', this.rList)
      if (this.rList.length>0){
        for (var i=0; i<this.rList.length; i++) {
          obj = {
            sku_id: this.rList[i].sku_id,
            final_price: this.rList[i].final_price,
            actual_price: this.rList[i].products_price,
            tic: this.rList[i].tic,
            refund_quantity: this.rList[i].numQuality
          }
          objSub = {
            sku_no: this.rList[i].sku_no,
            sku_id: this.rList[i].sku_id,
            final_price: this.rList[i].final_price,
            products_price: this.rList[i].products_price,
            tic: this.rList[i].tic,
            sku_attrs: this.rList[i].sku_attrs,
            products_name: this.rList[i].products_name,
            products_pic: this.rList[i].products_pic,
            refund_quantity: this.rList[i].numQuality,
            actual_price: this.rList[i].actual_price
          }
          selectList.push(obj)
          listSub.push(objSub)
        }
      }
      this.payLoadList = selectList
      this.savePayLoad = listSub
      this.dataType.token = localStorage.getItem('userToken')
      this.getRefundReason()
      if (this.order_id && this.payLoadList) {
        this.getRefundTotal()
      }
    },
    // 选中退款原因
    selectReasion (e, id, name, isUp) {
      var obj = e.currentTarget
      var flag = false
      var k = 0
      if ($(obj).hasClass('active')){
        if (this.reasonId.length > 1) {
          $(obj).removeClass('active')
          for (var i=0; i<this.reasonId.length; i++){
            if(this.reasonId[i] == id){
              flag = true
              k = i
              break
            }
          }
          if (flag) {
            this.reasonId.splice(k, 1)
            this.nameList.splice(k, 1)
            this.isUploadImg.splice(k, 1)
          } else {
            this.reasonId.push(id)
            this.nameList.push(name)
            this.isUploadImg.push(isUp)
          }
          flag = false
        }
      } else {
        $(obj).addClass('active')
        this.isUploadImg.push(isUp)
        this.reasonId.push(id)
        this.nameList.push(name)
      }
      console.log('hhhhhhhh', this.isUploadImg)
    },
    // 退款原因
    getRefundReason () {
      var that = this
      that.$axios.get('api/refund/getRefundReasons', {}).then(res => {
        if (res.code === 200) {
          that.reasonList = res.data
          that.reasonId.push(res.data[0].id)
          that.isUploadImg.push(res.data[0].is_upload)
          that.nameList.push(res.data[0].return_reason)
        }
      })
    },
    // 退款金额
    getRefundTotal () {
      var that = this
      var obj = qs.stringify({
        order_id: parseInt(this.order_id),
        product_list: JSON.stringify(this.payLoadList)
      })
      that.$axios.post('api/refund/getRefundTotal', obj).then(res => {
        if (res.code === 200) {
          that.orderList = res.data
          sessionStorage.setItem('refundTotal', res.data.refund_total)
        }
      })
    },
    refundSub () {
      var that = this
      if (that.isUploadImg.indexOf(1) > -1){
        if (that.uploadImageList.length>0) {
          this.canSub = true
          that.subDataFnc()
        } else {
          that.canSub = false
        }
      } else {
        that.subDataFnc()
        this.canSub = true
      }
    },
    subDataFnc () {
      var that = this
      var obj = qs.stringify({
        order_id: parseInt(that.order_id),
        product_list: JSON.stringify(that.savePayLoad),
        refund_reason: JSON.stringify(that.reasonId),
        refund_reason_str: JSON.stringify(that.nameList),
        refund_total: JSON.stringify(that.orderList),
        refund_instructions: that.describe,
        evidence_pictures: JSON.stringify(that.uploadImageList)
      })
      if (that.reasonId.length > 0) {
        that.$axios.post('api/refund/save', obj).then(res => {
          if (res.code === 200) {
            // console.log('nnnnnn', res)
            this.$router.push({
              path:'/applicationResult',
              query: {
                orders_refund_id: res.data.orders_refund_id
              }
            })
            // that.$store.state.isApplication = true
            // sessionStorage.removeItem('selectInfo')
          } else {
            that.$message.warning(res.msg)
          }
        })
      } else {
        that.$message.warning('Choose at least one return reason.')
      }
      // console.log('kkkkk', this.savePayLoad)
    },
    cancelledBtn () {
      this.cancelOrderFlag = true
    },
    handleRemove(file, fileList) {
      var imgUrl = ''
      var imgs = []
      for (var i=0; i<fileList.length; i++){
        imgUrl = fileList[i].response.data
        imgs.push(imgUrl)
      }
      this.uploadImageList = imgs
    },
    beforeAvatarUpload (file) {
      var that = this
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      if (isJPG || isPNG) {
        that.canSub = true
        return file
      } else {
        that.canSub = false
        return false
      }
    },
    handleAvatarSuccess (res) {
      // console.log(res, 'mmmmg')
      this.uploadImageList.push(res.data)
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
