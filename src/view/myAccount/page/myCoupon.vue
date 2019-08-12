<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>  
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Coupon</h3>
                        <div class="Coupons">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="Valid Coupons(4)" name="first">
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
                                            label="Per Value">
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="Minimum Items Amount">
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="period of validity">
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="Invalid  Coupons(0)" name="second">
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
                                            label="Per Value">
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="Minimum Items Amount"
                                            width="280">
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="Status"
                                            width="140">
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="period of validity">
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>
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
</template>
<script>
import Left from "../element/leftNav"
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            activeName:'first',
            tableData: [{
                date: '2016-05-02',
                name: 'US$ 39.00',
                address: '30 July,2018 15:00:00 - 30 August,2018 15:00:00'
            }, {
                date: '2016-05-04',
                name: 'US$ 39.00',
                address: '30 July,2018 15:00:00 - 30 August,2018 15:00:00'
            }, {
                date: '2016-05-01',
                name: 'US$ 39.00',
                address: '30 July,2018 15:00:00 - 30 August,2018 15:00:00'
            }, {
                date: '2016-05-03',
                name: 'US$ 39.00',
                address: '30 July,2018 15:00:00 - 30 August,2018 15:00:00'
            }]
        }
    },
    methods:{
        handleClick(){

        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


