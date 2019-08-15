<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_2" style="min-height: 360px">
      <div class="left">
        <img src="@/assets/pass.png" alt>
      </div>
      <div class="right">
        <p class="word_one">Password reset email has been sent.</p>
        <p class="word_two">You will receive an email with a link to reset your password .It may take several minutes to show up in your inbox. If you don’t receive this email, please check your spam folder or contact <span class="help">Live Help</span> for further assistant.</p>
      </div>
    </div>
    <afooter-com></afooter-com>
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
<style lang="scss" scoped>
.content_2 {
  width: 780px;
  display: flex;
  margin: 200px auto;
  justify-content: space-between;
}
.left {
  width: 60px;
  height: 60px;
}
.right {
  width: 710px;
  height: 76px;
}
// background-color: aqua;
.word_one {
  font-size: 18px;
  font-family: Tahoma;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.word_two {
  color: #888;
  width: 710px;
  height: 53px;
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  margin-top: 12px;
  line-height: 20px;
}
  .help{
    display: inline-block;
    color: #003764;
    cursor: pointer;
  }
</style>
