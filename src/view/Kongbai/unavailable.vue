<template>
  <div class="unavailable">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="unavailableCont">
      <div class="content_4">
        <div class="left">
          {{theNum}}
        </div>
        <div class="right">
          Sorry，This product is no longer available.
        </div>
      </div>
    </div>
    <div class="foot">
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "unavailable",
  data(){
    return{
      activeNav: '',
      theNum: 5,
      interval: null
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.theNum === 1) {
        clearInterval(this.interval)
        this.$router.push({path: '/'})
      } else {
        this.theNum--
      }
    }, 1000)
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
.left {
  background: url('../../assets/time5.gif') no-repeat center ;
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
}
</style>
