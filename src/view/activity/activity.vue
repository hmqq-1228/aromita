<template>
  <div class="activityBox">
    <el-dialog
      :show-close="false"
      top="30vh"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="380px">
      <span>Sorry, The promotional discount is end. <br>{{theNum}}s later, will go back to homepage.</span>
      <span slot="footer">
        <el-button type="primary" @click="toHome">Go To Now</el-button>
      </span>
    </el-dialog>
    <!-- activityInfo.activity_status -->
    <div v-for="(sty,index) in styleList" :key="index" v-if="styleList.length>0">
      <div class="activityTime" v-if="sty.type == 2 && sty.timeNameStr" :style="'backgroundColor:' + sty.timeobj.background +';color:'+ sty.timeobj.style.color+';justifyContent:'+ sty.timeobj.style.positionStr">
        <div><span>{{sty.timeNameStr}}：</span></div>
        <div class="numDiv">{{timeObj.aDay}}</div>
        <div class="flag">D</div>
        <div class="numDiv">{{timeObj.aHour}}</div>
        <div class="flag">h</div>
        <div class="numDiv">{{timeObj.aMin}}</div>
        <div class="flag">m</div>
        <div class="numDiv">{{timeObj.aSec}}</div>
        <div class="flag">s</div>
      </div>
      <div  v-if="sty.type == 1">
        <el-carousel :interval="5000" arrow="never" :height="bannerHt + 'px'">
          <el-carousel-item v-for="(item, index2) in sty.imgList" :key="index2">
            <a :href="item.imgLink?item.imgLink:'javascript:void(0);'"><img :class="'bannerImg' + index" :src="item.imgurl" alt=""></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="sty.type == 3" class="activityGoods" :style="'backgroundColor:'+ sty.background_color+';backgroundImage:url('+ sty.background_image+')'">
        <div class="goodsList">
          <div v-for="(act, index) in activityDataList" :key="index">
            <div class="itemInner">
              <div class="imgBox" @click="toDetailPage(act.product_id, act.sku_id)">
                <div class="tagBox" v-if="isStartActv">
                  <div class="cheap" v-if="act.activity_type == 1">
                    <div class="cheapLeft"></div>
                    <div class="cheapRight">${{act.activity_price}}</div>
                  </div>
                  <div class="disPrice" v-if="act.activity_type == 2">%{{parseInt(act.activity_intensity)}} OFF</div>
                </div>
                <img :src="act.sku_color_img" alt="">
              </div>
              <div class="nameBox"  @click="toDetailPage(act.product_id, act.sku_id)">{{act.sku_name}}</div>
              <div class="goodsPrice">
                <div class="pri">${{isStartActv?act.activity_price:act.sku_price}} <span v-if="isStartActv">${{act.sku_price}}</span></div>
                <div class="num"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activityDataList.length<totalNum" @click="addMoreList()" class="loadMore">Load More</div>
      </div> 
    <!-- <div class="bottomList">
      <el-carousel :interval="5000" arrow="never">
        <el-carousel-item v-for="(item, index) in bannerObj.imgList" :key="index">
          <img class="bannerBottom" :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div> -->
    </div>
     <div v-if="!styleList" class="activityGoods">
        <div class="goodsList">
          <div v-for="(act, index) in activityDataList" :key="index">
            <div class="itemInner">
              <div class="imgBox" @click="toDetailPage(act.product_id, act.sku_id)">
                <div class="tagBox" v-if="isStartActv">
                  <div class="cheap" v-if="act.activity_type == 1">
                    <div class="cheapLeft"></div>
                    <div class="cheapRight">${{act.activity_price}}</div>
                  </div>
                  <div class="disPrice" v-if="act.activity_type == 2">%{{parseInt(act.activity_intensity)}} OFF</div>
                </div>
                <img :src="act.sku_color_img" alt="">
              </div>
              <div class="nameBox"  @click="toDetailPage(act.product_id, act.sku_id)">{{act.sku_name}}</div>
              <div class="goodsPrice">
                <div class="pri">${{isStartActv?act.activity_price:act.sku_price}} <span v-if="isStartActv">${{act.sku_price}}</span></div>
                <div class="num"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activityDataList.length<totalNum" @click="addMoreList()" class="loadMore">Load More</div>
      </div>
  </div>
</template>

