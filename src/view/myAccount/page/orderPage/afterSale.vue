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
              <div class="afterSaleItem" v-for="(item, index) in refundList" :key="index">
                <div style="font-weight: bold;">{{item.status}}</div>
                <div style="color: #C51015;">$ {{item.total}}</div>
                <div>{{item.created_at}}</div>
                <div class="afterSaleOpe">
                  <div @click="toRefundDetail(item.id)">After-sales details</div>
                  <!--<div>details</div>-->
                </div>
              </div>
              <div class="noSaleData" v-if="refundList.length == 0">You have no after-sales record.</div>
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
  import {refundList} from "@/api/account.js"
  import qs from 'qs'
  export default {
    components: {
      "Left-Nav":Left
    },
    data() {
      return {
        pageSize: 15,
        total: 10,
        pageNum: 1,
        refundList: []
      }
    },
    created(){
      this.order_id = this.$route.query.order_id
      if (this.order_id) {
        this.getRefundList()
      }
    },
    methods: {
      getRefundList () {
        var obj = {
          order_id: this.order_id,
          page: this.pageNum
        }
        refundList(obj).then((res)=>{
          if (res.code === 200) {
            this.refundList = res.data.data
            this.total = res.data.total
          }
        })
      },
      toRefundDetail (id) {
        this.$router.push({
          path:'/applicationResult',
          query: {
            orders_refund_id: id
          }
        })
      },
      handleCurrentChange (e) {
        this.pageNum = e
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>


