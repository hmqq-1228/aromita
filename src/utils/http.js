import axios from "axios";
import qs from "qs";
//axios.defaults.baseURL ='https://arapi.panduo.com.cn/';//测试开发
if(process.env.API_ROOT){
    axios.defaults.baseURL = process.env.API_ROOT;
}else{
    axios.defaults.baseURL = ''
}
//本地开发
axios.defaults.timeout = 60 * 1000;
axios.default.headers ={
    'Access-Control-Allow-Credentials':'true',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
    'Access-Control-Allow-Headers': 'cache-control,content-type,hash-referer,x-requested-with',
    'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    'Access-Control-Allow-Origin':'*'
}

// request全局拦截
axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded,multipart/form-data';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    config.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,PUT,DELETE';
    let token = window.localStorage.getItem("userToken")
    if (token) {
        config.headers.Authorization = `bearer ${token}`;    //将token放到请求头发送给服务器
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response全局拦截
axios.interceptors.response.use(response => {
  response.headers['Content-Type'] = 'application/x-www-form-urlencoded,multipart/form-data';
  response.headers['Access-Control-Allow-Origin'] = '*';
  response.headers['Access-Control-Allow-Credentials'] = 'true';
  response.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,PUT,DELETE';
    return response.data
}, error => {
    return Promise.reject(error.response)
});

export const post = (url, params, config = {}) => {
    return axios({
        method: 'post',
        url: url,
        data: qs.stringify(params)
    })
}

export const get = (url,params,config = {}) => {
    return axios({
        method: 'get',
        url: url,
        params: params
    })

}

export const deletes = (url, params, config = {}) => {
    return axios({
        method: 'delete',
        url: url,
        params: params
    })
}

export const baseURL = axios.defaults.baseURL;
