<template>
<div class="myAccount">
  <div class="account">
    <div class="accountBox">
      <Left-Nav></Left-Nav>
      <div class="navCount">
        <div class="my_order">
          <h3 class="my_title">Tracking Info</h3>
          <div class="account_set">
            <div class="trackItem" v-if="trackList.length>0" v-for="(track, index) in trackList" :key="index">
              <div class="trackTip">Your parcel of <span>{{track[0].orders_number}}</span> has been shipped out via <span >{{track[0].shipping_method}}</span>, tracking number is {{track[0].tracking_number}}, here is the tracking information.Or you can click here to check detailed tracking information.</div>
              <div class="trackTitle">
                <div class="traTime">Time</div>
                <div class="traDescri">Description</div>
                <div class="traMemo">Memo</div>
              </div>
              <div class="traTimeLine">
                <el-timeline>
                  <el-timeline-item v-for="(tItem, index2) in track" :key="index2" :color="index2 === 0?'#C51015':'#999'" v-if="index2<track.attrLen">
                    <div class="timeLineBox" :class="index2 === 0?'colorActive':''">
                      <div style="width: 260px;">{{tItem.tracking_last_update_time}}</div>
                      <div class="trackDes">{{tItem.tracking_description}}</div>
                      <div class="trackDel" :title="tItem.tracking_details">{{tItem.tracking_details}}</div>
                    </div>
                  </el-timeline-item>
                </el-timeline>
                <div class="moreBtn" v-if="track.attrLen<track.length" @click="showMoreAttrVal(index)">View more</div>
              </div>
            </div>
            <div class="trackNoData" v-if="trackList.length === 0">Shipment label created. Please waiting for update.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import Left from "../element/leftNav"
  import qs from 'qs'
  import {myAccountSet} from "@/api/account.js"
  export default {
    components: {
      "Left-Nav":Left
    },
    data(){
      return{
        orderNum: this.$route.query.order_num,
        trackList: [],
        trackName: []
      }
    },
    created(){
      this.orderNum = this.$route.query.order_num
      this.getTrackList(this.orderNum)
    },
    methods:{
      getTrackList: function (num) {
        var that = this
        that.$axios.post('api/showOrdertrackimgmore', qs.stringify({order_id: num})).then(res => {
          if (res.code === 200) {
            that.trackList = res.data.tracking
            for (var i=0;i<that.trackList.length;i++) {
              that.$set(that.trackList[i],'attrLen',3)
            }
          }
        })
      },
      showMoreAttrVal: function (idx) {
        var len = this.trackList[idx].length
        this.trackList[idx].attrLen = len
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/account.scss"
</style>

