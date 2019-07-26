<template>
    <div class="myAccount">
        <div class="header">
            <header-com></header-com>
        </div>
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
                                <span>50</span>
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
        <div class="foot">
            <footer-com></footer-com>
        </div>
    </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Left from "../element/leftNav"
export default {
    components: {
        "header-com": Header,
        "footer-com": Footer,
        "Left-Nav":Left
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/account.scss"
</style>
