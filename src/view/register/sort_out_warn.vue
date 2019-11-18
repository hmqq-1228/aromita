<template>
  <div class="wrap sortOut">
    <aheader-com></aheader-com>
    <div class="content_4">
      <div class="left">
        {{theNum}}
      </div>
      <div class="right">
        <p class="word_one">Sorry,  This category is no longer available.</p>
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
          this.$router.push({path: '/'})
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
