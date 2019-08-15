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

<style scoped>
.projuct{
  color: #333;
  width: 1440px;
  min-height: 650px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  font-family: Tahoma;
}
.pic{
  width: 482px;
  margin: 0 auto;
  margin-top: 100px;
}
.pic img{
  margin: 0 auto;
}
  .projuct p:nth-of-type(1){
    margin-top: 20px;
  }
.projuct p:nth-of-type(2){
  margin-top: 10px;
}
  .can{
    font-weight: normal;
  }
  .can span{
    display: inline-block;
    cursor: pointer;
    color: #003764;
  }
</style>
