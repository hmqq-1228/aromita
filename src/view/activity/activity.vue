<template>
  <div class="activityBox">
    <div class="activityTime">
      <div>距离活动开始：</div>
      <div class="numDiv">08</div>
      <div class="flag">D</div>
      <div class="numDiv">10</div>
      <div class="flag">h</div>
      <div class="numDiv">23</div>
      <div class="flag">m</div>
      <div class="numDiv">07</div>
      <div class="flag">s</div>
    </div>
    <div>
      <el-carousel :interval="5000" arrow="never" height="500px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="activityGoods">
      <div class="goodsList">
        <div>
          <div class="itemInner">
            <div class="imgBox">
              <img src="http://arapi.panduo.com.cn/uploads/images/products/main/190814/28d47ddf3e73550056f5df80f008f127.jpg" alt="">
            </div>
            <div class="nameBox">Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace</div>
            <div class="goodsPrice">
              <div class="pri">$8.88 <span>$9.99</span></div>
              <div class="num">188 Sold</div>
            </div>
          </div>
        </div>
         <div>
          <div class="itemInner">
            <div class="imgBox">
              <img src="http://arapi.panduo.com.cn/uploads/images/products/main/190814/28d47ddf3e73550056f5df80f008f127.jpg" alt="">
            </div>
            <div class="nameBox">Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace</div>
            <div class="goodsPrice">
              <div class="pri">$8.88 <span>$9.99</span></div>
              <div class="num">188 Sold</div>
            </div>
          </div>
        </div>
         <div>
          <div class="itemInner">
            <div class="imgBox">
              <img src="http://arapi.panduo.com.cn/uploads/images/products/main/190814/28d47ddf3e73550056f5df80f008f127.jpg" alt="">
            </div>
            <div class="nameBox">Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace</div>
            <div class="goodsPrice">
              <div class="pri">$8.88 <span>$9.99</span></div>
              <div class="num">188 Sold</div>
            </div>
          </div>
        </div>
         <div>
          <div class="itemInner">
            <div class="imgBox">
              <img src="http://arapi.panduo.com.cn/uploads/images/products/main/190814/28d47ddf3e73550056f5df80f008f127.jpg" alt="">
            </div>
            <div class="nameBox">Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace</div>
            <div class="goodsPrice">
              <div class="pri">$8.88 <span>$9.99</span></div>
              <div class="num">188 Sold</div>
            </div>
          </div>
        </div>
         <div>
          <div class="itemInner">
            <div class="imgBox">
              <img src="http://arapi.panduo.com.cn/uploads/images/products/main/190814/28d47ddf3e73550056f5df80f008f127.jpg" alt="">
            </div>
            <div class="nameBox">Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace Classic Name Necklace</div>
            <div class="goodsPrice">
              <div class="pri">$8.88 <span>$9.99</span></div>
              <div class="num">188 Sold</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomList">
      <div>11111</div>
      <div>33333</div>
      <div>44444</div>
      <div>55555</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      imgList: [
        'http://arapi.panduo.com.cn/uploads/images/index/banner/2d6bffefa4846c6da7986752c2f84b40.png',
        'http://arapi.panduo.com.cn/uploads/images/index/banner/2d6bffefa4846c6da7986752c2f84b40.png',
        'http://arapi.panduo.com.cn/uploads/images/index/banner/2d6bffefa4846c6da7986752c2f84b40.png',
        'http://arapi.panduo.com.cn/uploads/images/index/banner/2d6bffefa4846c6da7986752c2f84b40.png'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/activity.scss"
</style>
