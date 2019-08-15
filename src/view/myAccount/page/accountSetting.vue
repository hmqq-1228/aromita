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
                            <div class="Profile_form">
                                <div v-if="activeName=='one'">
                                    <el-form label-position="right" label-width="120px" :model="settingFrom">
                                        <el-form-item label="Gender：">
                                            <el-radio v-model="settingFrom.gender" label="1">Male</el-radio>
                                            <el-radio v-model="settingFrom.gender" label="0">Female</el-radio>
                                        </el-form-item>
                                        <el-form-item label="First Name：">
                                            <el-input v-model="settingFrom.firstname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Last Name：">
                                            <el-input v-model="settingFrom.lastname"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Birthday:">
                                            <el-date-picker
                                                v-model="settingFrom.dob"
                                                value-format="yyyy-MM-dd"
                                                type="date">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="Telephone：">
                                            <el-input v-model="settingFrom.phone"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="com-sub-btn" @click="setSub()">Save</div>
                                </div>
                                <div v-if="activeName=='two'">
                                    <el-form label-position="right" label-width="220px" :rules="rules2" :model="passwordForm">
                                        <el-form-item label="Current Password：" prop="pass" required>
                                            <el-input type="password" v-model="passwordForm.oldpassword"></el-input>
                                        </el-form-item>
                                        <el-form-item label="New Password：" prop="pass" required>
                                            <el-input type="password" v-model="passwordForm.newpassword"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Confirm New Password：" prop="checkPass" required>
                                            <el-input type="password" v-model="passwordForm.newpassword_confirmation"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="com-sub-btn" @click="editPassword()">Save</div>
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordForm.newpassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            activeName:'one',
            settingFrom: {
                gender:'1',
                firstname: '',
                lastname: '',
                phone:'',
                dob:''
            },
            passwordForm:{
                oldpassword:'',
                newpassword:'',
                newpassword_confirmation:''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
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
                    // this.settingFrom = {}
                    // this.settingFrom.gender = '1'
                }
            })
        },
        editPassword(){
            if(this.passwordForm.newpassword_confirmation !== this.passwordForm.newpassword){
                this.$message({
                    message: '密码不一致',
                    type: 'error'
                });
                return false
            }
            if(!this.passwordForm.newpassword_confirmation || !this.passwordForm.newpassword || !this.passwordForm.oldpassword){
                this.$message({
                    message: '请将修改密码填写完整',
                    type: 'error'
                });
                return false
            }
            accountPass(this.passwordForm).then((res)=>{
                if(res.code === '200' || res.code === 200){
                    this.$message({
                        message: 'Successful setup',
                        type: 'success'
                    });
                    this.passwordForm = {}
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/account.scss"
</style>

