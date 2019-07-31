import { get, post } from "../utils/http.js";
// http://www.aromita.com/api/homeproducts/10
// 登录
export const handleLogin = params=>post("/api/login",params);
//退出登录
export const userLogout = params =>post("/api/logout",params);
// 注册
export const handleRegist = params=>post("/api/register",params);
// 登录验证码
export const handleCatpchas = params=>post("/api/logincatpcha",params);
//注册验证码
export const Catpcha = params=>post("/api/registercatpcha",params);
// 忘记密码
export const forgetPassword = params=>post("/api/forget",params);
// 修改密码
export const resetPassword = params=>post("/api/reset",params);
// 查询购物车商品数量
export const getcartgoodscount = params=>post("/api/getcartgoodscount",params);
//获取购物车列表
export const getGoodsList = params=>get("/api/cart",params);
// 添加订单
export const orderAdd = params=>post("/api/orderproductlist",params);
// 获取账单
export const billingList = params=>post("/api/showBillingList",params);
// 获取订单地址
export const orderAddress = params=>get("/api/address",params);
// 修改地址
export const editAddress = params=>get("/api/address",params);
// 删除地址
// export const deleteAddress = params=>deletes("/api/address",params);
// 单个删除购物车商品
// export const deleteGoods = params=>post("get","/api/deltoCart",params);
// 查询商品sku数量
// export const getSkuNum = params=>post("get","/api/cart/maxskuid",params);
// 合并商品 merge
export const mergeGoods = params=>get("/api/cart/datamerging",params);
// 商品导航
export const category = params=>get("/api/category/index/category",params);
