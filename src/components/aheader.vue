<template>
  <div class="wrap">
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
<style lang="scss">
.wrap {
  width: 1440px;
  margin: 0 auto;
}
.title {
  width: 1440px;
  height: 40px;
  margin: 0 auto;
  background: rgba(18, 16, 55, 1);
}
.logoCont{
  width: 1440px;
  margin: 0 auto;
}
.title_word {
  width: 1440px;
  height: 40px;
  font-size: 14px;
  font-family: Tahoma;
  font-weight: 400;
  margin: 0 auto;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
}
.LOGO2 {
  width: 160px;
  height: 39px;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
}
.xian_a {
  width: 1440px;
  height: 65px;
  margin: 0 auto;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e9e9e9;
}
</style>
