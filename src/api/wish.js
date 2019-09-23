import { get, post } from "../utils/http.js";
//心愿单列表
export const wishlist = params =>get("api/wishlist",params);
//添加心愿单
export const addwishlist = params =>post("api/wishlist",params);
//删除心愿单
export const delwishlist = params =>post("/api/delwishlist",params)
// api/removewishlist
//清除失效商品
export const removewishlist = params =>post("/api/removewishlist",params)
