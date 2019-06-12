<template>
  <div class="wrap_1">
    <aheader-com></aheader-com>
    <div class="wrap">
    <div class="content_1">
      <div class="left">
        <div class="left_img">
          <img src="@/assets/注册页面.png" alt>
        </div>
      </div>
              <!-- 登陆 -->
        <div class="right">
          <!-- 验证邮箱 -->
          <p class="right_word1">Email Address:</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="邮箱" prop="name" >
              <el-input v-model="ruleForm.name" placeholder="Enter your Email"></el-input>
            </el-form-item>
            <!-- 验证密码 -->
            <p class="right_word1">password Address:</p>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="Enter your Password"></el-input>
            </el-form-item>
          </el-form>
          <el-checkbox v-model="checked">Remenber Me</el-checkbox>
          <div class="Forgot" @click="handleGo">Forgot password?</div>
          <p class="Login">Login width:</p>
          <div class="Login_img">
            <ul class="Login_img1">
              <li>
                <img src="@/assets/facebook-01.png" alt>
              </li>
              <li>
                <img src="@/assets/pinterest1.png" alt>
              </li>
              <li>
                <img src="@/assets/twitter1.png" alt>
              </li>
            </ul>
          </div>
          <button class="btn1" @click="handleLogin(ruleForm)">
            <p class="btn1_word">Login</p>
          </button>
          <div class="New_Customers_">
            <p class="New_Customers">New Customers？</p>
          </div>
          <hr>
          <div class="btn2">
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
export default {
  components: {
    "footer-com": Footer,
    "aheader-com": aheader
  },
     data() {
       return {
         ruleForm: {
          name: '',
          password: ''
        },
         rules: {
          name: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: 'The email address you entered is invalid.', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,14}$/, message: '请正确输入密码', trigger: 'blur' }
          ]
         },
         checked: ''
       }
     },
     methods: {
       handleLogin(ruleForm) {
         if (ruleForm.password == '' || ruleForm.name == '') {
           alert('请输入邮箱和密码')
           return
         } else {
          //  后端请求数据验证
         }
       },
       handleGo(){
          this.$router.push({
             path: "/apply_reset_password"
          })
       }
     }
};
</script> 

<style lang="scss">
ul li {
  list-style: none;
}
.wrap{
  width: 100%;

.wrap_1 {
  width: 100%;
  // margin-left: 100px;
.content_1 {
  width: 90%;
  height: 630px;
  margin: auto;
.left_img > img {
  width: 940px;
  height: 530px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(233, 233, 233, 1);
  float: left;
  margin-top: 40px;
  margin-bottom: 43px;
}
.right {
  width: 460px ;
  height: 494px;
  border: 1px solid gainsboro;
  margin-left: 40px;
  margin-top: 57px;
  float: right;
}
.right_word1 {
  margin-left: 30px;
  margin-top: 40px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
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
.Forgot{
  display: inline-block;
  margin-left: 158px;
}
.el-checkbox__label {
  margin-top: 10px;
}
.Login {
  display: inline-block;
  margin-left: 35px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.Login_img {
  display: inline-block;
}
.Login_img1 {
  display: flex;
}
.Login_img1 > li {
  padding: 10px;
}
.Login_img1 > li > img {
  width: 24px;
  height: 24px;
}
.btn1 {
  width: 400px;
  height: 40px;
  background: rgba(18, 16, 55, 1);
  margin-left: 32px;
  border: none;
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
  width: 130px;
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
}
.btn2_word {
  font-size: 16px;
  font-weight: 400;
  margin-left: 123px;
  margin-top: 10px;
  color: rgba(51, 51, 51, 1);
}
}
}








</style>