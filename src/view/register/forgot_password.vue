<template>
  <div class="warp_1">
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
    <afooter-com></afooter-com>
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
      console.log(123)
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
      console.log('77777', parems)
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
<style lang="scss" scoped>
.warp_1 {
  .warp {
    min-height: 500px;
    .content_forgot {
      width: 400px;
      height: 308px;
      margin: 0 auto;
      margin-top: 200px;
      text-align: center;
      .word_a {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
      }
      .word_b {
        font-size: 14px;
        font-weight: 400;
        font-family: Verdana;
        color: #333333;
      }
      .captcha {
        height: 50px;
        text-align: justify;

        .verification_input {
          width: 280px;
          font-family: "Exo 2", sans-serif;
          border: 1px solid #fff;
          color: black;
          outline: none;
          letter-spacing: 1px;
          font-size: 17px;
          font-weight: normal;
          height: 40px;
          border: 1px solid #e6e6e6;
        }
        .verification {
          width: 100px;
          letter-spacing: 5px;
          margin-left: 25px;
          border: none;
          font-style:oblique;
          height: 40px;
          font-size: 16px;
          transform: translate(-15px, 0);
        }
      }
      .emails {

        width: 400px ;
        height: 40px;
        margin-top: 20px ;
      }
      .btn_next {
        width: 400px;
        height: 40px;
        border: none;
        background-color: #121037;
        color: #ffffff;
        margin-top: 50px;
      }
    }
  }
}
</style>
