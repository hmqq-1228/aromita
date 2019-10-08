<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order Scription">
                        <h3 class="my_title">My Subscription</h3>
                      <!--<social-sharing url="https://vuejs.org/" inline-template @open="testShow($event)" @close="closeShow()">-->
                        <!--<div>-->
                          <!--<network network="facebook">-->
                            <!--<div><img src="../../../assets/twitter1.png" alt=""></div>-->
                          <!--</network>-->
                          <!--<network network="pinterest">-->
                            <!--<i class="fa fa-pinterest"></i> Pinterest-->
                          <!--</network>-->
                          <!--<network network="twitter">-->
                            <!--<i class="entypo-twitter icon-sn-twitter share-3"></i> Twitter-->
                          <!--</network>-->
                        <!--</div>-->
                      <!--</social-sharing>-->
                        <p class="Scription_tip">After subscribing from us, you can receive our promotional messages, more product information and special offers.</p>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item prop="email">
                          <el-input placeholder="Enter your email" v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <div style="color: #888;font-size: 14px;">Subscribe Type</div>
                        <el-form-item prop="type" class="checkStyle">
                          <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="The marking email" name="type"></el-checkbox>
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
import {yesSubscribe, mysubscribe} from '../../../api/subscription'
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
            type: ['']
          },
          rules:{
            email: [
              { required: true, message: 'Please enter your email address', trigger: 'blur' },
              { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
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
      // testShow (e) {
      //   // console.log('88888888', e)
      // },
      getScription(){
        mysubscribe().then((res)=>{
          console.log('666666', res)
          if (res.code === 200) {
            if (res.data.subscribe_status === 10) {
              this.ruleForm.email = res.data.customers_for_mailchimp_email
              this.ruleForm.type = ['The marking email']
            } else {
              this.ruleForm.email = ''
            }
          }
        })
      },
      // closeShow () {
      //   // console.log('99999999')
      // },
      subMyScription (formName) {
        var that = this
        var type = that.ruleForm.type.length !== 0?10:20
        that.$refs[formName].validate((valid) => {
          if (valid) {
            yesSubscribe({subscribe_email:that.ruleForm.email,subscribe_status: type}).then((res)=>{
              // console.log('666666', res)
              if (res.code === 200) {
                that.getScription()
                this.$alert('Modified Successfully', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
              } else if (res.code === 10001){
                this.$alert('This email address is already subscribed.', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
                that.getScription()
              }else {
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
@import "@/assets/css/account.scss"
</style>


