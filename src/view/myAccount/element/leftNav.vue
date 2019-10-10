<template>
    <div class="accountNav">
        <router-link to="/myAccount"><div class="navTitle">My Account</div></router-link>
        <router-link to="/myOrder"><div class="navItem" :class="activeIndex == 1?'active':''">Orders</div></router-link>
        <router-link to="/myWishlist"><div class="navItem" :class="activeIndex == 2?'active':''">Wishlist</div></router-link>
        <router-link to="/couponCenter"><div class="navItem" :class="activeIndex == 3?'active':''">Coupon center</div></router-link>
        <router-link to="/myCoupon"><div class="navItem" :class="activeIndex == 4?'active':''">My Coupons</div></router-link>
        <router-link to="/myPoints"><div class="navItem" :class="activeIndex == 5?'active':''">Points</div></router-link>
        <router-link to="/mySubscription"><div class="navItem" :class="activeIndex == 6?'active':''">Subscriptions</div></router-link>
        <router-link to="/addressBook"><div class="navItem" :class="activeIndex == 7?'active':''">Address Book</div></router-link>
        <router-link to="/accountSetting"><div class="navItem" :class="activeIndex == 8?'active':''">Account Setting</div></router-link>
    </div>
</template>
<script>
export default {
    props: {
        activeIndex: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.accountNav .active{
    color: rgb(197, 16, 21)!important;
}
@import "@/assets/css/account.scss"
</style>


