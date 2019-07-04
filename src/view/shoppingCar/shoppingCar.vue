<template>
<div class="shoppingCar">
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="carCont">
    <div class="cartHeader">
      <div class="checkState">
        <input type="checkbox" id="Size1" name="metal"><label for="Size1"></label><span>Sealect All</span>
      </div>
      <div class="product"></div>
      <div class="quantity"></div>
      <div class="total"></div>
      <div class="option"></div>
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
  name: "shoppingCar"
}
</script>

<style scoped>
.carCont{
  width: 1440px;
  min-height: 400px;
  margin: 0 auto;
}
.cartHeader{
  width: 1440px;
  height: 45px;
  margin-top: 20px;
  background-color: #e7e7e7;
  display: flex;
}
.checkState{
  width: 200px;
}
  .product{
    width: 500px;
  }
  .quantity{
    width: 300px;
  }
  .total{
    width: 240px;
  }
  .option{
    width: 200px;
  }
.checkState {
  position: relative;
  line-height: 25px;
  padding: 8px;
}

.checkState input {
  vertical-align: middle;
  /* 前面三行代码是为了让radio单选按钮与文字对齐 */
  width: 14px;
  height: 14px;
  appearance: none;/*清楚默认样式*/
  -webkit-appearance: none;
  opacity: 0;
  outline: none;
  margin-left: 8px;
  /* 注意不能设置为display:none*/
}

.checkState label {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index:1;
  /*注意层级关系，如果不把label层级设为最低，会遮挡住input而不能单选*/
  width: 14px;
  height: 14px;
  border: 1px solid #999;
}

.checkState input:checked+label {
  background: #fff;
}

.checkState input:checked+label::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 8px;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkState span{
  font-size: 14px;
  color: #333;
  font-family: Tahoma;
  padding-left: 10px;
}
</style>
