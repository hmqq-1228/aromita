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
              <div class="metalChecked"><input type="radio" id="metal1" name="metal" checked><label for="metal1"></label><span>Stainless Steel</span></div>
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
      <div class="listGoods" v-if="goodsList && goodsList.length>0">
        <div class="goodsItem"  v-for="(goods, index) in goodsList" v-bind:key="'spu' + goods.id">
          <div class="goodInner">
            <div class="goodsPic" @click="toGoodsDetail(goods.id, goods.skuId)">
              <div class="cheap">
                <!--<div class="cheapLeft"></div>-->
                <!--<div class="cheapRight">$2.99</div>-->
              </div>
              <img @mouseover="imgPreve($event)" @mouseleave="imgHidden($event)" :src="goods.firstLargePic" alt="">
            </div>
            <div class="smallSlider2">
              <div class="sliderBox">
                <div class="sliderCont">
                  <div v-if="goods.skus.length>0" v-for="(pic, index2) in goods.skus" v-bind:key="'sku'+ pic.id" @click="getColorPicture($event, index, pic.sku_image, pic.sku_name, pic.sku_price, pic.id)">
                    <img :src="pic.sku_color_img" class="smallPic" :class="index2 === 0 ? 'active': ''">
                  </div>
                </div>
              </div>
              <div class="el-icon-arrow-left prev" v-if="goods.skus.length > 5" @click="prevPic($event)"></div>
              <div class="el-icon-arrow-right next" v-if="goods.skus.length > 5" @click="nextPic($event)"></div>
            </div>
            <div class="goodsInfo" @click="toGoodsDetail(goods.id, goods.skuId)">
              {{goods.defultTitle}}
            </div>
            <div class="goodsPrice">$ {{goods.defultPrice}}</div>
          </div>
        </div>
      </div>
      <div class="listGoods noData" v-if="!goodsList || goodsList.length === 0">
        NO Exact matches found
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
import {getGoodsList} from "../../api/home";
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "goodsList",
  data () {
    return {
      loading:true,
      page:1,
      pageSize:20,
      prodListLoadingOver:false,
      prodListLastPage: false,
      goodsList: [],
      activeNamesMetal: '',
      activeNamesColor: '',
      activeNamesSize: '',
      picNum: 5,
      s_cate_id:'',//分类id
      // navigation:{
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // }
    }
  },
  watch: {
    $route(){
        this.s_cate_id = this.$route.query.s_cate_id
      },
      s_cate_id() {
        this.getList()
      },

  },
  computed: {
    picUrl: function () {
      var that = this
      return that.$store.state.baseServiceUrl
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    var swiper2 = new Swiper('.goods2',{
        slidesPerView: 5,
        slidesPerGroup: 1,
        watchOverflow: true,
        navigation:{
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        }
    })
    var swiper4 = new Swiper('.banner66',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextEl: '.swiper-button-next66',
        prevEl: '.swiper-button-prev66',
      }
    })
    var swiper4 = new Swiper('.banner77',{
      slidesPerView: 5,
      slidesPerGroup: 1,
      watchOverflow: true,
      navigation:{
        nextEl: '.swiper-button-next77',
        prevEl: '.swiper-button-prev77',
      }
    })
  },
  created() {
    this.s_cate_id = this.$route.query.s_cate_id
    this.getList()
  },
  methods: {
    toGoodsDetail: function (spuid, skuid) {
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    getList() {
      this.prodListLoadingOver = false;
      getGoodsList({s_cate_id:this.s_cate_id,page:this.page}).then((res)=>{
        if(res.code == '200'){
          this.prodListLoadingOver = true;
          if(this.page == 1){
            this.goodsList = res.data.data
          }else{
            this.goodsList = this.goodsList.concat(res.data.data);
          }
          if(res.data.data.length < this.pageSize){
              this.prodListLastPage = true;
          }
          for (var i = 0;i < this.goodsList.length; i++) {
            if (this.goodsList[i].skus.length > 0) {
              this.goodsList[i].firstLargePic = this.goodsList[i].skus[0].sku_image
              this.goodsList[i].defultTitle = this.goodsList[i].skus[0].sku_name
              this.goodsList[i].defultPrice = this.goodsList[i].skus[0].sku_price
              this.goodsList[i].skuId = this.goodsList[i].skus[0].id
            }
          }
        }
          
      })
    },
    //下拉加载列表
    handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //屏幕的高度
        let prodListHeight = document.querySelector('.listGoods').offsetHeight-h;  //.myOrderListWrapper 商品列表容器
        if(scrollTop>prodListHeight && this.prodListLoadingOver && !this.prodListLastPage){
          this.page = this.page + 1;
          this.getList();
        }
    },
    getColorPicture: function (e, index1, url, title, price, id) {
      var obj = e.currentTarget
      var that = this
      var newGoodList = []
      $(obj).children().addClass('active')
      $(obj).siblings().children().removeClass('active')
      that.goodsList[index1].firstLargePic = url
      that.goodsList[index1].defultTitle = title
      that.goodsList[index1].defultPrice = price
      that.goodsList[index1].skuId = id
      for (var t = 0; t < that.goodsList.length; t++) {
        newGoodList.push(that.goodsList[t])
      }
      that.goodsList = []
      that.goodsList = newGoodList
    },
    nextPic:function (e) {
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var obj = e.target.offsetParent.firstChild.firstChild
      var objBtn = e.currentTarget
      var prev = e.target.offsetParent.children[1]
      if (picNum > 5) {
        var num = picNum - 5
        if (this.$store.state.cont <= num) {
          $(obj).css('left', -47.8*num)
          $(obj).css('transition', '0.4s')
          $(prev).css('color', '#333')
          $(objBtn).css('color', '#999')
        } else {
          $(objBtn).css('color', '#999')
        }
      }
    },
    prevPic:function (e) {
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var obj = e.target.offsetParent.firstChild.firstChild
      var nextBtn = e.target.offsetParent.lastChild
      var prevBtn = e.currentTarget
      if (picNum > 5) {
        var num = picNum - 5
        if (parseInt(obj.style.left) != 0) {
          var distent = parseInt(obj.style.left) + 47.8 * num
          $(obj).css('left', distent)
          $(obj).css('transition', '0.4s')
          $(nextBtn).css('color', '#333')
          $(prevBtn).css('color', '#999')
        } else {
          $(prevBtn).css('color', '#999')
        }
      }
    },
    imgPreve:function (e) {
      var obj = e.currentTarget
      $(obj).removeClass('defultView')
      $(obj).addClass('biggerView')
    },
    imgHidden: function (e) {
      var obj = e.currentTarget
      $(obj).removeClass('biggerView')
      $(obj).addClass('defultView')
    }
  },
  destroyed(){
      window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/goodsList.scss"
</style>
