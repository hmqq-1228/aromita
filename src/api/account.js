import { get, post } from "../utils/http.js";

//个人中心首页用户信息
export const myAccount = params =>get("api/myaccount",params);
//个人中心优惠券积分等
export const couponcount = params =>get("/api/couponcount",params);
//个人中心详情
export const myAccountSet = params =>get("api/accountset",params);
//修改个人信息
export const accountPerson = params =>post("api/accountperson",params);
//修改密码
export const accountPass = params =>post("api/accountpass",params)
//我的订单
export const myOrder = params=>get("api/myorder",params);
//取消订单
export const cancelOrder = params =>post("api/cancelOrder",params);
//添加地址
export const addAddress = params =>post("api/addressbook",params);
//地址列表
export const address = params =>get("api/address",params);
//设为默认地址
export const setdefault = params =>post("/api/setdefault",params);
//心愿单列表
export const wishlist = params =>get("api/wishlist",params);
//添加心愿单
export const addwishlist = params =>post("api/wishlist",params)
