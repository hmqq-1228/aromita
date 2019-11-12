<template>
  <div id="app" @click="hidePanel($event)">
    <div class="header" v-if="$route.meta.keepAlive">
      <header-com></header-com>
      <!--<sheader-com v-if="!$route.meta.hasNav"></sheader-com>-->
      <router-view></router-view>
      <footer-com></footer-com>
    </div>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  name: 'App',
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  methods:{
    // 点击任意区域弹窗消失
    hidePanel (event) {
      let sp2 = document.querySelector('#search')
      if (sp2) {
        if (!sp2.contains(event.target)) {
          this.$store.state.searchShow = 1
        }
      }
    },
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  opacity:1;
  margin: 0 auto;
}
.el-timeline-item{
  padding-bottom: 10px !important;
}
.el-table .warning-row{
  background-color: #f1f1f1 !important;
}
.el-button--primary{
  background-color: #C51015 !important;
  width: 100px !important;
  border-color: #C51015 !important;
}
</style>
