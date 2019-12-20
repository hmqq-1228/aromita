<template>
<div class="orderConfirm">
  <aheader-com></aheader-com>
  <div class="model2" v-if="modelShow2"></div>
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
      <div class="payBtn info2" @click="closeInfoModel">OK</div>
    </div>
  </div>
  <!--<div class="model" v-if="overQuanlity">-->
    <!--<div class="modelCont alert">-->
      <!--<div class="modelClose" @click="closeOverModel"><i class="el-icon-close"></i></div>-->
      <!--<div class="modelTitle tip" style="height: 90px;">Sorry, some products are temporarily out of stock. Please see the details on CHECKOUT REVIEW table. Then go back to cart page and update the quantity.</div>-->
      <!--<div class="payBtn info" @click="closeOverModel">OK</div>-->
    <!--</div>-->
  <!--</div>-->
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
        <div class="navTitle">Shipping Address</div>
        <div class="address" v-if="isLogin">
          <div v-if="addressList && addressList.length>0" class="addressItem" v-for="(address, index) in addressList" v-bind:key="index">
            <div class="itemName" :title="address.entry_firstname + ' ' + address.entry_lastname">
              <!--@change="checkAddress(address.id)"-->
              <el-radio v-model="radio" :label="address.id+'-'+address.entry_country+'-'+address.entry_state+'-'+address.entry_city+'-'+address.entry_postcode">
                <i class="el-icon-s-custom" style="color: #ccc;"></i> {{address.entry_firstname}} {{address.entry_lastname}}
              </el-radio>
            </div>
            <div class="itemAddress">
              <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
              <div class="addressText" :title="address.entry_company?address.entry_company:''+' '+address.entry_street_address1 + address.entry_street_address2 +' '+address.entry_city+' '+address.entry_state+' '+address.entry_postcode+' '+ country[address.entry_country]">
                <span v-if="address.entry_company">{{address.entry_company}},</span> {{address.entry_street_address1}} {{address.entry_street_address2}}, {{address.entry_city}}, {{address.entry_state}}, {{address.entry_postcode}}, {{country[address.entry_country]}}
              </div>
            </div>
            <div class="itemPone">
              <i class="el-icon-phone" v-if="address.telephone_number" style="width: 14px;height: 14px;"></i>
              <span>{{address.telephone_number}}</span>
            </div>
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
              <el-form-item label="First name:" prop="First">
                <el-input v-model="addNewForm.First"></el-input>
              </el-form-item>
              <el-form-item label="Last name:" prop="Last">
                <el-input v-model="addNewForm.Last"></el-input>
              </el-form-item>
              <el-form-item label=" Email Address:" prop="email">
                <el-input v-model="addNewForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Company name:" prop="Company">
                <el-input v-model="addNewForm.Company"></el-input>
              </el-form-item>
              <el-form-item label="Country:" prop="Country">
                <el-select v-model="addNewForm.Country" placeholder="United Stats" @change="chooseCoutry()">
                  <el-option v-for="item in countryList" :label="item.countryName" :value="item.countryValue" :key="item.countryName"></el-option>
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
              <el-form-item label="Zip/Postcode:" prop="Postcode" :error="errorMsg">
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
        <div class="address" v-if="!isLogin">
          <div v-if="addressList2 && addressList2.length>0" class="addressItem" v-for="(address, index) in addressList2" v-bind:key="index">
            <div class="itemName" :title="address.entry_firstname+' '+ address.entry_lastname">
              <el-radio v-model="radio" :label="address.id+'-'+address.entry_country+'-'+address.entry_state+'-'+address.entry_city+'-'+address.entry_postcode">
                <i class="el-icon-s-custom" style="color: #ccc;"></i> {{address.entry_firstname}} {{address.entry_lastname}}
              </el-radio>
            </div>
            <div class="itemAddress">
              <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
              <div class="addressText" :title="address.entry_company?address.entry_company:''+' '+address.entry_street_address1 + address.entry_street_address2 +' '+address.entry_city+' '+address.entry_state+' '+address.entry_postcode+' '+ country[address.entry_country]">
                <span v-if="address.entry_company">{{address.entry_company}},</span> {{address.entry_street_address1}} {{address.entry_street_address2}}, {{address.entry_city}}, {{address.entry_state}}, {{address.entry_postcode}}, {{country[address.entry_country]}}
              </div>
            </div>
            <div class="itemPone">
              <i class="el-icon-phone" v-if="address.telephone_number" style="width: 14px;height: 14px;"></i>
              <span>{{address.telephone_number}}</span>
            </div>
            <div class="itemDefault"><span v-if="false">Default</span></div>
            <div class="itemOption">
              <div @click="addNewAddressOut()">Edit</div>
              <div @click="deleteAddressOut()">Remove</div>
            </div>
          </div>
          <!--<div v-if="addressNum && addressNum>1" class="showMore" @click="showMore(defultIcon)"><i :class="defultIcon"></i></div>-->
          <div class="addNew" v-if="!addressList2 || addressList2.length === 0" @click="addNewAddress()"><i class="el-icon-plus" style="color: #ccc;font-size: 18px;"></i> Add a new address</div>
          <div class="payBox" v-if="addressFormShow">
            <el-form :model="addNewForm" :rules="rules" ref="addNewForm" label-width="125px" class="demo-ruleForm" style="margin-top: 20px;">
              <el-form-item label="First name:" prop="First">
                <el-input v-model="addNewForm.First"></el-input>
              </el-form-item>
              <el-form-item label="Last name:" prop="Last">
                <el-input v-model="addNewForm.Last"></el-input>
              </el-form-item>
              <el-form-item label=" Email Address:" prop="email">
                <el-input v-model="addNewForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Company name:" prop="Company">
                <el-input v-model="addNewForm.Company"></el-input>
              </el-form-item>
              <el-form-item label="Country:" prop="Country">
                <el-select v-model="addNewForm.Country" placeholder="United Stats" @change="chooseCoutry()">
                  <el-option v-for="item in countryList" :label="item.countryName" :value="item.countryValue" :key="item.countryName"></el-option>
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
              <el-form-item label="Zip/Postcode:" prop="Postcode" :error="errorMsg">
                <el-input v-model="addNewForm.Postcode"></el-input>
              </el-form-item>
              <el-form-item label="Mobie No./Phone:" prop="Phone">
                <el-input v-model="addNewForm.Phone"></el-input>
              </el-form-item>
              <div v-if="false" class="payConfirm" style="margin-left: 125px;">
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
        <div class="navTitle">Shipping Method</div>
        <div class="shopItem not" v-if="!shipMethodList || shipMethodList.length === 0">{{errorInfo}}</div>
        <div class="shopBox" v-if="methodShow">
          <div class="shopItem" v-for="(ship, index) in shipMethodList" v-bind:key="index">
            <div class="shopName"><el-radio v-model="radio2" :label="ship.ship_id + '-' + ship.ship_fee" @change="shipChecked($event)">
              <span class="freeTip"><img v-if="ship.ship_fee == 0" src="../../../static/img/free.png" alt=""></span>
              <span class="tipName">{{ship.ship_name}}</span>
            </el-radio></div>
            <div style="width: 200px;">{{ship.trans_min}}—{{ship.trans_max}} workdays</div>
            <div style="width: 100px;text-align: right;">
              <span v-if="ship.ship_fee > 0">$ {{ship.ship_fee.toFixed(2)}}</span>
              <span v-if="ship.ship_fee == 0">Free</span>
            </div>
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
                <div class="goodImg">
                  <div class="tagBox" v-if="goods.activity_type">
                    <div class="cheap" v-if="goods.activity_type == 1">
                      <div class="cheapLeft"></div>
                      <div class="cheapRight">${{goods.activity_price}}</div>
                    </div>
                    <div class="disPrice" v-if="goods.activity_type == 2">%{{parseInt(goods.activity_intensity)}} OFF</div>
                  </div>
                  <img :src="goods.sku_image" alt="">
                  <div class="soldOut" v-show="goods.soldOut === 1">Sold out</div>
                </div>
                <div class="goodsText">
                  <div class="nameInfo">{{goods.sku_name}}</div>
                  <div><span style="color: #999;" v-for="(item, index2) in JSON.parse(goods.sku_attrs)" :key="index2">{{item.attr_name}}: <span style="color: #333;">{{item.value.attr_value}}; </span></span></div>
                  <div class="price">${{goods.activity_price?goods.activity_price:goods.sku_price}}
                    <span v-if="goods.activity_type">${{goods.sku_price}}</span>
                  </div>
                </div>
              </div>
              <div style="width: 200px;padding-top: 20px;font-size: 14px" :class="goods.realNum !== 1? 'realNum': ''">
                <p>{{goods.goods_count}}</p>
                <p style="color: #C51015;padding-top: 15px;" v-if="goods.realNum === 1">Only {{goods.inventory}} Available</p>
              </div>
              <div class="totalPay">${{goods.sku_pay.toFixed(2)}}</div>
            </div>
            <div class="goodsItem" v-if="orderListInvalid">
              <div class="noOrder">The order has expired. Please <span @click="toShopcar()">add it</span> again.</div>
            </div>
          </div>
        </div>
        <div class="navTitle" v-if="isLogin"> Choose Coupon & Points</div>
        <div class="leftCont" v-if="isLogin">
          <div class="pointBox">
            <div class="coupon">
              <div class="couponItem" v-if="couponList.length > 0" :class="coupon.active === true? 'couponChecked':''" v-for="(coupon, index) in couponList" @click="useCoupon($event, coupon.cc_id)" :key="index">
                <div class="couponInfo">
                  <div class="info">
                    <div class="infoFee">
                      <div class="price2"><span id="tag">$</span> <span id="num">{{coupon.cc_amount}}</span></div>
                      <!--<div class="feeName">Full {{coupon.coupon_minimum_order}}$ usable</div>-->
                    </div>
                    <div class="couponUse">For order ${{coupon.coupon_minimum_order}}+</div>
                  </div>
                  <div class="couponTime">
                    <div class="stateFlag" v-if="coupon.soon_expire === 'Y'">soon to expired</div>
                    <div style="width: 115px;font-size: 14px;line-height: 40px;">Expired Date:</div>
                    <div class="timeRange" :class="coupon.cc_coupon_start_time?'':'noStartTime'">
                      <div v-if="coupon.cc_coupon_start_time">{{coupon.cc_coupon_start_time}}</div>
                      <div v-if="coupon.cc_coupon_end_time">{{coupon.cc_coupon_end_time}}</div>
                      <!--<div>2019/09/21 至 2019/10/01</div>-->
                    </div>
                  </div>
                  <div class="yuan"></div>
                  <div class="yuanRt"></div>
                </div>
              </div>
              <div v-if="couponList.length === 0" style="text-align: center;line-height: 60px;color: #666;">No coupons are available</div>
            </div>
            <div class="more" v-if="moreFlagShow" @click="getMoreCoupon(pointMore)"><span :class="pointMore"></span></div>
            <div class="availablePoint">
              <div class="point">
                <div style="margin-right: 20px;">Your points: <span style="color: chocolate">{{myPoints}}</span></div>
                <div style="width: 420px;display: flex;">
                  <div style="margin-right: 20px;">Maximum points available: </div>
                  <el-input v-model="inputPoint" :placeholder="maxPoints" style="width: 180px;" :min="0" maxlength="5" @blur="getInputPoint(inputPoint)" @keyup.native="proving1"></el-input>
                </div>
                <div>Point discount: <span style="color: #C51015;">$ {{inputPoint>0?(inputPoint*0.01).toFixed(2):'0.00'}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="navTitle">Payment Method</div>
        <div class="payBox">
          <div class="imgRadio"><el-radio v-model="radio3" label="1"><img style="float: right;" src="../../../static/img/pay.png" alt=""></el-radio></div>
          <div class="moreCard">
            <el-radio v-model="radio3" :disabled="true" label="2">Credit/Deibt Card</el-radio>
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
                    <el-option :label="mouth" :value="mouth" v-for="(mouth, index) in mouthList" v-bind:key="index"></el-option>
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
              <el-form-item label="Company name:" prop="Company">
                <el-input v-model="shipForm.Company"></el-input>
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
      <!--@mousedown="move($event)"-->
      <div class="payDiv" @mousedown="move($event)" :style="{right:(rightDis==true?'0':'12%')}">
        <div class="payItem" v-if="billing.subtotal && billing.subtotal>0">
          <div class="payName">Subtotal:</div>
          <div class="payValue">${{billing.subtotal.toFixed(2)}}</div>
        </div>
        <div class="payItem" v-if="billing.cc_amount">
          <div class="payName">Coupon:</div>
          <div class="payValue">${{billing.cc_amount.toFixed(2)}}</div>
        </div>
        <div class="payItem" v-if="billing.pointToMoney">
          <div class="payName">Points:</div>
          <div class="payValue">${{billing.pointToMoney.toFixed(2)}}</div>
        </div>
        <div class="payItem" v-if="billing.taxfee">
          <div class="payName">Tax:</div>
          <div class="payValue">${{billing.taxfee.toFixed(2)}}</div>
        </div>
        <div class="payItem" v-if="shipFee>0">
          <div class="payName">Shipping:</div>
          <div class="payValue">${{parseFloat(shipFee).toFixed(2)}}</div>
        </div>
        <div class="payItem">
          <div class="payName total">Grand Total:</div>
          <div class="payValue total">${{billTotalSum.toFixed(2)}}</div>
        </div>
        <div style="margin-top: 15px;">
          <el-button :loading="butLoading" :disabled="payDisabled" @click="paySub('ruleForm', 'shipForm')">
            <span v-if="!butLoading">Confirm to pay</span>
            <span v-if="butLoading">Calculating</span>
          </el-button>
        </div>
        <div class="payConfirm"><el-checkbox v-model="checkedSub"></el-checkbox> <span>I have read and agreed to the website terms and conditions</span></div>
      </div>
    </div>
  </div>
  <afooter-com></afooter-com>
</div>
</template>

<script>
import aFooter from "@/components/afooter.vue";
import aheader from "@/components/aheader.vue";
import {orderAdd, orderAddress, billingList, checkLogin} from "../../api/register";
import qs from 'qs'
import addressList from "../../assets/js/config"
export default {
  components: {
    "aheader-com": aheader,
    "afooter-com": aFooter
  },
  name: "orderConfirm",
  data () {
    return {
      editId: '',
      radio: '',
      radio2: '',
      radio3: '1',
      billing: {},
      errorMsg: '',
      couponId: '',
      getCouId: '',
      myPoints: 0,
      maxPoints: '',
      inputPoint: '',
      pointMore: 'el-icon-d-arrow-right',
      errorInfo: 'No mode of transportation, please choose a valid address.',
      shipFee: 0,
      exciseFee: 0,
      totalPay: 0,
      billTotal: 0,
      addressNum: 0,
      addressLen: 0,
      billTotalSum: 0,
      subTotalCoupon: 0,
      actIdList: [],
      goodsList: [],
      couponList: [],
      addressList: [],
      addressList2: [],
      ProvinceList: [],
      order_Address: {},
      orderShipMethod: {},
      shipMethodList: [],
      country:{
        US:"United States",
        CA:"Canada"
      },
      checkedAdressId: '',
      mouthList: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      countryList: addressList.addressList.List,
      isLogin: false,
      infoShow: false,
      rightDis: false,
      modelShow: false,
      modelShow2: false,
      methodShow: false,
      butLoading: false,
      moreFlagShow: false,
      login_status: false,
      // overQuanlity: false,
      payDisabled: false,
      dialogVisible: true,
      showCreditForm: false,
      addressFormShow: false,
      orderListInvalid: false,
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
        Company: '',
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
        Company: '',
        Country: 'US',
        Address1: '',
        Address2: '',
        City: '',
        Province: 'Alabama',
        Postcode: '',
        Phone: '',
        checked: true
      },
      checked: true,
      checkedSub: false,
      rules: {
        First: [
          {required: true, message: 'Please enter the first name.', trigger: 'blur'},
          {required: true, min: 1, max: 25, message: 'You can write a maximum of 25 characters.', trigger: 'blur' }
        ],
        Last: [
          {required: true, message: 'Please enter the last name.', trigger: 'blur'},
          {required: true, min: 1, max: 25, message: 'You can write a maximum of 25 characters.', trigger: 'blur' }
        ],
        Company: [
          {min: 1, max: 150, message: 'You can write a maximum of 150 characters.', trigger: 'blur' }
        ],
        email: [
          {type: 'email', message: 'Please enter a valid email.', trigger: ['blur', 'change']}
        ],
        Country: [
          {required: true, message: 'Please enter your country name.', trigger: 'blur'}
        ],
        Address1: [
          {required: true, message: 'Please enter your first address.', trigger: 'blur'},
          {required: true, min: 1, max: 125, message: 'You can write a maximum of 125 characters.', trigger: 'blur' }
        ],
        Address2: [
          { min: 0, max: 125, message: 'You can write a maximum of 125 characters.', trigger: 'blur' }
        ],
        City: [
          {required: true, message: "Please enter the consignee's city.", trigger: 'blur'},
          {required: true, min: 1, max: 50, message: 'You can write a maximum of 50 characters.', trigger: 'blur' }
        ],
        Province: [
          {required: true, message: 'Please enter your province name.', trigger: 'blur'}
        ],
        Phone: [
          { min: 0, max: 15, message: 'You can write a maximum of 15 characters.', trigger: 'blur' }
        ],
        Postcode: [
          {required: true, message: 'Please enter the Zip/Postal Code.', trigger: 'blur'}
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
      // console.log('mmmmmmmmgdgg', val)
      if (val) {
        var radioId = val.split('-')[0]
        that.checkedAdressId = radioId
        that.showMethod()
        // that.methodShow = true
      } else {
        that.methodShow = false
        that.shipMethodList = []
        that.errorInfo = 'No mode of transportation, please choose a valid address.'
      }
    },
    addressFormShow: function (val, ov) {
      if(val === false) {
        this.clearForm()
      }
    },
    radio3: function (val, Ov) {
      var that = this
      // console.log('vvvvvv', val)
      if (val === '2') {
        that.showCreditForm = true
      } else if (val === '1') {
        that.showCreditForm = false
      }
    },
    checkedSub: function (val, ov) {
      if(val){
        $('.payConfirm').removeClass('error')
      }
    }
    // modelShow: function(val, ov){
    //   if (val) {
    //     document.documentElement.style.overflowY = 'hidden';
    //   } else {
    //     document.documentElement.style.overflowY = 'scroll';
    //   }
    // }
  },
  created(){
    if (document.body.clientWidth < 1460){
      this.rightDis = true
    }
    this.ProvinceList = addressList.addressList.List[0].countryList
    this.checkLoginInfo()
  },
  methods: {
    move(e) {
      // let odiv = document.getElementById('ship-pop');
      let odiv = e.currentTarget;
      odiv.style.zIndex = this.zIndex++;
      // 鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e)=>{
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        odiv.style.zIndex = this.zIndex++;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    proving1: function(){
      this.inputPoint = this.inputPoint.replace(/[^\.\d]/g,'');
      this.inputPoint = this.inputPoint.replace('.','');
      // this.inputPoint = this.inputPoint.replace(/[\d]/);
    },
    getInputPoint: function (num) {
      // console.log('ppppppp', num)
      this.butLoading = true
      this.payDisabled = true
      if (this.inputPoint > this.myPoints) {
        this.inputPoint = this.myPoints
      } else if (this.inputPoint < this.myPoints) {
        if (this.myPoints > 10000) {
          if (this.inputPoint > 10000) {
            this.inputPoint = 10000
          } else {
            this.inputPoint = num
          }
        } else {
          this.inputPoint = num
        }
      } else {
        this.inputPoint = num
      }
      this.getBillingList()
    },
    // 可用积分
    getPoints: function () {
      var that = this
      that.$axios.post('api/customercanusepoint', {}).then(res => {
        that.myPoints = res.point
        if (that.myPoints > 10000) {
          that.maxPoints = 'Available Points 10000'
        } else {
          that.maxPoints = 'Available Points ' + that.myPoints
        }
        this.getGoodsOrder()
        // if (res.code === '200' || res.code === 200) {
        //
        // }
      })
    },
    // checkAddress: function (id) {
    //   this.butLoading = true
    //   if (id) {
    //     console.log('111111111111', id)
    //     this.$axios.post('api/pingtaxcloud', {}).then(res => {
    //       if (res === 200) {
    //         this.getDataFuc(id, this.goodsList)
    //       }
    //     })
    //   } else {
    //     // console.log('22222222222')
    //     this.butLoading = false
    //   }
    // },
    // 处理消费税数据
    // getDataFuc: function (radioId, list) {
    //   var addObj = {}
    //   var addData = {}
    //   var goodObj = {}
    //   var goods = []
    //   var that = this
    //   for (var i=0;i<this.addressList.length;i++){
    //     if (that.addressList[i].id == radioId){
    //       addObj = that.addressList[i]
    //     }
    //   }
    //   addData.Address1 = addObj.entry_street_address1
    //   addData.Address2 = addObj.entry_street_address2
    //   addData.City = addObj.entry_city
    //   addData.State = addObj.entry_state
    //   addData.Zip5 = addObj.entry_postcode
    //   // console.log('kkkk222', JSON.stringify(addData))
    //   if (list) {
    //     for (var j = 0; j < list.length; j++) {
    //       goodObj = {
    //         index: j,
    //         itemId: list[j].sku_id,
    //         qty: list[j].goods_count,
    //         price: list[j].sku_price,
    //         tic: list[j].tic
    //       }
    //       goods.push(goodObj)
    //     }
    //   }
    //   // console.log('kkkk3333', JSON.stringify(goods))
    //   this.$axios.post('api/lookup', qs.stringify({
    //     pd_des_address: JSON.stringify(addData),
    //     pd_skus: JSON.stringify(goods)
    //   })).then(res => {
    //     // console.log('777777777', res)
    //     if (res !== 101) {
    //       // console.log('777777777', that.billTotalSum)
    //       that.exciseFee = res
    //       that.billTotalSum = that.billTotalSum + parseFloat(that.exciseFee)
    //       that.butLoading = false
    //       that.getBillingList()
    //     }
    //   })
    // },
    useCoupon: function (e, cpId) {
      var obj = e.currentTarget
      this.butLoading = true
      this.payDisabled = true
      if ($(obj).hasClass('couponChecked')) {
        $(obj).removeClass('couponChecked')
        this.couponId = ''
      } else {
        $(obj).addClass('couponChecked').siblings().removeClass('couponChecked')
        this.couponId = cpId
        this.getCouId = cpId
      }
      this.getBillingList()
    },
    getMoreCoupon: function (type) {
      var that = this
      if (type === 'el-icon-d-arrow-left') {
        that.getCouponList('more')
      } else if (type === 'el-icon-d-arrow-right') {
        that.getCouponList('less')
      }
    },
    async checkLoginInfo () {
      let data = await checkLogin()
      if(data.code === '200' || data.code === 200) {
        this.isLogin = true
        this.getOrderAddress('defult', '')
        this.getPoints()
      } else {
        this.isLogin = false
        this.getGoodsOrder()
        this.getOrderAddressOut()
      }
    },
    getOrderAddressOut: function () {
      var that = this
      that.addressList2 = []
      var address = sessionStorage.getItem('addressList')
      var list = JSON.parse(address)
      console.log('4444', list)
      that.addressList2 = list
      if (list && that.addressList2.length > 0) {
        that.order_Address = that.addressList2[0]
        for (var i=0; i<this.addressList2.length; i++) {
          if (that.addressList2[i].is_default === 1) {
            that.radio = that.addressList2[i].id + '-'+that.addressList2[i].entry_country+'-'+that.addressList2[i].entry_state+'-'+that.addressList2[i].entry_city+'-'+that.addressList2[i].entry_postcode
            // console.log('22222', that.radio)
          } else {
            that.radio = ''
          }
        }
      } else {
        // console.log('233333', that.radio)
          that.radio = ''
          that.shipFee = 0
          that.billing.taxfee = 0
        }
    },
    addNewAddressOut: function(){
      var that = this
      var address = sessionStorage.getItem('addressList')
      that.addressList2 = JSON.parse(address)
      that.addressFormShow = true
      that.addNewForm.First = that.addressList2[0].entry_firstname
      that.addNewForm.Last = that.addressList2[0].entry_lastname
      that.addNewForm.Company = that.addressList2[0].entry_company
      that.addNewForm.email = that.addressList2[0].entry_email_address
      that.addNewForm.Country = that.addressList2[0].entry_country
      that.addNewForm.Address1 = that.addressList2[0].entry_street_address1
      that.addNewForm.Address2 = that.addressList2[0].entry_street_address2
      that.addNewForm.City = that.addressList2[0].entry_city
      that.addNewForm.Province = that.addressList2[0].entry_state
      that.addNewForm.Postcode = that.addressList2[0].entry_postcode
      that.addNewForm.Phone = that.addressList2[0].telephone_number
      if (that.addressList2[0].is_default === 1) {
        that.addNewForm.checked = true
      } else {
        that.addNewForm.checked = false
      }
    },
    deleteAddressOut: function () {
      sessionStorage.setItem('addressList', JSON.stringify([]))
      this.getOrderAddressOut()
    },
    //选择国家
    chooseCoutry: function (){
      this.ProvinceList = []
      //查询对应国家下的州区列表
      let Province = this.countryList.find((n) => n.countryValue === this.addNewForm.Country).countryList
      this.ProvinceList = Province
      this.addNewForm.Province = this.ProvinceList[0]
    },
    test: function () {
      this.modelShow = true
    },
    closeInfoModel: function(){
      this.infoShow = false
    },
    // closeOverModel: function () {
    //   this.overQuanlity = false
    // },
    closeModel: function(){
      this.modelShow = false
    },
    showMore: function (type) {
      var that = this
      if (type === 'el-icon-d-arrow-right') {
        // that.defultIcon = 'el-icon-d-arrow-left'
        that.getOrderAddress('more', that.checkedAdressId)
      } else if (type === 'el-icon-d-arrow-left') {
        // that.defultIcon = 'el-icon-d-arrow-right'
        that.getOrderAddress('less', that.checkedAdressId)
      }
    },
    clearForm: function () {
      this.addNewForm.First = ''
      this.addNewForm.Last = ''
      this.addNewForm.email = ''
      this.addNewForm.Company = ''
      this.addNewForm.Country = 'US'
      this.addNewForm.Address1 = ''
      this.addNewForm.Address2 = ''
      this.addNewForm.City = ''
      this.addNewForm.Province = 'Alabama'
      this.addNewForm.Postcode = ''
      this.addNewForm.Phone = ''
    },
    async getOrderAddress (type, id) {
      var that = this
      let data = await orderAddress()
      if (data.data){
        that.addressLen = data.data.length
      }
      if (data.code === 200 || data.code === '200') {
        if(data.data) {
          that.addressNum = data.data.length
          if (!type && !id) {
            that.radio = ''
            that.addressList = data.data
            that.defultIcon = 'el-icon-d-arrow-left'
            // console.log('gggggg', that.addressList)
            for (var i=0; i<data.data.length; i++) {
              if (data.data[i].is_default === 1) {
                // let defultList = []
                that.radio = data.data[i].id + '-'+data.data[i].entry_country+'-'+data.data[i].entry_state+'-'+data.data[i].entry_city+'-'+data.data[i].entry_postcode
                // console.log('ffffff', that.radio)
                // that.checkAddress(data.data[i].id)
                var redioList = that.radio.split('-')
                that.checkedAdressId = redioList[0]
                // defultList.push(data.data[i])
                // that.addressList = defultList
              } else {
                that.errorInfo = 'No mode of transportation, please choose a valid address.'
              }
            }
          }else if (type === 'defult' && !id){
            for (var i=0; i<data.data.length; i++) {
              if (data.data[i].is_default === 1) {
                let defultList = []
                that.radio = data.data[i].id + '-'+data.data[i].entry_country+'-'+data.data[i].entry_state+'-'+data.data[i].entry_city+'-'+data.data[i].entry_postcode
                // console.log('ffffff222', that.radio)
                var redioList = that.radio.split('-')
                that.checkedAdressId = redioList[0]
                // that.showMethod()
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
              // console.log('moire', that.addressList)
              let checkList = []
              for (var j=0; j<data.data.length; j++) {
                if (data.data[j].id === parseInt(id)) {
                  that.radio = data.data[j].id + '-'+data.data[j].entry_country+'-'+data.data[j].entry_state+'-'+data.data[j].entry_city+'-'+data.data[j].entry_postcode
                  checkList.unshift(data.data[j])
                } else {
                  checkList.push(data.data[j])
                }
              }
              that.addressList = checkList
            }
            that.defultIcon = 'el-icon-d-arrow-left'
          } else if (type === 'less') {
            if (!id) {
              var list = []
              list.push(data.data[0])
              that.addressList = list
            } else if (id) {
              for (var j=0; j<data.data.length; j++) {
                if (data.data[j].id === parseInt(id)) {
                  let checkList = []
                  that.radio = data.data[j].id + '-'+data.data[j].entry_country+'-'+data.data[j].entry_state+'-'+data.data[j].entry_city+'-'+data.data[j].entry_postcode
                  checkList.push(data.data[j])
                  that.addressList = checkList
                }
              }
            }
            that.defultIcon = 'el-icon-d-arrow-right'
          }
        }else {
          that.addressList = []
          that.shipMethodList = []
          that.radio = ''
        }
      }
    },
    // 删除
   deleteAddress: function (id) {
     var that = this
     that.$axios.delete('api/address/' + id, {}).then(res => {
       if (res.code === '200' || res.code === 200) {
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
        that.$axios.get('api/address/' + id, {}).then(res => {
          if (res.code === '200' || res.code === 200) {
            that.addNewForm.First = res.data.entry_firstname
            that.addNewForm.Last = res.data.entry_lastname
            that.addNewForm.Company = res.data.entry_company
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
            that.defultIcon = 'el-icon-d-arrow-left'
          } else {
            that.$message.warning(res.msg)
          }
        })
      } else if (!id) {
        that.editId = ''
        that.clearForm()
        if (that.addressLen >= 10) {
          that.$message.warning('Sorry, you only can create 10 addresses at most.')
        } else {
          that.addressFormShow = true
        }
      }
    },
    showMethod: function () {
      var that = this
      that.butLoading = true
      this.payDisabled = true
      if (that.radio === ''){
        that.methodShow = false
      } else {
        that.getPostMethod(that.radio)
      }
    },
    getPostMethod: function (valStr) {
      var strList = []
      var that = this
      strList = valStr.split('-')
      var address_info = {
        address_id: strList[0],
        entry_country: strList[1],
        entry_state: strList[2],
        entry_city: strList[3],
        entry_postcode: strList[4]
      }
      that.getShipMethod(address_info)
      for (var i=0;i<this.addressList.length;i++) {
        if (that.addressList[i].id === parseInt(strList[0])) {
          that.order_Address = that.addressList[i]
        }
      }
    },
    shipChecked: function (e) {
      var that = this
      that.radio2 = e
      for(var i=0;i<that.shipMethodList.length;i++) {
        if (that.radio2.split('-')[0] === that.shipMethodList[i].ship_id) {
          that.orderShipMethod = that.shipMethodList[i]
        }
      }
      that.shipFee = that.radio2.split('-')[1]
      that.billTotalSum = that.billTotal + parseFloat(that.shipFee)
        // + parseFloat(that.exciseFee)
    },
    getShipMethod: function (aStr) {
      var that = this
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      if (aStr.entry_country === 'United States'){
        aStr.entry_country = 'US'
      }
      let payLoad = qs.stringify({
        ids: JSON.stringify(ids),
        address_info: JSON.stringify(aStr)
      })
      // console.log('ids', aStr)
      that.$axios.post('api/ship', payLoad).then(res => {
        if (res.code === '200' || res.code === 200) {
          that.shipMethodList = res.data
          that.methodShow = true
          that.radio2 = res.data[0].ship_id + '-' + res.data[0].ship_fee
          that.shipFee = that.radio2.split('-')[1]
          that.billTotalSum = that.billTotal + parseFloat(that.shipFee)
            // + parseFloat(that.exciseFee)
          that.getBillingList()
          // this.butLoading = true
          // this.payDisabled = true
          for(var i=0;i<that.shipMethodList.length;i++) {
            if (that.radio2.split('-')[0] === that.shipMethodList[i].ship_id) {
              that.orderShipMethod = that.shipMethodList[i]
            }
          }
        } else if (res.code == 10002) {
          that.shipMethodList = res.data
          that.shipFee = 0
          that.errorInfo = 'No mode of transportation, please choose a new valid address.'
          that.getBillingList('1')
          that.butLoading = false
        } else {
          that.shipMethodList = []
          that.shipFee = 0
          that.getBillingList('1')
          that.$message.warning(res.msg)
          that.butLoading = false
        }
      })
      // let data = await shipMethod(payLoad)
      // console.log('data', data)
    },
    // 获取订单
    async getGoodsOrder(){
      var that = this
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      var idStr = JSON.stringify(ids)
      var payList = []
      var actIdList = []
      var subTotal = 0
      let idList = {
        ids: idStr
      }
      if (ids && ids.length > 0){
        let data = await orderAdd(idList)
        for (var i=0;i<data.length;i++){
          data[i].sku_pay = data[i].goods_count * parseFloat((data[i].activity_price?data[i].activity_price:data[i].sku_price))
          // actIdList.push(data[i].sku_id + '-' + data[i].sku_id)
        }
        that.goodsList = data
        // that.actIdList = actIdList
        // console.log('ggggg', actIdList)
        for(var i= 0;i<this.goodsList.length;i++){
          this.$set(this.goodsList[i],'soldOut',0)
          this.$set(this.goodsList[i],'realNum',0)
          payList.push(this.goodsList[i].sku_pay.toFixed(2))
        }
        for (var n=0;n<payList.length;n++) {
          subTotal = subTotal + parseFloat(payList[n])
        }
        that.subTotalCoupon = subTotal
        if (that.isLogin){
          that.getCouponList()
        }
        that.orderListInvalid = false
      } else {
        // console.log('订单失效')
        that.orderListInvalid = true
      }
    },
    async getBillingList (type) {
      var that = this
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      var idStr = JSON.stringify(ids)
      var coupon_id = that.couponId
      var billList = []
      var sumBill = 0
      var addObj = {}
      var addData = {}
      var that = this
      if (that.isLogin) {
        for (var i=0;i<this.addressList.length;i++){
          if (that.addressList[i].id == that.checkedAdressId){
            addObj = that.addressList[i]
          }
        }
      } else {
        for (var i=0;i<this.addressList2.length;i++){
          if (that.addressList2[i].id == that.checkedAdressId){
            addObj = that.addressList2[i]
          }
        }
      }
      addData.entry_street_address1 = addObj.entry_street_address1
      addData.entry_street_address2 = addObj.entry_street_address2
      addData.entry_city = addObj.entry_city
      addData.entry_state = addObj.entry_state
      addData.entry_postcode = addObj.entry_postcode
      // console.log('kkkk222', JSON.stringify(addData))
      if (that.inputPoint < 0){
        that.inputPoint = 0
      }
      let idList = {
        ids: idStr,
        score: that.inputPoint,
        cc_id: coupon_id,
        pd_des_address: JSON.stringify(addData)
      }
      let data = await billingList(idList)
      if (data.subtotal) {
        that.billing = data
        // for (let k in data) {
        //   if (k === 'subtotal') {
        //     billList.push(data[k])
        //   } else if (k === 'taxfee'){
        //     billList.push(data[k])
        //   } else if (k === 'cc_amount') {
        //     billList.push(data[k])
        //   } else if (k === 'pointToMoney') {
        //     billList.push(data[k])
        //   }
        // }
        billList.push(data['subtotal'])
        billList.push(data['taxfee'])
        billList.push(data['cc_amount'])
        billList.push(data['pointToMoney'])
        console.log('mmmmmm', type)
        for (var i=0;i<billList.length;i++) {
          sumBill = sumBill + billList[i]
        }
        that.billTotal = sumBill
        that.billTotalSum = that.billTotal + parseFloat(that.shipFee)
        if (type == 1){
          that.payDisabled = true
          // that.butLoading = true
        } else {
          that.payDisabled = false
          that.butLoading = false
        }
          // + parseFloat(that.exciseFee)
      } else if (data.code === 102) {
        that.payDisabled = true
        that.inputPoint = ''
        this.$alert("Point discount must not exceed the order's current total amount(not including shipping fee and taxes).", '', {
          confirmButtonText: 'OK',
          callback: action => {
            that.getBillingList()
          }
        })
        // that.$message.info('积分使用过多')
      } else if (data.code === 103) {
        that.payDisabled = true
        that.inputPoint = ''
        this.$alert('Use of points should not be greater than 10000', '', {
          confirmButtonText: 'OK',
          callback: action => {
            that.getBillingList()
          }
        })
      } else {
        that.payDisabled = true
        that.butLoading = false
        that.$message.warning('Your shipping address is invalid. Please check it.')
      }
    },
    getCouponList: function (type) {
      var that = this
      var payMon = qs.stringify({
        subtotal: that.subTotalCoupon,
        coupon_status: 10
      })
      that.$axios.post('api/getCustomerCoupon', payMon).then(res => {
       console.log('hhhhh666',that.subTotalCoupon)
        if (res.code === 200) {
          that.couponList = res.data
          for (var i=0;i<that.couponList.length;i++){
            that.$set(that.couponList[i],'active', false)
          }
          if (that.couponList.length > 3) {
            that.moreFlagShow = true
          }
          if (!type) {
            that.couponList = that.couponList.slice(0,3)
            this.pointMore = 'el-icon-d-arrow-left'
            if (res.data.length > 0) {
              that.couponId = res.data[0].cc_id
              that.getCouId = res.data[0].cc_id
            }
            for (var k=0;k<that.couponList.length;k++) {
              if (that.couponList[k].cc_id === that.getCouId){
                that.couponList[k].active = true
              }
            }
          } else if (type) {
            if (type === 'more') {
              that.couponList = that.couponList.slice()
              this.pointMore = 'el-icon-d-arrow-right'
              that.couponId = that.getCouId
              for (var k=0;k<that.couponList.length;k++) {
                if (that.couponList[k].cc_id === that.getCouId){
                  that.couponList[k].active = true
                }
              }
            } else if (type === 'less') {
              that.couponList = that.couponList.slice(0,3)
              that.couponId = that.getCouId
              this.pointMore = 'el-icon-d-arrow-left'
              for (var k=0;k<that.couponList.length;k++) {
                if (that.couponList[k].cc_id === that.getCouId){
                  that.couponList[k].active = true
                }
              }
            }
          }
          // that.getBillingList()      1030-0950
        }
      })
    },
    // 修改
    submitForm: function (formName) {
      var that = this
      var objList = []
      that.errorMsg = null
      if (that.isLogin){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var editObj = qs.stringify({
              entry_firstname: that.addNewForm.First,
              entry_lastname: that.addNewForm.Last,
              entry_company: that.addNewForm.Company,
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
            // console.log('editObj', editObj)
            that.$axios.post('api/address/' + that.editId, editObj).then(res => {
              if (res.code === 200 || res.code === '200'){
                that.getOrderAddress()
                if (that.editId) {
                  that.$message.success('Successful address modification!')
                } else {
                  that.defultIcon = 'el-icon-d-arrow-left'
                  that.$message.success('Added Successfully!')
                }
                that.addressFormShow = false
              } else if (res.code === 10010) {
                that.$message.warning('Sorry, you only can create 10 addresses at most.')
              } else if (res.code == 101){
                that.$message.warning('Your shipping address is invalid. Please check it.')
              } else {
                var arr = []
                for(var i in res.msg) {
                  var obj = res.msg[i][0];
                  if (i === 'entry_postcode') {
                    that.errorMsg = obj
                  } else {
                    arr.push(obj)
                    this.$message({
                      message:arr[0],
                      type: 'warning'
                    });
                  }
                }
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        })
      } else if (!that.isLogin) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var codeLoad = qs.stringify({
              entry_country: that.addNewForm.Country,
              entry_postcode: that.addNewForm.Postcode
            })
            that.$axios.post('api/customer_no_login', codeLoad).then(res => {
              if (res.code === 200) {
                var objV = {
                  Address1: that.addNewForm.Address1,
                  Address2: that.addNewForm.Address2,
                  City: that.addNewForm.City,
                  State: that.addNewForm.Province,
                  Zip5: that.addNewForm.Postcode
                }
                this.$axios.post('api/verifyaddress', qs.stringify({
                  pd_des_address: JSON.stringify(objV),
                })).then(res => {
                  if (res.Address1) {
                    var obj = {
                      id: 0,
                      entry_firstname: that.addNewForm.First,
                      entry_lastname: that.addNewForm.Last,
                      entry_company: that.addNewForm.Company,
                      entry_email_address: that.addNewForm.email,
                      entry_country: that.addNewForm.Country,
                      entry_street_address1: res.Address1,
                      entry_street_address2: res.Address2,
                      entry_city: res.City,
                      entry_state: res.State,
                      entry_postcode: res.Zip5,
                      telephone_number: that.addNewForm.Phone,
                      is_default: that.addNewForm.checked === true ? 1 : 0
                    }
                    objList.push(obj)
                    sessionStorage.setItem('addressList', JSON.stringify(objList))
                    that.getOrderAddressOut()
                    this.addressFormShow = false
                  } else {
                    that.$message.warning('Your shipping address is invalid. Please check it.')
                  }
                })
              } else {
                var arr = []
                for(var i in res.msg) {
                  var obj = res.msg[i][0];
                  if (i === 'entry_postcode') {
                    that.errorMsg = obj
                  } else {
                    arr.push(obj)
                    this.$message({
                      message:arr[0],
                      type: 'warning'
                    });
                  }
                }
              }
            })
          }
        })
      }
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
      this.addressFormShow = false
    },
    toShopcar: function () {
      this.$router.push('/')
    },
    confirmPay: function () {
      var that = this
      var ids = JSON.parse(sessionStorage.getItem('idList'))
      var coupon_id = that.couponId
      var orderAddress = that.order_Address
      // console.log('uuuuuuu', that.actIdList)
      return false
      var shipMethod = that.orderShipMethod
      var payMethod = {
        payment_module_code: 1,
        payment_method: "paypal"
      }
      var payLoad = qs.stringify({
        ids: JSON.stringify(ids),
        cc_id: coupon_id,
        pd_des_address: JSON.stringify(orderAddress),
        order_ship_delivered: JSON.stringify(shipMethod),
        pay_method: JSON.stringify(payMethod),
        score: that.inputPoint
      })
      // console.log('hhhhh', payLoad)
      that.$axios.post('api/order_pay', payLoad).then(res => {
        // console.log('hhhhh', res)
        if (res.order_num && res.total_price && res.order_id) {
          that.payByPaypal(res.total_price, res.order_num, res.order_id)
        } else if (res.code === 110) {
          var ids = JSON.parse(res.data)
          for (var i=0; i<that.goodsList.length; i++) {
            for (var j=0; j<ids.length; j++) {
              if (that.goodsList[i].sku_id === ids[j]) {
                that.goodsList[i].realNum = 1
              }
            }
          }
          this.$alert('Sorry, some products are temporarily out of stock. Please see the details on CHECKOUT REVIEW table. Then go back to cart page and update the quantity.', '', {
            confirmButtonText: 'OK',
          })
        } else if (res.code === 111) {
          var ids = JSON.parse(res.data)
          for (var i=0; i<that.goodsList.length; i++) {
            for (var j=0; j<ids.length; j++) {
              if (that.goodsList[i].sku_id === ids[j]) {
                that.goodsList[i].soldOut = 1
              }
            }
          }
        } else if (res.code == 102) {
          that.payDisabled = true
          this.$alert('No mode of transportation, please choose a new valid address.', '', {
            confirmButtonText: 'OK',
          })
          // that.$message.warning('The order has expired, Please add it again.')
        } else if (res.code === 301) {
          that.payDisabled = true
          this.$alert('The order has expired, Please add it again.', '', {
            confirmButtonText: 'OK',
          })
          // that.$message.warning('The order has expired, Please add it again.')
        } else if (res.code === 112) {
          that.payDisabled = true
          that.inputPoint = ''
          this.$alert("Point discount must not exceed the order's current total amount(not including shipping fee and taxes).", '', {
            confirmButtonText: 'OK',
            callback: action => {
              that.getBillingList()
            }
          })
        } else if (res.code === 113) {
          that.payDisabled = true
          that.inputPoint = ''
          this.$alert("Your points are not enough. Please fill it in again.", '', {
            confirmButtonText: 'OK',
            callback: action => {
              that.getBillingList()
              that.getPoints()
            }
          })
        } else if (res.code === 114) {
          that.payDisabled = true
          this.$alert("Sorry, this coupon was already used.", '', {
            confirmButtonText: 'OK',
            callback: action => {
              that.getBillingList()
              that.getCouponList()
            }
          })
        } else if (res.code === 115) {
          that.payDisabled = true
          this.$alert("Sorry, this coupon has already expired.", '', {
            confirmButtonText: 'OK',
            callback: action => {
              that.getBillingList()
              that.getCouponList()
            }
          })
        } else if (res.code == 116) {
          that.payDisabled = true
          that.$alert("商品活动已经结束.", '', {
            confirmButtonText: 'Go To Cart',
            showClose: false,
            callback: action => {
              that.$router.push('/shoppingCar')
            }
          })
        }
      })
    },
    payByPaypal: function (total, order, id) {
      var that = this
      var payUrl = ''
      var payLoad = qs.stringify({
        amount: total,
        order_number: order,
        order_id: id
      })
      that.$store.state.addCartState = true
      that.modelShow2 = true
      that.$axios.post('api/paypal-pay', payLoad).then(res => {
        if (res.code === '200' || res.code === 200) {
          // console.log('11111111', res.data)
          payUrl = res.data
          window.location.href = payUrl
          // var iWidth=500; // 弹出窗口的宽度;
          // var iHeight=600; // 弹出窗口的高度;
          // var iTop = (window.screen.availHeight-30-iHeight)/2; // 获得窗口的垂直位置;
          // var iLeft = (window.screen.availWidth-10-iWidth)/2; // 获得窗口的水平位置;
          // var winObj = window.open(payUrl, "newwindow", "height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft+", status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no");
          // var loop = setInterval(function() {
          //   console.log('rrrrul', parent.window.opener)
          //   if(winObj.closed) {
          //     clearInterval(loop);
          //     that.modelShow2 = false
          //   }
          // }, 500);
        } else {
          that.$message.warning(res.msg)
          that.modelShow2 = false
        }
      })
    },
    paySub: function (formName, formName1) {
      var that = this
      if (that.radio) {
        if (that.checkedSub) {
          $('.payConfirm').removeClass('error')
          if (formName) {
            if (that.radio3 === '1') {
              // console.log('你选择了第一种支付方式')
              that.confirmPay()
            }else if (that.radio3 === '2') {
              if (that.checked) {
                that.$refs[formName].validate((valid) => {
                  if (valid) {
                    // console.log('tttttt')
                  }
                })
              } else {
                // console.log('666666666')
                that.$refs[formName].validate((valid) => {
                  that.$refs[formName1].validate((valid1) => {
                    if (valid && valid1) {
                      // console.log('tttttt')
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

<style scoped lang="scss">
  .timeRange.noStartTime{
    line-height: 42px;
  }
  @import "@/assets/css/orderConfirm.scss"
</style>
