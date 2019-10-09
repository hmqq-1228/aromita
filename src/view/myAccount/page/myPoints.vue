<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">My Points <span class="points_rule">What's Points? How to get more Points?</span></h3>
                        <div class="points">
                            <div class="available">
                                <img src="@/assets/images/Points.png" alt="">
                                <h4>Available Points:</h4>
                                <span>{{userDetail.score}}</span>
                            </div>
                            <!--<div class="Points_list">-->
                                <!--&lt;!&ndash;<div class="list">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<p>50</p>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<h5>Wishlist</h5>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="list">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<p>60</p>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<h5>Coupon</h5>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="list">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<p>10</p>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<h5>Points</h5>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--</div>-->
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
              // console.log('pppp', res)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>
