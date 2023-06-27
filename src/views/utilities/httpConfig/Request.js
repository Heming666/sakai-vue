import axios from 'axios';
import router from '@/router/index.js';

const ApiConfig = (config) => {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: 'https://localhost:7087/',
        timeout: 10000
    });
    // 请求拦截器配置
    instance.interceptors.request.use(
        (config) => {
            // config.headers.Authorization = window.sessionStorage.getItem('token')
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.error(error);
        }
    );
    // 响应拦截器配置
    instance.interceptors.response.use(
        (response) => {
            console.log(response);
            return response.data;
        },
        (error) => {
            switch (error.response.status) {
                case 401:
                    console.log('无权访问');
                    router.push({ path: '/auth/access' });
                    break;
                case 403:
                    console.log('token过期啦');
                    router.push({ path: '/auth/login' });
                    break;
                case 404:
                    console.log('404啦');
                    router.push({ path: '/pages/notfound' });
                    break;
                case 500:
                    console.log('500啦');
                    router.push({ path: '/auth/error' });
                    break;
                default:
                    return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
    // 发送真正的网络请求
    return instance(config);
};

const Request = {
    get(url, params = {}) {
        const config = {
            method: 'get',
            url: url
        };
        if (params) config.params = params;
        return ApiConfig(config);
    },
    post(url, params) {
        const config = {
            method: 'post',
            url: url
        };
        if (params) config.data = params;
        return ApiConfig(config);
    },
    put(url, params) {
        const config = {
            method: 'put',
            url: url
        };
        if (params) config.params = params;
        return ApiConfig(config);
    },
    delete(url, params) {
        const config = {
            method: 'post',
            url: url
        };
        if (params) config.params = params;
        return ApiConfig(config);
    }
};
export default Request;
