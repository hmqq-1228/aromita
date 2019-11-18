<template>
  <div class="warp_1 forgotPwd">
    <aheader-com></aheader-com>
    <div class="warp">
      <div class="content_forgot">
        <p class="word_a">Confirm your identity to reset password?</p>
        <div class="word_b" style="margin-top: 10px;">Enter the email you use for Aromita,</div>
        <span class="word_b">and we’ll help you create a new password.</span>
        <el-form ref="form" :model="form" :rules="rules" status-icon style="margin-top: 20px">
          <el-form-item prop="inputEmail">
            <el-input v-model="form.inputEmail" placeholder="please enter your email"></el-input>
          </el-form-item>
          <div style="display: flex;justify-content: space-between">
            <el-form-item prop="inputCode" style="width:260px;">
              <el-input v-model="form.inputCode" placeholder="please enter your verification code"></el-input>
            </el-form-item>
            <div class="code" @click="refreshCode">
              <component v-bind:is="compArr.identify"
                         :identifyCode="identifyCodeNew">
              </component>
            </div>
          </div>
          <el-form-item>
            <el-button style="width: 400px;font-size:16px;background-color: #121037;" @click="submitForm('form')">Next</el-button>
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
import {Catpcha,forgetPassword} from "../../api/register";
import qs from 'qs'
export default {
  components: {
    "aheader-com": Aheader,
    "afooter-com":Footer,
    identify
  },
  data() {
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the verification code."));
      } else if (value !== this.identifyCodeNew) {
        callback(new Error("Please make sure your verification match."));
      } else {
        callback();
      }
    };
    return {
      code: "",
      checkCode: "",
      picVerification: "", //..验证码图片
      identifyCodeNew: '12345',
      form: {
        inputEmail: '',
        inputCode: ''
      },
      compArr: {
        identify: "identify"
      },
      rules: {
        inputEmail: [
          { required: true, message: "Please enter your email.", trigger: "blur" },
          { type: "email", message: "Please enter a valid email.", trigger: "blur" }
        ],
        inputCode: [
          { validator: validateCode, trigger: 'blur'}
        ]
      }
    };
  },
  created() {
   this.getVerificationCode()
  },
  methods: {
    refreshCode() {
      // console.log(123)
      // this.identifyCodeNew = "";
      this.getVerificationCode()

    },
    async getVerificationCode () {
      let data = await Catpcha()
      this.identifyCodeNew = data.data
    },
    submitForm: function (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if(valid){
          that.findPassword()
        }
      })
    },
    async findPassword () {
      var parems
      var that = this
      parems = {
        email: that.form.inputEmail,
        catpcha: that.form.inputCode
      }
      // console.log('77777', parems)
      let data = await forgetPassword(parems)
      if (data.code === 200) {
        that.$router.push('/apply_reset_password')
      } else {
        that.$message.warning(data.msg)
      }
    }
  }
};
</script>
<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
