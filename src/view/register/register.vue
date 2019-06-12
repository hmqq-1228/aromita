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
                  type="password"
                  placeholder="Enter your Email"
                  v-model="ruleForm2.eamil"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <p class="right_word1">Password:</p>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm2.pass"
                  placeholder="Enter your Password"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

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
              <div class="join_formitem">
                <div class="captcha">
                  <input type="text" class="verification_input" v-model="picVerification">
                  <input
                    type="button"
                    @click="createdCode"
                    class="verification"
                    v-model="checkCode"
                  >
                </div>
              </div>

              <!-- <el-form-item prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm2.checkPass"
                  placeholder="Enter your Password"
                  auto-complete="off"
                ></el-input>
              </el-form-item>-->
            </el-form>
            <div class="words_r">
            <Checkbox class="word_r">I have read and agreed to the<u @click="HandleErqi" class="word_p">Privacy Policy </u></Checkbox>
            <Checkbox><u @click="HandleErqi" class="word_p">“Subscription account service”</u></Checkbox>
            </div>
            <button class="btn1">
              <p class="btn1_word">Create an Account</p>
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
export default {
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
        password2: ''
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
      checked: false
    };
  },
  created() {
    this.createdCode();
  },
  methods: {
    HandleErqi(){
      this.$router.push({
             path: "/erqi"
          })
    },
    // 图片验证码
    createdCode() {
      // 先清空验证码输入
      this.code = "";
      this.checkCode = "";
      this.picVerification = "";
      // 验证码长度
      const codeLength = 4;
      // 随机数
      const random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (let i = 0; i < codeLength; i++) {
        // 取得随机数的索引(0~35)
        let index = Math.floor(Math.random() * 36);
        // 根据索引取得随机数加到code上
        this.code += random[index];
      }
      // 把code值赋给验证码
      this.checkCode = this.code;
    }
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
    }
    .right {
      width: 460px;
      height: 702px;
      border: 1px solid gainsboro;
      margin-left: 40px;
      margin-top: 57px;
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
        width: 138px;
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
          margin-left: 30px;
          font-weight: normal;
          padding: 5px 0 5px 10px;
          height: 40px;
          border: 1px solid #707070;
          // margin-bottom: 37px;
          margin-top: 10px;
        }
        .verification {
          background: url("../../assets/yanzhengma.jpg");
          width: 100px;
          letter-spacing: 5px;
          margin-left: 25px;
          border: none;
          font-style: oblique;
          height: 40px;
          font-size: 16px;
          transform: translate(-15px, 0);
        }
      }
      .word_r {
        margin-top: 37px;
      }
    }
  }
}
</style>