<template>
    <div class="my_order">
        <h3 class="my_title">Address Book</h3>
        <div class="my_address">
            <div class="shipping">
                <h4>Shipping Address</h4>
                <div class="shipping_list">
                    <div class="list add_address">
                        <i class="el-icon-plus"></i>
                        <p>Add New Shipping Address</p>
                        <div class="tip_max">（10 address maxed）</div>
                    </div>
                    <div class="list shipping_address" v-for="item in list">
                        <h5>Alexander</h5>
                        <p> 潘朵，<br>
                            滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室，
                            2滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室
                            Country 52301，California</p>
                        <p class="cancat">1234567890</p>
                        <p class="cancat">Rosie_lee@panduo.com.cn</p>
                        <div class="edit_btn" v-if="item.status == 1">
                            <span>Edit</span><i>|</i>
                            <span>Remove</span><i>|</i>
                            <span>Set as Default</span><i>|</i>
                            <span>Set as Billing Address</span>
                        </div>
                        <div class="edit_btn" v-if="item.status == 0">
                            <span>Edit</span><i>|</i>
                            <span>Set as Billing Address</span>
                            <b>Default</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="billing">
                <h4>Billing Address</h4>
                <div class="shipping_list billing_list">
                    <div class="list shipping_address" v-for="item in list">
                        <h5>Alexander</h5>
                        <p> 潘朵，<br>
                            滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室，
                            2滨江区江南大道东冠恒鑫大厦潘朵电子商务有限公司502室
                            Country 52301，California</p>
                        <p class="cancat">1234567890</p>
                        <p class="cancat">Rosie_lee@panduo.com.cn</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {
                    status:0
                },
                {
                    status:1
                },
                {
                    status:1
                },
                {
                    status:1
                },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


