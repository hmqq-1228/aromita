<template>
<div class="detail">
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="goodsDetail">
    <div class="goodsImg">
      <div class="detailSwiper">
        <div class="swiper-father">
          <div class="banner2 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
              <div class="swiper-slide">
                <img src="@/assets/modelGoods.png" class="small">
              </div>
            </div>
          </div>
          <div class="swiper-button-prev swiper-button-black"></div>
          <div class="swiper-button-next swiper-button-black"></div>
        </div>
      </div>
      <div class="largerBox">
        <div class="largePic">
          <img src="@/assets/largePic.png" alt="">
        </div>
        <div class="shareList">
          <div class="shareBox">
            <div class="shareText">Share:</div>
            <div class="shareTo">
              <div><img src="@/assets/g.png" alt=""></div>
              <div><img src="@/assets/pinterest1.png" alt=""></div>
              <div><img src="@/assets/twitter1.png" alt=""></div>
              <div><img src="@/assets/facebook-01.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsInfo">
      <div>111111111</div>
    </div>
  </div>
  <div class="foot">
    <footer-com></footer-com>
  </div>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper'
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "goodsDetail",
  mounted() {
    var swiper = new Swiper('.banner2',{
      direction: 'vertical',
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  }
}
</script>

<style scoped>
.goodsDetail{
  width: 1440px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.goodsImg{
  width: 650px;
  height: 620px;
  display: flex;
  justify-content: space-between;
}
.detailSwiper{
  width: 80px;
  height: 506px;
}
.swiper-father{
  position: relative;
  top: 25px;
  height: 445px;
}
.swiper-container{
  height: 445px;
  width: 80px;
}
.swiper-button-prev{
  color: #333;
  position: absolute;
  top: -4px;
  left: 32px;
  width: 18px;
  height: 28px;
  /* margin-top: -13px; */
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 	/* Opera */
  background-repeat: no-repeat;
}
.swiper-button-next {
  color: #333;
  position: absolute;
  top: 450px;
  right: 32px;
  width: 18px;
  height: 28px;
  margin-top: -13px;
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg);
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-slide {
  width: 82px !important;
  height: 90px !important;
}
  .largePic{
    width: 550px;
    height: 550px;
  }
  .shareTo{
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .shareTo img{
    height: 40px;
    width: 40px;
  }
  .shareList{
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
  .shareBox{
    height: 40px;
    width: 250px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }
  .shareText{
    width: 50px;
    font-size: 14px;
    font-family: Tahoma;
    line-height: 40px;
  }
  .goodsInfo{
    width: 760px;
  }
</style>
