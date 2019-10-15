<template>
<div class="myAccount">
  <div class="account">
    <div class="accountBox">
      <Left-Nav></Left-Nav>
      <div class="navCount">
        <div class="my_order">
          <h3 class="my_title">Tracking Info</h3>
          <div class="account_set">
            <div class="trackItem">
              <div class="trackTip">Your parcel of <span>123456</span> has been shipped out via BY air transportation, tracking number is UF500974385CN, here is the tracking information.Or you can click here to check detailed tracking information.</div>
              <div class="trackTitle">
                <div class="traTime">Time</div>
                <div class="traDescri">Description</div>
                <div class="traMemo">Memo</div>
              </div>
              <div class="traTimeLine">
                <el-timeline>
                  <el-timeline-item
                    color="#C51015">
                    <div class="timeLineBox" style="color: #C51015;">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Delivery</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item
                    color="#999">
                    <div class="timeLineBox">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Arrival at Delivery Office</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item
                    color="#999">
                    <div class="timeLineBox">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Arrival at Delivery Office</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                </el-timeline>
                <div class="moreBtn">View more</div>
              </div>
            </div>
            <div class="trackItem">
              <div class="trackTip">Your parcel of <span>123456</span> has been shipped out via BY air transportation, tracking number is UF500974385CN, here is the tracking information.Or you can click here to check detailed tracking information.</div>
              <div class="trackTitle">
                <div class="traTime">Time</div>
                <div class="traDescri">Description</div>
                <div class="traMemo">Memo</div>
              </div>
              <div class="traTimeLine">
                <el-timeline>
                  <el-timeline-item
                    color="#C51015">
                    <div class="timeLineBox" style="color: #C51015;">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Delivery</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item
                    color="#999">
                    <div class="timeLineBox">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Arrival at Delivery Office</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item
                    color="#999">
                    <div class="timeLineBox">
                      <div style="width: 353px;">2019-10-15 09:12:23</div>
                      <div style="width: 300px;">Arrival at Delivery Office</div>
                      <div>UNITED STATES OF AMERICA US95610</div>
                    </div>
                  </el-timeline-item>
                </el-timeline>
                <div class="moreBtn">View more</div>
              </div>
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
  import {myAccountSet} from "@/api/account.js"
  export default {
    components: {
      "Left-Nav":Left
    },
    data(){
      return{

      }
    },
    created(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>

