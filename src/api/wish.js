import { get, post } from "../utils/http.js";
//心愿单列表
export const wishlist = params =>get("api/wishlist",params);
//添加心愿单
export const addwishlist = params =>post("api/wishlist",params)