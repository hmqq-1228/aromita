import axios from "axios";
import qs from "qs";


axios.defaults.baseURL ='';//开发

axios.defaults.timeout = 60 * 1000;
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'};

// request全局拦截
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

// response全局拦截
axios.interceptors.response.use(response => {
    // code处理
    const code = response.data.code;
    // 203||服务端登录 && ....
    // if (code === 203) {
    //     Message({
    //         message: "登录已过期",
    //         type: 'error',
    //         duration: 5 * 1000
    //     });
    //     // 登出
    //     //Cookie.remove("token");
    //     Cookie.remove("hashToken");
    //     if (!location.href.includes('#/login')) {
    //         let login_url = '#/login';
    //         // console.log('isMengtian', isMengtian)
    //         if (isMengtian) {
    //             login_url = '#/login_mt';
    //         }
    //         location.href = login_url + '?redirectUrl=' + encodeURIComponent(location.href) + '&u=' + encodeURIComponent(Store.get('username'));
    //         location.reload();
    //     }
    // } else if (code === 299) {
    //     Message({
    //         message: response.data.message || "没有权限",
    //         type: 'error',
    //         duration: 5 * 1000
    //     });
    //     return Promise.reject(response.data)
    // } else {
    //     let $terrace = document.querySelector('.terrace');
    //     if ($terrace) {
    //         $terrace.classList.remove('hide');
    //     }
    //     //超过最大限制2000000字节
    //     if ((response.data.message || '').indexOf('超过最大限制') > -1) {
    //         Message({
    //             message: response.data.message,
    //             type: 'error'
    //         });
    //     }
    //     return response
    // }
    return response.data
}, error => {
    Message({
        message: error.response || "系统异常",
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.reject(error.response)
});

export const post = (url, params, config = {}) => {
    return axios({
        method: 'post',
        url: url,
        data: qs.stringify(params)
    })
}

export const get = (url, params, config = {}) => {
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
// var http = axios.create({
//     // baseURL:"http://arapi.panduo.com.cn/",
//     timeout:5000
// })
// //请求拦截
// http.interceptors.request.use((config)=>{
//     // if(config.method == "post"){
//     //     config.data = qs.stringify(config.data);
//     // }
//     return config;
// },(err)=>{
//     return Promise.reject(err)
// })
// //响应拦截
// http.interceptors.response.use((res)=>{
//   if (res.config.method === 'post') {
//     console.log('0000000', res)
//     res.config.data = qs.stringify(res.config.data);
//     res.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   }
//     return res.data
// },(err)=>{
//     return Promise.reject(err)
// })


// export default (method,url,data = null)=>{
//     if(method === "post"){
//       console.log('4444', url)
//       console.log('8888', data)
//       return http.post(url,data);
//     }else if(method === "get"){
//         return http.get(url,{params:data})
//     }else{
//         return;
//     }
// }
