<template>
  <div class="wrap_1">
    <div class="footer">
          <!-- 社交 -->
          <div class="img">
            <div  v-for="(item,index) in icon" :key="index">
              <a :href="item.picture_href">
                <img :src="url+item.picture_src" alt>
              </a>
            </div>
          </div>
          <!-- 服务 -->
          <div class="xian">
            <div class="sixtyCont">
              <div class="sixty" v-for="(item,index) in footTitle" :key="index">
                <div>
                  <a :href="item.picture_href">
                      <img :src="url+item.picture_src" alt>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="footBox">
            <div class="footer_left">
              <div class="left_one" v-for="(item,index) in list" :key="index">
                <!-- <p class="left_one1">COMPANY INFO</p> -->
                <ul class="left_one2">
                  <li v-for="(item1,index1) in item" :key="index1" :class="[index1==0 ? 'active' : '']" @click="linkHref(item1.tool_href)">{{item1.tool_title}}</li>
                </ul>
              </div>
            </div>
            <div class="footer_right">
              <p class="know">Stay In The Know</p>
              <span class="deals">Be the first to see our new arrivals & exclusive deals</span>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item class="search isfooter" prop="subscribeKey" style="width: 336px">
                  <el-input placeholder="Enter your email" v-model="ruleForm.subscribeKey" clearable></el-input>
                </el-form-item>
                <button class="btn">
                  <p class="btn_word" @click="subscribeSub('ruleForm')">SUBSCRIBE</p>
                </button>
              </el-form>
            </div>
          </div>
          <div class="xian2"></div>
          <div class="pay-02">
            <img src="@/assets/pay-02.png" alt="">
          </div>
    </div>
    <div class="afooter">{{aromite}}</div>
  </div>
</template>
<script>
import {homeIcon,homeFootTitle,homeFoote} from '../api/home'
import {Nosubscribe} from '../api/subscription'
export default {
   data() {
    return {
      url:'https://arapi.panduo.com.cn/uploads/',
      ruleForm:{
        subscribeKey:'',
      },
      rules:{
        subscribeKey:[
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
        ]
      },
      icon: [], //40
      footTitle: [], //50
      list:[],
      aromite: ''
    };
  },
  mounted(){
    this.homeIcon()
    this.homeFootTitle()
    this.homeFoote()
    this.aromiteInfo()
  },
  methods: {
    aromiteInfo: function () {
      this.$axios.get('api/homelayout/80', {}).then(res => {
        console.log('kkkkkk', res)
        this.aromite = res.data[0].picture_title
      })
    },
    //运营配置活动页
    linkHref(link){
      window.location.href = link
    },
    async homeFoote() {
      let data = await homeFoote()
      this.list = data.data
    },
    // 40
    async homeIcon() {
      let data = await homeIcon()
      for (let icon of data.data){
       this.icon = data.data
      }
    },
    //  50
    async homeFootTitle() {
      let data = await homeFootTitle()
      for (let footTitle of data.data){
       this.footTitle = data.data
      }
    },
    //未登录用户订阅
    subscribeSub(formName){
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          Nosubscribe({customer_email_address:that.ruleForm.subscribeKey}).then((res)=>{

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
  .afooter{
      width: 100%;
      height: 40px;
      line-height: 32px;
      text-align: center;
      background: #FBFBFB;
      color: #999;
      font-size: 12px;
  }
  @import "@/assets/css/footer.scss"
</style>
