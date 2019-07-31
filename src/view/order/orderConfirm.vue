<template>
<div class="orderConfirm">
  <!--<div class="model2" v-if="modelShow2"></div>-->
  <div class="model" v-if="modelShow">
    <div class="modelCont">
      <div class="modelClose" @click="closeModel"><i class="el-icon-close"></i></div>
      <div class="modelTitle">Credit/Debit Card Payment</div>
      <div class="modelItem">
        <div class="modelName">Card Number:</div>
        <div class="modelText">5234 0012 5421 8545</div>
      </div>
      <div class="modelItem">
        <div class="modelName">Expiry date:</div>
        <div class="modelText">19/07</div>
      </div>
      <div class="modelItem">
        <div class="modelName">Security Code:</div>
        <div class="modelText">8888</div>
      </div>
      <div class="payBtn">Pay</div>
    </div>
  </div>
  <div class="model" v-if="infoShow">
    <div class="modelCont alert">
      <div class="modelClose" @click="closeInfoModel"><i class="el-icon-close"></i></div>
      <div class="modelTitle tip">Please select/add a shipping address.</div>
      <div class="payBtn info" @click="closeInfoModel">OK</div>
    </div>
  </div>
  <div class="header">
    <header-com></header-com>
  </div>
  <div class="orderBox">
    <div class="orderCont">
      <div class="orderInfo">
        <div class="orderState">
          <div class="stateItem active">
            <div class="stateText">Place Order</div>
            <div class="jianTou"></div>
          </div>
          <div class="stateItem">
            <div class="jianTouLt"></div>
            <div class="stateText">Payment</div>
            <div class="jianTou"></div>
          </div>
          <div class="stateItem">
            <div class="jianTouLt"></div>
            <div class="stateText end">Succeed</div>
          </div>
        </div>
        <div class="navTitle" @click="test()">Shipping Address</div>
        <div class="address">
          <div v-if="addressList && addressList.length>0" class="addressItem" v-for="(address, index) in addressList" v-bind:key="index">
            <div class="itemName"><el-radio v-model="radio" :label="address.id"><i class="el-icon-s-custom" style="color: #ccc;"></i> {{address.entry_firstname}} {{address.entry_lastname}}</el-radio></div>
            <div class="itemAddress">
              <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
              <div class="addressText">{{address.entry_country}} {{address.entry_state}} {{address.entry_city}} {{address.entry_street_address1}}{{address.entry_street_address2}}</div>
            </div>
            <div class="itemPone"><i class="el-icon-phone" style="width: 14px;height: 14px;"></i> <span>{{address.telephone_number}}</span></div>
            <div class="itemDefault"><span v-if="address.is_default === 1">Default</span></div>
            <div class="itemOption">
              <div @click="addNewAddress(address.id)">Edit</div>
              <div @click="deleteAddress(address.id)">Remove</div>
            </div>
          </div>
          <div v-if="addressNum && addressNum>1" class="showMore" @click="showMore(defultIcon)"><i :class="defultIcon"></i></div>
          <div class="addNew" @click="addNewAddress()"><i class="el-icon-plus" style="color: #ccc;font-size: 18px;"></i> Add a new address</div>
          <div class="payBox" v-if="addressFormShow">
            <el-form :model="addNewForm" :rules="rules" ref="addNewForm" label-width="125px" class="demo-ruleForm" style="margin-top: 20px;">
              <div class="dataType">
                <el-form-item label="First name:" prop="First" class="shipInput">
                  <el-input v-model="addNewForm.First"></el-input>
                </el-form-item>
                <el-form-item label="Last name:" prop="Last" class="shipInput">
                  <el-input v-model="addNewForm.Last"></el-input>
                </el-form-item>
              </div>
              <el-form-item label=" Email Address:" prop="email">
                <el-input v-model="addNewForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Country:" prop="Country">
                <el-select v-model="addNewForm.Country" placeholder="United Stats" @change="chooseCoutry()">
                  <el-option v-for="item in countryList" :label="item.countryName" :value="item.countryName" :key="item.countryName"></el-option>
                  <el-option label="France" value="France" disabled></el-option>
                  <el-option label="Germany" value="Germany" disabled></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Address Line1:" prop="Address1">
                <el-input v-model="addNewForm.Address1"></el-input>
              </el-form-item>
              <el-form-item label="Address Line2:" prop="Address2">
                <el-input v-model="addNewForm.Address2"></el-input>
              </el-form-item>
              <el-form-item label="City:" prop="City">
                <el-input v-model="addNewForm.City"></el-input>
              </el-form-item>
              <el-form-item label="State/Province:" prop="Province">
                <!--<el-input v-model="addNewForm.Province"></el-input>-->
                <el-select v-model="addNewForm.Province" placeholder="Province">
                  <el-option v-for="item in ProvinceList" :label="item" :value="item" :key="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Zip/Postcode:" prop="Postcode">
                <el-input v-model="addNewForm.Postcode"></el-input>
              </el-form-item>
              <el-form-item label="Mobie No./Phone:" prop="Phone">
                <el-input v-model="addNewForm.Phone"></el-input>
              </el-form-item>
              <div class="payConfirm" style="margin-left: 125px;">
                <el-checkbox v-model="addNewForm.checked"></el-checkbox>
                <span style="font-size: 14px;color: #333;">As Default</span>
              </div>
              <el-form-item class="addNewForm" style="margin-top: 10px">
                <el-button class="save" @click="submitForm('addNewForm')">Save</el-button>
                <el-button class="cancel" @click="resetForm('addNewForm')">Cancel</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="navTitle" v-if="methodShow">Shipping Method</div>
        <div class="shopBox" v-if="methodShow">
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="1-3.67" @change="shipChecked($event)"> Rosie Eva</el-radio></div>
            <div>5-7 workdays</div>
            <div>$ 3.67</div>
          </div>
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="2-5.67" @change="shipChecked($event)"> Rosie Eva</el-radio></div>
            <div>5-7 workdays</div>
            <div>$ 5.67</div>
          </div>
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="3-6.67" @change="shipChecked($event)"> Rosie Eva</el-radio></div>
            <div>5-7 workdays</div>
            <div>$ 6.67</div>
          </div>
        </div>
        <div class="navTitle">Checkout Review</div>
        <div class="checkoutBox">
          <div class="checkTitle">
            <div style="width: 480px;">Product</div>
            <div style="width: 200px">Quantity</div>
            <div style="width: 200px">Total</div>
          </div>
          <div class="goodsList">
            <div class="goodsItem" v-for="(goods, index) in goodsList" v-bind:key="index">
              <div class="goodName">
                <div class="goodImg"><img :src="goods.sku_image" alt=""></div>
                <div class="goodsText">
                  <div class="nameInfo">{{goods.sku_name}}</div>
                  <div><span style="color: #999;" v-for="(item, index2) in JSON.parse(goods.sku_attrs)">{{item.attr_name}}: <span style="color: #333;">{{item.value.attr_value}}; </span></span></div>
                  <div class="price">$ {{goods.sku_price}} <span>$ 3.33</span></div>
                </div>
              </div>
              <div style="width: 200px;line-height: 108px;font-size: 14px">{{goods.goods_count}}</div>
              <div class="totalPay">$ {{goods.sku_pay.toFixed(2)}}</div>
            </div>
          </div>
        </div>
        <div class="navTitle">Payment Method</div>
        <div class="payBox">
          <div class="imgRadio"><el-radio v-model="radio3" label="1"><img style="float: right;" src="../../../static/img/pay.png" alt=""></el-radio></div>
          <div class="moreCard">
            <el-radio v-model="radio3" label="2">Credit/Deibt Card</el-radio>
            <img style="float: right;" src="../../../static/img/pay-02.png" alt="">
          </div>
          <div v-if="showCreditForm">
            <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-form-item label="Card Number:" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item>
              <div class="dataType">
                <el-form-item label="Expiration Date:" prop="month" class="smallInput">
                  <el-select v-model="ruleForm.month" placeholder="MM">
                    <el-option label="01" value="01"></el-option>
                    <el-option label="02" value="02"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="year" class="smallInput noLabel">
                  <el-select v-model="ruleForm.year" placeholder="YY">
                    <el-option label="2019" value="2019"></el-option>
                    <el-option label="2020" value="2020"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="Secure Code:" prop="secure">
                <el-input v-model="ruleForm.secure"></el-input>
              </el-form-item>
            </el-form>
            <div><el-checkbox v-model="checked">Billing is the same as shipping address</el-checkbox></div>
            <el-form v-if="!checked" :model="shipForm" :rules="rules3" ref="shipForm" label-width="125px" class="demo-ruleForm" style="margin-top: 20px;">
              <div class="dataType">
                <el-form-item label="First name:" prop="First" class="shipInput">
                  <el-input v-model="shipForm.First"></el-input>
                </el-form-item>
                <el-form-item label="Last name:" prop="Last" class="shipInput">
                  <el-input v-model="shipForm.Last"></el-input>
                </el-form-item>
              </div>
              <el-form-item label=" Email Address:" prop="email">
                <el-input v-model="shipForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Country:" prop="Country">
                <el-select v-model="shipForm.Country" placeholder="United Stats">
                  <el-option label="shanghai" value="shanghai"></el-option>
                  <el-option label="beijing" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Address Line1:" prop="Address1">
                <el-input v-model="shipForm.Address1"></el-input>
              </el-form-item>
              <el-form-item label="Address Line2:" prop="Address2">
                <el-input v-model="shipForm.Address2"></el-input>
              </el-form-item>
              <el-form-item label="City:" prop="City">
                <el-input v-model="shipForm.City"></el-input>
              </el-form-item>
              <el-form-item label="State/Province:" prop="Province">
                <el-select v-model="shipForm.Province" placeholder="Province">
                  <el-option label="shanghai" value="shanghai"></el-option>
                  <el-option label="beijing" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Zip/Postcode:" prop="Postcode">
                <el-input v-model="shipForm.Postcode"></el-input>
              </el-form-item>
              <el-form-item label="Mobie No./Phone:" prop="Phone">
                <el-input v-model="shipForm.Phone"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="payDiv">
        <div class="payItem">
          <div class="payName" @click="testAlert()">Subtotal:</div>
          <div class="payValue">$ 66.66</div>
        </div>
        <div class="payItem">
          <div class="payName">Coupon:</div>
          <div class="payValue">$ 30.66</div>
        </div>
        <div class="payItem">
          <div class="payName">Points:</div>
          <div class="payValue">$ 30.66</div>
        </div>
        <div class="payItem">
          <div class="payName">Tax:</div>
          <div class="payValue">$ 30.66</div>
        </div>
        <div class="payItem">
          <div class="payName">Shipping:</div>
          <div class="payValue">$ {{shipFee}}</div>
        </div>
        <div class="payItem">
          <div class="payName total">Grand Total:</div>
          <div class="payValue total">$ {{parseFloat(totalPay.toFixed(2)) + parseFloat(shipFee)}}</div>
        </div>
        <div style="margin-top: 15px;"><el-button @click="paySub('ruleForm', 'shipForm')">Confirm to pay</el-button></div>
        <div class="payConfirm"><el-checkbox v-model="checkedSub"></el-checkbox> <span>I have read and agreed to the website terms and conditions</span></div>
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
import {orderAdd, orderAddress, billingList, deleteAddress} from "../../api/register";
import qs from 'qs'
import addressList from "static/config.js"
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "orderConfirm",
  data () {
    return {
      editId: '',
      radio: '',
      radio2: '',
      radio3: '1',
      shipFee: 0,
      totalPay: 0,
      addressNum: 0,
      goodsList: [],
      addressList: [],
      ProvinceList: [],
      countryList: addressList.addressList.List,
      infoShow: false,
      modelShow: false,
      modelShow2: false,
      methodShow: false,
      dialogVisible: true,
      showCreditForm: false,
      addressFormShow: false,
      defultIcon: 'el-icon-d-arrow-right',
      ruleForm: {
        number: '',
        month: '',
        year: '',
        secure: ''
      },
      shipForm: {
        First: '',
        Last: '',
        email: '',
        Country: '',
        Address1: '',
        Address2: '',
        City: '',
        Province: '',
        Postcode: '',
        Phone: ''
      },
      addNewForm: {
        First: '',
        Last: '',
        email: '',
        Country: 'United States',
        Address1: '',
        Address2: '',
        City: '',
        Province: 'Alaska',
        Postcode: '',
        Phone: '',
        checked: true
      },
      checked: true,
      checkedSub: false,
      rules: {
        Last: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        Country: [
          {required: true, message: '请输入国家名称', trigger: 'blur'}
        ],
        Address1: [
          {required: true, message: '请输入第一地址', trigger: 'blur'}
        ],
        City: [
          {required: true, message: '请输入城市名称', trigger: 'blur'}
        ],
        Province: [
          {required: true, message: '请输入省份名称', trigger: 'blur'}
        ],
        Postcode: [
          {required: true, message: '请输入邮编', trigger: 'blur'}
        ]
      },
      rules2: {
        number: [
          {required: true, message: '请输入卡号', trigger: 'blur'}
        ],
        month: [
          {required: true, message: '请输入有效月份', trigger: 'blur'}
        ],
        year: [
          {required: true, message: '请输入有效年份', trigger: 'blur'}
        ],
        secure: [
          {required: true, message: '请输入安全码', trigger: 'blur'}
        ]
      },
      rules3: {
        Last: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        Country: [
          {required: true, message: '请输入国家名称', trigger: 'blur'}
        ],
        Address1: [
          {required: true, message: '请输入第一地址', trigger: 'blur'}
        ],
        City: [
          {required: true, message: '请输入城市名称', trigger: 'blur'}
        ],
        Province: [
          {required: true, message: '请输入省份名称', trigger: 'blur'}
        ],
        Postcode: [
          {required: true, message: '请输入邮编', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    radio: function (val, oV) {
      var that = this
      if (val) {
        console.log('gggg', val)
        that.showMethod()
        that.methodShow = true
      } else {
        that.methodShow = false
      }
    },
    addressFormShow: function (val, ov) {
      if(val === false) {
        this.clearForm()
      }
    },
    radio3: function (val, Ov) {
      var that = this
      console.log('vvvvvv', val)
      if (val === '2') {
        that.showCreditForm = true
      } else if (val === '1') {
        that.showCreditForm = false
      }
    },
    // modelShow: function(val, ov){
    //   if (val) {
    //     document.documentElement.style.overflowY = 'hidden';
    //   } else {
    //     document.documentElement.style.overflowY = 'scroll';
    //   }
    // }
  },
  created(){
    this.ProvinceList = addressList.addressList.List[0].countryList
    this.getGoodsOrder()
    this.getOrderAddress('defult', '')
  },
  methods: {
    testAlert: function () {
      // this.modelShow2 = true
      var u = 'https://www.baidu.com/';
      var iWidth=500; //弹出窗口的宽度;
      var iHeight=600; //弹出窗口的高度;
      var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
      var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
      window.open(u, "newwindow", "height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft+", status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no");
    },
    //选择国家
    chooseCoutry(){
      this.ProvinceList = []
      //查询对应国家下的州区列表
      let Province = this.countryList.find((n) => n.countryName === this.addNewForm.Country).countryList
      this.ProvinceList = Province
      this.addNewForm.Province = this.ProvinceList[0]
    },
    test: function () {
      this.modelShow = true
    },
    closeInfoModel: function(){
      this.infoShow = false
    },
    closeModel: function(){
      this.modelShow = false
    },
    showMore: function (type) {
      var that = this
      if (type === 'el-icon-d-arrow-right') {
        that.defultIcon = 'el-icon-d-arrow-left'
        that.getOrderAddress('more', that.radio)
      } else if (type === 'el-icon-d-arrow-left') {
        that.defultIcon = 'el-icon-d-arrow-right'
        that.getOrderAddress('less', that.radio)
      }
    },
    clearForm: function () {
      this.addNewForm.First = ''
      this.addNewForm.Last = ''
      this.addNewForm.email = ''
      this.addNewForm.Country = 'United States'
      this.addNewForm.Address1 = ''
      this.addNewForm.Address2 = ''
      this.addNewForm.City = ''
      this.addNewForm.Province = 'Alaska'
      this.addNewForm.Postcode = ''
      this.addNewForm.Phone = ''
    },
    async getOrderAddress (type, id) {
      var that = this
      let data = await orderAddress()
      if (data.code === '200') {
        that.addressNum = data.data.length
        if (!type && !id) {
          that.addressList = data.data
          for (var i=0; i<data.data.length; i++) {
            if (data.data[i].is_default === 1) {
              // let defultList = []
              that.radio = data.data[i].id
              that.showMethod()
              // defultList.push(data.data[i])
              // that.addressList = defultList
            }
            // else {
            //   let noList = []
            //   noList.push(data.data[0])
            //   that.addressList = noList
            // }
          }
        }else if (type === 'defult' && !id){
          for (var i=0; i<data.data.length; i++) {
            if (data.data[i].is_default === 1) {
              let defultList = []
              that.radio = data.data[i].id
              that.showMethod()
              defultList.push(data.data[i])
              that.addressList = defultList
            } else {
              let noList = []
              noList.push(data.data[0])
              that.addressList = noList
            }
          }
        }else if (type === 'more'){
          if (!id) {
            that.addressList = data.data
          } else if (id) {
            console.log('moire', that.addressList)
            let checkList = []
            for (var j=0; j<data.data.length; j++) {
              if (data.data[j].id === id) {
                checkList.unshift(data.data[j])
              } else {
                checkList.push(data.data[j])
              }
            }
            that.addressList = checkList
          }
        } else if (type === 'less') {
          if (!id) {
            var list = []
            list.push(data.data[0])
            that.addressList = list
          } else if (id) {
            console.log('ppppppp')
            for (var j=0; j<data.data.length; j++) {
              if (data.data[j].id === id) {
                let checkList = []
                checkList.push(data.data[j])
                that.addressList = checkList
              }
            }
          }
        }
        console.log('555555', that.addressList)
      }
    },
    // 删除
   deleteAddress: function (id) {
     var that = this
     that.$axios.delete(this.$store.state.localUrl + 'api/address/' + id, {}).then(res => {
       console.log('ididididid', res)
       if (res.code === '200') {
         that.getOrderAddress()
       }
     })
   },
    // add
    addNewAddress: function (id) {
      var that = this
      if (id) {
        that.editId = id
        that.addressFormShow = true
        that.$axios.get(this.$store.state.localUrl + 'api/address/' + id, {}).then(res => {
          if (res.code === '200') {
            console.log('yyyyyyyyy', res)
            that.addNewForm.First = res.data.entry_firstname
            that.addNewForm.Last = res.data.entry_lastname
            that.addNewForm.email = res.data.entry_email_address
            that.addNewForm.Country = res.data.entry_country
            that.addNewForm.Address1 = res.data.entry_street_address1
            that.addNewForm.Address2 = res.data.entry_street_address2
            that.addNewForm.City = res.data.entry_city
            that.addNewForm.Province = res.data.entry_state
            that.addNewForm.Postcode = res.data.entry_postcode
            that.addNewForm.Phone = res.data.telephone_number
            if (res.data.is_default === 1) {
              that.addNewForm.checked = true
            } else {
              that.addNewForm.checked = false
            }
          }
        })
      } else if (!id) {
        that.addressFormShow = true
      }
    },
    showMethod: function () {
      var that = this
      if (that.radio === ''){
        that.methodShow = false
      } else {
        that.methodShow = true
        that.radio2 = '1-3.67'
        that.shipFee = that.radio2.split('-')[1]
        console.log('111111111', that.shipFee)
      }
    },
    shipChecked: function (e) {
      console.log('eeeeeeee', e)
      this.radio2 = e
      this.shipFee = this.radio2.split('-')[1]
    },
    // 获取订单
    async getGoodsOrder(){
      var that = this
      var payItem = []
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      var idStr = JSON.stringify(ids)
      let idList = {
        ids: idStr
      }
      console.log('7777777', idList)
      if (ids && ids.length > 0){
        let data = await orderAdd(idList)
        for (var i=0;i<data.length;i++){
          data[i].sku_pay = data[i].goods_count * data[i].sku_price
        }
        that.goodsList = data
        that.getBillingList()
        // for (var v=0; v<that.goodsList.length; v++){
        //   payItem.push(that.goodsList[v].sku_pay)
        // }
        // console.log('vvvvvv', payItem)
        // var sumPay = 0
        // for (var n=0;n<payItem.length;n++){
        //   sumPay += payItem[n]
        // }
        // that.totalPay = sumPay
        // console.log('sssssss', that.totalPay.toFixed(2))
      } else {
        console.log('订单失效')
      }
    },
    async getBillingList () {
      var that = this
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      var idStr = JSON.stringify(ids)
      var coupon_id = sessionStorage.getItem('couponId')
      let idList = {
        ids: idStr,
        coupon_id: coupon_id
      }
      let data = await billingList(idList)
      console.log('hhhhhhhh', data)
    },
    // 修改
    submitForm(formName) {
      var that = this
      console.log('fffff', that.addNewForm.checked)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var editObj = qs.stringify({
            entry_firstname: that.addNewForm.First,
            entry_lastname: that.addNewForm.Last,
            entry_email_address: that.addNewForm.email,
            entry_country: that.addNewForm.Country,
            entry_street_address1: that.addNewForm.Address1,
            entry_street_address2: that.addNewForm.Address2,
            entry_city: that.addNewForm.City,
            entry_state: that.addNewForm.Province,
            entry_postcode: that.addNewForm.Postcode,
            telephone_number: that.addNewForm.Phone,
            is_default: that.addNewForm.checked === true ? 1 : 0
          })
          console.log('editObj', editObj)
          that.$axios.post(this.$store.state.localUrl + 'api/address/' + that.editId, editObj).then(res => {
            console.log('sssssss', res)
            if (res.code === 200 || res.code === '200'){
              that.getOrderAddress()
              if (that.editId) {
                that.$message.success('Successful address modification!')
              } else {
                that.defultIcon = 'el-icon-d-arrow-left'
                that.$message.success('Added Successfully!')
              }
              that.addressFormShow = false
            } else {
              that.$message.error(res.msg.entry_postcode[0])
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log(55555)
      this.$refs[formName].resetFields();
      this.addressFormShow = false
    },
    paySub: function (formName, formName1) {
      var that = this
      if (that.radio) {
        if (that.checkedSub) {
          $('.payConfirm').removeClass('error')
          if (formName) {
            if (that.radio3 === '1') {
              console.log('你选择了第一种支付方式')
            }else if (that.radio3 === '2') {
              if (that.checked) {
                that.$refs[formName].validate((valid) => {
                  if (valid) {
                    console.log('tttttt')
                  }
                })
              } else {
                console.log('666666666')
                that.$refs[formName].validate((valid) => {
                  that.$refs[formName1].validate((valid1) => {
                    if (valid && valid1) {
                      console.log('tttttt')
                    }
                  })
                })
              }
            }
          }
        } else {
          $('.payConfirm').addClass('error')
        }
      } else {
        that.infoShow = true
      }
    }
  }
}
</script>

<style scoped>
  .model{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .model2{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .modelCont{
    width: 380px;
    height: 280px;
    padding: 50px 30px;
    text-align: center;
    font-family: Tahoma;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 6px #666;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
  }
  .modelCont.alert{
    height: 210px;
  }
  .modelClose{
    width: 22px;
    height: 22px;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    right: 4px;
    top: 5px;
    color: #0A0A0A;
    cursor: pointer;
  }
  .modelClose:hover{
    color: #333;
  }
  .modelTitle{
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
    font-weight: bold;
    text-align: center;
  }
  .modelTitle.tip{
    height: 60px;
    text-align: left;
    margin-bottom: 0;
  }
  .modelItem{
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: center;
  }
  .modelName{
    font-size: 14px;
    color: #999999;
    width: 140px;
    text-align: right;
  }
  .modelText{
    font-size: 14px;
    color: #121037;
    width: 150px;
    text-align: left;
    margin-left: 20px;
  }
  .payBtn{
    color: #fff;
    font-size:18px;
    font-family:Tahoma;
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 auto;
    border-radius:4px;
    background-color: #C51015;
    margin-top: 20px;
    cursor: pointer;
  }
  .payBtn.info{
    margin-top: 4px;
  }
  .payBtn:hover{
    background-color: #B20605;
  }
  .payConfirm.error span{
    color: #F56C6C;
  }
  .payConfirm{
    color: #999;
    width: 320px;
    word-wrap:break-word;
    margin-top: 10px;
  }
  .payValue.total{
    font-size:18px;
    font-weight: bold;
  }
  .payValue{
    color: #C51015;
  }
  .payItem{
    height: 26px;
    display: flex;
    line-height: 26px;
    justify-content: space-between;
  }
  .payName.total{
    color: #333;
    font-size:18px;
    font-weight: bold;
  }
  .payName{
    color: #666666;
    width: 130px;
    text-align: right;
  }
  .payDiv{
    width: 380px;
    /*height: 321px;*/
    border: 1px solid #E9E9E9;
    font-size:14px;
    font-family:Tahoma;
    position: fixed;
    top: 192px;
    right: 10%;
    z-index: 999;
    background-color: #fff;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px #d9d9d9;
  }
  .demo-ruleForm{
    width: 750px;
    margin: 0 auto;
    margin-top: 4px;
  }
  .dataType{
    display: flex;
    justify-content: start;
    height: 36px;
    line-height: 36px;
    margin-bottom: 22px;
  }
  .moreCard{
    height: 32px;
    display: flex;
    justify-content: start;
    margin-top: 30px;
  }
  .payBox{
    width: 950px;
    border: 1px solid #E9E9E9;
    margin-bottom: 40px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 14px;
    color: #333;
    font-family:Tahoma;
  }
  .payBox img{
    border: 1px solid #E9E9E9;
  }
  .totalPay{
    width: 200px;
    line-height: 108px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .price{
    margin-top: 14px;
    color: #333;
  }
  .price span{
    color: #999;
    text-decoration: line-through;
    margin-left: 10px;
  }
  .nameInfo{
    width: 350px;
    height: 34px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break:break-word;
    text-align: left;
    margin-bottom: 14px;
  }
  .goodsText{
    width: 350px;
    font-size:14px;
    font-family:Tahoma;
    text-align: left;
  }
  .goodImg{
    width: 110px;
    height: 110px;
    border: 1px solid #E9E9E9;
  }
  .goodImg img{
    width: 110px;
    height: 110px;
  }
  .goodName{
    width: 480px;
    display: flex;
    justify-content: space-between;
  }
  .goodsItem{
    width: 950px;
    height: 149px;
    border: 1px solid #E9E9E9;
    border-top: none;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .goodsItem>div{
    text-align: center;
  }
  .orderCont{
    width: 1440px;
    margin: 0 auto;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
  }
  .orderState{
    height: 32px;
    width: 1020px;
    display: flex;
    justify-content: start;
    margin-top: 24px;
  }
  .stateItem{
    width: 340px;
    height: 32px;
    display: flex;
    justify-content: start;
    position: relative;
  }
  .stateText{
    width: 320px;
    height: 32px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    font-family: Tahoma;
    background-color: #e1e1e1;
  }
  .stateText.end{
    width: 340px;
  }
  .jianTou{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 88;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 20px solid #e1e1e1;
  }
  .jianTouLt{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 66;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 20px solid #fff;
  }
  .active .stateText{
    background-color: #c51015;
  }
  .active .jianTou{
    border-left: 20px solid #c51015;
  }
  .stateItem:nth-of-type(2){
    margin-left: -16px;
  }
  .stateItem:nth-of-type(3){
    margin-left: -16px;
  }
  .orderInfo{
    width: 1020px;
  }
  .navTitle{
    width:145px;
    height:22px;
    font-size:18px;
    font-family:Tahoma;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-top: 30px;
    margin-bottom: 21px;
  }
  .addressItem{
    width:948px;
    height:60px;
    display: flex;
    justify-content: space-between;
    border:1px solid #E9E9E9;
    border-top: none;
  }
  .addressItem:nth-of-type(1){
    border-top: 1px solid #E9E9E9;
  }
  .itemName{
    height: 60px;
    width: 180px;
    line-height: 60px;
    padding-left: 20px;
  }
  .itemAddress{
    width: 280px;
    height: 60px;
    line-height: 60px;
    font-size:12px;
    font-family:Tahoma;
    color: #ccc;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .addressText{
    width: 258px;
    line-height:18px;
    color: #333;
    float: right;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break:break-word;
  }
  .itemPone{
    width: 200px;
    height: 60px;
    line-height: 60px;
    font-size:12px;
    font-family:Tahoma;
    color: #ccc;
    text-align: center;
  }
  .itemPone span{
    color: #333;
  }
  .itemDefault{
    width: 70px;
    height: 60px;
    line-height: 60px;
    font-size:14px;
    text-align: center;
    font-family:Tahoma;
  }
  .itemDefault span{
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #c51015;
  }
  .itemOption{
    width: 190px;
    height: 60px;
    line-height: 60px;
    font-size:14px;
    text-align: center;
    color: #003764;
    display: flex;
    justify-content: center;
  }
  .itemOption div{
    width: 90px;
    cursor: pointer;
    text-align: right;
    padding-right: 20px;
  }
  .showMore{
    height: 30px;
    width: 948px;
    font-size:16px;
    line-height: 30px;
    color: #ccc;
    text-align: center;
    border: 1px solid #E9E9E9;
    border-top: none;
  }
  .showMore i{
    cursor: pointer;
    transform: rotate(90deg);
  }
  .addNew{
    height: 40px;
    width: 948px;
    padding: 0 20px;
    border:1px solid #E9E9E9;
    box-sizing: border-box;
    margin-top: 20px;
    font-size:14px;
    font-family:Tahoma;
    line-height: 40px;
    cursor: pointer;
  }
  .shopItem{
    width: 948px;
    height: 40px;
    border:1px solid #E9E9E9;
    padding: 0 20px;
    box-sizing: border-box;
    border-top: none;
    display: flex;
    justify-content: space-between;
  }
  .shopName{
    height: 40px;
    line-height: 40px;
  }
  .shopItem>div{
    height: 40px;
    line-height: 40px;
    font-size:14px;
    font-family:Tahoma;
    color: #333;
  }
  .shopItem:nth-of-type(1){
    border-top: 1px solid #e9e9e9;
  }
  .checkTitle{
    height: 45px;
    width: 950px;
    line-height: 45px;
    font-size:16px;
    font-family:Tahoma;
    color: #333;
    background-color: #E9E9E9;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .checkTitle>div{
    text-align: center;
  }
</style>
