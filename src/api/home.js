import { get, post } from "../utils/http.js";

// Best Seller商品信息
export const homeSeller = params=>get("api/homeproducts/10",params);
//NEW Arrivai 信息
export const homeArrivai = params=>get("api/homeproducts/20",params);
// 首页banner信息
export const homeBanner = params=>get("/api/homelayout/10",params);
//Collections区信息
export const homeCollections = params=>get("/api/homelayout/20",params);
//Hot Style in Social Medias信息
export const homeHotStyle = params=>get("/api/homelayout/30",params);
// 40
export const homeIcon = params=>get("/api/homelayout/40",params);
//  50
export const homeFootTitle = params=>get("/api/homelayout/50",params);
// 60
export const loginImage = params=>get("/api/homelayout/60",params);
export const homeFoote = params=>get("/api/footertools",params);
export const getGoodsList = params=>get("/api/product",params);


//自定义            // 请求方式   //接口的路径名字        一个大的页面是一个api  js文件
