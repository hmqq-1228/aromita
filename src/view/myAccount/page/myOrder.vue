<template>
     <div class="myAccount">
        <div class="header">
            <header-com></header-com>
        </div>
        <div class="account">
        <div class="accountBox">
            <Left-Nav></Left-Nav>  
            <div class="navCount">
                <div class="my_order">
                    <h3 class="my_title">My Orders</h3>
                    <div class="order_list">
                        <div class="list" :class="{'active':order_status==''}" @click="changeOrderStatus('')">
                            <img src="@/assets/images/All-Orders.png" alt="">
                            <p>All Orders</p>
                        </div>
                        <div class="list" :class="{'active':order_status=='10'}" @click="changeOrderStatus('10')">
                            <img src="@/assets/images/Processing.png" alt="">
                            <p>Processing</p>
                        </div>
                        <div class="list" :class="{'active':order_status=='30'}" @click="changeOrderStatus('30')">
                            <img src="@/assets/images/Shipped.png" alt="">
                            <p>Shipped</p>
                        </div>
                        <div class="list" :class="{'active':order_status=='40'}" @click="changeOrderStatus('40')">
                            <img src="@/assets/images/Delivered.png" alt="">
                            <p>Cancelled</p>
                        </div>
                        <!-- <div class="list">
                            <img src="@/assets/images/Refund.png" alt="">
                            <p>Refund(0)</p>
                        </div> -->
                    </div>
                    <el-table
                        v-if="orderList.length!=0"
                        :data="orderList"
                        style="width: 100%;border:1px solid #E9E9E9"
                        size="medium"
                        :header-cell-style="{
                            'background-color': '#F5F5F5',
                            'color': '#333'
                        }">
                        <el-table-column
                            prop="orders_number"
                            label="Order No.">
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            label="Order time"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="order_total"
                            label="Total">
                            <template slot-scope="scope">
                                <span style="color:#c51015">${{scope.row.order_total}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orders_status"
                            label="Status">
                            <template slot-scope="scope">
                                <span>{{order_statusList[scope.row.orders_status]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Action" width="280">
                            <template slot-scope="scope">
                                <span class="list_btn" @click="detail(scope.row.id)">View</span>
                                <span class="list_btn" v-if="scope.row.orders_status== 20">Cancel</span>
                                <span class="list_btn" v-if="scope.row.orders_status== 40">Tracking</span>
                                <span class="list_btn" v-if="scope.row.orders_status== 40" @click="_refund()">After-sale service</span>
                            </template>    
                        </el-table-column>
                    </el-table>
                    <div class="page_list" v-if="total!=0">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                    <div v-if="orderList.length ==0" class="No_order">
                        <p>Sorry, you don’t have any orders yet. Shop Now.</p>
                    </div>
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
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Left from "../element/leftNav"
import {myOrder} from "@/api/account.js"; 
export default {
    components: {
        "header-com": Header,
        "footer-com": Footer,
        "Left-Nav":Left
    },
    data(){
        return{
            total:0,//总条目
            order_status:'',//订单状态
            orderList:[],//订单列表
            order_statusList:{
                '10':"pending",
                '20':"Processing",
                '30':"Processing (Payment Review)",
                '40':"Shipped",
                '50':"Cancelled"
            }
                
        }
    },
    created(){
        this.myOrderList()
    },
    methods:{
        //订单列表
        myOrderList(){
            myOrder({status:this.order_status}).then((res)=>{
                this.orderList = res.data
                this.total = res.total
            })
        },
        //切换订单状态
        changeOrderStatus(num){
            this.order_status = num
            this.myOrderList()
        },
        detail(id){
            this.$router.push({
                path: '/orderDetail',
                query: {
                    orderId:id
                }
            })
        },
        _refund(){
            this.$router.push({
                path: '/orderRefund',
                query: {
                    // s_cate_id: id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>


