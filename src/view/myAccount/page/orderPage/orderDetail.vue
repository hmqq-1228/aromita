<template>
  <div class="myAccount orderDetail">
    <div class="account">
      <div class="accountBox">
        <Left-Nav activeIndex="1"></Left-Nav>
        <div class="navCount">
          <h3 class="my_title">Order Details</h3>
          <div style="display: flex;justify-content: start;border-bottom:1px dashed #e9e9e9;">
            <div class="order_Detail">
              <p v-if="orders[0]" id="shipMethod">
                <span style="color:#999">Shipping Method.：</span>
                <span :title="orders[0].shipping_method">{{orders[0].shipping_method}}</span>
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
                        <p><span>Subtotal:</span> ${{orders_total.Subtotal}}</p>
                        <p><span>Coupon:</span> - ${{Math.abs(orders_total.Coupon).toFixed(2)}}</p>
                        <p><span>Points:</span> - ${{orders_total.PointsToMoney?Math.abs(orders_total.PointsToMoney).toFixed(2):0.00}}</p>
                        <p><span>Tax:</span> ${{ orders_total.Taxes_Fee }}</p>
                        <p><span>Shipping:</span> ${{ orders_total.Shipping_Fee }}</p>
                        <p><span>Grand Total:</span> ${{ orders_total.Grand_Total }}</p>
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
                          <p>{{orders[0].delivery_suburb}}</p>
                          <p>
                              {{orders[0].delivery_city}},{{orders[0].delivery_state}},{{orders[0].delivery_postcode}},{{countryList1[orders[0].delivery_country]}}
                          </p>
                          <p>{{orders[0].customers_phone}}</p>
                          <p>{{orders[0].customers_email}}</p>
                      </div>
                  </div>
              </div>
              <div class="list" v-if="orders[0] && orders[0].payment_method !== 'paypal'">
                  <h4>Billing Address</h4>
                  <div class="detail" v-if="orders[0]">
                      <h5>{{orders[0].billing_name}}</h5>
                      <div class="discription">
                          <p>{{orders[0].billing_company}}</p>
                          <p>{{orders[0].billing_street_address}}</p>
                          <p>{{orders[0].billing_suburb}}</p>
                          <p>
                              {{orders[0].billing_city}},{{orders[0].billing_state}},{{orders[0].billing_postcode}},{{countryList1[orders[0].billing_country]}}
                          </p>
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
                            <div class="imgBox">
                              <div class="tagBox">
                                <div class="cheap" v-if="scope.row.activity_type == 1">
                                  <div class="cheapLeft"></div>
                                  <div class="cheapRight">${{scope.row.activity_price}}</div>
                                </div>
                                <div class="disPrice" v-if="scope.row.activity_type == 2">%{{parseInt(scope.row.activity_intensity)}} OFF</div>
                              </div>
                              <img :src="scope.row.products_pic" alt="" @click="link(scope.row.product_id,scope.row.sku_id)">
                            </div>
                              <div class="detail">
                                  <h5 @click="link(scope.row.product_id,scope.row.sku_id)">{{scope.row.products_name}}</h5>
                                  <p>
                                    <span v-for="(item1,index) in JSON.parse(scope.row.sku_attrs)" :key="index">{{item1.attr_name}}:
                                      <span style="color: #333;">{{item1.value.attr_value}}</span>;
                                    </span>
                                  </p>
                                  <p>${{scope.row.activity_price?scope.row.activity_price:scope.row.final_price}}
                                    <span class="old_price" v-if="scope.row.activity_type>0">${{scope.row.products_price}}</span>
                                  </p>
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
                          <h4>$ {{(parseFloat(scope.row.activity_price?scope.row.activity_price:scope.row.final_price)*scope.row.products_quantity).toFixed(2)}}</h4>
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
        orders_total:{},//金额小项
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
      if(spuid!=='' && skuid!==''){
        this.$router.push('/goodsDetail/'+ spuid + '/'+ skuid)
      }else{
        // console.log(skuid,spuid)
      }
    },
    orderDetail(){
      var that = this
      this.$axios.get('api/myorder/'+ this.orderId, {}).then(res => {
        this.orders = res.orders
        this.orders_total = res.orders_total[0]
        if (res.orders_products){
          for(var i=0;i<res.orders_products.length;i++){
            that.$set(res.orders_products[i], 'activity_type', 0)
            that.$set(res.orders_products[i], 'activity_price', 0)
            that.$set(res.orders_products[i], 'activity_intensity', 0)
            if (res.activity_sku.length>0){
              for(var j=0;j<res.activity_sku.length;j++){
                if(res.orders_products[i].sku_id == res.activity_sku[j].sku_id){
                  res.orders_products[i].activity_type = res.activity_sku[j].activity_type
                  res.orders_products[i].activity_price = res.activity_sku[j].activity_price
                  res.orders_products[i].activity_intensity = res.activity_sku[j].activity_intensity
                }
              }
            }
          }
        }
        this.orders_products = res.orders_products
        console.log('mmmmmm', this.orders_products)
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
