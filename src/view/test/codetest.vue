<template>
  <div class="code" @click="refreshCode">
    <!--<SIdentify :identifyCode="identifyCode"></SIdentify>-->
    <component v-bind:is="compArr.identify"
               :identifyCode="identifyCodeNew">
    </component>
  </div>
</template>

<script>
  import identify from './identify.vue'
  export default {
    name: "codetest",
    components: {
      identify
    },
    data() {
      return {
        // 引入组件
        compArr: {
          identify: 'identify'
        },
        // identifyCodes: "7896",
        identifyCodeNew: ''
      };
    },
    mounted() {
      // this.identifyCode = "";
      // this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      // randomNum(min, max) {
      //   return Math.floor(Math.random() * (max - min) + min);
      // },
      refreshCode() {
        this.identifyCodeNew = "4HP7";
      },
      // makeCode(o, l) {
      //   for (let i = 0; i < l; i++) {
      //     this.identifyCode += this.identifyCodes[
      //       this.randomNum(0, this.identifyCodes.length)
      //       ];
      //   }
      //   console.log(this.identifyCode);
      // }
    }
  };
</script>

<style>
  .code {
    margin: 400px auto;
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }
</style>
