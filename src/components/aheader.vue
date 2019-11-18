<template>
  <div class="wrap aheader">
    <div class="title">
      <div class="title_word">Contact Us: 1-626-586-3448 (Mon-Fri 9am-6pm PST.)</div>
    </div>
    <!-- 中间内容 -->
    <!-- 左边logo -->
    <div class="xian_a">
      <div class="logoCont">
        <div class="LOGO2">
          <img src="@/assets/LOGO2.png" alt @click="handleGoHome">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    handleGoHome(){
        this.$router.push({
          path: '/'
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/css/public.scss"
</style>
