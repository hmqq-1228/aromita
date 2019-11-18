<template>
  <div class="wrap registerOk">
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
        this.$router.push({path: '/login'})
      } else {
        this.theNum--
      }
    }, 1000)
  },
}
</script>
<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
