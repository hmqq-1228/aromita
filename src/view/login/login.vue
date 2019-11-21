<template>
  <div class="wrap_1">
    <div style="margin: 0 auto">
      <aheader-com></aheader-com>
    </div>
    <div class="wrapLogin">
      <div class="content">
        <div class="left" style="margin-top: 20px;">
          <div class="left_img" @click="linkHref(loginHref)">
            <img v-if="loginImg" :src="loginImg" alt />
          </div>
        </div>
        <!-- 登陆 -->
        <div class="right">
          <!-- 验证邮箱 -->
          <p class="right_word1">Email Address:</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name" style="width: 400px;">
              <el-input v-model="ruleForm.name" placeholder="Enter your Email" style="width: 100%;"></el-input>
            </el-form-item>
            <!-- 验证密码 -->
            <p class="right_word1">password:</p>
            <el-form-item prop="password" style="width: 400px;">
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="Enter your Password"
                style="width: 100%;"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <div>
            <div class="right_catpcha" v-if="catpchashow">
              <p class="right_word1">Verification code:</p>
              <div class="codeBox">
                <input class="catpcha" v-model="verifiCode">
                <div class="code" @click="refreshCode">
                  <component
                    :firstCode="firstCode"
                    v-bind:is="compArr.identify"
                    :identifyCode="identifyCodeNew"
                  ></component>
                </div>
              </div>
            <!-- 验证码框 -->
            </div>
            </div>
            <!-- 选择框 -->
            <div style="display: flex;justify-content: space-between;width: 400px;margin-top: 10px">
              <el-checkbox v-model="checked" :checked="checkedState">Remenber Me</el-checkbox>
              <div class="Forgot" @click="handleGo">Forgot password?</div>
            </div>
            <div v-if="false" style="height: 40px;margin-top: 10px;">
              <p class="Login">Login with:</p>
              <div class="Login_img">
                <ul class="Login_img1">
                  <li>
                    <img src="@/assets/facebook-01.png" alt />
                  </li>
                  <li>
                    <img src="@/assets/pinterest1.png" alt />
                  </li>
                  <li>
                    <img src="@/assets/twitter1.png" alt />
                  </li>
                </ul>
              </div>
            </div>
            <el-button class="btn1" @click="_handleLogin('ruleForm')">
              <p class="btn1_word">Login</p>
            </el-button>
          </el-form>
          <div class="New_Customers_">
            <p class="New_Customers">New Customers？</p>
          </div>
          <hr />
          <div class="btn2" @click="CreateAccount()">
            <p class="btn2_word">Create An Account</p>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
     <afooter-com></afooter-com>
    </div>
  </div>
</template>
<script>
import aheader from "@/components/aheader.vue";
import afooter from "@/components/afooter.vue"
import { handleLogin, handleCatpchas, mergeGoods} from "../../api/register";
import {loginImage} from "../../api/home";
import { async } from "q";
import qs from 'qs'
import secret from '../../assets/js/secret.js';
import identify from "../test/identify";

export default {
  name: "codetest",
  components: {
    "aheader-com": aheader,
    "afooter-com":afooter,
    identify
  },
  data() {
    return {
      login_num: 0,
      catpchas: '',
      code: '',
      loginImg: '',
      loginHref: '',
      firstCode: '',
      verifiCode: '',
      catpchashow:false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please enter a valid email.",
            trigger: "blur"
          },
          {
            required: true,
            type: "email",
            message: "Please enter a valid email.",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter password.",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/g,
            message: "The password you entered is incorrect.",
            trigger: "blur"
          }
        ]
      },
      compArr: {
        identify: "identify"
      },
      // identifyCodes: "7896",
      identifyCodeNew: "1234",
      checked: false,
      checkedState: false,
      loginData: [],
      num: 1
    };
  },
  watch:{
    num:function(val, old){
      if(val > 2){
        this.catpchashow = true
        if (val === 3) {
          this.$message.warning('There are many errors, please enter the validation code.')
        }
        this.handleCatpchas()
      }else{
        this.catpchashow = false
      }
    }
  },
  created(){
    this.getLoginImage()
    this.getCookie('userInfo')
    this.num = localStorage.getItem('errNum')
    // var that = this;
    // document.onkeydown = function () {
    //   var key = window.event.keyCode;
    //   if (key === 13) {
    //     that._handleLogin('ruleForm')
    //   }
    // }
  },
  methods: {
    refreshCode() {
      this.handleCatpchas()
    },
    linkHref(link){
      window.open(link)
    },
    async handleCatpchas() {
      let data = await handleCatpchas();
      this.identifyCodeNew = data.data
    },
    async getLoginImage() {
      let data = await loginImage();
      // var kk = this.$md5('uuuuuuuuu')
      // console.log('888888', kk)
      this.loginImg = data.data[0].picture_src
      this.loginHref = data.data[0].picture_href
    },
    _handleLogin: function (formName) {
      var that = this
      let params = {
        cont: that.num,
        checked: that.checked,
        email: secret.Encrypt(this.ruleForm.name),
        password: secret.Encrypt(this.ruleForm.password)
      };
      // console.log('888888', params)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.checked) {
            that.saveCookie('userInfo', params, 30)
          } else if (!that.checked) {
            that.removeCookie('userInfo')
          }
          that.handleLoginSub()
        }
      })
    },
    handleLoginSub() {
      let pre = {
        catpchas: this.verifiCode,
        email: this.ruleForm.name,
        password: this.ruleForm.password
      }
      var routerStr = this.$store.state.fromUrl
      handleLogin(pre).then((res)=>{
        if (res.code === 200) {
          this.loginData = res.data
          this.$message({
            message: " success",
            type: "success"
          });
          if (routerStr) {
            this.$router.push(routerStr)
            this.$store.state.fromUrl = ''
          } else {
            this.$router.push('/')
          }
          this.mergeGoodsFuc()
          localStorage.setItem('userToken', this.loginData.token)
        }else {
          this.$message.warning('ERROR Incorrect username or password!')
          this.num = res.data
        }
      })
    },
    mergeGoodsFuc(){
    mergeGoods().then((res)=>{
      console.log(res)
    })
    },
    saveCookie: function (cookieName,cookieValue,cookieDates) {
      var d = new Date();
      d.setDate(d.getDate()+cookieDates)
      document.cookie = cookieName+"$$" + JSON.stringify(cookieValue)  + ";path=/;expires=" + d.toGMTString()
    },
    removeCookie: function (cookieName) {
      document.cookie=encodeURIComponent(cookieName)+"=; expires=" + new Date();
    },
    getCookie: function(cookieName){
      var that = this
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('$$')
        if (arr[0] === cookieName){
          if (arr[1]) {
            var userInfo = JSON.parse(arr[1])
            if (userInfo.checked === true) {
              that.checkedState = true
              that.ruleForm.name = secret.Decrypt(userInfo.email)
              that.ruleForm.password = secret.Decrypt(userInfo.password)
              if (userInfo.num >= 3) {
                that.catpchashow = true
              }
            }
          }
        }
      }
      return "";
    },
    CreateAccount: function(){
      this.$router.push('/register')
    },
    handleGo() {
      this.$router.push({
        path: "/forgot_password"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/css/login.scss"
</style>
