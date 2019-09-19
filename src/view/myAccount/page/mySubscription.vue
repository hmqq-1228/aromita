<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order Scription">
                        <h3 class="my_title">My Subscription</h3>
                        <p class="Scription_tip">By Subscribing our Service,you can get first-hand information of New Arrivals, Special offers,order service and Hot Sale!</p>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item prop="email">
                          <el-input placeholder="Enter your email" v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item prop="type" class="checkStyle">
                          <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="营销订阅" name="type"></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <div class="subScription_btn">
                            <div class="sub" @click="subMyScription('ruleForm')">Submit</div>
                        </div>
                      </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import {yesSubscribe} from '../../../api/subscription'
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
          checkAll: false,
          checked: true,
          ruleForm:{
            email: '',
            type: ['营销订阅']
          },
          rules:{
            email: [
              { required: true, message: 'Please enter your email address', trigger: 'blur' },
              { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
          }
        }
    },
    methods:{
      subMyScription (formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            yesSubscribe({subscribe_email:that.ruleForm.email,subscribe_status: 10}).then((res)=>{
              console.log('666666', res)
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '订阅成功',
                  type: 'success'
                });
              } else {
                this.$notify({
                  title: '失败',
                  message: res.msg,
                  type: 'warning'
                });
              }
            })
          } else {
            return false;
          }
        });
      }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


