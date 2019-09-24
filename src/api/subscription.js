import { get, post } from "../utils/http.js";

// 未登录用户订阅
export const Nosubscribe = params=>post("/api/subscribe_no_register",params);

//客户注册是勾选订阅
export const registeSubscribe = params =>post("/api/register_subscribe_newsletter",params)

//个人中心我的订阅界面展示
export const mysubscribe = params => post("/api/mysubscribe",params)

//个人中心登录客户订阅
export const yesSubscribe = params =>post("/api/subscribe",params)

//退订界面显示
export const delSubscribe = params =>post("/api/unsubscribe_index",params)
