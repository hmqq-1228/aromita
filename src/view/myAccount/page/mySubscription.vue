<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order Scription">
                        <h3 class="my_title">My Subscription</h3>
                      <social-sharing url="https://vuejs.org/" inline-template @open="testShow($event)" @close="closeShow()">
                        <div>
                          <network network="facebook">
                            <i class="fa fa-facebook"></i> Facebook
                          </network>
                          <!--<network network="googleplus">-->
                            <!--<i class="fa fa-google-plus"></i> Google +-->
                          <!--</network>-->
                          <!--<network network="linkedin">-->
                            <!--<i class="fa fa-linkedin"></i> LinkedIn-->
                          <!--</network>-->
                          <network network="pinterest">
                            <i class="fa fa-pinterest"></i> Pinterest
                          </network>
                          <!--<network network="reddit">-->
                            <!--<i class="fa fa-reddit"></i> Reddit-->
                          <!--</network>-->
                          <network network="twitter">
                            <i class="fa fa-twitter"></i> Twitter
                          </network>
                          <!--<network network="vk">-->
                            <!--<i class="fa fa-vk"></i> VKontakte-->
                          <!--</network>-->
                          <!--<network network="weibo">-->
                            <!--<i class="fa fa-weibo"></i> Weibo-->
                          <!--</network>-->
                          <!--<network network="whatsapp">-->
                            <!--<i class="fa fa-whatsapp"></i> Whatsapp-->
                          <!--</network>-->
                        </div>
                      </social-sharing>
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
    mounted() {
      console.log('fffff', window)
    },
    methods:{
      testShow (e) {
        console.log('88888888', e)
      },
      closeShow () {
        console.log('99999999')
      },
      subMyScription (formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            yesSubscribe({subscribe_email:that.ruleForm.email,subscribe_status: 10}).then((res)=>{
              console.log('666666', res)
              if (res.code === 200) {
                this.$alert('Edit Successfully', '', {
                  center: true,
                  confirmButtonText: 'OK',
                })
              } else {
                this.$alert('Edit Error', '', {
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


