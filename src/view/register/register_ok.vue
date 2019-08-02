<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_4">
      <div class="left">
      {{theNum}}
      </div>
      <div class="right">
        <p class="word_one">Congratulations! You have successfully registered!</p>
        <p class="word_two">PLEASE CHECK YOUR EMAIL</p>
        <p class="word_thr">a confirmation email. This link is valid only once.</p>
      </div>
    </div>
  </div>
</template>
<script>
import Aheader from "@/components/aheader.vue";
export default {
  components:{
    "aheader-com": Aheader
  },
  data(){
    return{
      activeNav: '',
        theNum: 5,
        interval: null
    }
  },
   mounted() {
      this.interval = setInterval(() => {
        if (this.theNum === 1) {
          clearInterval(this.interval)
          this.$router.push({path: '/login'})
        } else {
          this.theNum--
        }
      }, 1000)
    },
}
</script>
<style lang="scss">
 .wrap{
   width: 100%;

  .content_4{
    width: 80%;
  .left{
  width: 40px;
  height: 40px;
  margin-left: 514px;
  margin-top: 155px;
}
.right{
  width:458px;
  height: 76px;
  // background-color: aqua;
  margin-left: 593px;
   margin-top: -38px;
.word_one{
font-size:18px;
font-family:Tahoma;
font-weight:bold;
color:rgba(51,51,51,1);
}
.word_two{
font-size:14px;
font-family:Tahoma;
font-weight:400;
color:rgba(51,51,51,1);
margin-top: 11px;
}
.word_thr{
font-size:14px;
font-family:Tahoma;
font-weight:400;
line-height:18px;
color:rgba(102,102,102,1);
margin-top: 5px;
}
}
 .left {
    background: url('../../../static/img/time5.gif') no-repeat center ;
    height: 60px;
    width: 60px;
    text-align: center;
    line-height: 60px;
  }
  }
 }

// https://blog.csdn.net/github_37483541/article/details/54951174
</style>
