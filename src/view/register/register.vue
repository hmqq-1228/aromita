<template>
  <div class="register">
    <aheader-com></aheader-com>
    <div class="wrap">
      <div class="content_5">
        <div class="left">
          <div class="left_img" @click="linkHref(loginHref)">
            <img v-if="loginImg" :src="loginImg" alt>
          </div>
          <!-- 注册 -->
        </div>
        <div class="right">
            <!--<div class="tip"><span>{{tipInfo}}</span></div>-->
            <p class="right_word1">Email Address:</p>
            <el-form
              :model="ruleForm2"
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
                  show-password
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
                  show-password
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
                <div class="code" style="cursor: pointer;" @click="refreshCode">
                  <component
                    :firstCode="firstCode"
                    v-bind:is="compArr.identify"
                    :identifyCode="identifyCodeNew"></component>
                </div>
              </div>
            </el-form>
          <div class="words_r">
            <div class="metalChecked policy">
              <el-checkbox v-model="policyChecked">I have read and agreed to the <u @click="HandleErqi" class="word_p">Privacy Policy </u></el-checkbox>
            </div>
            <div class="metalChecked">
              <el-checkbox v-model="servicechecked"><u @click="HandleErqi" class="word_p">Subscription account service</u></el-checkbox>
            </div>
          </div>
          <button class="btn1">
            <p class="btn1_word" @click="handleRegister('ruleForm2')">Create an Account</p>
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
import {handleRegist, Catpcha, handleLogin} from "../../api/register";
import {registeSubscribe} from '../../api/subscription'
import {loginImage} from "../../api/home";
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
        callback(new Error("Please make sure your password match."));
      } else {
        callback();
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
    return {
      policyChecked:false,//是否勾选policy协议
      servicechecked:false,//是否勾选服务协议
      disabled:true,
      loginImg: '',
      loginHref: '',
      ruleForm2: {
        email: '',
        password: '',
        checkpass: '',
        Verification: ''
      },
      rules2: {
        email: [
          { required: true, message: 'Please enter a valid email', trigger: 'blur' },
          { required: true, type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'Please enter 6-14 characters, contain numbers and letters.', trigger: 'blur' },
            { required: true, pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/g, message: 'Please enter 6-14 characters, contain numbers and letters.', trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        Verification: [
          // { required: true, message: 'Please enter the verification code.', trigger: 'blur' },
          // { min: 5, max: 5, message: 'Verification code length is 5 characters', trigger: 'blur' }
          { validator: validateCode, trigger: 'blur'}
        ]
      },
        tipInfo: '',
        firstCode: '',
        identifyCodeNew: '',
        compArr: {
        identify: "identify"
      },
    };
  },
  created () {
    this.handleCatpchas()
    this.getLoginImage()
  },
  methods: {
    HandleErqi(){
      this.$router.push({
        path: "/erqi"
      })
    },
    linkHref(link){
      window.open(link)
    },
    async getLoginImage() {
      let data = await loginImage();
      this.loginImg = data.data[0].picture_src
      this.loginHref = data.data[0].picture_href
    },
    //点击注册
    handleRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.policyChecked === false) {
            $('.policy').addClass('policyError')
            return false
          } else {
            $('.policy').removeClass('policyError')
            this.registerFormSub()
          }
        }
      })
    },
    subMyScription () {
      registeSubscribe({email_address:this.ruleForm2.email,subscribe_status: 10}).then((res)=>{
        // console.log('666666', res)
      })
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
        // that.$message.success(data.msg)
        that.handleLoginSub()
        // that.$router.push('/register_ok')
      } else if (data.code === 10006){
        that.$message.warning(data.msg)
        that.refreshCode()
      } else {
        var arr = []
        for(var i in data.msg) {
          var obj = data.msg[i][0];
          arr.push(obj)
          this.$message({
            message:arr[0],
            type: 'warning'
          });
        }
      }
    },
    // login
    handleLoginSub() {
      let pre = {
        catpchas: '',
        email: this.ruleForm2.email,
        password: this.ruleForm2.password
      }
      var routerStr = this.$store.state.fromUrl
      handleLogin(pre).then((res)=>{
        if (res.code === 200) {
          this.loginData = res.data
          this.$message({
            message: "success",
            type: "success"
          });
          if (routerStr) {
            this.$router.push(routerStr)
          } else {
            this.$router.push('/')
          }
          // this.mergeGoodsFuc()
          localStorage.setItem('userToken', this.loginData.token)
          if (this.servicechecked) {
            this.subMyScription()
          }
        }else {
          this.$message.warning('ERROR Incorrect username or password!')
          this.num = res.data
        }
      })
    },
    //验证码
    refreshCode() {
      this.handleCatpchas()
    },
    async handleCatpchas () {
      let data = await Catpcha()
      this.identifyCodeNew = data.data
      // console.log('999999999', this.identifyCodeNew)
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
