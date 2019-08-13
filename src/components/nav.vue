<template>
    <div class="nav">
        <ul class="content_box">
          <li class="navListLi" @click="toGoodsList(item.id)" v-for="(item,index) in nav_arr" :key="index" @mouseenter="getNavList(index)" @mouseleave="invisibleNav">{{item.cate_name}}</li>
        </ul>
        <div class="content_box1" @mouseenter="visibleNav" @mouseleave="invisibleNav" :style="{height:(nav_show == true?navHeight:'0px')}">
          <div class="box-item" ref="boxItem">
              <span class="item" v-for="(nav, index2) in nav_arrList" :key="index2" @click="checkGoodsType(nav.id, nav.parent_id)">{{nav.cate_name}}</span>
          </div>
        </div>
      </div>
</template>
<script>
import { category } from "../api/register";
export default {
    data(){
        return{
            nav_arr: [],//导航栏一级分类
            nav_arrList: [],//导航栏二级分类
            nav_show:false,//下拉菜单显示状态
            navHeight:'100px',
        }
    },
    created() {
      this.getCategory()
    },
    methods:{
        //获取分类列表
        async getCategory(){
            let data = await category()
            if (data.code === '200') {
            this.nav_arr = data.data
            }
        },
        //获取二级分类列表
        getNavList: function(dex) {
            this.nav_arrList = this.nav_arr[dex].sub
            if(this.nav_arrList.length!=0){
            this.nav_show = true;
            }
        },
        //显示二级分类
        visibleNav(){
            this.nav_show = true;
        },
        //隐藏二级分类
        invisibleNav(){
            this.nav_show = false;
        },
        toGoodsList:function (id) {
          this.$router.push({
            path: '/goodsList',
            query: {
              f_cate_id: id
            }
          })
        },
        checkGoodsType: function(id, parentId){
            this.nav_show = false;
            this.$router.push({
                path: '/goodsList',
                query: {
                    s_cate_id: id
                }
            })
        },
    }
}
</script>
<style lang="sass" scoped>
    @import "@/assets/css/header.scss"
</style>


