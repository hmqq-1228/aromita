<template>
  <div class="payAgain">
    <div class="model2" v-if="modelShow2"></div>
    <div class="GrandTotal">Grand Total：<span>$ 88.88</span></div>
    <div class="payBox">
      <div class="imgRadio"><el-radio v-model="radio3" label="1"><img style="float: right;" src="../../../static/img/pay.png" alt=""></el-radio></div>
      <div class="moreCard">
        <el-radio v-model="radio3" :disabled="true" label="2">Credit/Deibt Card</el-radio>
        <img style="float: right;" src="../../../static/img/pay-02.png" alt="">
      </div>
      <div v-if="showCreditForm">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="Card Number:" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
          </el-form-item>
          <div class="dataType">
            <el-form-item label="Expiration Date:" prop="month" class="smallInput">
              <el-select v-model="ruleForm.month" placeholder="MM">
                <el-option :label="mouth" :value="mouth" v-for="(mouth, index) in mouthList" v-bind:key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="year" class="smallInput noLabel">
              <el-select v-model="ruleForm.year" placeholder="YY">
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2020" value="2020"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="Secure Code:" prop="secure">
            <el-input v-model="ruleForm.secure"></el-input>
          </el-form-item>
        </el-form>
        <div><el-checkbox v-model="checked">Billing is the same as shipping address</el-checkbox></div>
        <el-form v-if="!checked" :model="shipForm" :rules="rules3" ref="shipForm" label-width="125px" class="demo-ruleForm" style="margin-top: 20px;">
          <div class="dataType">
            <el-form-item label="First name:" prop="First" class="shipInput">
              <el-input v-model="shipForm.First"></el-input>
            </el-form-item>
            <el-form-item label="Last name:" prop="Last" class="shipInput">
              <el-input v-model="shipForm.Last"></el-input>
            </el-form-item>
          </div>
          <el-form-item label=" Email Address:" prop="email">
            <el-input v-model="shipForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Company name:" prop="Company">
            <el-input v-model="shipForm.Company"></el-input>
          </el-form-item>
          <el-form-item label="Country:" prop="Country">
            <el-select v-model="shipForm.Country" placeholder="United Stats">
              <el-option label="shanghai" value="shanghai"></el-option>
              <el-option label="beijing" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Address Line1:" prop="Address1">
            <el-input v-model="shipForm.Address1"></el-input>
          </el-form-item>
          <el-form-item label="Address Line2:" prop="Address2">
            <el-input v-model="shipForm.Address2"></el-input>
          </el-form-item>
          <el-form-item label="City:" prop="City">
            <el-input v-model="shipForm.City"></el-input>
          </el-form-item>
          <el-form-item label="State/Province:" prop="Province">
            <el-select v-model="shipForm.Province" placeholder="Province">
              <el-option label="shanghai" value="shanghai"></el-option>
              <el-option label="beijing" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Zip/Postcode:" prop="Postcode">
            <el-input v-model="shipForm.Postcode"></el-input>
          </el-form-item>
          <el-form-item label="Mobie No./Phone:" prop="Phone">
            <el-input v-model="shipForm.Phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="payConfirm">
      <el-checkbox v-model="checkedSub"></el-checkbox> <span>I have read and agreed to the website terms and conditions.</span>
      <div style="margin-top: 15px;">
        <el-button @click="paySub('ruleForm', 'shipForm')">
         Pay now
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "payAgain",
  data () {
    return {
      radio3: '1',
      checked: true,
      modelShow2: false,
      checkedSub: false,
      showCreditForm: false,
      mouthList: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      ruleForm: {
        number: '',
        month: '',
        year: '',
        secure: ''
      },
      shipForm: {
        First: '',
        Last: '',
        Company: '',
        email: '',
        Country: '',
        Address1: '',
        Address2: '',
        City: '',
        Province: '',
        Postcode: '',
        Phone: ''
      },
      rules2: {
        number: [
          {required: true, message: '请输入卡号', trigger: 'blur'}
        ],
        month: [
          {required: true, message: '请输入有效月份', trigger: 'blur'}
        ],
        year: [
          {required: true, message: '请输入有效年份', trigger: 'blur'}
        ],
        secure: [
          {required: true, message: '请输入安全码', trigger: 'blur'}
        ]
      },
      rules3: {
        Last: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        Country: [
          {required: true, message: '请输入国家名称', trigger: 'blur'}
        ],
        Address1: [
          {required: true, message: '请输入第一地址', trigger: 'blur'}
        ],
        City: [
          {required: true, message: '请输入城市名称', trigger: 'blur'}
        ],
        Province: [
          {required: true, message: '请输入省份名称', trigger: 'blur'}
        ],
        Postcode: [
          {required: true, message: '请输入邮编', trigger: 'blur'}
        ]
      }
    }
  },
  watch:{
    radio3: function (val, Ov) {
      var that = this
      console.log('vvvvvv', val)
      if (val === '2') {
        that.showCreditForm = true
      } else if (val === '1') {
        that.showCreditForm = false
      }
    },
    checkedSub: function (val, ov) {
      if (val) {
        $('.payConfirm').removeClass('error')
      }
    }
  },
  methods:{
    payByPaypal: function (total, order) {
      var that = this
      var payUrl = ''
      var payLoad = qs.stringify({
        amount: total,
        order_number: order
      })
      // that.$store.state.addCartState = true
      that.modelShow2 = true
      that.$axios.post('api/paypal-pay', payLoad).then(res => {
        if (res.code === 200) {
          console.log('11111111', res.data)
          payUrl = res.data
          window.location.href = payUrl
        } else {
          that.modelShow2 = false
          that.$message.warning(res.msg)
        }
      })
    },
    paySub: function (formName, formName1) {
      var that = this
      if (that.checkedSub) {
        $('.payConfirm').removeClass('error')
        if (formName) {
          if (that.radio3 === '1') {
            console.log('你选择了第一种支付方式')
            // that.confirmPay()
          }else if (that.radio3 === '2') {
            if (that.checked) {
              that.$refs[formName].validate((valid) => {
                if (valid) {
                  console.log('tttttt')
                }
              })
            } else {
              console.log('666666666')
              that.$refs[formName].validate((valid) => {
                that.$refs[formName1].validate((valid1) => {
                  if (valid && valid1) {
                    console.log('tttttt')
                  }
                })
              })
            }
          }
        }
      } else {
        $('.payConfirm').addClass('error')
      }
    }
  }
}
</script>

<style scoped>
  .payAgain{
    min-height: 400px;
    width: 950px;
    margin: 0 auto;
  }
  .GrandTotal{
    font-size:18px;
    font-family:Tahoma;
    font-weight:bold;
    color: #333;
    margin-top: 40px;
    margin-bottom: 6px;
  }
  .GrandTotal span{
    font-size: 20px;
    color: #C51015;
  }
  .moreCard{
    height: 32px;
    display: flex;
    justify-content: start;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .payBox{
    width: 950px;
    border: 1px solid #E9E9E9;
    padding: 20px;
    box-sizing: border-box;
    color: #333;
    margin: 0 auto;
    margin-bottom: 10px;
    font-family:Tahoma;
  }
  .payBox img{
    border: 1px solid #E9E9E9;
  }
  .dataType{
    display: flex;
    justify-content: start;
    height: 36px;
    line-height: 36px;
    margin-bottom: 22px;
  }
  .payConfirm.error span{
    color: #F56C6C;
  }
  .payConfirm{
    color: #707070;
    width: 950px;
    font-size: 14px;
    word-wrap:break-word;
    margin: 10px auto;
    margin-bottom: 30px;
  }
  .model2{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
</style>
