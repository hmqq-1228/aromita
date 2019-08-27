<template>
  <div class="wrap">
    <header-com></header-com>
    <div class="content_warn">
      <div class="left">
        <img src="@/assets/pass.png" alt="">
      </div>
      <div class="right">
        <p class="word_one">Sorry. This Category is no longer available</p>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
}
</script>
<style lang="scss">
   .content_warn{
    width: 1440px;
  .left{
  width: 40px;
  height: 40px;
  margin-left: 514px;
  margin-top: 155px;
}
.right{
  width:542px;
  height: 76px;
  // background-color: aqua;
  margin-left: 593px;
   margin-top: -23px;
   margin-bottom: 167px;
.word_one{
font-size:18px;
font-family:Tahoma;
font-weight:bold;
color:rgba(51,51,51,1);
}

}
  }


</style>
