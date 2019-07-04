<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
html{
  width: 100%;
}
*{
  margin:0 ;
  padding:0
  }
body{
  width: 100%
}
/*@media (min-width:800px) and (max-width:1200px){*/
  /*body{font-size: 12px !important;}*/
/*} !*>=1024的设备*!*/

/*@media (min-width:1200px) and (max-width:1400px){*/
  /*body{font-size: 30px !important;}*/
/*} !*>=1024的设备*!*/
/*@media (min-width:1400px) and (max-width:1600px){*/
  /*body{font-size: 14px !important;}*/
/*}*/
/*@media (min-width:1600px) and (max-width:1900px) {*/
  /*body{font-size: 40px !important;}*/
/*}*/

/*@media (min-width: 1900px) {*/
  /*body{font-size: 80px !important;}*/
/*}*/
.wrapLogin .el-input__inner {
  width: 400px;
  position: relative;
  border: 1px solid #121037;
  height: 32px;
  line-height: 32px;
  border-radius: 0;
}
  .fliterList .el-collapse{
    border-top: none;
    border-bottom: 1px solid #EBEEF5;
  }
  .fliterList .el-collapse-item__header{
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    font-family: Tahoma;
    border-bottom: none;
  }
  .fliterList .el-collapse-item__content{
    padding-bottom: 10px;
  }
  .fliterList .el-collapse-item__wrap{
    border-bottom: none;
  }
[class*=" el-icon-"], [class^=el-icon-]{
  font-weight: 600;
}
</style>
