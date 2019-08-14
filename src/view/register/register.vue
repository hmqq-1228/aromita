<template>
  <div class="register">
    <aheader-com></aheader-com>
    <div class="wrap">
      <div class="content_5">
        <div class="left">
          <div class="left_img">
            <img src="@/assets/注册页面.png" alt>
          </div>
          <!-- 注册 -->
        </div>
        <div class="right">
            <div class="tip"><span>{{tipInfo}}</span></div>
            <p class="right_word1">Email Address:</p>
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              class="demo-ruleForm"
            >
              <el-form-item prop="email">
                <el-input
                  type="text"
                  placeholder="Enter your Email"
                  v-model="ruleForm2.email"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <p class="right_word1">Password:</p>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm2.password"
                  placeholder="Enter your Password"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <!-- 验证密码 -->
              <p class="right_word1">Confirm Password:</p>
              <el-form-item prop="checkpass">
                <el-input
                  type="password"
                  v-model="ruleForm2.checkpass"
                  placeholder="Enter your Password"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <p class="right_word1">Verification code:</p>
              <div class="Verification" style="display: flex;justify-content: space-between">
                <el-form-item prop="Verification">
                  <el-input
                    type="text"
                    v-model="ruleForm2.Verification"
                    placeholder="Enter your Verification Code"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
                <div class="code" style="cursor: pointer;margin-top: 3px;" @click="refreshCode">
                  <component
                    :firstCode="firstCode"
                    v-bind:is="compArr.identify"
                    :identifyCode="identifyCodeNew"></component>
                </div>
              </div>
            </el-form>
          <div class="words_r">
            <div class="metalChecked">
              <el-checkbox v-model="policyChecked">I have read and agreed to the <u @click="HandleErqi" class="word_p">Privacy Policy </u></el-checkbox>
            </div>
            <div class="metalChecked">
              <el-checkbox v-model="servicechecked"><u @click="HandleErqi" class="word_p">“Subscription account service”</u></el-checkbox>
            </div>
          </div>
          <button class="btn1">
            <p class="btn1_word" @click="handleRegister()">Create an Account</p>
          </button>
          <div class="New_Customers_">
            <p class="New_Customers">I Have an Accout？</p>
          </div>
          <hr>
          <div class="btn2" @click="toLogin()">Login</div>
        </div>
      </div>
    </div>
    <afooter-com></afooter-com>
  </div>
</template>
<script>
import Footer from "@/components/afooter.vue";
import aheader from "@/components/aheader.vue";
import {handleRegist, Catpcha} from "../../api/register";
import identify from "../test/identify";
import qs from 'qs'
export default {
  name: "register",
  components: {
    "afooter-com": Footer,
    "aheader-com": aheader,
    identify
  },
  data() {
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again."));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("Two inconsistencies in password input!"));
      } else {
        callback();
      }
    };
    return {
      policyChecked:false,//是否勾选policy协议
      servicechecked:false,//是否勾选服务协议
      disabled:true,
      ruleForm2: {
        email: '',
        password: '',
        checkpass: '',
        Verification: ''
      },
      rules2: {
        email: [
          { required: true, message: 'Please enter your mailbox', trigger: 'blur' },
          { type: 'email', message: 'Input error of mailbox format', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'Please input a password', trigger: 'blur' },
            { pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,14}$/, message: 'Please enter a 6-14 digit and alphabetic combination password', trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        Verification: [
          { required: true, message: 'Please enter the verification code.', trigger: 'blur' },
          { min: 5, max: 5, message: 'Verification code length is 3 to 5 characters', trigger: 'blur' }
        ]
      },
        tipInfo: '',
        firstCode: '',
        identifyCodeNew: '1234',
        compArr: {
        identify: "identify"
      },
    };
  },
  created () {
      this.handleCatpchas()
  },
  methods: {
    HandleErqi(){
      this.$router.push({
        path: "/erqi"
      })
    },
    //点击注册
    handleRegister() {
      if (!this.ruleForm2.email || !this.ruleForm2.password || !this.ruleForm2.checkpass || !this.ruleForm2.Verification) {
        this.tipInfo = 'Please complete your information'
        return false
      }else if(this.policyChecked == false || this.servicechecked == false){
        this.tipInfo = 'Please check the agreement.'
        return false
      }else{
        this.tipInfo = ''
        this.registerFormSub()
      }
    },
    async registerFormSub () {
      var that = this
      var params
      params = {
        catpcha: that.ruleForm2.Verification,
        email: that.ruleForm2.email,
        password: that.ruleForm2.password,
        password_confirmation: that.ruleForm2.checkpass
      }
      let data = await handleRegist(params)
      if (data.code === 200) {
        that.$message.success(data.msg)
        that.$router.push('/register_ok')
      } else {
        // that.$message.warning(data.msg.email[0])
      }
    },
    //验证码
    refreshCode() {
      this.handleCatpchas()
    },
    async handleCatpchas () {
      let data = await Catpcha()
      this.identifyCodeNew = data.data
    },
    toLogin: function () {
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
 @import "@/assets/css/register.scss"
</style>
