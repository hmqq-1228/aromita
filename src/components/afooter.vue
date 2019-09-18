<template>
    <div class="afooter">{{info}}</div>
</template>
<script>
  export default {
    data() {
      return {
        info: ''
      };
    },
    mounted () {
      this.aromiteInfo()
    },
    methods: {
      aromiteInfo: function () {
        this.$axios.get('api/homelayout/80', {}).then(res => {
          this.info = res.data[0].picture_title
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.afooter{
    width: 1440px;
    height: 91px;
    line-height: 91px;
    text-align: center;
    background: #FBFBFB;
    color: #999;
    font-size: 14px;
    margin: 0 auto;
    // position: absolute;
    // bottom: 0;
}
</style>
