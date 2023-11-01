import axios from 'axios';

const baseURL = ''; // 定义接口请求的默认根域名

// 基础路径
const instance = axios.create({
    baseURL: baseURL,
});

// 添加请求拦截器
instance.interceptors.request.use(
    (requestConfig) => {
        // const token = {};
        return requestConfig;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // do something...
        // 对返回值进行了处理
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export { default as axios } from 'axios';

// get请求
export const get = (url, arg) => {
    if (arg.baseURL) {
        let baseUrl = arg.baseURL;
        delete arg.baseURL;
        return instance.get(url, {params: arg, baseURL: baseUrl});
    } else {
        return instance.get(url, {params: arg});
    }
}

// post请求
export const post = (url, arg) => {
    // 包含baseURL字段时，替换默认的请求根域名
    if (arg.baseURL) {
        let baseUrl = arg.baseURL;
        delete arg.baseURL;
        return instance.post(url, {params: arg, baseURL: baseUrl});
    } else {
        return instance.post(url, {params: arg});
    }
}

export default instance;