<script>
import {activityList, beforeList, afterList} from "../../api/home";
export default {
  data () {
    return{
      page: 1,
      theNum: 5,
      timeObj: {},
      totalNum: 0,
      bannerHt: 500,
      activity_id: '',
      isStartActv: false,
      dialogVisible: false,
      activityInfo: {},
      activityDataList: [],
      bannerObj: {},
      styleList: [],
      timeStyleObj: {},
      activeListObj: {}
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
  },
  created () {
    // console.log('kkkkkk', this.$route.query.id)
    this.activity_id = this.$route.query.id
    if (this.activity_id) {
      this.getActivityList()
    }
  },
  methods:{
    toHome () {
      this.$router.push('/')
    },
    threeMin () {
      var interval = setInterval(() => {
        this.theNum--
        // console.log('lllmmm', this.theNum)
        if (this.theNum == 0) {
          this.dialogVisible = false
          this.$router.push('/')
          clearInterval(interval);
        }
      }, 1000)
    },
    getActivityList () {
      var that = this
      activityList({activity_id: that.activity_id}).then((res)=>{
        if (res.code == 200) {
          that.activityInfo = res.data
          if (res.data.activity_style) {
            var list = JSON.parse(res.data.activity_style)
            for(var i=0;i<list.length;i++){
              if (list[i].type == 1){
                that.$set(list[i], 'timeNameStr', '')
                // console.log('mmmmm', list[i])
                // that.bannerObj = list[i]
                // that.bannerHt = document.getElementsByClassName('bannerImg' + i).clientHeight
                // console.log('mmmmm', that.bannerHt)
              } else if (list[i].type == 2){
                // console.log('mmmmm22', list[i])
                for (var k=0;k<list[i].timeobj.time_info_list.length;k++) {
                  if (list[i].timeobj.time_info_list[k].type == that.activityInfo.activity_status) {
                    list[i].timeNameStr = list[i].timeobj.time_info_list[k].timetxt
                  }
                }
                // that.timeStyleObj = list[i].timeobj
                if (list[i].timeobj.style.position == 1) {
                  list[i].timeobj.style.positionStr = 'flex-start'
                } else if (list[i].timeobj.style.position == 2) {
                  list[i].timeobj.style.positionStr = 'center'
                } else if (list[i].timeobj.style.position == 3) {
                  list[i].timeobj.style.positionStr = 'flex-end'
                }
              } else if (list[i].type == 3) {
                // that.activeListObj = list[i]
              }
            }
          }
          console.log('hhhhhh', that.activityInfo)
          that.styleList = list
          if (res.data.activity_status == 1){
            // 未开始
            that.timeDown('1')
            that.getBeforeList()
            that.isStartActv = false
          } else if (res.data.activity_status == 2) {
            // 已开始
            that.timeDown('2')
            that.getAfterList()
            that.isStartActv = true
          } else if (res.data.activity_status == 0) {
            that.dialogVisible = true
            that.threeMin()
            that.timeObj = {
              aDay: '00',
              aHour: '00',
              aMin: '00',
              aSec: '00'
            }
          } else {
            that.timeObj = {
              aDay: '00',
              aHour: '00',
              aMin: '00',
              aSec: '00'
            }
          }
        }
      })
    },
    addMoreList(){
      this.page = this.page + 1
      if (this.activityInfo.activity_status == 1) {
        this.getBeforeList()
      } else if (this.activityInfo.activity_status == 2) {
        this.getAfterList()
      }
    },
    getBeforeList(){
      var that = this
      var obj = {
        id: that.activity_id,
        page: that.page
      }
      beforeList(obj).then(res => {
        if (res.code == 200) {
          console.log('111111', res)
          if(that.page == 1){
            that.activityDataList = res.data.data
          }else{
            that.activityDataList = that.activityDataList.concat(res.data.data);
          }
          that.totalNum = res.data.total
        }
      })
    },
    getAfterList(){
      var that = this
      var obj = {
        id: that.activity_id,
        page: that.page
      }
      afterList(obj).then(res => {
        if (res.code == 200) {
          console.log('222222', res)
          if(that.page == 1){
            that.activityDataList = res.data.data
          }else{
            that.activityDataList = that.activityDataList.concat(res.data.data);
          }
          that.totalNum = res.data.total
        }
      })
    },
    toDetailPage(spu, sku) {
      if (spu && sku) {
        this.$router.push('/goodsDetail/'+ spu + '/'+ sku)
      }
    },
    timeDown(type) {
      let endTime
      // 获取当前时间
      let newTime = new Date(this.activityInfo.server_now_time).getTime();
      // 对结束时间
      if (type == '1') {
        endTime = new Date(this.activityInfo.activity_start_time).getTime();
      } else if (type == '2') {
        endTime = new Date(this.activityInfo.activity_end_time).getTime();
      }
      let time = (endTime - newTime)/1000;
      var interval = setInterval(() => {
        time --;
        if (time > 0) {
          // 获取天、时、分、秒
          let day = Math.floor(time/60/60/24)
          let hour = Math.floor((time / 3600) % 24)
          let min = Math.floor((time / 60) % 60)
          let sec = Math.floor(time % 60)
          day = day < 10 ? '0' + day : day
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          // console.log('1111', day,hour,min,sec)
          this.timeObj = {
            aDay: day,
            aHour: hour,
            aMin: min,
            aSec: sec
          }
        } else { // 活动已结束，全部设置为'00'
          this.timeObj = {
            aDay: '00',
            aHour: '00',
            aMin: '00',
            aSec: '00'
          }
          clearInterval(interval);
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/activity.scss"
</style>
