<template>
  <div class="wrap_1">
    <div style="margin: 0 auto">
     <aheader-com></aheader-com>
    </div>
    <div class="wrapLogin">
    <div class="content">
      <div class="left">
        <div class="left_img">
          <img src="@/assets/注册页面.png" alt>
        </div>
      </div>
              <!-- 登陆 -->
        <div class="right">
          <!-- 验证邮箱 -->
          <p class="right_word1">Email Address:</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" >
            <el-form-item prop="name" style="width: 400px;">
              <el-input v-model="ruleForm.name" placeholder="Enter your Email" style="width: 100%;"></el-input>
            </el-form-item>
            <!-- 验证密码 -->
            <p class="right_word1">password:</p>
            <el-form-item prop="password" style="width: 400px;">
              <el-input v-model="ruleForm.password" placeholder="Enter your Password" style="width: 100%;"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked">Remenber Me</el-checkbox>
            <div class="Forgot" @click="handleGo">Forgot password?</div>
            <p class="Login">Login with:</p>
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
            <button class="btn1" @click="handleLogin('ruleForm')">
              <p class="btn1_word">Login</p>
            </button>
          </el-form>
          <div class="New_Customers_">
            <p class="New_Customers">New Customers？</p>
          </div>
          <hr>
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
            { required: true, message: 'please enter your email!', trigger: 'blur' },
            { type: 'email', message: 'The email address you entered is invalid.', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'please enter your password!', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,14}$/, message: 'The password you entered is invalid.', trigger: 'blur' }
          ]
         },
         checked: ''
       }
     },
     methods: {
       handleLogin(formName) {
         this.$refs[formName].validate((valid) => {
           if (valid) {
             alert('submit!');
           } else {
             console.log('error submit!!');
             return false;
           }
         })
         // if (ruleForm.password == '' || ruleForm.name == '') {
         //   // alert('请输入邮箱和密码')
         //   this.$message.error('请输入邮箱和密码')
         //   return
         // } else {
         //  //  后端请求数据验证
         // }
       },
       CreateAccount: function () {
         // alert($('.btn2_word').text())
         var st = this.$store.state.baseServiceUrl
         console.log('666', st)
         this.ajax('/schedule/delSchedule', {}).then(res => {
           if (res.code === '200') {
             this.$message({
               message: '删除成功',
               type: 'success'
             })
           } else {
             this.log('delSchedule:', res)
           }
         })
       },
       handleGo(){
          this.$router.push({
             path: "/apply_reset_password"
          })
       }
     }
};
</script>

<style lang="scss" scoped>
ul li {
  list-style: none;
}
.wrapLogin {
  width: 100%;
}
.wrap_1 {
  width: 100%;
  // margin-left: 100px;
}
.content{
  width:1440px;
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
  width: 460px ;
  height: 494px;
  border: 1px solid gainsboro;
  margin-top: 20px;
  float: right;
  padding: 28px;
}
.right_word1 {
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
hr {
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
  width: 130px;
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
  border: 1px solid rgba(51, 51, 51, 1);
  margin-top: 30px;
}
.btn2_word {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}








</style>
