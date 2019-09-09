<template>
  <div class="goodsList">
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
      <div class="listGoods" v-if="!noDataShow">
        <div v-if="goodsList">
          <div class="goodsItem" v-for="(goods, index) in goodsList" v-bind:key="'spu' + goods.id">
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
                    <div v-if="goods.skus.length>0" v-for="(pic, index2) in goods.skus" v-bind:key="'sku'+ pic.id" @click="getColorPicture($event, index, pic.sku_image, pic.sku_name, pic.sku_price, pic.id, pic.sku_status)">
                      <img :src="pic.sku_color_img" class="smallPic">
                    </div>
                  </div>
                </div>
                <div class="el-icon-arrow-left prev" v-if="goods.skus.length > 5" @click="prevPic(goods,$event,index)"></div>
                <div class="el-icon-arrow-right next" v-if="goods.skus.length > 5" @click="nextPic(goods,$event,index)"></div>
              </div>
              <div class="goodsInfo" @click="toGoodsDetail(goods.id, goods.skuId)">
                {{goods.defultTitle}}
              </div>
              <div class="goodsPrice">$ {{goods.defultPrice}}</div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div v-if="goodsList && goodsList.length < totalNum" @click="addMoreList()" class="loadMore">Load More</div>
        <div v-if="topShow" class="toTop" @click="toTop()"></div>
      </div>
      <div class="listGoods noData" v-if="noDataShow">
        NO Exact matches found
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper'
import {getGoodsList} from "../../api/home";
export default {
  data () {
    return {
      topShow: false,
      loading:true,
      page:1,
      pageSize:40,
      totalNum: 0,
      scrollShowFlag: false,
      scrollTop: null,
      prodListLastPage: false,
      goodsList: [],
      noDataShow: false,
      activeNamesMetal: '',
      activeNamesColor: '',
      activeNamesSize: '',
      picNum: 5,
      s_cate_id:'',//分类id
      f_cate_id: '',
      leftNum:[],
      btnindex:-1,
    }
  },
  watch: {
      $route(){
        this.s_cate_id = this.$route.query.s_cate_id
        this.f_cate_id = this.$route.query.f_cate_id
      },
      s_cate_id() {
        // window,scrollTo(0,0)
        this.page = 1
        this.getList()
      },
      f_cate_id () {
        // window,scrollTo(0,0)
        this.page = 1
        this.getList()
      }
  },
  computed: {
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
    this.f_cate_id = this.$route.query.f_cate_id
    // this.getList()
    // this.scrollShow()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (document.documentElement.scrollTop>0) {
        this.topShow = true
      } else {
        this.topShow = false
      }
    },
    toTop: function () {
      $('body,html').animate({scrollTop: 0}, 500)
    },
    toGoodsDetail: function (spuid, skuid) {
      if (spuid && skuid) {
        this.$store.state.spuId = spuid
        this.$store.state.skuId = skuid
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    getList() {
      var that = this
      var obj
      if (that.s_cate_id){
        obj = {
          s_cate_id: that.s_cate_id,
          page: that.page,
          perPage: that.pageSize
        }
      } else if (that.f_cate_id) {
        obj = {
          f_cate_id: that.f_cate_id,
          page: that.page,
          perPage: that.pageSize
        }
      }
      getGoodsList(obj).then((res)=>{
        if(res.code === '200' || res.code === 200){
          if(this.page == 1){
            this.goodsList = res.data.data
          }else{
            this.goodsList = this.goodsList.concat(res.data.data);
          }
          that.totalNum = res.data.total

          for (var i = 0;i < this.goodsList.length; i++) {
            this.$set(this.goodsList[i],'left',0)
            if (this.goodsList[i].skus.length > 0) {
              this.goodsList[i].firstLargePic = this.goodsList[i].skus[0].sku_image
              this.goodsList[i].defultTitle = this.goodsList[i].skus[0].sku_name
              this.goodsList[i].defultPrice = this.goodsList[i].skus[0].sku_price
              this.goodsList[i].skuId = this.goodsList[i].skus[0].id
              this.goodsList[i].state = this.goodsList[i].skus[0].sku_status
            }
          }
          if (this.goodsList.length === 0) {
            this.noDataShow = true
          } else {
            this.noDataShow = false
          }
          console.log(this.goodsList,'this.goodsList')
        }
      })
    },
    // //下拉加载列表
    // handleScroll(){
    //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //     let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //屏幕的高度
    //     let prodListHeight = document.querySelector('.listGoods').offsetHeight-h-500;  //.myOrderListWrapper 商品列表容器
    //     if(scrollTop>prodListHeight && this.prodListLoadingOver && !this.prodListLastPage){
    //       this.page = this.page + 1;
    //       this.getList();
    //     }
    // },
    addMoreList: function () {
      this.page = this.page + 1
      this.getList()
    },
    getColorPicture: function (e, index1, url, title, price, id, state) {
      var obj = e.currentTarget
      var that = this
      var newGoodList = []
      $(obj).children().addClass('active')
      $(obj).siblings().children().removeClass('active')
      that.goodsList[index1].firstLargePic = url
      that.goodsList[index1].defultTitle = title
      that.goodsList[index1].defultPrice = price
      that.goodsList[index1].skuId = id
      that.goodsList[index1].state = state
      for (var t = 0; t < that.goodsList.length; t++) {
        newGoodList.push(that.goodsList[t])
      }
      that.goodsList = []
      that.goodsList = newGoodList
    },
    nextPic:function (obj,e,dex) {
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var divbox = document.getElementsByClassName("sliderCont")[dex]
      // var nextBtn = document.getElementsByClassName("next")[dex]
      // var prevBtn = document.getElementsByClassName("prev")[dex]
      var objBtn = e.currentTarget
      var prevBtn = e.target.offsetParent.children[1]
      console.log(picNum)
      if (picNum > 5) {
        var num = picNum - 5
        var leftWidth1 = -48*num
        if(obj.left == leftWidth1){
          $(objBtn).css('color','#999')
          return false
        }else{
          obj.left += -48
          var leftwidth = Number(obj.left)
          $(divbox).css('left',leftwidth)
          $(divbox).css('transition', '0.4s')
          $(prevBtn).css('color','#333')
        }
      }
    },
    prevPic:function (obj,e,dex) {
      var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
      var divbox = document.getElementsByClassName("sliderCont")[dex]
      // var nextBtn = document.getElementsByClassName("next")[dex]
      var objBtn = e.currentTarget
      var nextBtn = e.target.offsetParent.children[1]
      if(obj.left<0){
        obj.left += 48
        var leftwidth = Number(obj.left)
        $(divbox).css('left',leftwidth)
        $(divbox).css('transition', '0.4s')
        $(objBtn).css('color','#999')
      }else{
        $(nextBtn).css('color','#333')
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
