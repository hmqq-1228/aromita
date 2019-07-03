<template>
  <div class="wrap_r">
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
            <p class="right_word1">Email Address:</p>
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="email">
                <el-input
                  type="text"
                  placeholder="Enter your Email"
                  v-model="ruleForm2.eamil"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <p class="right_word1">Password:</p>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm2.pass"
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
            </el-form>
            <!-- 验证码 -->
            <div class="catpcha_">
            <div class="right_catpcha">
              <p class="right_word1">Verification code:</p>
              <textarea class="catpcha"></textarea>
            </div>
            <!-- 验证码框 -->
            <div class="code" @click="refreshCode">
              <component
                :firstCode="firstCode"
                v-bind:is="compArr.identify"
                :identifyCode="identifyCodeNew"
              ></component>
            </div>
            </div>



              <!-- 复选框 -->
            <div class="words_r">
              <div class="metalChecked">
                <input type="checkbox" id="metal1" name="metal">
                <label for="metal1"></label>
                <span>I have read and agreed to the<u @click="HandleErqi" class="word_p">Privacy Policy </u></span></div>
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
            <div class="btn2">
              <p class="btn2_word">Login</p>
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
import Header from "@/components/header.vue";
import {handleRegister,Catpcha} from "../../api/register";
import identify from "../test/identify";
export default {
  name: "codetest",
  components: {
    "footer-com": Footer,
    "header-com": Header
  },
  data() {
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        email: "",
        password: "",
        password2: '',
      },
      rules2: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式输入错误', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,14}$/, message: '请正确输入密码', trigger: 'blur' }
          ],
          checkpass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
         },
        handleRegister:[],
        handleCatpcha:[],
        compArr: {
        identify: "identify"
      },
    };
  },

  methods: {
    HandleErqi(){
      this.$router.push({
             path: "/erqi"
          })
    },
    //点击注册
    async handleRegister() {
         let data = await handleRegister()  
         for (let handleRegister of data) {
             this.handleRegister = data;
      }
       },
    //验证码
    refreshCode() {
      console.log(123)
      // this.identifyCodeNew = "";
      this.handleCatpchas()
      
    },
    async Catpcha() {
         let data = await Catpcha()  
         for (let handleCatpchas of data) {
             this.handleCatpchas = data;
      }
       },
   
  }
};
</script> 

<style lang="scss">
ul li {
  list-style: none;
}
.wrap_r {
  width: 100%;
}
.wrap {
  width: 100%;
  // margin: 0 auto;
  .content_5 {
    width: 90%;
    height: 830px;
    margin-left: 40px;
    // background-color: antiquewhite;
    // margin: auto;
    .left_img > img {
      width: 940px;
      height: 530px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid rgba(233, 233, 233, 1);
      float: left;
      margin-top: 80px;
      margin-bottom: 43px;
      margin-left: 129px;
    }
    .right {
      width: 460px;
      height: 702px;
      border: 1px solid gainsboro;
      margin-left: 40px;
      margin-top: 57px;
      margin-right: 68px;
      float: right;
      .right_word1 {
        margin-left: 30px;
        margin-top: 40px;
        font-size: 14px;
        font-weight: 400;
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
      .words_r{
          // font-size: 14px;
          margin-left: 30px;
      }
      .word_r{
          // font-size: 14px;
          margin-bottom: 15px;
          .word_p{
            display: inline;
            margin-left: 2px;
          }
      }
      .ivu-checkbox-wrapper {
        cursor: pointer;
        font-size: 14px;
        display: inline-block;
        margin-right: 100px;
      }
      .btn1 {
        width: 400px;
        height: 40px;
        background: rgba(18, 16, 55, 1);
        margin-left: 32px;
        border: none;
        margin-bottom: 20px;
        margin-top: 20px;
        .btn1_word {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }

      hr {
        width: 391px;
        margin: 0 auto;
        border: 1px solid rgba(228, 228, 228, 1);
      }
      .New_Customers_ {
        width: 150px;
        height: 21px;
        background-color: #fff;
        position: relative;
        top: 11px;
        left: 37%;
        z-index: 1111;
        // padding-bottom:42px;
      }
      .New_Customers {
        width: 146px;
        height: 21px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .btn2 {
        width: 400px;
        height: 40px;
        margin-left: 32px;
        border: 1px solid rgba(51, 51, 51, 1);
        margin-top: 30px;
        .btn2_word {
          font-size: 16px;
          font-weight: 400;
          margin-left: 178px;
          margin-top: 10px;
          color: rgba(51, 51, 51, 1);
        }
      }
 
      .word_r {
        margin-top: 37px;
      }
      .catpcha_{
          .code {
  // margin: 400px auto;
      width: 114px;
      height: 40px;
      margin-left: 263px;
      margin-top: -39px;
      border: 1px solid gainsboro;
}
    .catpcha{
      height: 30px;
      line-height: 30px;
    }
    }
    }
  }
  
}
</style>