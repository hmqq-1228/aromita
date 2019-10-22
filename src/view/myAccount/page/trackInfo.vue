<template>
<div class="myAccount">
  <div class="account">
    <div class="accountBox">
      <Left-Nav></Left-Nav>
      <div class="navCount">
        <div class="my_order">
          <h3 class="my_title">Tracking Info</h3>
          <div class="account_set">
            <div class="trackItem" v-for="(track, index) in trackList" :key="index">
              <div class="trackTip">Your parcel of <span>{{orderNum}}</span> has been shipped out via {{track[0].tracking_shipping_name}}, tracking number is {{track[0].tracking_number}}, here is the tracking information.Or you can click here to check detailed tracking information.</div>
              <div class="trackTitle">
                <div class="traTime">Time</div>
                <div class="traDescri">Description</div>
                <div class="traMemo">Memo</div>
              </div>
              <div class="traTimeLine">
                <el-timeline>
                  <el-timeline-item v-for="(tItem, index2) in track" :key="index2" :color="tItem.colorStr" v-if="index2<track.attrLen">
                    <div class="timeLineBox" :class="'colorActive'+ index2">
                      <div style="width: 260px;">{{tItem.tracking_last_update_time}}</div>
                      <div style="width: 380px;margin-right: 20px;">{{tItem.tracking_description}}</div>
                      <div>{{tItem.tracking_details}}</div>
                    </div>
                  </el-timeline-item>
                </el-timeline>
                <div class="moreBtn" v-if="track.attrLen<track.length" @click="showMoreAttrVal(index)">View more</div>
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
  import qs from 'qs'
  import {myAccountSet} from "@/api/account.js"
  export default {
    components: {
      "Left-Nav":Left
    },
    data(){
      return{
        orderNum: this.$route.query.order_num,
        trackList: []
      }
    },
    created(){
      this.orderNum = this.$route.query.order_num
      this.getTrackList(this.orderNum)
    },
    methods:{
      getTrackList: function (num) {
        var that = this
        console.log('pppppppp', num)
        that.$axios.post('api/showOrdertrackimgmore', qs.stringify({order_id: num})).then(res => {
          console.log('kkkkkk', res)
          if (res.code === 200) {
            that.trackList = res.data
            for (var i=0;i<that.trackList.length;i++) {
              that.$set(that.trackList[i],'attrLen',3)
              that.$set(that.trackList[i][0],'colorStr', '#c51015')
              that.$set(that.trackList[i][1],'colorStr', '#666666')
              that.$set(that.trackList[i][2],'colorStr', '#999999')
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

