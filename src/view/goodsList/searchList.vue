<template>
  <div class="goodsList">
    <div>{{nodeDragRefresh?'':''}}</div>
    <div class="listBox">
      <div class="listNav">
        <div class="navTitle">Sort By</div>
        <div class="navItem" @click="checkSortType($event, 1)">Most Recent</div>
        <div class="navItem" @click="checkSortType($event, 2)">Best Selling</div>
        <div class="navItem" @click="checkSortType($event, 3)">Lowest Price</div>
        <div class="navTitle">Price</div>
        <div class="price">
          <div class="priceRange">
            <input type="number" placeholder="$" v-model="startPrice">
            <div>	&#8764;</div>
            <input type="number" placeholder="$" v-model="endPrice">
          </div>
          <button @click="subPrice()">APPLY</button>
        </div>
        <div class="navTitleTwo">
          <div>Filter</div>
          <div class="clear" @click="clearAttrChecked()">Clear</div>
        </div>
        <div class="fliterList" v-for="(attr, index) in attrList">
          <el-collapse>
            <el-collapse-item :title="attr.attr_name" :name="index">
              <el-radio-group v-model="attr.nameStr">
                <div class="MetalItem" v-for="(attrVal, index2) in attr.values"><el-radio :label="attrVal.attr_value" @change="getAttrValue(attr.attr_name, attrVal.attr_value)">{{attrVal.attr_value}}</el-radio></div>
                <!--<div class="MetalItem"><el-radio :label="6">备选项</el-radio></div>-->
                <!--<div class="MetalItem"><el-radio :label="9">备选项</el-radio></div>-->
              </el-radio-group>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="viewMore" v-if="attrListLen > 3" @click="showMoreAttr(moreIcon)">view more <i :class="moreIcon"></i></div>
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
  import {getSearchList} from "../../api/home";
  export default {
    data () {
      return {
        topShow: false,
        loading:true,
        page:1,
        Metal: '',
        Color: '',
        pageSize:40,
        totalNum: 0,
        endPrice: '',
        startPrice: '',
        moreIcon: 'el-icon-d-arrow-right',
        scrollShowFlag: false,
        scrollTop: null,
        prodListLastPage: false,
        goodsList: [],
        attrList: [],
        attrListLen: 0,
        checkAttrList: [],
        checkAttrStr: '',
        noDataShow: false,
        activeNamesMetal: '',
        activeNamesColor: '',
        activeNamesSize: '',
        picNum: 5,
        s_cate_id:'',//分类id
        f_cate_id: '',
        keyword: '',
        sort: '',
        attrStr: '',
        leftNum:[],
        btnindex:-1,
      }
    },
    watch: {
      checkAttrStr: function (val, oV) {
        if (val) {
          this.attrStr = val
          this.getList()
        }
      },
      $route(){
        this.s_cate_id = this.$route.query.s_cate_id
        this.f_cate_id = this.$route.query.f_cate_id
        this.keyword = this.$route.query.keyword
        this.sort = this.$route.query.sort
        this.startPrice = this.$route.query.price_start
        this.endPrice = this.$route.query.price_end
        this.attrStr = this.$route.query.attr
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
      nodeDragRefresh: function () {
        var that = this
        if (that.$store.state.searchFlag) {
          that.keyword = that.$store.state.searchVal
          this.getList()
          that.$store.state.searchFlag = false
        }
        return this.$store.state.searchFlag
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    created() {
      this.s_cate_id = this.$route.query.s_cate_id
      this.f_cate_id = this.$route.query.f_cate_id
      this.keyword = this.$route.query.keyword
      this.sort = this.$route.query.sort
      this.startPrice = this.$route.query.price_start
      this.endPrice = this.$route.query.price_end
      this.attrStr = this.$route.query.attr
      this.getAttrList()
      // this.scrollShow()
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      showMoreAttr (icon) {
        if (icon === 'el-icon-d-arrow-right') {
          // this.moreIcon = 'el-icon-d-arrow-left'
          this.getAttrList('more')
        } else {
          this.getAttrList('less')
          // this.moreIcon = 'el-icon-d-arrow-right'
        }
      },
      clearAttrChecked () {
        this.checkAttrList = []
        this.attrStr = null
        this.getAttrList()
        this.getList()
      },
      getAttrValue (key, val) {
        console.log('ffffff', key, val)
        var flag = false
        var k = 0
        var FileIdStr = ''
        var obj = {
          name: key,
          val: val
        }
        if (this.checkAttrList.length > 0) {
          for(var i=0;i< this.checkAttrList.length; i++) {
            if(this.checkAttrList[i].name === obj.name){
              flag = true
              k = i
              break
            }
          }
          if (flag) {
            this.checkAttrList.splice(k, 1, obj)
          } else {
            this.checkAttrList.push(obj)
          }
        } else {
          this.checkAttrList.push(obj)
        }
        flag = false
        console.log('list', this.checkAttrList)
        for (var t=0; t<this.checkAttrList.length; t++){
          var splitIcon = ','
          if (t === this.checkAttrList.length - 1) {
            splitIcon = ''
          }
          FileIdStr = FileIdStr + this.checkAttrList[t].val + splitIcon
        }
        console.log('kkkkkkk', FileIdStr)
        this.checkAttrStr = FileIdStr
      },
      // 查属性
      getAttrList (type) {
        var that = this
        that.$axios.get('api/attribute', {}).then(res => {
          if (res.code === 200) {
            that.attrList = res.data
            that.attrListLen = res.data.length
            for (var i=0;i<that.attrList.length; i++) {
              this.$set(this.attrList[i],'nameStr','')
              that.attrList[i].nameStr =  that.attrList[i].attr_name
            }
            if (!type) {
              that.attrList = that.attrList.slice(0,3)
              this.moreIcon = 'el-icon-d-arrow-right'
            } else if (type) {
              if (type === 'more') {
                that.attrList = that.attrList.slice()
                this.moreIcon = 'el-icon-d-arrow-left'
              } else if (type === 'less') {
                that.attrList = that.attrList.slice(0,3)
                this.moreIcon = 'el-icon-d-arrow-right'
              }
            }
            console.log('ddddd', that.attrList)
          }
        })
      },
      // 价格区间
      subPrice () {
        var tamp = this.startPrice
        if (this.startPrice > this.endPrice) {
          this.startPrice = this.endPrice
          this.endPrice = tamp
        }
        if (this.endPrice || this.startPrice){
          this.getList()
        } else if (!this.endPrice && !this.startPrice) {
          this.startPrice = null
          this.endPrice = null
          this.getList()
        }
      },
      // 排序
      checkSortType (e, type) {
        var obj = e.currentTarget
        $(obj).addClass('activeSort').siblings().removeClass('activeSort')
        this.sort = type
        this.getList()
      },
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
        obj = {
          s_cate_id: that.s_cate_id,
          f_cate_id: that.f_cate_id,
          page: that.page,
          price_end: that.endPrice,
          price_start: that.startPrice,
          perPage: that.pageSize,
          keyword: that.keyword,
          sort: that.sort,
          attr: that.attrStr
        }
        // if (that.s_cate_id){
        //   obj = {
        //     s_cate_id: that.s_cate_id,
        //     page: that.page,
        //     perPage: that.pageSize,
        //     keyword: '',
        //     sort: ''
        //   }
        // } else if (that.f_cate_id) {
        //   obj = {
        //     f_cate_id: that.f_cate_id,
        //     page: that.page,
        //     perPage: that.pageSize,
        //     keyword: '',
        //     sort: ''
        //   }
        // }
        getSearchList(obj).then((res)=>{
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
        obj.left += -48
        if (picNum > 5) {
          var num = picNum - 5
          var leftWidth1 = -48*num
          if(obj.left >= leftWidth1){
            var leftwidth = Number(obj.left)
            $(divbox).css('left',leftwidth)
            $(objBtn).css('color', '#333')
            $(prevBtn).css('color', '#333')
            $(divbox).css('transition', '0.4s')
          } else if (obj.left < leftWidth1) {
            obj.left = leftWidth1
            return false
          }
          if(obj.left === leftWidth1){
            $(objBtn).css('color', '#999')
            $(prevBtn).css('color', '#333')
            return false
          }
        }
      },
      prevPic:function (obj,e,dex) {
        var picNum = e.target.offsetParent.firstChild.firstChild.getElementsByTagName("div").length
        var divbox = document.getElementsByClassName("sliderCont")[dex]
        // var nextBtn = document.getElementsByClassName("next")[dex]
        var objBtn = e.currentTarget
        var nextBtn = e.target.offsetParent.children[2]
        obj.left += 48
        if(obj.left<=0){
          var leftwidth = Number(obj.left)
          $(divbox).css('left',leftwidth)
          $(divbox).css('transition', '0.4s')
          $(objBtn).css('color','#333')
          $(nextBtn).css('color','#333')
        }else{
          $(nextBtn).css('color','#333')
          $(objBtn).css('color','#999')
          obj.left = 0
          return false
        }
        if (obj.left === 0) {
          obj.left = 0
          $(nextBtn).css('color','#333')
          $(objBtn).css('color','#999')
          return false
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
