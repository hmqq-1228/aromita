<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav activeIndex="7"></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">Address Book</h3>
                        <div class="my_address">
                            <div class="shipping">
                                <h4>Shipping Address</h4>
                                <div class="shipping_list">
                                    <div class="list add_address">
                                        <i class="el-icon-plus" @click="addNew()"></i>
                                        <p>Add a New Shipping Address</p>
                                        <div class="tip_max">(10 addresses max)</div>
                                    </div>
                                    <div class="list shipping_address" v-for="(item,index) in list" :key="index">
                                        <h5>{{item.entry_firstname}} {{item.entry_lastname}}</h5>
                                        <p>{{item.entry_company}}</p>
                                        <p>
                                            <span class="street_address">{{item.entry_street_address1}}</span>
                                            <span class="street_address">{{item.entry_street_address2}}</span>
                                        </p>
                                        <p>{{item.entry_city}},{{item.entry_state}},{{item.entry_postcode}},{{countryList1[item.entry_country]}}</p>
                                        <p class="cancat">{{item.telephone_number}}</p>
                                        <p class="cancat">{{item.entry_email_address}}</p>
                                        <div class="edit_btn" v-if="item.is_default == 0">
                                            <span @click="editAddress(item,item.id,'edit')">Edit</span><i>|</i>
                                            <span @click="removeAddress(item.id)">Remove</span><i>|</i>
                                            <span @click="setDefault(item.id)">Set as Default</span>
                                            <!-- <i>|</i><span>Set as Billing Address</span> -->
                                        </div>
                                        <div class="edit_btn" v-if="item.is_default == 1">
                                            <span @click="editAddress(item,item.id,'edit')">Edit</span><i>|</i>
                                            <span @click="removeAddress(item.id)">Remove</span>
                                            <!-- <span>Set as Billing Address</span> -->
                                            <b>Default</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="billing">
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
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增地址弹框 -->
        <el-dialog :visible.sync="addressFormVisible" width="800px" :before-close="handleClose">
            <div class="addressBox payBox">
                <el-form :model="addressForm" :rules="rules" ref="addressForm">
                    <el-form-item label="First name:" prop="entry_firstname" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_firstname"></el-input>
                    </el-form-item>
                    <el-form-item label="Last name:" prop="entry_lastname" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_lastname"></el-input>
                    </el-form-item>
                    <el-form-item label="Email Address:" prop="entry_email_address" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_email_address"></el-input>
                    </el-form-item>
                    <el-form-item label="Company Name:" prop="entry_company" :label-width="formLabelWidth">
                        <el-input v-model="addressForm.entry_company"></el-input>
                    </el-form-item>
                    <el-form-item label="Country：" :label-width="formLabelWidth" required>
                        <el-select v-model="addressForm.entry_country" @change="chooseCoutry()">
                            <el-option v-for="item in countryList" :label="item.countryName" :value="item.countryValue" :key="item.countryName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Address Line1:" :label-width="formLabelWidth" prop="entry_street_address1">
                        <el-input v-model="addressForm.entry_street_address1"></el-input>
                    </el-form-item>
                    <el-form-item label="Address Line2:" :label-width="formLabelWidth" prop="entry_street_address2">
                        <el-input v-model="addressForm.entry_street_address2"></el-input>
                    </el-form-item>
                    <el-form-item label="City:" :label-width="formLabelWidth" prop="entry_city">
                        <el-input v-model="addressForm.entry_city"></el-input>
                    </el-form-item>
                    <el-form-item label="State/Province:" :label-width="formLabelWidth" required>
                        <el-select v-model="addressForm.entry_state">
                            <el-option v-for="item in ProvinceList" :label="item" :value="item" :key="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Zip/Postcode:" :label-width="formLabelWidth" prop="entry_postcode">
                        <el-input v-model="addressForm.entry_postcode"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobie No./Phone:" :label-width="formLabelWidth" prop="telephone_number">
                        <el-input v-model="addressForm.telephone_number"></el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth">
                        <el-checkbox v-model="isdefault">Set as default</el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <div class="assressBtn">
                        <div class="com-sub-btn" @click="addSub('addressForm')" v-if="type == ''">Save</div>
                        <div class="com-sub-btn" @click="editSub('addressForm')" v-if="type == 'edit'">Save</div>
                        <div class="com-Cancel-btn" @click="handleClose()">Cancel</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Left from "../element/leftNav"
