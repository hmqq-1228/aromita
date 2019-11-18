<template>
  <div class="wrap overTime">
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
          this.$router.push({
            name: 'myOrder',
            params: {
              path:'50'
            }
          })
        } else {
          this.theNum--
        }
      }, 1000)
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/public.scss"
  // https://blog.csdn.net/github_37483541/article/details/54951174
</style>
