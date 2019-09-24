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
                            <!--<i class="fa fa-facebook"></i> Facebook-->
                          <!--</network>-->
                          <!--&lt;!&ndash;<network network="googleplus">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-google-plus"></i> Google +&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
                          <!--&lt;!&ndash;<network network="linkedin">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-linkedin"></i> LinkedIn&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
                          <!--<network network="pinterest">-->
                            <!--<i class="fa fa-pinterest"></i> Pinterest-->
                          <!--</network>-->
                          <!--&lt;!&ndash;<network network="reddit">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-reddit"></i> Reddit&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
                          <!--<network network="twitter">-->
                            <!--<i class="fa fa-twitter"></i> Twitter-->
                          <!--</network>-->
                          <!--&lt;!&ndash;<network network="vk">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-vk"></i> VKontakte&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
                          <!--&lt;!&ndash;<network network="weibo">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-weibo"></i> Weibo&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
                          <!--&lt;!&ndash;<network network="whatsapp">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="fa fa-whatsapp"></i> Whatsapp&ndash;&gt;-->
                          <!--&lt;!&ndash;</network>&ndash;&gt;-->
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
        mysubscribe().then((res)=>{
          console.log('666666', res)
          if (res.code === 200) {
            this.ruleForm.email = res.data.customers_for_mailchimp_email
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
@import "@/assets/css/account.scss"
</style>


