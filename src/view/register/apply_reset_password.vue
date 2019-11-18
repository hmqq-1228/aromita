<template>
  <div class="wrap resetPwd">
    <aheader-com></aheader-com>
    <div class="content_2">
      <div class="left">
        <img src="@/assets/pass.png" alt>
      </div>
      <div class="right">
        <p class="word_one">Password reset email has been sent.</p>
        <p class="word_two">You will receive an email with a link to reset your password .It may take several minutes to show up in your inbox. If you don’t receive this email, please check your spam folder or contact live help for further assistant.</p>
      </div>
    </div>
    <div class="foot">
      <afooter-com></afooter-com>
    </div>
  </div>
</template>
<script>
import aheader from "@/components/aheader.vue";
import Footer from "@/components/afooter.vue"
export default {
  components: {
    "aheader-com": aheader,
    "afooter-com":Footer
  }
};
</script>
<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
