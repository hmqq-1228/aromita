import { get, post } from "../utils/http.js";

//个人中心首页
export const myAccount = params =>get("api/accountset",params);
//修改个人信息
export const accountPerson = params =>post("api/accountperson",params);
//修改密码
export const accountPass = params =>post("api/accountpass",params)
//我的订单
export const myOrder = params=>get("api/myorder",params);
//添加地址
export const addAddress = params =>post("api/addressbook",params);
//地址列表
export const address = params =>get("api/address",params);