import {addAddress,address,setdefault} from "@/api/account.js"
import addressList from "../../../assets/js/config"
import qs from 'qs'
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        return{
            list:[],//地址列表
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
                entry_country:'US',
                entry_city:'',
                entry_state:'Alabama',
                entry_postcode:'',
                telephone_number:'',
                entry_company:'',
                is_default:'0'//1为默认 0为非默认
            },
            countryList1:{
                US:"United States",
                CA:"Canada"
            },
            isdefault:false,
            addressId:'',//地址id
            type:'',
            rules: {
                entry_firstname:[
                    {required: true, message: 'Please enter the first name.', trigger: 'blur'},
                    { min: 1, max: 25, message: 'You can write a maximum of 25 characters.', trigger: 'blur' }
                ],
                entry_lastname: [
                    {required: true, message: 'Please enter the last name.', trigger: 'blur'},
                    { min: 1, max: 25, message: 'You can write a maximum of 25 characters.', trigger: 'blur' }
                ],
                entry_company:[
                    { min:0, max:150, message: 'You can write a maximum of 150 characters.', trigger: 'blur' }
                ],
                entry_email_address: [
                    {type: 'email', message: 'Please enter your correct email address.', trigger: ['blur']}
                ],
                entry_street_address1: [
                    {required: true, message: 'Please enter your full address.', trigger: 'blur'},
                    {min: 1, max: 125, message: 'You can write a maximum of 125 characters.', trigger: 'blur'}
                ],
                entry_street_address2: [
                    {min:0, max: 125, message: 'You can write a maximum of 125 characters.', trigger: 'blur'}
                ],
                entry_city: [
                    {required: true, message:"Please enter the consignee's city.", trigger: 'blur'},
                    {min: 1, max: 50, message: 'You can write a maximum of 50 characters.', trigger: 'blur'}
                ],
                entry_postcode: [
                    {required: true, message: 'Please enter the Zip/Postal Code.', trigger: 'blur'}
                ],
                telephone_number: [
                    {min: 0, max: 15,message:'You can write a maximum of 15 characters.',trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        this._address()
        this.ProvinceList = addressList.addressList.List[0].countryList
    },
    methods:{
        handleClose(){
            this._address()
        },
        //地址列表
        _address(){
            address().then((res)=>{
                this.addressFormVisible = false;
                if(res.data!=null){
                    this.list = res.data
                }else{
                    this.list = []
                }
            })
        },
        //新增地址弹框
        addNew(){
            if(this.list.length<10){
                this.clearFrom()
                this.type = ''
                this.addressFormVisible = true;
            }else{
                this.$message({
                    type:'warning',
                    message: 'Sorry, you only can create 10 addresses at most.'
                });
            }
        },
        //选择国家
        chooseCoutry(){
            this.ProvinceList = []
            this.addressForm.entry_state = ''
            //查询对应国家下的州区列表
            let Province = this.countryList.find((n) => n.countryValue == this.addressForm.entry_country).countryList
            this.ProvinceList = Province
        },
        //提交地址
        addSub(formName){
            if(this.isdefault == false){
                this.addressForm.is_default = '0'
            }else{
                this.addressForm.is_default = '1'
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addAddress(this.addressForm).then((res)=>{
                        if(res.code === '200' || res.code === 200){
                            this.$message({
                                message: 'Successful setup',
                                type: 'success'
                            });
                            this.clearFrom()
                            this.addressFormVisible = false;
                            this._address()
                        }else if(res.code == 101){
                            this.$message({
                                message: 'Your shipping address is invalid. Please check it.',
                                type: 'warning'
                            });
                        }else{
                            var arr = []
                            for(var i in res.msg) {
                                var obj = res.msg[i][0];
                                arr.push(obj)
                            }
                            this.$message({
                                message:arr[0],
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    return false
                }

            })
        },
        //删除用户地址
        removeAddress(id){
            this.$confirm('Are you sure you want to delete this address?', '', {
                confirmButtonText: 'Sure',
                cancelButtonText: 'Cancel',
            }).then(() => {
                this.$axios.delete(`api/address/${id}`, {}).then(res => {
                    if(res.code === '200' || res.code === 200){
                        this.$message({
                            type: 'success',
                            message: 'Successful deletion!'
                        });
                    }
                    this._address()
                })
            }).catch(() => {

            });
        },
        //设置为默认地址
        setDefault(id){
            let pre={
                id:id,
                is_default:1
            }
            setdefault(pre).then((res)=>{
                if(res.code == 200){
                    this.$message({
                        type: 'success',
                        message: 'Successful'
                    });
                }else{
                    this.$message({
                        type: 'warning',
                        message:res.msg
                    });
                }
                this._address()
            })
        },
        //编辑地址
        editAddress(item,id,str){
            this.addressForm = JSON.parse(JSON.stringify(item))
            this.addressForm.entry_state = item.entry_state
            this.addressFormVisible = true;
            item.is_default =='1'? this.isdefault=true : this.isdefault=false
            this.addressId = id
            this.type = str
        },
        //编辑地址提交
        editSub(formName){
            if(this.isdefault == false){
                this.addressForm.is_default = '0'
            }else{
                this.addressForm.is_default = '1'
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let pre = qs.stringify(this.addressForm)
                    this.$axios.post(`api/address/${this.addressId}`,pre).then(res => {
                        if(res.code === '200' || res.code === 200){
                            this.$message({
                                type: 'success',
                                message: 'Successful address modification!'
                            });
                            this.addressFormVisible = false;
                            this.clearFrom()
                            this._address()
                        }else if(res.code == 101){
                            this.$message({
                                type: 'warning',
                                message: 'Your shipping address is invalid. Please check it.'
                            });
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        clearFrom(){
            this.addressForm.entry_firstname = ''
            this.addressForm.entry_lastname = ''
            this.addressForm.entry_street_address1= ''
            this.addressForm.entry_street_address2= ''
            this.addressForm.entry_email_address= ''
            this.addressForm.entry_country= 'US'
            this.addressForm.entry_city= ''
            this.addressForm.entry_state= 'Alabama'
            this.addressForm.entry_postcode= ''
            this.addressForm.telephone_number= ''
            this.addressForm.entry_company= ''
            this.addressForm.is_default= '0'
        }

    }
}
</script>
<style>
.fristInput{
    width: 340px;
    float: left;
}
</style>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>


