<template>
  <div class="wrap_1">
    <div style="margin: 0 auto">
      <aheader-com></aheader-com>
    </div>
    <div class="wrapLogin">
      <div class="content">
        <div class="left">
          <div class="left_img">
            <img src="@/assets/注册页面.png" alt />
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
            <div style="height: 40px;margin-top: 10px;">
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
            <el-button class="btn1" @click="handleLogin('ruleForm')">
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
    <!-- <div style="height:1000px;">aaaa</div> -->
    <footer-com></footer-com>
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import aheader from "@/components/aheader.vue";
import { handleLogin, handleCatpchas, mergeGoods } from "../../api/register";
import { async } from "q";
import qs from 'qs'
import identify from "../test/identify";
import { constants } from 'fs';

export default {
  name: "codetest",
  components: {
    "footer-com": Footer,
    "aheader-com": aheader,
    identify
  },
  data() {
    return {
      login_num: 0,
      catpchas: '',
      code: '',
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
            message: "please enter your email!",
            trigger: "blur"
          },
          {
            type: "email",
            message: "The email address you entered is invalid.",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "please enter your password!",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9]{6,14}$/,
            message: "The password you entered is invalid.",
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
    this.getCookie('userInfo')
    this.num = localStorage.getItem('errNum')
  },
  methods: {
    refreshCode() {
      this.handleCatpchas()

    },
    async handleCatpchas() {
      let data = await handleCatpchas();
      this.identifyCodeNew = data.data
    },
    handleLogin: function (formName) {
      var that = this
      let params = {
        cont: that.num,
        checked: that.checked,
        email: this.ruleForm.name,
        password: this.ruleForm.password
      };
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
    async handleLoginSub() {
      var that = this
      var params
      params = {
        catpchas: that.verifiCode,
        email: this.ruleForm.name,
        password: this.ruleForm.password
      }
      let data = await handleLogin(params)
      this.loginData = data;
      let code = this.loginData.code;
      if (code === 200) {
        that.$message({
          message: " success",
          type: "success"
        });
        that.mergeGoodsFuc()
        that.$router.push('/')
        localStorage.setItem('userName', that.ruleForm.name)
        localStorage.setItem('userToken', this.loginData.data.token)
      } else {
        that.$message.error(data.msg)
        that.num = data.data
        localStorage.setItem('errNum', data.data)
      }
    },
    async mergeGoodsFuc(){
      let data = await mergeGoods()
      console.log('9999999', data)
    },
    saveCookie: function (cookieName,cookieValue,cookieDates) {
      var d = new Date();
      d.setDate(d.getDate()+cookieDates)
      document.cookie = cookieName+"=" + JSON.stringify(cookieValue)  + ";path=/;expires=" + d.toGMTString()
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
        var arr = arrcookie[i].split("=");
        if (arr[0] === cookieName){
          if (arr[1]) {
            var userInfo = JSON.parse(arr[1])
            if (userInfo.checked === true) {
              that.checkedState = true
              that.ruleForm.name = userInfo.email
              that.ruleForm.password = userInfo.password
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
.wrapLogin {
  width: 100%;
}
.wrap_1 {
  width: 100%;
  // margin-left: 100px;
}
.content {
  width: 1440px;
  height: 630px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.left_img > img {
  width: 100%;
  height: 530px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(233, 233, 233, 1);
  float: left;
}
.right {
  width: 460px;
  height: 545px;
  border: 1px solid gainsboro;
  margin-top: 20px;
  float: right;
  padding: 28px;
  box-sizing: border-box;
}
.right_word1 {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  color: rgba(51, 51, 51, 1);
}
.el-input__inner {
  width: 400px !important;
  height: 40px !important;
  position: relative !important;
  top: 10px !important;
  left: -71px !important;
  border: 1px solid #707070;
  border-radius: 0;
}
.el-form-item__error {
  color: #f56c6c;
  font-size: 14px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 49px;
  left: -67px;
}
.el-checkbox__inner {
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  margin-left: 30px;
  margin-right: -5px;
  padding-left: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  background-color: #fff;
  z-index: 1;
}
.Forgot {
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  text-decoration: underline;
}
.el-checkbox__label {
  margin-top: 10px;
}
.Login {
  font-weight: 400;
  color: #333333;
  float: left;
  height: 40px;
  line-height: 44px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
}
.Login_img {
  display: inline-block;
}
.Login_img1 {
  display: flex;
}
.Login_img1 > li {
  padding: 10px 10px 0 10px;
}
.Login_img1 > li > img {
  width: 24px;
  height: 24px;
}
.btn1 {
  width: 400px;
  height: 40px;
  background: rgba(18, 16, 55, 1);
  border: none;
  margin-bottom: 20px;
  margin-top: 20px;
}
.btn1_word {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.wrap_1 .wrapLogin hr {
  width: 391px;
  margin: 0 auto;
  border: 1px solid rgba(228, 228, 228, 1);
}
.New_Customers_ {
  width: 125px;
  height: 21px;
  background-color: #fff;
  position: relative;
  top: 11px;
  left: 37%;
  z-index: 1111;
  // padding-bottom:42px;
}
.New_Customers {
  width: 140px;
  height: 21px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.btn2 {
  width: 400px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(51, 51, 51, 1);
  margin-top: 30px;
}
.btn2:hover{
  background-color: #eee;
}
.btn2_word {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.catpcha{
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
}
  .codeBox{
    display: flex;
    justify-content: start;
  }
</style>
