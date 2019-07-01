<template>
  <div class="goodsList">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="listBox">
      <div class="listNav">
        <div class="navTitle">Sort By</div>
        <div class="navItem">Most Recent</div>
        <div class="navItem">Best Selling</div>
        <div class="navItem">Highest Price</div>
        <div class="navItem">Lowest Price</div>
        <div class="navTitle">Price</div>
        <div class="price">
          <div class="priceRange">
            <input type="number">
            <div>	&#8764;</div>
            <input type="number">
          </div>
          <button>APPLY</button>
        </div>
        <div class="navTitleTwo">
          <div>Filter</div>
          <div style="color: #999;">Clear</div>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesMetal">
            <el-collapse-item title="Metal" name="Metal">
              <div class="metalChecked"><input type="radio" id="metal1" name="metal"><label for="metal1"></label><span>Stainless Steel</span></div>
              <div class="metalChecked"><input type="radio" id="metal2" name="metal"><label for="metal2"></label><span>Silver</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesColor">
            <el-collapse-item title="Color" name="Color">
              <div class="metalChecked"><input type="radio" id="Color1" name="metal"><label for="Color1"></label><span>Silver</span></div>
              <div class="metalChecked"><input type="radio" id="Color2" name="metal"><label for="Color2"></label><span>Gold</span></div>
              <div class="metalChecked"><input type="radio" id="Color3" name="metal"><label for="Color3"></label><span>Black</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="fliterList">
          <el-collapse v-model="activeNamesSize">
            <el-collapse-item title="Size" name="Size">
              <div class="metalChecked"><input type="radio" id="Size1" name="metal"><label for="Size1"></label><span>Small</span></div>
              <div class="metalChecked"><input type="radio" id="Size2" name="metal"><label for="Size2"></label><span>Model</span></div>
              <div class="metalChecked"><input type="radio" id="Size3" name="metal"><label for="Size3"></label><span>Large</span></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="listGoods">
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic" @click="toGoodsDetail()">
              <div class="disCont">50% OFF</div>
              <img src="@/assets/goods.png" alt="">
            </div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="goods1 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                     <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black swiper-button-prev1"></div>
                <div class="swiper-button-next swiper-button-black swiper-button-next1"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic">
              <div class="cheap">
                <div class="cheapLeft"></div>
                <div class="cheapRight">$ 1.99</div>
              </div>
              <img src="@/assets/goods.png" alt="">
            </div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="goods2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 9.99</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 66.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 99.88</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 9.99</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-black"></div>
                <div class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 6.66</div>
          </div>
        </div>
        <div class="goodsItem">
          <div class="goodInner">
            <div class="goodsPic"><img src="@/assets/goods.png" alt=""></div>
            <div class="smallSlider">
              <div class="swiper-father">
                <div class="banner2 swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                    <div class="swiper-slide">
                      <img src="@/assets/smallPic.png" class="small">
                    </div>
                  </div>
                </div>
                <div v-if="picNum > 5" class="swiper-button-prev swiper-button-black"></div>
                <div v-if="picNum > 5" class="swiper-button-next swiper-button-black"></div>
              </div>
            </div>
            <div class="goodsInfo">
              Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace
            </div>
            <div class="goodsPrice">$ 8.88</div>
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
  name: "goodsList",
  data () {
    return {
      activeNamesMetal: '',
      activeNamesColor: '',
      activeNamesSize: '',
      picNum: 5
      // navigation:{
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // }
    }
  },
  watch: {

  },
  mounted() {
      var swiper = new Swiper('.goods1',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        watchOverflow: true,
        navigation:{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        }
      })
      var swiper2 = new Swiper('.goods2',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextE2: '.swiper-button-next',
        prevE2: '.swiper-button-prev',
      }
    })
  },
  created() {
  },
  methods: {
    toGoodsDetail: function () {
      this.$router.push('/goodsDetail')
    }
  }
}
</script>

