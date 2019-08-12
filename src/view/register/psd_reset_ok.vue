<template>
  <div class="wrap">
    <aheader-com></aheader-com>
    <div class="content_3">
      <div style="display: flex;justify-content: space-between;width: 608px;margin: 150px auto;">
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
  margin: 0 auto;
  height: 400px;
  .left {
    width: 60px;
    height: 60px;
  }
  .right {
    width: 542px;
    height: 60px;
    line-height: 60px;
    // background-color: aqua;
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
