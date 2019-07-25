<template>
    <div class="my_order Scription">
        <h3 class="my_title">My Subscription</h3>
        <p class="Scription_tip">By Subscribing our Service,you can get first-hand information of New Arrivals, Special offers,order service and Hot Sale!</p>
        <el-input></el-input>
        <div class="Scription_check">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">订阅所有服务</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="subScription_btn">
            <div class="sub">Submit</div>
            <div class="Cancel">Cancel</div>
        </div>
    </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {   
    data(){
        return{
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true
        }
    },
    methods:{
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


