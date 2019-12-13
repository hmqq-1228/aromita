<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav activeIndex="2"></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Wishlist</h3>
                        <div class="wishlist">
                            <div v-if="noWish" class="no_list">
                                <div>
                                    <p>Sorry, there is no item.</p>
                                    <router-link to="/">
                                        <div class="wish_btn">Go Shopping></div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="Products_Details" v-else>
                                <el-table
                                    :data="wish_List"
                                    style="width: 100%;border:1px solid #E9E9E9"
                                    size="medium"
                                    :row-class-name="tableRowClassName"
                                    @selection-change="handleSelectionChange"
                                    empty-text="Sorry, there is no item."
                                    :header-cell-style="{
                                        'background-color': '#F5F5F5',
                                        'color': '#333'
                                    }">
                                    <el-table-column type="selection" width="40"></el-table-column>
                                    <el-table-column label="Select all" width="140">
                                      <template slot-scope="scope">
                                        <div class="product" style="display: inline-block">
                                          <div class="imgBox">
                                            <div class="tagBox" v-if="scope.row.activity_type">
                                              <div class="cheap" v-if="scope.row.activity_type == 1">
                                                <div class="cheapLeft"></div>
                                                <div class="cheapRight">${{scope.row.activity_price}}</div>
                                              </div>
                                              <div class="disPrice" v-if="scope.row.activity_type == 2">%{{parseInt(scope.row.activity_intensity)}} OFF</div>
                                            </div>
                                            <img @click="toGoodsDetail(scope.row.product_id, scope.row.wl_products_skus_id)" :src="scope.row.sku_image" alt="">
                                          </div>
                                        </div>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="Product">
                                        <template slot-scope="scope">
                                            <div class="product" style="display: inline-block">
                                                <div class="detail2" style="display: inline-block">
                                                    <h5 :class="scope.row.sku_status === 1? '': 'errorType'" :title="scope.row.sku_name " @click="toGoodsDetail(scope.row.product_id, scope.row.wl_products_skus_id)">{{scope.row.sku_name}}</h5>
                                                    <div class="attrBox" :title="scope.row.attrStr">
                                                      <span :class="scope.row.sku_status === 1? '': 'errorAttrType'" v-for="attr in JSON.parse(scope.row.sku_attrs).slice(0, 2)"><span>{{attr.attr_name}}: </span>{{attr.value.attr_value}}; </span>
                                                      <span v-if="JSON.parse(scope.row.sku_attrs).length>2">...</span>
                                                    </div>
                                                    <p :class="scope.row.sku_status === 1? '': 'errorPriceType'">
                                                      ${{scope.row.activity_price?scope.row.activity_price:scope.row.sku_price}}
                                                      <span class="old_price" v-if="scope.row.activity_price">$ {{scope.row.sku_price}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="200px">
                                      <div style="font-size: 16px;" slot-scope="scope" v-if="scope.row.sku_status !== 1">Invalid</div>
                                    </el-table-column>
                                    <el-table-column label="Options" width="200">
                                        <template slot-scope="scope">
                                            <div class="wish_options">
                                              <div v-if="scope.row.sku_status === 1" @click="addToCart(scope.row.wl_products_skus_id,scope.row.inventory)"></div>
                                                <i class="el-icon-error" @click="deleteList(scope.row.wl_id)"></i>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="select">
                                  <div><span @click="deleteSelect()">Delete selected items</span></div>
                                  <div v-if="false" style="color:#003764">Move select to cart</div>
                                  <div @click="emptyOut()">Delete invalid items</div>
                                </div>
                                <div class="page_list">
                                    <el-pagination
                                        background
                                        @current-change="currentPage($event)"
                                        layout="prev, pager, next"
                                        :page-size = "pagesize"
                                        :total="total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import {wishlist,delwishlist,removewishlist} from "@/api/wish.js"
import {getGoodsQuantityInCart} from "../../../api/register";
import qs from 'qs'
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            total:0,
            pagesize:50,
            pageNow:1,
            listId:[],
            num1:1,
            noWish: false,
            wish_List:[]
        }
    },
    created(){
        this.getList()
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (row.sku_status === 1) {
          return 'normalStyle';
        } else {
          return 'errorStyle';
        }
        return '';
      },
      currentPage (num) {
        this.pageNow = num
        this.getList()
      },
        //心愿单列表
        getList(){
          var that = this
            wishlist({
              page: this.pageNow
            }).then((res)=>{
                var list = []
                var list2 = []
                var list3 = []
                var dataList = res.data
                var attrStr = ''
                for (var i=0;i < dataList.length;i++) {
                  attrStr = ''
                  // that.$set(dataList[i], 'activity_type', 0)
                  // that.$set(dataList[i], 'activity_price', 0)
                  // that.$set(dataList[i], 'activity_intensity', 0)
                  // if (res.activity_sku.length>0){
                  //   console.log('11111')
                  //   for(var k=0;k<res.activity_sku.length;k++){
                  //     if(dataList[i].wl_products_skus_id == res.activity_sku[k].sku_id){
                  //       dataList[i].activity_type = res.activity_sku[k].activity_type
                  //       dataList[i].activity_price = res.activity_sku[k].activity_price
                  //       dataList[i].activity_intensity = res.activity_sku[k].activity_intensity
                  //     }
                  //   }
                  // }
                  for (var j=0;j<JSON.parse(dataList[i].sku_attrs).length; j++){
                    attrStr = attrStr + JSON.parse(dataList[i].sku_attrs)[j].attr_name + ': ' + JSON.parse(dataList[i].sku_attrs)[j].value.attr_value + '; '
                  }
                  dataList[i].attrStr = attrStr
                  // console.log('ssssss', attrStr)
                  if (dataList[i].sku_status === 1) {
                    list.push(dataList[i])
                  } else if (dataList[i].sku_status === 2) {
                    list2.push(dataList[i])
                  } else if (dataList[i].sku_status === 0) {
                    list3.push(dataList[i])
                  }
                }
                this.wish_List = list.concat(list2)
                this.wish_List = this.wish_List.concat(list3)
                console.log('nnnnnnnn', this.wish_List)
                if (this.wish_List.length >0){
                  this.noWish = false
                } else {
                  this.noWish = true
                }
                this.total = res.total;
            })
        },
      toGoodsDetail: function (spuid, skuid) {
        if (spuid && skuid) {
          this.$store.state.spuId = spuid
          this.$store.state.skuId = skuid
          this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
        }
      },
        //单个删除心愿单
        deleteList(id){
            delwishlist({id:id}).then((res)=>{
                if(res.code == 200){
                    this.$message({
                        message: 'Delete successful',
                        type: 'success'
                    });
                }
                this.getList()
            })
        },
        //删除选择心愿单
        deleteSelect(){
            var str = this.listId.join(",");
            delwishlist({id:str}).then((res)=>{
                if(res.code === 200){
                    this.$message({
                        message: 'Delete successful',
                        type: 'success'
                    });
                }
                this.getList()
            })
        },
      emptyOut () {
        removewishlist().then((res)=>{
          if(res.code === 200) {
            this.getList()
          }
        })
      },
        handleSelectionChange(val) {
            var arr = []
            for(var i =0;i<val.length;i++){
              if (val[i].sku_status === 1) {
                var id = val[i].wl_id
                arr.push(id)
              }
            }
            this.listId = arr
        },
      addToCart: function (sku, num) {
        this._getGoodsQuantityInCart(sku, num)
      },
      _getGoodsQuantityInCart(sku, num){
        //已加购商品数量
        let pre ={
          sku_id:sku
        }
        getGoodsQuantityInCart(pre).then((res)=>{
          if(res === '101' || res === 101){
            if (num > 0) {
              this._addcartList(sku)
            } else {
              this.$alert('This item is out of stock. Please refresh the page and try again.', '', {
                confirmButtonText: 'OK',
                // callback: action => {
                //   this.$router.push('/shoppingCar')
                // }
              })
            }
          }else{
            this.purchase = res.inventory - res.goods_count
            if(1 > this.purchase){
              this.$alert('Exceeds maximun quantity available for this product!', '', {
                confirmButtonText: 'OK',
                // callback: action => {
                //   this.$router.push('/shoppingCar')
                // }
              })
              // this.$message({
              //   message: 'Exceeds maximun quantity available for this product.',
              //   type: 'warning'
              // });
              return false
            }else{
              this._addcartList(sku)
            }
          }
        })
      },
      _addcartList(sku){
        var skuId = sku
        var obj = qs.stringify({
          product_id: skuId,
          count: 1
        })
        this.$axios.post('api/addcart', obj).then(res => {
          if (res === 2060) {
            this.$store.state.addCartState = true
          } else if (res === 2050) {
            this.$alert('Sorry, your shopping cart goes over the 50-item limit. Place view your cart firstly.', '', {
              confirmButtonText: 'Go to shopping cart',
              callback: action => {
                this.$router.push('/shoppingCar')
              }
            })
          }else if (res.code == '101') {
            this.$alert('This item is removed. Please refresh the page and try again.', '', {
              confirmButtonText: 'OK',
              callback: action => {
                this.getList()
              }
            })
          } else if (res.code == '102') {
            this.$alert('This item is restocking. Please refresh the page and try again.', '', {
              confirmButtonText: 'OK',
              callback: action => {
                this.getList()
              }
            })
          } else if (res.code == '103') {
            this.$alert('This item is out of stock. Please refresh the page and try again.', '', {
              confirmButtonText: 'OK',
              callback: action => {
                this.getList()
              }
            })
          }  else if (!res){
            this.$store.state.addCartState = true
          }
        })
      }
    }
}
</script>
<style>
.page_list .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #C51015;
}
</style>

<style lang="scss" scoped>
  .wish_options div{
    width:24px;
    height: 24px;
    cursor: pointer;
    margin-bottom: 6px;
    background-image: url("../../../assets/cart.png");
  }
  .wish_options div:hover{
    background-image: url("../../../assets/cart-1.png");
  }
  .attrBox{
    margin-top: 10px;
    display: inline-block;
    font-size: 13px;
    cursor: pointer;
    /*overflow: hidden;*/
    /*text-overflow:ellipsis;*/
    /*white-space: nowrap;*/
  }
    @import "@/assets/css/account.scss"
</style>
