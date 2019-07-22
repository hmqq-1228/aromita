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
  if (res.config.method === 'post') {
    console.log('0000000', res)
    res.config.data = qs.stringify(res.config.data);
    res.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
    return res.data
},(err)=>{
    return Promise.reject(err)
})


export default (method,url,data = null)=>{
    if(method === "post"){
      console.log('4444', url)
      console.log('8888', data)
      return http.post(url,data);
    }else if(method === "get"){
        return http.get(url,{params:data})
    }else{
        return;
    }
}
