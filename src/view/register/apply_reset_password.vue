<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_2">
      <div class="left">
        <img src="@/assets/pass.png" alt>
      </div>
      <div class="right">
        <p class="word_one">Password reset email has been sent.</p>
        <p
          class="word_two"
        >You will receive an email with a link to reset your password .It may take several minutes to show up in your inbox. If you don’t receive this email, please check your spam folder or contact Live Help for further assistant.</p>
      </div>
    </div>
  </div>
</template>
<script>
import aheader from "@/components/aheader.vue";
export default {
  components: {
    "aheader-com": aheader
  }
};
</script>
<style lang="scss">
.content_2 {
  width: 1440px;
  .left {
    width: 40px;
    height: 40px;
    margin-left: 514px;
    margin-top: 155px;
  }
  .right {
    width: 458px;
    height: 76px;
    // background-color: aqua;
    margin-left: 593px;
    margin-top: -38px;
    .word_one {
      font-size: 18px;
      font-family: Tahoma;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .word_two {
      width: 710px;
      height: 53px;
      font-size: 14px;
      font-family: Tahoma;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 11px;
    }
  }
}
</style>