<template>
    <div class="accountNav">
        <router-link to="/myAccount"><div class="navTitle">My Account</div></router-link>
        <router-link to="/myOrder"><div class="navItem">Orders</div></router-link>
        <router-link to="/myWishlist"><div class="navItem">Wishlist</div></router-link>
        <router-link v-if="false" to="/myCoupon"><div class="navItem">Coupons</div></router-link>
        <router-link to="/myPoints"><div class="navItem">Points</div></router-link>
        <router-link to="/mySubscription"><div class="navItem">Subscriptions</div></router-link>
        <router-link to="/addressBook"><div class="navItem">Address Book</div></router-link>
        <router-link to="/accountSetting"><div class="navItem">Account Setting</div></router-link>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


