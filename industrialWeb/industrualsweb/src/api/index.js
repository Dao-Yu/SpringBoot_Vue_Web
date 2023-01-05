import axios from "axios";
import store from "@/store";


import storage from "@/util/storage";
//创建axios实例
const request = axios.create({
    baseURL:'http://localhost:8081/',
//    超时
    timeout:10000,
//    设置前后端数据交互格式为json
    headers:{'Content-Type':'application/json;charset=utf-8'}
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (store.state.user.token) {
        // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers['Authorization'] = store.state.user.token
        // config.headers['Authorization'] = storage.getSessionObject("loginUser").UserList.token;

    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default request


