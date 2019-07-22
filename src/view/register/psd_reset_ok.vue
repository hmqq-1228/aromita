<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_3">
      <div class="left">
        <img src="@/assets/pass.png" alt>
      </div>
      <div class="right">
        <p class="word_one">
          Your password has been updated. Go to
          <span @click="toSign()">Sign in</span> or <span @click="toShopping()">Shopping</span>
        </p>
        <!-- https://www.cnblogs.com/cckui/p/10349827.html -->
      </div>
    </div>
  </div>
</template>
<script>
import aheader from "@/components/aheader.vue";
export default {
  components: {
    "aheader-com": aheader,
  },
  methods:{
    toSign: function () {
      this.$router.push('/login')
    },
    toShopping: function () {
      this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
.content_3 {
  width: 1440px;
  .left {
    width: 40px;
    height: 40px;
    margin-left: 514px;
    margin-top: 155px;
  }
  .right {
    width: 542px;
    height: 76px;
    // background-color: aqua;
    margin-left: 593px;
    margin-top: -23px;
    .word_one {
      font-size: 18px;
      font-family: Tahoma;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .word_one > span {
      font-size: 18px;
      display: inline-block;
      font-family: Tahoma;
      font-weight: bold;
      line-height: 18px;
      cursor: pointer;
      color: rgba(0, 55, 100, 1);
      text-decoration: underline;
    }
  }
}
</style>
