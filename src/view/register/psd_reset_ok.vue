<template>
  <div class="wrap resetOk">
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
<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
