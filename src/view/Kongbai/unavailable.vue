<template>
  <div class="unavailable">
    <div class="header">
      <aheader-com></aheader-com>
    </div>
    <div class="unavailableCont">
      <div class="content_4">
        <div class="right">
          This url is not available now, please try again.
        </div>
      </div>
    </div>
    <div class="foot">
      <afooter-com></afooter-com>
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
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/public.scss"
</style>
