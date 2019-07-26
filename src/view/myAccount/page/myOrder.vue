<template>
    <div class="my_order">
        <h3 class="my_title">My Orders</h3>
        <div class="order_list">
            <div class="list active">
                <img src="@/assets/images/All-Orders.png" alt="">
                <p>All Orders(3)</p>
            </div>
            <div class="list">
                <img src="@/assets/images/Processing.png" alt="">
                <p>Processing(1)</p>
            </div>
            <div class="list">
                <img src="@/assets/images/Shipped.png" alt="">
                <p>Shipped(2)</p>
            </div>
            <div class="list">
                <img src="@/assets/images/Delivered.png" alt="">
                <p>Delivered(0)</p>
            </div>
            <div class="list">
                <img src="@/assets/images/Refund.png" alt="">
                <p>Refund(0)</p>
            </div>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;border:1px solid #E9E9E9"
            size="medium"
            :header-cell-style="{
                'background-color': '#F5F5F5',
                'color': '#333'
            }">
            <el-table-column
                prop="date"
                label="Order No.">
            </el-table-column>
            <el-table-column
                prop="name"
                label="Ship to"
                width="280">
            </el-table-column>
            <el-table-column
                prop="address"
                label="Amount">
            </el-table-column>
            <el-table-column
                prop="address"
                label="Status">
            </el-table-column>
            <el-table-column label="Action" width="280">
                <template slot-scope="scope">
                    <span class="list_btn" @click="detail()">View</span>
                    <span class="list_btn">Cancel</span>
                    <span class="list_btn">Tracking</span>
                    <span class="list_btn" @click="_refund()">After-sales</span>
                    <span class="list_btn">退款详情</span>
                </template>    
            </el-table-column>
        </el-table>
        <div class="page_list">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [{
                date: '2016-05-02',
                name: 'Ship to:bcjkdbsfhniodheiof, cnjdskagvcvn...',
                address: '$ 64.00'
            }, {
                date: '2016-05-04',
                name: 'Ship to:bcjkdbsfhniodheiof, cnjdskagvcvn...',
                address: '$ 64.00'
            }, {
                date: '2016-05-01',
                name: 'Ship to:bcjkdbsfhniodheiof, cnjdskagvcvn...',
                address: '$ 64.00'
            }, {
                date: '2016-05-03',
                name: 'Ship to:bcjkdbsfhniodheiof, cnjdskagvcvn...',
                address: '$ 64.00'
            }]
        }
    },
    methods:{
        detail(){
            this.$router.push({
                path: '/orderDetail',
                query: {
                    // s_cate_id: id
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


