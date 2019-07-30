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
                        <h3 class="my_title">Address Book</h3>
                        <div class="my_address">
                            <div class="shipping">
                                <h4>Shipping Address</h4>
                                <div class="shipping_list">
                                    <div class="list add_address">
                                        <i class="el-icon-plus" @click="addNew()"></i>
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
                </div>
            </div>
        </div>
        <!-- 新增地址弹框 -->
        <el-dialog :visible.sync="addressFormVisible">
            <div class="addressBox"> 
                <el-form :model="addressForm">
                    <el-form :inline="true">
                        <el-form-item label="First name:" :label-width="formLabelWidth">
                            <el-input v-model="addressForm.entry_firstname"></el-input>
                        </el-form-item>
                        <el-form-item label="last name:" :label-width="formLabelWidth">
                            <el-input v-model="addressForm.entry_lastname"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="Email Address:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_email_address"></el-input>
                    </el-form-item>
                    <el-form-item label="Country：" :label-width="formLabelWidth">
                        <el-select v-model="addressForm.entry_country" @change="chooseCoutry()">
                            <el-option v-for="item in countryList" :label="item.countryName" :value="item.countryName" :key="item.countryName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Address Line1:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_street_address1"></el-input>
                    </el-form-item>
                    <el-form-item label="Address Line2:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_street_address2"></el-input>
                    </el-form-item>
                    <el-form-item label="City:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_city"></el-input>
                    </el-form-item>
                    <el-form-item label="State/Province:" :label-width="formLabelWidth">
                        <el-select v-model="addressForm.entry_state">
                            <el-option v-for="item in ProvinceList" :label="item" :value="item" :key="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Zip/Postcode:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_postcode"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobie No./Phone:" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.telephone_number"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addressFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addressFormVisible = false">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <div class="foot">
            <footer-com></footer-com>
        </div>
    </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Left from "../element/leftNav"
import {addAddress} from "@/api/account.js"
import addressList from "static/config.js"
export default {
    components: {
        "header-com": Header,
        "footer-com": Footer,
        "Left-Nav":Left
    },
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
            ],
            addressFormVisible:false,
            formLabelWidth:'140px',
            countryList:addressList.addressList.List,
            ProvinceList:[],
            addressForm:{
                entry_firstname:'',
                entry_lastname:'',
                entry_street_address1:'',
                entry_street_address2:'',
                entry_email_address:'',
                entry_country:'',
                entry_city:'',
                entry_state:'',
                entry_postcode:'',
                telephone_number:'',
                is_default:''
            }
        }
    },
    created(){

    },
    methods:{
        //新增地址弹框
        addNew(){
            this.addressFormVisible = true;
            console.log(this.countryList)
        },
        //选择国家
        chooseCoutry(){
            this.ProvinceList = []
            this.addressForm.entry_state = ''
            //查询对应国家下的州区列表
            let Province = this.countryList.find((n) => n.countryName == this.addressForm.entry_country).countryList
            this.ProvinceList = Province
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


