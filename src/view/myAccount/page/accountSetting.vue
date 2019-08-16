<template>
    <div class="myAccount">
        <div class="account">
            <div class="accountBox">
                <Left-Nav></Left-Nav>
                <div class="navCount">
                    <div class="my_order">
                        <h3 class="my_title">Account Settings</h3>
                        <div class="account_set">
                            <ul class="set_tab">
                                <li :class="{active:activeName=='one'}" @click="change('one')">My profile</li>
                                <li :class="{active:activeName=='two'}" @click="change('two')">Password</li>
                            </ul>
                            <div class="Profile_form payBox">
                                <div v-show="activeName=='one'">
                                    <el-form label-position="right" label-width="120px" :rules="rules" :model="settingFrom">
                                        <el-form-item label="Gender：">
                                            <el-radio v-model="settingFrom.gender" label="1">Male</el-radio>
                                            <el-radio v-model="settingFrom.gender" label="0">Female</el-radio>
                                        </el-form-item>
                                        <el-form-item label="First Name：" prop="firstname">
                                            <el-input v-model="settingFrom.firstname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Last Name：" prop="lastname">
                                            <el-input v-model="settingFrom.lastname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Birthday:">
                                            <el-date-picker
                                                v-model="settingFrom.dob"
                                                value-format="yyyy-MM-dd"
                                                type="date">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="Telephone：" prop="phone">
                                            <el-input v-model="settingFrom.phone"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="com-sub-btn" @click="setSub()">Save</div>
                                </div>
                                <div v-show="activeName=='two'">
                                    <el-form label-position="right" label-width="220px" :rules="rules2" :model="passwordForm">
                                        <el-form-item label="Current Password：" prop="oldpassword" required>
                                            <el-input type="password" v-model="passwordForm.oldpassword"></el-input>
                                        </el-form-item>
                                        <el-form-item label="New Password：" prop="newpassword" required>
                                            <el-input type="password" v-model="passwordForm.newpassword"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Confirm New Password：" prop="newpassword_confirmation" required>
                                            <el-input type="password" v-model="passwordForm.newpassword_confirmation"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="com-sub-btn" @click="editPassword()">Save</div>
                                    <el-dialog
                                        :visible.sync="editPasswordVisible"
                                        width="380px">
                                        <div class="okbtn">
                                            <span>Save  Successfully</span>
                                            <div class="sub_btn" @click="okEdit()">ok</div>
                                        </div>
                                    </el-dialog>
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
import {myAccountSet,accountPerson,accountPass} from "@/api/account.js"
export default {
    components: {
        "Left-Nav":Left
    },
    data(){
        // <!--二次验证密码-->
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Please enter your password again."));
            } else if (value !== this.passwordForm.newpassword) {
                callback(new Error("Please make sure your password match."));
            } else {
                callback();
            }
        };
        return{
            editPasswordVisible:false,//修改密码保存成功弹框
            activeName:'one',
            settingFrom: {//个人中心设置信息表单
                gender:'1',
                firstname: '',
                lastname: '',
                phone:'',
                dob:''
            },
            passwordForm:{//修改密码表单
                oldpassword:'',
                newpassword:'',
                newpassword_confirmation:''
            },
            //个人中心设置表单验证
            rules: {
                firstname: [
                    { min: 1, max: 30, message: 'You can write a maximum of 30 characters.', trigger: 'blur' }
                ],
                lastname: [
                    { min: 1, max: 30, message: 'You can write a maximum of 30 characters.', trigger: 'blur' }
                ],
                phone:[
                    {min: 0, max: 15,message:'You can write a maximum of 15 characters.',trigger: 'blur'}
                ]
            },
            rules2: {
                oldpassword:[
                    { required: true, message: 'Please provide a password', trigger: 'blur' }
                ],
                newpassword: [
                    { required: true, message: 'Please provide a password', trigger: 'blur' },
                    { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/g, message: 'Please enter 6-14 characters, contain numbers and letters.', trigger: 'blur' }
                ],
                newpassword_confirmation: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this._myAccountSet()
    },
    methods:{
        change(str){
            this.activeName = str
        },
        //获取个人中心详情
        _myAccountSet(){
            myAccountSet().then((res)=>{
                this.settingFrom = res
                res.gender == 0?this.settingFrom.gender='0':this.settingFrom.gender='1'
            })
        },
        //设置个人信息
        setSub(){
            accountPerson(this.settingFrom).then((res)=>{
                if(res.code === '200' || res.code === 200){
                    this.$message({
                        message: 'Successful setup',
                        type: 'success'
                    });
                    this._myAccountSet()
                }
            })
        },
        //修改密码
        editPassword(){
            if(!this.passwordForm.newpassword_confirmation || !this.passwordForm.newpassword || !this.passwordForm.oldpassword){
                this.$message({
                    message: 'Please provide a password',
                    type: 'error'
                });
                return false
            }
            accountPass(this.passwordForm).then((res)=>{
                if(res.code == 200){
                    this.editPasswordVisible = true
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        okEdit(){
            this.editPasswordVisible = false
            this.$router.push({
                path: '/myAccount'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.okbtn{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        margin-bottom: 40px;
    }
    .sub_btn{
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        background: #C51015;
        color: #fff;
    }
}
@import "@/assets/css/account.scss"
</style>

