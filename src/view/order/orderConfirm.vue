<template>
<div class="orderConfirm">
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
        <div class="navTitle">Shipping Address</div>
        <div class="address">
          <div class="addressItem">
            <div class="itemName"><el-radio v-model="radio" label="1"><i class="el-icon-s-custom" style="color: #ccc;"></i> Rosie Eva</el-radio></div>
            <div class="itemAddress">
              <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
              <div class="addressText">bcjkdbsfhniodheiof, cnjdskagvcvn, new york, Alabama, United States, 12456. we are we are we are we are</div>
            </div>
            <div class="itemPone"><i class="el-icon-phone" style="width: 14px;height: 14px;"></i> <span>1234567890</span></div>
            <div class="itemDefault"><span>Default</span></div>
            <div class="itemOption">
              <div>Edit</div>
              <div>Remove</div>
            </div>
          </div>
          <div class="addressItem">
            <div class="itemName"><el-radio v-model="radio" label="2"><i class="el-icon-s-custom" style="color: #ccc;"></i> Rosie Eva</el-radio></div>
            <div class="itemAddress">
              <i class="el-icon-location-outline" style="width: 12px; height: 15px;"></i>
              <div class="addressText">bcjkdbsfhniodheiof, cnjdskagvcvn, new york, Alabama, United States, 12456. we are we are we are we are</div>
            </div>
            <div class="itemPone"><i class="el-icon-phone" style="width: 14px;height: 14px;"></i> <span>1234567890</span></div>
            <div class="itemDefault"><span>Default</span></div>
            <div class="itemOption">
              <div>Edit</div>
              <div>Remove</div>
            </div>
          </div>
          <div class="showMore"><i class="el-icon-d-arrow-left"></i></div>
          <div class="addNew"><i class="el-icon-plus" style="color: #ccc;font-size: 18px;"></i> Add a new address</div>
        </div>
        <div class="navTitle">Shipping Method</div>
        <div class="shopBox">
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="1"> Rosie Eva</el-radio></div>
            <div>5-7 workdays</div>
            <div>$ 3.67</div>
          </div>
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="2"> Rosie Eva</el-radio></div>
            <div>5-7 workdays</div>
            <div>$ 5.67</div>
          </div>
          <div class="shopItem">
            <div class="shopName"><el-radio v-model="radio2" label="3"> Rosie Eva</el-radio></div>
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
            <div class="goodsItem">
              <div class="goodName">
                <div class="goodImg"></div>
                <div class="goodsText">
                  <div class="nameInfo">Wholesale - (Grade D) Blue Sand Stone (Imitation) Yoga Healing Gemstone Pen dants Silver Tone Deep Blue</div>
                  <div><span style="color: #999;">size: <span style="color: #333;">3.0mm</span></span></div>
                  <div class="price">$ 1.99 <span>$ 3.33</span></div>
                </div>
              </div>
              <div style="width: 200px;line-height: 108px;font-size: 14px">1</div>
              <div class="totalPay">$ 99.99</div>
            </div>
            <div class="goodsItem">
              <div class="goodName">
                <div class="goodImg"></div>
                <div class="goodsText">
                  <div class="nameInfo">Wholesale - (Grade D) Blue Sand Stone (Imitation) Yoga Healing Gemstone Pen dants Silver Tone Deep Blue</div>
                  <div><span style="color: #999;">size: <span style="color: #333;">3.0mm</span></span></div>
                  <div class="price">$ 1.99 <span>$ 3.33</span></div>
                </div>
              </div>
              <div style="width: 200px;line-height: 108px;font-size: 14px">1</div>
              <div class="totalPay">$ 99.99</div>
            </div>
            <div class="goodsItem">
              <div class="goodName">
                <div class="goodImg"></div>
                <div class="goodsText">
                  <div class="nameInfo">Wholesale - (Grade D) Blue Sand Stone (Imitation) Yoga Healing Gemstone Pen dants Silver Tone Deep Blue</div>
                  <div><span style="color: #999;">size: <span style="color: #333;">3.0mm</span></span></div>
                  <div class="price">$ 1.99 <span>$ 3.33</span></div>
                </div>
              </div>
              <div style="width: 200px;line-height: 108px;font-size: 14px">1</div>
              <div class="totalPay">$ 99.99</div>
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
          <el-form v-if="!checked" :model="shipForm" :rules="rules" ref="shipForm" label-width="120px" class="demo-ruleForm" style="margin-top: 20px;">
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
            <el-form-item label="Mobie/Phone:" prop="Phone">
              <el-input v-model="shipForm.Phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="payDiv">

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
export default {
  components: {
    "header-com": Header,
    "footer-com": Footer
  },
  name: "orderConfirm",
  data () {
    return {
      radio: '1',
      radio2: '1',
      radio3: '1',
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
      checked: true,
      rules:{
        number: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
      }
    };
  }
}
</script>

<style scoped>
  .payDiv{
    width: 380px;
    height: 321px;
    border: 1px solid #E9E9E9;
    font-size:14px;
    font-family:Tahoma;
    position: fixed;
    top: 192px;
    right: 10%;
    z-index: 99999;
    background-color: #fff;
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
    z-index: 888;
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
    z-index: 666;
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
    height: 40px;
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
