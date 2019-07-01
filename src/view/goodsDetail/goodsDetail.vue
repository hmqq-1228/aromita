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
          <div class="swiper-button-prev swiper-button-black swiper-button-prev1"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next1"></div>
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
      <div class="goodsTitle">
        Wholesale - (Grade D)Blue Sand Stone Blue Sand Stone Blue Sand Stone Blue Sand Stone Blue Sand Stone Blue Sand Stone
      </div>
      <div class="goodsPrice">
        <div class="goodsLabel">Price:</div>
        <div class="priceCon">$ 6.66</div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;">
        <div class="goodsLabelColor">Color:</div>
        <div class="swiper-fatherColor">
          <div class="goodsDetail2 swiper-container">
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
          <div class="swiper-button-prev swiper-button-black swiper-button-prev2"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next2"></div>
        </div>
      </div>
      <div style="display: flex;justify-content: start;margin-top: 20px;">
        <div class="goodsLabelColor">Color:</div>
        <div class="swiper-fatherColor">
          <div class="goodsDetail2 swiper-container">
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
          <div class="swiper-button-prev swiper-button-black swiper-button-prev2"></div>
          <div class="swiper-button-next swiper-button-black swiper-button-next2"></div>
        </div>
      </div>
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
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      }
    })
    var swiper2 = new Swiper('.goodsDetail2',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      navigation:{
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
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
.swiper-fatherColor{
  position: relative;
  width: 506px;
}
.swiper-container{
  height: 445px;
  width: 80px;
}
.goodsDetail2.swiper-container{
  height: 80px;
  width: 445px;
}
.swiper-fatherColor .swiper-button-prev {
  color: #333;
  position: absolute;
  top: 50px;
  left: 0;
  width: 18px;
  height: 28px;
  /* margin-top: -13px; */
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.goodsImg .swiper-button-prev{
  color: #333;
  position: absolute;
  top: -5px;
  left: 30px;
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
.goodsImg .swiper-button-next {
  color: #333;
  position: absolute;
  top: 450px;
  right: 30px;
  width: 18px;
  height: 28px;
  margin-top: -10px;
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
.swiper-fatherColor .swiper-button-next {
  color: #333;
  position: absolute;
  top: 50px;
  right: 5px;
  width: 18px;
  height: 28px;
  z-index: 10;
  cursor: pointer;
  background-size: 12px;
  background-position: center;
  background-repeat: no-repeat;
}
.goodsDetail2 .swiper-slide{
  width: 90px !important;
}
.goodsImg .swiper-slide {
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
    cursor: pointer;
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
  .goodsTitle{
    font-size: 18px;
    color: #333;
    font-family: Tahoma;
  }
  .goodsPrice{
    margin-top: 20px;
    display: flex;
    justify-content: start;
  }
  .goodsLabel{
    width: 100px;
    height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    font-family: Tahoma;
  }
  .goodsLabelColor{
    width: 100px;
    height: 80px;
    font-size: 14px;
    color: #333;
    line-height: 80px;
    font-family: Tahoma;
  }
  .priceCon{
    height: 40px;
    font-size: 18px;
    color: #333;
    font-weight: 600;
    line-height: 40px;
    font-family: Tahoma;
  }
</style>
