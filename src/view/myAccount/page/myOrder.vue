<template>
     <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav activeIndex="1"></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Orders</h3>
                        <div class="order_list">
                            <div class="list" :class="{'active':order_status=='10'}" @click="changeOrderStatus('10')">
                                <img src="@/assets/images/pending.png" alt="">
                                <p>Pending</p>
                            </div>
                            <div class="list" :class="{'active':order_status=='20'}" @click="changeOrderStatus('20')">
                                <img src="@/assets/images/Processing.png" alt="">
                                <p>Processing</p>
                            </div>
                            <div class="list" :class="{'active':order_status=='40'}" @click="changeOrderStatus('40')">
                                <img src="@/assets/images/Shipped.png" alt="">
                                <p>Shipped</p>
                            </div>
                            <div class="list" :class="{'active':order_status=='50'}" @click="changeOrderStatus('50')">
                                <img src="@/assets/images/Delivered.png" alt="">
                                <p>Cancelled</p>
                            </div>
                            <div class="list" :class="{'active':order_status==''}" @click="changeOrderStatus('')">
                                <img src="@/assets/images/All-Orders.png" alt="">
                                <p>All Orders</p>
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
                            <el-table-column label="Order No.">
                                <template slot-scope="scope">
                                    <p style="display:none">{{scope.row}}</p>
                                    <p>{{scope.row.orders_number}}</p>
                                    <p style="color:#C51015;text-align:left;font-weight:bolder" v-if="(scope.row.orders_status== 10 ||scope.row.orders_status== 60)&& (order_status == '10'||order_status == '')">Time Left:{{scope.row.remainTimeStr}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="order_total"
                                label="Order Time">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.orders_status== 10 ||scope.row.orders_status== 20 ||scope.row.orders_status== 60 || scope.row.orders_status== 50">{{scope.row.created_at}}</span>
                                    <span v-else>{{scope.row.pay_success_time}}</span>
                                </template>
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
                            <el-table-column label="Action" width="300">
                                <template slot-scope="scope">
                                    <span class="list_btn" @click="pay(scope.row.order_total, scope.row.orders_number, scope.row.id)" v-if="(scope.row.orders_status== 10 || scope.row.orders_status== 60)&&scope.row.time>0">Pay</span>
                                    <span class="list_btn" @click="detail(scope.row.id)">View</span>
                                    <span class="list_btn" v-if="scope.row.orders_status== 20 || scope.row.orders_status== 10 || scope.row.orders_status== 60" @click="cancelOrder(scope)">Cancel</span>
                                    <span class="list_btn" @click="toTracking(scope.row.orders_number)" v-if="scope.row.orders_status== 40">Tracking</span>
                                    <span class="list_btn" v-if="scope.row.orders_status== 40" @click="_refund()">After-sale service</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page_list" v-if="total!=0">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size="pageSize"
                                @current-change="handleCurrentChange"
                                :total="total">
                            </el-pagination>
                        </div>
                        <div class="No_order" style="text-align: center;" v-if="orderList.length==0">
                            <p><router-link to="/">Sorry, you don't have any orders yet.</router-link></p>
                        </div>
                        <!-- 取消订单弹框 -->
                        <el-dialog
                            title="Cancel Order"
                            :visible.sync="cancelVisity"
                            width="30%">
                            <div class="cancelBox">
                                <p>Are you sure you want cancel the order ?</p>
                                <div class="cancelBtn">
                                    <div class="com-Cancel-btn cancelbtn" @click="cancelVisity = false">Cancel</div>
                                    <div class="com-sub-btn cancelbtn" @click="cancelSub()">Submit</div>
                                </div>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import {myOrder,cancelOrder,returnTotal} from "@/api/account.js";
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            total:0,//总条目
            page:1,
            pageSize:20,
            order_status: '10',//订单状态
            orderList:[],//订单列表
            order_statusList:{
                '10':"pending",
                '20':"Processing",
                '30':"Processing (Payment Review)",
                '40':"Shipped",
                '50':"Cancelled",
                '60':"pending"
            },
            cancelVisity:false,
            orderNum:'',//订单号
            orderId:'',//订单id
            orderStatus:'',//单个订单状态
            tranId: '', //交易id
            totalPay: '', //订单金额
            timer:null
        }
    },
    created(){
      this.myOrderList()
      if (this.$route.params.path) {
        this.order_status = this.$route.params.path
      }
    },
    methods:{
        //分页
        handleCurrentChange(val){
           this.page = val
           this.myOrderList()
        },
        //倒计时
        countdown() {
            this.timer = setInterval(()=>{
                for (let i = 0; i < this.orderList.length; i++) {
                    this.orderList[i].time --
                    let t = this.orderList[i].time
                    if (t > 0) {
                        let day = Math.floor(t / 86400)
                        let hour = Math.floor((t / 3600) % 24)
                        let min = Math.floor((t / 60) % 60)
                        let sec = Math.floor(t % 60)
                        day = day < 10 ? '0' + day : day
                        hour = hour < 10 ? '0' + hour : hour
                        min = min < 10 ? '0' + min : min
                        sec = sec < 10 ? '0' + sec : sec
                        let format = ''
                        format = `${min}m${sec}s`
                        this.orderList[i].remainTimeStr = format
                    } else {
                        let flag = this.orderList.every((val, ind) =>val.time <= 0)
                        if (flag) clearInterval(this.timer)
                        this.orderList[i].remainTimeStr = `over` // 结束文案
                    }
                }
            }, 1000)
        },
        //订单列表
        myOrderList(){
            myOrder({status:this.order_status,page:this.page}).then((res)=>{
                this.orderList = res.data
                this.total = res.total
                if(this.orderList){
                    this.countdown()
                }
            })
        },
        //切换订单状态
        changeOrderStatus(num){
            this.order_status = num
            // this.$store.state.order_status = num
            // this.order_status = this.$store.state.order_status
            this.page = 1
            clearInterval(this.timer)
            this.myOrderList()
            // if(num == 10){
            //     this.$router.go(0)
            // }
        },
        // 取消订单
        cancelOrder(obj){
          this.cancelVisity = true;
          this.orderNum = obj.row.orders_number,
          this.orderId = obj.row.id,
          this.orderStatus = obj.row.orders_status,
          this.tranId = obj.row.transaction_id,
          this.totalPay = obj.row.order_total
        },
        //取消订单提交
        cancelSub(){
          var that = this
          let pre = {
              order_id:this.orderNum,
              ins_order:this.orderId,
              order_current_status:this.orderStatus
          }
          cancelOrder(pre).then((res)=>{
            if (res == 201) {
              if (this.orderStatus === 20) {
                that.returnTotalFuc()
              } else {
                this.myOrderList()
                this.cancelVisity = false
              }
            }else if(res.code == 101){
              this.$message({
                message: 'The order has been cancelled. Please refresh the page and try again.',
                type: 'error'
              });
              }
          })
        },
        returnTotalFuc () {
          let obj = {
            transaction_id: this.tranId,
            order_total: this.totalPay
          }
          returnTotal(obj).then((res)=>{
            if (res.code === 200) {
              this.myOrderList()
              this.cancelVisity = false
            }
          })
        },
        //到订单详情页
        detail(id){
            this.$router.push({
                path: '/orderDetail',
                query: {
                    orderId:id
                }
            })
        },
      // 物流信息
        toTracking: function (num) {
          this.$router.push({
            path: '/trackInfo',
            query: {
              order_num: num
            }
          })
        },
        //到支付页面
        pay(total, num, id){
          sessionStorage.setItem('payTotal', total)
          sessionStorage.setItem('orderNum', num)
          sessionStorage.setItem('orderId', id)
          this.$router.push({
            path: '/payAgain',
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
    },
    destroyed () {
        // this.orderList.forEach((val) => {
        //     val.time = 0
        // })
    }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>


