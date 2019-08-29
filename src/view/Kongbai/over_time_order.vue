<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_4">
      <div class="left">
        {{theNum}}
      </div>
      <div class="right">
        <p class="word_one">Your order has expired (over 30 mins unpaid). Please check it in the CANCELLED ORDER.</p>
      </div>
    </div>
    <div class="foot">
      <afooter-com></afooter-com>
    </div>
  </div>
</template>
<script>
  import Aheader from "@/components/aheader.vue";
  import Footer from "@/components/afooter.vue";
  export default {
    components:{
      "aheader-com": Aheader,
      "afooter-com": Footer
    },
    data(){
      return{
        activeNav: '',
        theNum: 5,
        interval: null
      }
    },
    mounted() {
      $('.left').css('background-image', "url(../../../static/img/time5.gif)")
      this.interval = setInterval(() => {
        if (this.theNum === 1) {
          $('.left').css('background-image', "")
          clearInterval(this.interval)
          // this.$router.push({
          //   name: 'myOrder',
          //   params: {
          //     path:'50'
          //   }
          // })
        } else {
          this.theNum--
        }
      }, 1000)
    },
  }
</script>
<style lang="scss" scoped>
  .wrap{
    width: 100%;

    .content_4{
      width: 570px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      margin-top: 200px;
      .left{
        width: 40px;
        height: 40px;
      }
      .right{
        width: 425px;
        height: 60px;
        padding: 6px 20px;
        line-height: 25px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
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
        /*background: url('../../../static/img/time5.gif') no-repeat center ;*/
        background-repeat: no-repeat;
        background-position: center;
        height: 60px;
        width: 60px;
        text-align: center;
        line-height: 60px;
      }
    }
  }
  .foot{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  // https://blog.csdn.net/github_37483541/article/details/54951174
</style>
