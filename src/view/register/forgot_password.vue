<template>
  <div class="warp_1">
    <aheader-com></aheader-com>
    <div class="warp">
      <div class="content_forgot">
        <p class="word_a">Need help with your password?</p>
        <div class="word_b">Enter the email you use for Aromita,</div>
        <span class="word_b">and we’ll help you create a new password.</span>
        <!-- 邮箱 -->
        <div class="emails">
              <el-input  prop="name"  ></el-input>
        </div>
        <!-- 验证码 -->
        <div class="join_formitem">
          <div class="captcha">
            <input type="text" class="verification_input" v-model="picVerification">
            <input type="button" @click="createdCode" class="verification" v-model="checkCode">
          </div>
        </div>
        <button class="btn_next">NEXT</button>
      </div>
    </div>
  </div>
</template>
<script>
import Aheader from "@/components/aheader.vue";
export default {
  components: {
    "aheader-com": Aheader
  },
  data() {
    return {
      code: "",
      checkCode: "",
      picVerification: "", //..验证码图片
      input: "",
        name: "",
      rules: {
        name: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.createdCode();
  },
  methods: {
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
.warp_1 {
  .warp {
    width: 86%;
    height: 308px;
    margin-top: 75px;
    margin-left: 136px;
    .content_forgot {
      width: 500px;
      height: 308px;
      margin: 0 auto;
      .word_a {
        font-size: 22px;
        font-weight: 400;
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
          padding: 5px 0 5px 10px;
          height: 40px;
          border: 1px solid #e6e6e6;
          margin-top: 38px;
        }
        .verification {
          background: url("../../assets/yanzhengma.jpg");
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