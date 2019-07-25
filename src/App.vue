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
.wrapLogin .el-input__inner,.register .el-input__inner{
  width: 400px;
  position: relative;
  border: 1px solid #121037;
  height: 34px;
  line-height: 34px;
  border-radius: 0;
}
.register .Verification .el-input__inner {
  width: 265px;
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
  .content_forgot .el-input__inner,.newPassword .el-input__inner{
    height: 34px;
    line-height: 34px;
  }
  .content_forgot .el-button,.newPassword .el-button{
    color: #ccc;
  }
.content_forgot .el-button:hover,.newPassword .el-button:hover{
    color: #fff;
}
.carCont .el-input-number__decrease:hover,.carCont .el-input-number__increase:hover{
  color: #333;
}
.el-badge__content.is-fixed{
  right: 0px;
}
.el-badge__content{
  height: 16px;
  line-height: 16px;
  padding: 0 4px;
}
  .orderConfirm .el-radio__input.is-checked+.el-radio__label,.payBox .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #333;
  }
  .orderConfirm .el-radio__input.is-checked .el-radio__inner,.payBox .el-checkbox__input.is-checked .el-checkbox__inner,.payBox .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #707070;
    background: #fff;
    font-family: Tahoma;
  }
  .orderConfirm .el-radio__inner::after{
    width: 6px;
    height: 6px;
    background-color: #565656;
  }
 .orderConfirm .el-radio__inner:hover{
   border-color: #707070;
 }
  .imgRadio .el-radio__input{
    margin-top: 8px;
  }
  .moreCard .el-radio{
    line-height: 30px;
    margin-right: 6px;
  }
  .payBox .el-select .el-input.is-focus .el-input__inner{
    border-color: #E9E9E9;
  }
  .payBox .el-select .el-input__inner:focus{
    border-color: #E9E9E9;
  }
  .payBox .el-input__inner{
    width: 400px;
    height: 32px;
    line-height: 32px;
  }
  .smallInput .el-input__inner{
    width: 180px;
    height: 32px;
    line-height: 32px;
  }
  .shipInput .el-input__inner{
    width: 140px;
    height: 32px;
    line-height: 32px;
  }
.el-popper[x-placement^=bottom]{
    margin-top: 0;
  }
  .el-select-dropdown__item.selected{
    color: #c51015;
  }
  .noLabel .el-form-item__content{
    margin-left: 40px !important;
  }
  .payBox .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: #E9E9E9;
  }
.payBox .el-checkbox__input.is-focus .el-checkbox__inner,.payBox .el-checkbox__inner:hover{
  border-color: #E9E9E9;
}
  .payBox .el-form-item__content{
    height: 36px;
  }
  .payBox .el-form-item__label{
    line-height: 36px;
  }
  .payBox .el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 2px solid #333;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
</style>
