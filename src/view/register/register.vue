<template>
  <div class="register">
    <header-com></header-com>
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
                    :identifyCode="identifyCodeNew"
                  ></component>
                </div>
              </div>
            </el-form>
          <div class="words_r">
            <div class="metalChecked">
              <input type="checkbox" id="metal1" name="metal">
              <label for="metal1"></label>
              <span>I have read and agreed to the <u @click="HandleErqi" class="word_p">Privacy Policy </u></span></div>
            <div class="metalChecked">
              <input type="checkbox" id="metal2" name="metal1" checked>
              <label for="metal2"></label>
              <span><u @click="HandleErqi" class="word_p">“Subscription account service”</u></span></div>
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
              <!-- 复选框 -->
      </div>
    </div>
    <!-- <div style="height:1000px;">aaaa</div> -->
    <footer-com></footer-com>
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
import {handleRegist, Catpcha} from "../../api/register";
import identify from "../test/identify";
import qs from 'qs'
export default {
  name: "register",
  components: {
    "footer-com": Footer,
    "header-com": Header,
    identify
  },
  data() {
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        email: '',
        password: '',
        checkpass: '',
        Verification: ''
      },
      rules2: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式输入错误', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,14}$/, message: '请正确输入密码', trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        Verification: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    handleRegister: function () {
      var that = this
      if (that.ruleForm2.email && that.ruleForm2.password && that.ruleForm2.checkpass && that.ruleForm2.Verification) {
        that.tipInfo = ''
        that.registerFormSub()
      } else {
        that.tipInfo = 'Please complete your information'
        // that.$message.warning('Please complete your information')
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
      console.log('22222222', data)
      if (data.code === 200) {
        that.$message.success(data.msg)
        that.$router.push('/register_ok')
      } else {
        // that.$message.warning(data.msg.email[0])
      }
    },
    //验证码
    refreshCode() {
      console.log(123)
      // this.identifyCodeNew = "";
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
ul li {
  list-style: none;
}
.tip{
  color: #f56c6c;
  height: 20px;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
}
.register {
  width: 100%;
}
.wrap {
  width: 100%;
}
.content_5 {
  width: 1440px;
  height: 830px;
  margin: 0 auto;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
.left_img > img {
  width: 940px;
  height: 530px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(233, 233, 233, 1);
}
.right {
  padding: 30px;
  width: 462px;
  height: 610px;
  border: 1px solid gainsboro;
  box-sizing: border-box;
  padding-top: 10px;
}
.right_word1 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.words_r{
  font-size: 14px;
  color: #333;
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
.word_r {
  // font-size: 14px;
  margin-bottom: 15px;
}
.word_p{
  display: inline;
  margin-left: 2px;
  cursor: pointer;
}
.ivu-checkbox-wrapper {
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  margin-right: 100px;
}
.btn1 {
  width: 398px;
  height: 40px;
  background: rgba(18, 16, 55, 1);
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
}
.btn1_word {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
hr {
  width: 391px;
  margin: 0 auto;
  border: 1px solid rgba(228, 228, 228, 1);
}
.New_Customers_ {
  width: 146px;
  height: 21px;
  background-color: #fff;
  position: relative;
  top: 11px;
  left: 32%;
  z-index: 1111;
  // padding-bottom:42px;
}
.New_Customers {
  width: 156px;
  height: 21px;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.btn2 {
  width: 396px;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba(51, 51, 51, 1);
  margin-top: 30px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  cursor: pointer;
  text-align: center;
}
.btn2:hover{
  background-color: #eee;
}
.word_r {
  margin-top: 37px;
}
.catpcha{
  height: 30px;
  line-height: 30px;
}
</style>
