<template>
  <div class="myAccount orderDetail">
    <div class="header">
      <header-com></header-com>
    </div>
    <div class="account">
      <div class="accountBox">
        <div class="accountNav">
          <router-link to="myAccount"><div class="navTitle">My Account</div></router-link>
          <router-link to="myOrder"><div class="navItem">My Orders</div></router-link>
          <router-link to="myWishlist"><div class="navItem">My Wishlist</div></router-link>
          <router-link to="myCoupon"><div class="navItem">My Coupon</div></router-link>
          <router-link to="myPoints"><div class="navItem">My Points</div></router-link>
          <router-link to="mySubscription"><div class="navItem">My Subscription</div></router-link>
          <router-link to="addressBook"><div class="navItem">Address Book</div></router-link>
          <router-link to="accountSetting"><div class="navItem">Account Setting</div></router-link>
        </div>
        <div class="navCount">
            <h3 class="my_title">Order Details</h3>
            <div class="order_num">
                <div class="num num_list" v-if="orders[0]">
                    <div class="one">
                        <p><span>Order No.：</span>{{orders[0].orders_number}}</p>
                        <p><span>Status.：</span>{{orders[0].orders_status}}</p>
                        <p><span>Ship Via.：</span>{{orders[0].shipping_method}}</p>
                    </div>
                    <div class="two">
                        <p><span>Order Amount：</span><b>$ {{orders[0].order_total}}</b></p>
                        <p><span>Order Time：</span>{{orders[0].created_at}}</p>
                        <p><span>Payment Method：</span>{{orders[0].payment_method}}</p>
                    </div>
                </div>
                <div class="num num_right">
                    <div class="one">
                        <p v-for="item in orders_total"><span>{{item.title}}：</span>${{item.value}}</p>
                    </div>
                </div>
            </div>
            <div class="order_address">
                <div class="list">
                    <h4>Shipping Address</h4>
                    <div class="detail" v-if="orders[0]">
                        <h5>{{orders[0].delivery_name}}</h5>
                        <div class="discription">
                            <p>
                                {{orders[0].delivery_country}}{{orders[0].delivery_state}}{{orders[0].delivery_city}}
                            </p>
                            <p>{{orders[0].delivery_company}}</p>
                            <p>{{orders[0].delivery_street_address}}</p>
                            <p>{{orders[0].delivery_suburb}}{{orders[0].delivery_postcode}}</p>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <h4>Billing Address</h4>
                    <div class="detail" v-if="orders[0]">
                        <h5>{{orders[0].billing_name}}</h5>
                        <div class="discription">
                            <p>
                                {{orders[0].billing_country}}{{orders[0].billing_state}}{{orders[0].billing_city}}
                            </p>
                            <p>{{orders[0].billing_company}}</p>
                            <p>{{orders[0].billing_street_address}}</p>
                            <p>{{orders[0].billing_suburb}}{{orders[0].billing_postcode}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Products_Details">
                <h4>Products Details</h4>
                <el-table
                    :data="orders_products"
                    style="width: 100%;border:1px solid #E9E9E9"
                    size="medium"
                    :header-cell-style="{
                        'background-color': '#F5F5F5',
                        'color': '#333'
                    }">
                    <el-table-column
                        prop="date"
                        label="Product">
                        <template slot-scope="scope">
                            <div class="product">
                                <img :src="url+scope.row.products_pic" alt="">
                                <div class="detail">
                                    <h5>{{scope.row.products_name}}</h5>
                                    <p><span v-for="(item1,index) in JSON.parse(scope.row.sku_attrs)" :key="index">{{item1.attr_name}}:<span style="color: #333;">{{item1.value.attr_value}}</span>; </span></p>
                                    <p>${{scope.row.final_price}}<span class="old_price">${{scope.row.products_price}}</span></p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Quantity"
                        width="220">
                        <template slot-scope="scope">
                            <h4>{{scope.row.products_quantity}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="Total"
                        width="260">
                        <template slot-scope="scope">
                            <h4>{{(scope.row.final_price*scope.row.products_quantity).toFixed(2)}}</h4>
                        </template>
                    </el-table-column>
                </el-table>
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
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  data(){
    return{
        url: "http://arapi.panduo.com.cn/uploads/",
        orderId:'',//订单id
        orders:{},//地址等
        orders_total:[],//金额小项
        orders_products:[],//订单商品
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
  watch:{
    
  },
  created(){
      this.orderId = this.$route.query.orderId
      this.orderDetail()
  },
  methods:{
      orderDetail(){
          this.$axios.get('api/myorder/'+ this.orderId, {}).then(res => {
              this.orders = res.orders
              this.orders_total = res.orders_total
              this.orders_products = res.orders_products
          })
      }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
