<template>
  <div id="app">
    <div class="header" v-if="$route.meta.keepAlive">
      <header-com></header-com>
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
</style>