<style scoped>
  .listBox{
    width: 1440px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .listNav{
    width: 210px;
  }
  .navTitle{
    font-family: Tahoma;
    color: #666;
    font-size: 14px;
    height: 36px;
    line-height: 42px;
    padding: 0 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .navTitleTwo{
    font-family: Tahoma;
    color: #666;
    display: flex;
    font-size: 14px;
    height: 36px;
    line-height: 42px;
    padding: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
  }
  .navItem{
    font-family: Tahoma;
    color: #333;
    font-size: 14px;
    height: 30px;
    cursor: pointer;
    padding: 0 10px;
    line-height: 30px;
  }
  .listGoods{
    width: 1200px;
    min-height: 500px;
  }
  .goodsItem{
    width: 300px;
    height: 425px;
    float: left;
  }
  .goodInner{
    width: 282px;
    height: 407px;
    margin: 0 auto;
    border: 1px solid #e8e8e8;
  }
  .price{
    padding: 10px;
  }
  .priceRange{
    display: flex;
    justify-content: start;
    margin-bottom: 10px;
  }
  .priceRange input{
    width: 60px;
    height: 28px;
  }
  .priceRange>div{
    width: 25px;
    height: 28px;
    text-align: center;
    line-height: 28px;
  }
  .price>button{
    width: 145px;
    height: 28px;
    color: #fff;
    border: none;
    outline: none;
    font-family: Tahoma;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
    background-color: #121037;
  }
  .price>button:hover{
    background-color: #121069;
  }
  .priceRange input::-webkit-outer-spin-button,
  .priceRange input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .priceRange input[type="number"]{
    -moz-appearance: textfield;
  }
  .metalChecked {
    position: relative;
    padding-left: 10px;
    line-height: 25px;
    /*margin-right: 12px;*/
  }

  .metalChecked input {
    vertical-align: middle;
    /* 前面三行代码是为了让radio单选按钮与文字对齐 */
    width: 14px;
    height: 14px;
    appearance: none;/*清楚默认样式*/
    -webkit-appearance: none;
    opacity: 0;
    outline: none;
    /* 注意不能设置为display:none*/
  }

  .metalChecked label {
    position: absolute;
    left: 10px;
    top: 6px;
    z-index:1;
    /*注意层级关系，如果不把label层级设为最低，会遮挡住input而不能单选*/
    width: 14px;
    height: 14px;
    border: 1px solid #999;
  }

  .metalChecked input:checked+label {
    background: #fff;
  }

  .metalChecked input:checked+label::after {
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
  .metalChecked span{
    font-size: 14px;
    color: #333;
    font-family: Tahoma;
    padding-left: 10px;
  }
  .goodsPic{
    width: 280px;
    height: 280px;
    cursor: pointer;
    position: relative;
  }
  .cheap{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    display: flex;
  }
  .cheapLeft{
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:10px solid #c30808;
  }
  .cheapRight{
    color: #fff;
    height: 20px;
    width: 50px;
    text-align: center;
    line-height: 20px;
    font-family: Tahoma;
    font-size: 14px;
    background-color: #c30808;
  }
  .disCont{
    color: #c30808;
    font-family: Tahoma;
    font-size: 14px;
    height: 20px;
    width: 70px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    border: 1px solid chocolate;
  }
  .goodsPic>img{
    width: 100%;
  }
  .smallSlider{
    height: 40px;
    margin: 0 auto;
  }
  .swiper-father{
    position: relative;
  }
  .swiper-container{
    height: 40px;
    width: 240px;
  }
  .swiper-button-prev{
    position: absolute;
    top: 50%;
    left: 0;
    width: 18px;
    height: 28px;
    margin-top: -13px;
    z-index: 10;
    cursor: pointer;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .swiper-button-next {
    color: #333;
    position: absolute;
    top: 50%;
    right: 0;
    width: 18px;
    height: 28px;
    margin-top: -13px;
    z-index: 10;
    cursor: pointer;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .swiper-slide {
    width: 49px !important;
  }
  .goodsInfo{
    font-family: Tahoma;
    font-size: 14px;
    color: #333;
    width: 280px;
    margin-top: 6px;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goodsPrice{
    color: #ef3434;
    font-size: 16px;
    font-family: Tahoma;
    width: 280px;
    margin-top: 6px;
    padding: 0 10px;
  }
</style>
