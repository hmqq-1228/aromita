<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Coupon <span class="points_rule">What's Points? How to get more Points?</span></h3>
                        <div class="points">
                            <div class="available">
                                <h4>Available Points</h4>
                                <img src="@/assets/images/Points.png" alt="">
                                <span>{{userDetail.score}}</span>
                            </div>
                            <div class="Points_list">
                                <div class="list">
                                    <p>50</p>
                                    <h5>Wishlist</h5>
                                </div>
                                <div class="list">
                                    <p>60</p>
                                    <h5>Coupon</h5>
                                </div>
                                <div class="list">
                                    <p>10</p>
                                    <h5>Points</h5>
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
import {myAccount} from "@/api/account.js";
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            userDetail:{}
        }
    },
    created(){
        this._myAccount()
    },
    methods:{
        _myAccount(){
            myAccount().then((res)=>{
                this.userDetail = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>
