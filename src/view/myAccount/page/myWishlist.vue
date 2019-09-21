<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Wishlist</h3>
                        <div class="wishlist">
                            <div v-if="wish_List.length == 0" class="no_list">
                                <div>
                                    <p>抱歉，暂无任何订单，</p>
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
                                    @selection-change="handleSelectionChange"
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
                                                <img v-if="false" src="@/assets/images/cart.png" alt="">
                                                <i class="el-icon-error" @click="deleteList(scope.row.wl_id)"></i>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="select">
                                    <p><span @click="deleteSelect()">Remove Selected</span><span v-if="false" style="color:#003764">Move select to cart</span></p>
                                </div>
                                <div class="page_list">
                                    <el-pagination
                                        background
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
import {wishlist,delwishlist} from "@/api/wish.js"
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            total:0,
            pagesize:50,
            page:1,
            listId:[],
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
                this.total = res.data.total;
            })
        },
        //单个删除心愿单
        deleteList(id){
            delwishlist({id:id}).then((res)=>{
                if(res.code == 200){
                    this.$message({
                        message: '删除成功',
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
                if(res.code == 200){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                this.getList()
            })
        },
        handleSelectionChange(val) {
            var arr = []
            for(var i =0;i<val.length;i++){
                var id = val[i].wl_id
                arr.push(id)
            }
            this.listId = arr
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
