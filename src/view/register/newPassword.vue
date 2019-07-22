<template>
  <div class="newPassword">
    <div><aheader-com></aheader-com></div>
    <div class="passwordCont">
      <div class="titleNew">Reset a Password</div>
      <el-form ref="newForm" :model="newForm" :rules="rules" status-icon style="margin-top: 20px">
        <p class="itemTitle">New Password:</p>
        <el-form-item prop="newPassword">
          <el-input type="password" v-model="newForm.newPassword" placeholder="please enter a new password"></el-input>
        </el-form-item>
        <p class="itemTitle">Confirm New Password:</p>
        <el-form-item prop="comfirmPass">
          <el-input type="password" v-model="newForm.comfirmPass" placeholder="please comfirm your new password"></el-input>
        </el-form-item>
        <div style="display: flex;justify-content: space-between">
          <el-form-item prop="identifyCode" style="width:260px;">
            <el-input v-model="newForm.identifyCode" placeholder="please enter your verification code"></el-input>
          </el-form-item>
          <div class="code" @click="refreshCode">
            <component v-bind:is="compArr.identify"
                       :identifyCode="identifyCodeNew">
            </component>
          </div>
        </div>
        <el-form-item style="margin-top: 30px;">
          <el-button style="width: 400px;font-size:16px;background-color: #121037;" @click="submitForm('newForm')">Continue</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Aheader from "@/components/aheader.vue";
import identify from '../test/identify.vue'
import {Catpcha,resetPassword} from "../../api/register";
import qs from 'qs'
export default {
  components: {
    "aheader-com": Aheader,
    identify
  },
  name: "newPassword",
  data () {
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("Please enter your confirmation password"))
      } else if (value !== this.newForm.newPassword) {
        callback(new Error("Confirmation password is inconsistent with the new password!"))
      } else {
        callback()
      }
    };
    return{
      newForm:{
        newPassword: '',
        comfirmPass: '',
        identifyCode: ''
      },
      compArr: {
        identify: "identify"
      },
      identifyCodeNew: '12345',
      rules:{
        newPassword: [
          { required: true, message: 'please enter a new password', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,14}$/, message: 'The format is letters plus numbers', trigger: 'blur' }
        ],
        comfirmPass: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        identifyCode:[
          { required: true, message: 'Please enter the verification code', trigger: 'blur' },
          { min: 5, max: 5, message: 'Five characters in length', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.getVerification()
  },
  methods:{
    refreshCode: function () {
      this.getVerification()
    },
    async getVerification () {
      let data = await Catpcha()
      this.identifyCodeNew = data.data
    },
    submitForm: function (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.resetPasswordSub()
        }
      })
    },
    async resetPasswordSub () {
      var that = this
      var params
      params = qs.stringify({
        password: that.newForm.newPassword,
        password_confirmation: that.newForm.comfirmPass,
        catpcha: that.newForm.identifyCode
      })
      let data = await resetPassword(params)
      console.log('7777777', data)
      if (data.code === 200) {
        that.$router.push('/psd_reset_ok')
      }
    }
  }
}
</script>

<style scoped>
  .passwordCont{
    width: 400px;
    margin: 60px auto;
  }
  .titleNew{
    color: #333;
    font-size: 18px;
    font-family: Tahoma;
  }
  .itemTitle{
    color: #666;
    font-size: 14px;
    font-family: Tahoma;
  }
</style>
