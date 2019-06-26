import http from "../utils/http.js";
// http://www.aromita.com/api/homeproducts/10
// Best Seller商品信息
export const homeSeller = params=>http("get","api/homeproducts/10",params);
//NEW Arrivai 信息
export const homeArrivai = params=>http("get","api/homeproducts/20",params);
// 首页banner信息
export const homeBanner = params=>http("get","/api/homelayout/10",params);
//Collections区信息
export const homeCollections = params=>http("get","/api/homelayout/20",params);
//Hot Style in Social Medias信息
export const homeHotStyle = params=>http("get","/api/homelayout/30",params);
// 40
export const homeIcon = params=>http("get","/api/homelayout/40",params);
//  50
export const homeFootTitle = params=>http("get","/api/homelayout/50",params);
export const homeFoote = params=>http("get","/api/footertools",params);