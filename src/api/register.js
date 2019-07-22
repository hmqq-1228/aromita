import http from "../utils/http.js";
// http://www.aromita.com/api/homeproducts/10
// 登录
export const handleLogin = params=>http("post","/api/login",params);
// 注册
export const handleRegist = params=>http("post","/api/register",params);
// 登录验证码
export const handleCatpchas = params=>http("post","/api/logincatpcha",params);
//注册验证码
export const Catpcha = params=>http("post","/api/registercatpcha",params);
// 忘记密码
export const forgetPassword = params=>http("post","/api/forget",params);
// 修改密码
export const resetPassword = params=>http("post","/api/reset",params);
// 查询购物车商品数量
export const getcartgoodscount = params=>http("post","/api/getcartgoodscount",params);
//获取购物车列表
export const getGoodsList = params=>http("get","/api/cart",params);
// 单个删除购物车商品
// export const deleteGoods = params=>http("get","/api/deltoCart",params);
// 查询商品sku数量
// export const getSkuNum = params=>http("get","/api/cart/maxskuid",params);
// 合并商品 merge
export const mergeGoods = params=>http("get","/api/cart/datamerging",params);
// 商品导航
export const category = params=>http("get","/api/category/index/category",params);
