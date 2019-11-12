<template>
  <div class="myAccount">
    <div class="account">
      <div class="accountBox">
        <Left-Nav activeIndex="1"></Left-Nav>
        <div class="navCount">
          <div class="my_order">
            <h3 class="my_title">My Orders</h3>
            <div>
              <div class="afterSaleTitle">
                <div>Result</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Operation</div>
              </div>
              <div class="afterSaleItem">
                <div style="font-weight: bold;">Refund successful</div>
                <div style="color: #C51015;">$ 64.00</div>
                <div>15 Jua,2018  11:51:58</div>
                <div class="afterSaleOpe">
                  <div>After-sales details</div>
                  <!--<div>details</div>-->
                </div>
              </div>
              <div class="afterSaleItem">
                <div style="font-weight: bold;">Refund successful</div>
                <div style="color: #C51015;">$ 64.00</div>
                <div>15 Jua,2018  11:51:58</div>
                <div class="afterSaleOpe">
                  <div>After-sales details</div>
                  <!--<div>details</div>-->
                </div>
              </div>
              <div class="afterSaleItem">
                <div style="font-weight: bold;">Refund successful</div>
                <div style="color: #C51015;">$ 64.00</div>
                <div>15 Jua,2018  11:51:58</div>
                <div class="afterSaleOpe">
                  <div>After-sales details</div>
                  <!--<div>details</div>-->
                </div>
              </div>
              <div class="afterSaleItem">
                <div style="font-weight: bold;">Successful</div>
                <div style="color: #C51015;">$ 88.88</div>
                <div>2019-11-08 15:36:36</div>
                <div class="afterSaleOpe">
                  <div>After-sales details</div>
                  <!--<div>details</div>-->
                </div>
              </div>
            </div>
            <div class="page_list">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                @current-change="handleCurrentChange"
                :total="total">
              </el-pagination>
            </div>
            <!--取消订单弹框-->
            <!--<el-dialog-->
              <!--title="Cancel Order"-->
              <!--:visible.sync="cancelVisity"-->
              <!--width="30%">-->
              <!--<div class="cancelBox">-->
                <!--<p>Your order has been cancelled. The money will be return to you in the original way. Please check it later.</p>-->
              <!--</div>-->
            <!--</el-dialog>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Left from "../../element/leftNav"
  import secret from "../../../../assets/js/secret";
  import {editAddress} from "../../../../api/register";
  export default {
    components: {
      "Left-Nav":Left
    },
    data() {
      return {
        pageSize: 10,
        total: 100,
      }
    },
    methods: {
      handleCurrentChange (e) {
        console.log('kkkkk', e)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>


