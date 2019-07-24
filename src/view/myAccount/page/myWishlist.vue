<template>
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
                    :data="tableData"
                    style="width: 100%;border:1px solid #E9E9E9"
                    size="medium"
                    :header-cell-style="{
                        'background-color': '#F5F5F5',
                        'color': '#333'
                    }">
                    <el-table-column
                    type="selection"
                    label="Sealect all"
                    width="55">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="Product">
                        <template slot-scope="scope">
                            <div class="product">
                                <img src="@/assets/images/1.jpg" alt="">
                                <div class="detail">
                                    <h5>Wholesale - (Grade D) Blue Sand Stone (Imitation) Yoga Healing Gemstone Pen dants Silver Tone Deep Blue</h5>
                                    <p><span>Size:</span>3.0mm</p>
                                    <p>$ 1.99<span class="old_price">$ 4.99</span></p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Quantity"
                        width="280">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="Options"
                        width="200">
                        <template slot-scope="scope">
                            <div class="wish_options">
                                <img src="@/assets/images/cart.png" alt="">
                                <i class="el-icon-error"></i>
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
</template>
<script>
export default {
    data(){
        return{
            list:[1],
            num1:1,
            tableData: [{
                date: '2016-05-02',
                name: '1',
                address: '$ 64.00'
            },{
                date: '2016-05-02',
                name: '1',
                address: '$ 64.00'
            },{
                date: '2016-05-02',
                name: '1',
                address: '$ 64.00'
            },{
                date: '2016-05-02',
                name: '1',
                address: '$ 64.00'
            }]
        }
    },
    methods:{
        handleChange(value) {
            console.log(value);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>