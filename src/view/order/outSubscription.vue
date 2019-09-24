<template>
    <div class="myAccount out">
      <div style="margin: 0 auto">
        <aheader-com></aheader-com>
      </div>
        <div class="account">
            <div class="accountBox">
                <div class="navCount">
                    <div class="my_order Scription">
                        <h3 class="my_title">Unsubscribe</h3>
                        <p class="Scription_tip">Please note that you may not receive all markting email messages from us after unsubscribe.</p>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item prop="email">
                          <el-input placeholder="Enter your email" v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item prop="type" class="checkStyle">
                          <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="The marking email" name="type"></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <div class="subScription_btn">
                            <div class="sub" @click="subMyScription('ruleForm')">Confirm</div>
                        </div>
                      </el-form>
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
import {yesSubscribe, delSubscribe} from '../../api/subscription'
import aheader from "@/components/aheader.vue";
import afooter from "@/components/afooter.vue"
export default {
  components: {
    "aheader-com": aheader,
    "afooter-com":afooter,
  },
    data(){
        return{
          checkAll: false,
          checked: true,
          ruleForm:{
            email: '',
            type: ['The marking email']
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
    mounted() {
      // console.log('fffff', window)
    },
   created (){
      this.getScription()
   },
    methods:{
      testShow (e) {
        // console.log('88888888', e)
      },
      getScription(){
        delSubscribe().then((res)=>{
          console.log('666666', res)
          if (res.code === 200) {
            // this.ruleForm.email = res.data.customers_for_mailchimp_email
          }
        })
      },
      closeShow () {
        // console.log('99999999')
      },
      subMyScription (formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            yesSubscribe({subscribe_email:that.ruleForm.email,subscribe_status: 10}).then((res)=>{
              // console.log('666666', res)
              if (res.code === 200) {
                this.$alert('Modified Successfully', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
              } else {
                this.$alert('Modified Error', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
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
  .foot{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
@import "@/assets/css/account.scss"
</style>


