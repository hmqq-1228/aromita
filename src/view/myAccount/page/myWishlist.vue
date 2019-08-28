<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>  
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Wishlist</h3>
                        <div class="wishlist">
                            <div v-if="list.length == 0" class="no_list">
                                <div>
                                    <p>抱歉，暂无任何订单，</p>
                                    <div class="wish_btn">Go Shopping></div>
                                </div>
                            </div>
                            <div class="Products_Details">
                                <el-table
                                    :data="wish_List"
                                    style="width: 100%;border:1px solid #E9E9E9"
                                    size="medium"
                                    :header-cell-style="{
                                        'background-color': '#F5F5F5',
                                        'color': '#333'
                                    }">
                                    <el-table-column type="selection" label="Sealect all" width="45"></el-table-column>
                                    <el-table-column label="Product">
                                        <template slot-scope="scope">
                                            <div class="product">
                                                <img :src="scope.row.sku_image" alt="">
                                                <div class="detail">
                                                    <h5>{{scope.row.sku_name}}</h5>
                                                    <p><span>Size:</span>3.0mm</p>
                                                    <p>${{scope.row.sku_price}}<span class="old_price">$ 4.99</span></p>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column
                                        prop="name"
                                        label="Quantity"
                                        width="280">
                                        <template slot-scope="scope">
                                            <el-input-number v-model="scope.row.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                                        </template>
                                    </el-table-column> -->
                                    <el-table-column label="Options" width="200">
                                        <template slot-scope="scope">
                                            <div class="wish_options">
                                                <img src="@/assets/images/cart.png" alt="">
                                                <i class="el-icon-error" @click="deleteList(scope.row.wl_products_skus_id)"></i>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="select">
                                    <p><span>Remove Selected</span><span style="color:#003764">Move select to cart</span></p>
                                </div>
                                <div class="page_list">
                                    <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
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
import {wishlist,delwishlist} from "@/api/wish.js"
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            list:[1],
            num1:1,
            wish_List:[]
        }
    },
    created(){
        this.getList()
    },
    methods:{
        //心愿单列表
        getList(){
            wishlist().then((res)=>{
                this.wish_List = res.data.data
            })
        },
        //删除心愿单
        deleteList(id){
            delwishlist({id:id}).then((res)=>{

            })
        },
        handleChange(value) {
            console.log(value);
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
    @import "@/assets/css/account.scss"
</style>