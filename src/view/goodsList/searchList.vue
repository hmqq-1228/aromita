<template>
  <div class="goodsList">
    <!--<div>{{nodeDragRefresh?'':''}}</div>-->
    <div class="listBox">
      <div class="listNav">
        <div class="navTitleTwo">
          <div>Occasion</div>
          <div class="clear" @click="clearSearch()"><img src="../../../static/img/defult.png" alt=""></div>
        </div>
        <div class="OccasionTree Occasion">
          <div class="fliterList" v-for="(screen, index) in screenList" :key="index">
            <el-collapse v-model="activeNameScreen">
              <el-collapse-item :title="screen.tag_name">
                <div class="MetalItem" v-for="(item,index) in screen.second" @click="checkedScren($event, item.tag_name)" :key="index"><span>&#8226;</span> {{item.tag_name}}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!--<el-tree-->
          <!--:data="screenList"-->
          <!--empty-text="Loading"-->
          <!--:props="defaultProps"-->
          <!--@node-click="handleNodeClick"></el-tree>-->
        </div>
        <div class="navTitleTwo" style="margin-top: 10px;">
          <div>Ring</div>
          <div class="clear"></div>
        </div>
        <div class="OccasionTree" v-for="name in categoryData" :key="name.id + name.cate_name">
          <div class="navItem Ring" :class="activeId == name.id?'activeSort':''" @click="checkItem($event, name.id, 'first')">{{name.cate_name}}</div>
          <div class="navItem child Ring" :class="activeId == item.id?'activeSort':''" v-for="item in name.second" @click="checkItem($event, item.id, 'second')" :key="item.id">{{item.cate_name}}</div>
        </div>
        <!--<div class="navTitle">Sort By</div>-->
        <div class="navTitleTwo" style="margin-top: 10px;">
          <div>Sort By</div>
          <div class="clear"></div>
        </div>
        <div class="navItem sort" @click="checkSortType($event, 1)">Most Recent</div>
        <div class="navItem sort" @click="checkSortType($event, 2)">Best Selling</div>
        <div class="navItem sort" @click="checkSortType($event, 3)">Lowest Price</div>
        <div class="navTitle" style="margin-top: 10px;">Price</div>
        <div class="price">
          <div class="priceRange">
            <input type="number" v-model="startPrice">
            <div>	&#8764;</div>
            <input type="number" v-model="endPrice">
          </div>
          <button @click="subPrice()">APPLY</button>
        </div>
        <div class="navTitleTwo" style="margin-top: 10px;">
          <div>Filter</div>
          <div class="clear" @click="clearAttrChecked()">Clear</div>
        </div>
        <div class="fliterList" v-for="(attr, index) in attrList" :key="index">
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="attr.attr_name" :name="index">
              <el-radio-group v-model="attr.nameStr">
                <div class="MetalItem" v-for="(attrVal,index2) in attr.values" :key="index2" v-if="index2 < attr.attrLen">
                  <el-radio :label="attrVal.attr_value" @change="getAttrValue(attr.attr_name, attrVal.attr_value)">{{attrVal.attr_value}}</el-radio>
                </div>
                <div class="viewMore2" v-if="attr.realLen>4" @click="showMoreAttrVal(index)">view more <i :class="attr.menuStatus?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i></div>
                <!--<div class="viewMore2" v-if="attr.values.length > 3" @click="showMoreAttrVal(moreIcon2, index2)">view more <i :class="moreIcon2"></i></div>-->
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
              <div class="goodsPic" @mouseover="imgPreve($event)" @mouseleave="imgHidden($event)" @click="toGoodsDetail(goods.id, goods.skuId)">
                <!-- <el-image v-if="goods.firstLargePic" :src="goods.firstLargePic" lazy></el-image> -->
                <img v-lazy="goods.firstLargePic" alt="img">
                <div class="tagBox" v-if="goods.activity_id>0">
                  <div class="cheap" v-if="goods.activity_type == 1">
                    <div class="cheapLeft"></div>
                    <div class="cheapRight">${{parseFloat(goods.activity_price).toFixed(2)}}</div>
                  </div>
                  <div class="disPrice"  v-if="goods.activity_type == 2">%{{parseInt(goods.activity_intensity)}} OFF</div>
                </div>
              </div>
              <div class="smallSlider2">
                <div class="sliderBox">
                  <div class="sliderCont">
                    <div v-if="goods.skus.length>0" v-for="(pic, index2) in goods.skus" v-bind:key="'sku'+ pic.id" @click="getColorPicture($event, index, pic)">
                      <img :class="index2 === 0?'active': ''" :src="pic.sku_color_img" class="smallPic">
                    </div>
                  </div>
                </div>
                <div class="el-icon-arrow-left prev" v-if="goods.skus.length > 5" @click="prevPic(goods,$event,index)"></div>
                <div class="el-icon-arrow-right next" v-if="goods.skus.length > 5" @click="nextPic(goods,$event,index)"></div>
              </div>
              <div class="goodsInfo" @click="toGoodsDetail(goods.id, goods.skuId)">
                {{goods.defultTitle}}
              </div>
              <div class="goodsPrice">
                <div class="pri">${{goods.activity_id>0?(goods.activity_price).toFixed(2):goods.defultPrice}}<span v-if="goods.activity_id>0">${{goods.defultPrice}}</span></div>
                <div class="num">{{goods.selling}} Sold</div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div v-if="goodsList && goodsList.length < totalNum" @click="addMoreList()" class="loadMore">Load More</div>
        <div v-if="topShow" class="toTop" @click="toTop()"></div>
      </div>
      <div class="listGoods noData" v-if="noDataShow">
        <div>
          <img src="../../../static/img/nodata.jpg" alt="">
          <div style="margin-top: 20px">Sorry. No products were found matching your selection.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import Swiper from 'swiper'
  import {getSearchList, categoryList, tagList} from "../../api/home";
  export default {
    data () {
      return {
        topShow: false,
        loading:true,
        // len: 3,
        page:1,
        Metal: '',
        Color: '',
        pageSize:40,
        totalNum: 0,
        endPrice: null,
        startPrice: null,
        moreIcon: 'el-icon-d-arrow-right',
        moreIcon2: 'el-icon-d-arrow-right',
        scrollShowFlag: false,
        scrollTop: null,
        prodListLastPage: false,
        activeId: '',
        goodsList: [],
        activeNames: [],
        activeNameScreen: [],
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
        tagName: '',
        leftNum:[],
        btnindex:-1,
        menuStatus:false,//属性值状态（收起，展开）
        categoryData: [],
        screenList: [],
        defaultProps: {
          children: 'second',
          label: 'tag_name'
        }
      }
    },
    watch: {
      checkAttrStr: function (val, oV) {
        if (val) {
          this.page = 1
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
        this.tagName = this.$route.query.tag
      },
      s_cate_id(val, oV) {
        if (val) {
          this.activeNames = []
          this.clearSearchFuc()
          this.getList()
          this.getCategoryList()
        }
      },
      f_cate_id (val, oV) {
        if (val) {
          this.clearSearchFuc('first')
          this.activeNames = []
          this.getList()
          this.getCategoryList('first')
        }
      }
    },
    computed: {
      // nodeDragRefresh: function () {
      //   var that = this
      //   if (that.$store.state.searchFlag) {
      //     that.keyword = that.$store.state.searchVal
      //     that.clearSearchFuc()
      //     that.$store.state.keyWord = this.$route.query.keyword
      //     that.$store.state.keyWordFlag = true
      //     that.getList()
      //     that.$store.state.searchFlag = false
      //   }
      //   return this.$store.state.searchFlag
      // }
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
      this.tagName = this.$route.query.tag
      // this.getAttrList()
      // this.scrollShow()
      this.getTagList()
    },
    methods: {
      // 点击场景标签
      // handleNodeClick(data, node) {
      //   // console.log(data, node);
      //   if (node.level === 2) {
      //     this.tagName = data.tag_name
      //     this.getList()
      //   }
      // },
      checkedScren (e, tag) {
        var obj = e.currentTarget
        var pObj = e.path[5]
        $(obj).addClass('active').siblings().removeClass('active')
        $(pObj).addClass('parentAct').siblings().removeClass('parentAct')
        // console.log('hhhhh', tag)
        this.tagName = tag
        this.getList()
      },
      // 收起场景标签
      // closeNode () {
      //   this.tagName = ''
      //   this.getList()
      // },
      // 重置
      clearSearchFuc (lv) {
        if (lv == 'first') {
          $('.navItem.sort').removeClass('activeSort')
          $('.Occasion .MetalItem').removeClass('active')
          this.sort = ''
          this.tagName = ''
          this.activeNameScreen = []
        }
        $('.navItem').removeClass('activeSort')
        this.endPrice = ''
        this.attrStr = ''
        this.checkAttrList = []
        this.attrStr = null
        this.checkAttrStr = ''
        this.getAttrList()
        this.page = 1
      },
      // 属性值展开更多
      showMoreAttrVal (dex) {
        if(this.attrList[dex].menuStatus === false){
          this.attrList[dex].menuStatus = true
          var len = this.attrList[dex].values.length
          this.attrList[dex].attrLen = len
        }else{
          this.attrList[dex].menuStatus = false
          this.attrList[dex].attrLen = 4
        }
      },
      // 属性展开更多
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
        this.checkAttrStr = ''
        this.getAttrList()
        this.getList()
      },
      // 拼接选中的属性
      getAttrValue (key, val) {
        // console.log('ffffff', key, val)
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
        // console.log('list', this.checkAttrList)
        for (var t=0; t<this.checkAttrList.length; t++){
          var splitIcon = ','
          if (t === this.checkAttrList.length - 1) {
            splitIcon = ''
          }
          FileIdStr = FileIdStr + this.checkAttrList[t].val + splitIcon
        }
        // console.log('kkkkkkk', FileIdStr)
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
              that.$set(that.attrList[i],'nameStr','')
              that.$set(that.attrList[i],'attrLen',4)
              that.$set(that.attrList[i],'menuStatus',false)
              that.$set(that.attrList[i],'realLen',that.attrList[i].values.length)
              that.$set(that.attrList[i],'iconType','el-icon-d-arrow-right')
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
            // console.log('ddddd', that.attrList)
          }
        })
      },
      // 查导航
      getCategoryList (lv) {
        var that = this
        var obj = {}
        if (lv) {
          that.categoryData = []
        }
        obj = {
          s_cate_id: that.s_cate_id,
          f_cate_id: that.f_cate_id,
        }
        categoryList(obj).then((res)=>{
          if (res.code === 200) {
            that.categoryData = res.data
            if (that.s_cate_id) {
              that.activeId = that.s_cate_id
            } else if (that.f_cate_id) {
              that.activeId = that.f_cate_id
            }
          }
        })
      },
      // 查询场景分类
      getTagList () {
        var that = this
        // var obj = {}
        // obj = {
        //   s_cate_id: that.s_cate_id,
        //   f_cate_id: that.f_cate_id,
        // }
        tagList().then((res)=>{
          if (res.code === 200) {
            that.screenList = res.data
          }
        })
      },
      clearSearch () {
        $('.navItem.sort').removeClass('activeSort')
        $('.Occasion .MetalItem').removeClass('active')
        this.sort = ''
        this.tagName = ''
        this.activeNameScreen = []
        this.getList()
      },
      // 价格区间
      subPrice () {
        var tamp = 0
        tamp = this.startPrice
        if (parseFloat(this.startPrice) > parseFloat(this.endPrice)) {
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
      checkItem (e, id, lv) {
        var obj = e.currentTarget
        $(obj).addClass('activeSort').siblings().removeClass('activeSort')
        if (lv === 'first') {
          this.f_cate_id = id
          this.$router.push({
            path: '/searchList',
            query: {
              f_cate_id: id
            }
          })
        } else if (lv === 'second'){
          this.s_cate_id = id
          this.$router.push({
            path: '/searchList',
            query: {
              s_cate_id: id
            }
          })
        }
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
        sessionStorage.setItem('listUrl', window.location.href)
        if (spuid && skuid) {
          this.$store.state.spuId = spuid
          this.$store.state.skuId = skuid
          this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
        }
      },
      // 商品列表
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
          tag: that.tagName,
          attr: that.attrStr
        }
        getSearchList(obj).then((res)=>{
          if(res.code === '200' || res.code === 200){
            if(this.page == 1){
              this.goodsList = res.data.data
            }else{
              this.goodsList = this.goodsList.concat(res.data.data);
            }
            that.totalNum = res.data.total
            $('.sliderCont').css('left',0)
            for (var i = 0;i < this.goodsList.length; i++) {
              this.$set(this.goodsList[i],'left',0)
              if (this.goodsList[i].skus.length > 0) {
                this.goodsList[i].firstLargePic = this.goodsList[i].skus[0].sku_image
                this.goodsList[i].defultTitle = this.goodsList[i].skus[0].sku_name
                this.goodsList[i].defultPrice = this.goodsList[i].skus[0].sku_price
                this.goodsList[i].skuId = this.goodsList[i].skus[0].id
                this.goodsList[i].state = this.goodsList[i].skus[0].sku_status
                this.goodsList[i].selling = this.goodsList[i].skus[0].selling
                this.goodsList[i].activity_id = this.goodsList[i].skus[0].activity_id
                this.goodsList[i].activity_type = this.goodsList[i].skus[0].activity_type
                this.goodsList[i].activity_price = this.goodsList[i].skus[0].activity_price
                this.goodsList[i].activity_intensity = this.goodsList[i].skus[0].activity_intensity
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
      // 点击小图标切换
      getColorPicture: function (e, index1, pic) {
        var obj = e.currentTarget
        var that = this
        var newGoodList = []
        console.log('kkkk', pic)
        // pic.sku_image, pic.sku_name, pic.sku_price, pic.id, pic.sku_status, pic.selling
        $(obj).children().addClass('active')
        $(obj).siblings().children().removeClass('active')
        that.goodsList[index1].firstLargePic = pic.sku_image
        that.goodsList[index1].defultTitle = pic.sku_name
        that.goodsList[index1].defultPrice = pic.sku_price
        that.goodsList[index1].skuId = pic.id
        that.goodsList[index1].state = pic.sku_status
        that.goodsList[index1].selling = pic.selling
        that.goodsList[index1].activity_id = pic.activity_id
        that.goodsList[index1].activity_type = pic.activity_type
        that.goodsList[index1].activity_price = pic.activity_price
        that.goodsList[index1].activity_intensity = pic.activity_intensity
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
        var obj = e.currentTarget.children[0]
        // console.log('kkk', obj)
        $(obj).removeClass('defultView')
        $(obj).addClass('biggerView')
      },
      imgHidden: function (e) {
        var obj = e.currentTarget.children[0]
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
