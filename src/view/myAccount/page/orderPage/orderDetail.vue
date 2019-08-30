<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <Left-Nav></Left-Nav>
        <div class="navCount">
          <h3 class="my_title">Order Details</h3>
          <div style="display: flex;justify-content: start;border-bottom:1px dashed #e9e9e9;">
            <div class="order_Detail">
              <p v-if="orders[0]" style="font-size:14px;color:#333;padding-left:30px;height: 32px;line-height: 32px;">
                <span style="color:#999">Shipping Method.：</span>{{orders[0].shipping_method}}
              </p>
              <div class="order_num">
                  <div class="num num_list" v-if="orders[0]">
                      <div class="one">
                          <p><span>Order No.：</span>{{orders[0].orders_number}}</p>
                          <p><span>Status.：</span>{{order_statusList[orders[0].orders_status]}}</p>
                          <p><span>Payment Method：</span>{{orders[0].payment_method}}</p>
                      </div>
                      <div class="two">
                          <p><span>Total Paid：</span><b>$ {{orders[0].order_total}}</b></p>
                          <p>
                            <span>Order Time：</span>
                            <span v-if="orders[0].orders_status == 10 || orders[0].orders_status == 50 || orders[0].orders_status == 60">{{orders[0].created_at}}</span>
                            <span v-else>{{orders[0].pay_success_time}}</span>
                          </p>
                      </div>
                  </div>
                  <div class="num num_right">
                      <div class="one">
                          <p v-for="(value, key) in orders_total[0]" :key="key"><span>{{ key }}:</span> {{ value }}</p>
                      </div>
                  </div>
              </div>
            </div>
            <div class="payAgain">
              <div style="margin-top: 15px;" v-if="orders[0]&& orders[0].time>0&&(orders[0].orders_status == 10 || orders[0].orders_status == 60)">
                <el-button @click="pay(orders[0].order_total, orders[0].orders_number, orders[0].id)">
                  Pay now
                </el-button>
              </div>
            </div>
          </div>
          <div class="order_address">
              <div class="list">
                  <h4>Shipping Address</h4>
                  <div class="detail" v-if="orders[0]">
                      <h5>{{orders[0].delivery_name}}</h5>
                      <div class="discription">
                          <p>{{orders[0].delivery_company}}</p>
                          <p>{{orders[0].delivery_street_address}}</p>
                          <p>
                              {{orders[0].delivery_city}},{{orders[0].delivery_state}},{{orders[0].delivery_postcode}},{{countryList1[orders[0].delivery_country]}}
                          </p>
                          <!-- <p>{{orders[0].delivery_suburb}}</p> -->
                          <p>{{orders[0].customers_phone}}</p>
                          <p>{{orders[0].customers_email}}</p>
                      </div>
                  </div>
              </div>
              <div class="list">
                  <h4>Billing Address</h4>
                  <div class="detail" v-if="orders[0]">
                      <h5>{{orders[0].billing_name}}</h5>
                      <div class="discription">
                          <p>{{orders[0].billing_company}}</p>
                          <p>{{orders[0].billing_street_address}}</p>
                          <p>
                              {{orders[0].billing_city}},{{orders[0].billing_state}},{{orders[0].billing_postcode}},{{countryList1[orders[0].billing_country]}}
                          </p>
                          <!-- <p>{{orders[0].billing_suburb}}</p> -->
                          <p>{{orders[0].customers_phone}}</p>
                          <p>{{orders[0].customers_email}}</p>
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
                              <img :src="scope.row.products_pic" alt="" @click="link(scope.row.product_id,scope.row.sku_no)">
                              <div class="detail">
                                  <h5 @click="link(scope.row.product_id,scope.row.sku_no)">{{scope.row.products_name}}</h5>
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
  </div>
</template>

<script>
import Left from "../../element/leftNav"
export default {
  components: {
      "Left-Nav":Left
  },
  data(){
    return{
        url: "http://arapi.panduo.com.cn/uploads/",
        orderId:'',//订单id
        orders:{},//地址等
        orders_total:[],//金额小项
        orders_products:[],//订单商品
        order_statusList:{
            '10':"pending",
            '20':"Processing",
            '30':"Processing (Payment Review)",
            '40':"Shipped",
            '50':"Cancelled",
            '60':"pending"
        },
        countryList1:{
            US:"United States",
            CA:"Canada"
        },
    }
  },
  watch:{

  },
  created(){
      this.orderId = this.$route.query.orderId
      this.orderDetail()
  },
  methods:{
    //跳转到商品详情
    link(spuid,skuid){
      if(skuid && spuid){
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }
    },
    orderDetail(){
      this.$axios.get('api/myorder/'+ this.orderId, {}).then(res => {
        this.orders = res.orders
        this.orders_total = res.orders_total
        this.orders_products = res.orders_products
      })
    },
    pay(total, num, id){
      // this.$store.state.totalPay = total
      // this.$store.state.orderNum = num
      sessionStorage.setItem('payTotal', total)
      sessionStorage.setItem('orderNum', num)
      sessionStorage.setItem('orderId', id)
      this.$router.push({
        path: '/payAgain',
        // params: {
        //   totalPay: total,
        //   orderNum: num
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
