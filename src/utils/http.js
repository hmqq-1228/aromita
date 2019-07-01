import axios from "axios";
import qs from "qs";

var http = axios.create({
    // baseURL:"http://arapi.panduo.com.cn/",
    timeout:5000
})
//请求拦截
http.interceptors.request.use((config)=>{
    // if(config.method == "post"){
    //     config.data = qs.stringify(config.data);
    // }
    return config;
},(err)=>{
    return Promise.reject(err)
})
//响应拦截
http.interceptors.response.use((res)=>{
    return res.data
},(err)=>{
    return Promise.reject(err)
})


export default (method,url,data = null)=>{
    if(method == "post"){
        return http.post(url,data);
    }else if(method == "get"){
        return http.get(url,{params:data})
    }else{
        return;
    }
}
