<template>
    <div class="my_order">
        <h3 class="my_title">Account Setting</h3>
        <div class="account_set">
            <ul class="set_tab">
                <li :class="{active:activeName=='one'}" @click="change('one')">Profile Setting</li>
                <li :class="{active:activeName=='two'}" @click="change('two')">Password Setting</li>
            </ul>
            <div class="Profile_form">
                <el-form label-position="right" label-width="120px" :model="formLabelAlign" v-if="activeName=='one'">
                    <el-form-item label="Gender：">
                        <el-radio v-model="radio" label="1">Male</el-radio>
                        <el-radio v-model="radio" label="2">Female</el-radio>
                    </el-form-item>
                    <el-form-item label="First Name：">
                        <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <el-form-item label="Last Name：">
                        <el-input v-model="formLabelAlign.type"></el-input>
                    </el-form-item>
                    <el-form-item label="Telephone：">
                        <el-input v-model="formLabelAlign.type"></el-input>
                    </el-form-item>
                </el-form>
                <el-form label-position="right" label-width="180px" :model="formLabelAlign" v-if="activeName=='two'">
                    <el-form-item label="New Password：" required>
                        <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <el-form-item label="Re-enter password：" required>
                        <el-input v-model="formLabelAlign.type"></el-input>
                    </el-form-item>
                </el-form>
                <div class="com-sub-btn">Save</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName:'one',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            radio:'1'
        }
    },
    methods:{
        change(str){
            this.activeName = str
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>

