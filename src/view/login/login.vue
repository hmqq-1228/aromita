<template>
  <div class="wrap_1">
    <div style="margin: 0 auto">
      <aheader-com></aheader-com>
    </div>
    <div class="wrapLogin">
      <div class="content">
        <div class="left" style="margin-top: 20px;">
          <div class="left_img" @click="linkHref(loginHref)">
            <img v-if="loginImg" :src="'https://arapi.panduo.com.cn/uploads/'+ loginImg" alt />
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
import { handleLogin, handleCatpchas} from "../../api/register";
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
          } else {
            this.$router.push('/')
          }
          // this.mergeGoodsFuc()
          localStorage.setItem('userToken', this.loginData.token)
        }else {
          this.$message.error('ERROR Incorrect username or password!')
          this.num = res.data
        }
      })
    },
    // async mergeGoodsFuc(){
    //   await mergeGoods()
    // },
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
.wrapLogin {
  width: 100%;
}
.foot{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
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
/*.left_img{*/
  /*height: 530px;*/
  /*width: 940px;*/
/*}*/
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
