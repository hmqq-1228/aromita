<template>
  <div class="noProjuct">
    <aheader-com></aheader-com>
    <div class="projuct">
      <div class="pic" align="center">
        <img src="../../../static/img/nodata.jpg" alt="">
        <p>Sorry. this page connot be found.</p>
        <p class="can">You can: <span @click="backHomePage()">Back to Home Page</span> | <span @click="toMyWishList">Wish List</span></p>
      </div>
    </div>
    <afooter-com></afooter-com>
  </div>
</template>

<script>
import aFooter from "@/components/afooter.vue";
import aheader from "@/components/aheader.vue";
export default {
  components: {
    "aheader-com": aheader,
    "afooter-com": aFooter
  },
  name: "noprojuct",
  mounted () {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false);
  },
  methods:{
    goBack () {
      // console.log("点击了浏览器的返回按钮");
      sessionStorage.clear();
      window.history.go(-2);
    },
    backHomePage: function () {
      this.$router.push('/')
    },
    toMyWishList: function () {
      this.$router.push('/myWishlist')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
