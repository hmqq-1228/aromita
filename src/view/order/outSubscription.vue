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
                          <el-input placeholder="" v-model="ruleForm.email" readonly></el-input>
                        </el-form-item>
                        <div style="color: #888;font-size: 14px;">Subscribe Type</div>
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
import {yesSubscribe, delSubscribe, outSubscribe} from '../../api/subscription'
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
              { type: 'array', required: true, message: 'Please choose the subscribe type.', trigger: 'change' }
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
      getScription(){
        this.ruleForm.email = this.$route.query.email
      },
      subMyScription (formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            outSubscribe({subscribe_email:that.ruleForm.email,subscribe_status: 20}).then((res)=>{
              // console.log('666666', res)
              if (res.code === 200) {
                this.$alert('Unsubscribe successfully', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
                that.getScription()
              } else {
                this.$alert('Unsubscribe failed, please try again', '', {
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


