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
                <div class="num num_list">
                    <div class="one">
                        <p><span>Order No.：</span>123456</p>
                        <p><span>Status.：</span>Processing</p>
                        <p><span>Ship Via.：</span>USPS</p>
                    </div>
                    <div class="two">
                        <p><span>Order Amount：</span><b>$ 987.27</b></p>
                        <p><span>Order Time：</span>15 Jua,2018  11:51:58</p>
                        <p><span>Payment Method：</span>Paypal</p>
                    </div>
                </div>
                <div class="num num_right">
                    <div class="one">
                        <p><span>Order Subtotal.：</span>$ 987.27</p>
                        <p><span>Coupon.：</span>$ 987.27</p>
                        <p><span>Points.：</span>$ 987.27</p>
                    </div>
                    <div class="two">
                        <p><span>Taxes Fee：</span>$ 987.27</p>
                        <p><span>Shipping Fee：</span>$ 987.27</p>
                        <p><span>Grand Total：</span>$ 987.27</p>
                    </div>
                </div>
            </div>
            <div class="order_address">
                <div class="list">
                    <h4>Shipping Address</h4>
                    <div class="detail">
                        <h5>Alexander</h5>
                        <div class="discription">
                            <p>
                                潘朵，
                                滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室，
                                2滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室
                                Country 52301，California
                                1234567890
                                Rosie_lee@panduo.com.cn
                            </p>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <h4>Shipping Address</h4>
                    <div class="detail">
                        <h5>Alexander</h5>
                        <div class="discription">
                            <p>
                                滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室
                                Country 52301，California
                                1234567890
                                Rosie_lee@panduo.com.cn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Products_Details">
                <h4>Products Details</h4>
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
                        width="220">
                        <template slot-scope="scope">
                            <h4>{{scope.row.name}}</h4>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="Total"
                        width="260">
                        <template slot-scope="scope">
                            <h4>{{scope.row.name}}</h4>
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
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>
