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
  methods:{
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
