<template>
  <div class="newPassword">
    <aheader-com></aheader-com>
    <div style="min-height: 500px;">
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
    <div class="foot">
      <afooter-com></afooter-com>
    </div>
  </div>
</template>

<script>
import Aheader from "@/components/aheader.vue";
import Footer from "@/components/afooter.vue"
import identify from '../test/identify.vue'
import {Catpcha,resetPassword} from "../../api/register";
import qs from 'qs'
export default {
  components: {
    "aheader-com": Aheader,
    "afooter-com":Footer,
    identify
  },
  name: "newPassword",
  data () {
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("Please enter your confirmation password."))
      } else if (value !== this.newForm.newPassword) {
        callback(new Error("Please make sure your passwords match."))
      } else {
        callback()
      }
    };
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the verification code."));
      } else if (value !== this.identifyCodeNew) {
        callback(new Error("Please make sure your verification match."));
      } else {
        callback();
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
          { required: true, message: 'Please enter 6-14 characters, contain numbers and letters.', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/g, message: 'Please enter 6-14 characters, contain numbers and letters.', trigger: 'blur' }
        ],
        comfirmPass: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        identifyCode:[
          { validator: validateCode, trigger: 'blur'}
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
      params = {
        email: that.$route.query.email,
        password: that.newForm.newPassword,
        password_confirmation: that.newForm.comfirmPass,
        catpcha: that.newForm.identifyCode
      }
      let data = await resetPassword(params)
      // console.log('7777777', params)
      if (data.code === 200) {
        that.$router.push('/psd_reset_ok')
      } else if (data.code === 401) {
        that.$message({
          message: "New password can't be old password!",
          type: 'warning',
          duration: 5000
        })
      } else {
        that.$message.warning(data.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
