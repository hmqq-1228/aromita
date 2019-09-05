<template>
  <div class="unavailable">
    <div class="unavailableCont">
      <div class="content_4">
        <div class="right">
          <span></span> Sorry,  This product is no longer available.
        </div>
      </div>
    </div>
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
    name: "unavailable",
    data(){
      return{
      }
    },
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
    methods: {
      goBack () {
        console.log("点击了浏览器的返回按钮");
        sessionStorage.clear();
        window.history.go(-2);
      },
    }
  }
</script>

<style scoped>
  .unavailableCont{
    width: 1440px;
    margin: 0 auto;
    min-height: 400px;
    position: relative;
  }
  .content_4 {
    width: 420px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .right {
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
    font-size: 18px;
    font-family: Tahoma;
  }
</style>
