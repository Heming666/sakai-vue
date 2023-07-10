// Http请求封装
import axios, { AxiosInstance } from 'axios';
import { Message } from './Message';
import router from './../router/index';

// 基于axios的Http请求封装,用于统一管理Http请求
// 这个类不需要实例化就可以直接使用它里面的方法
// 请求前需要对请求头添加token，并对返回结果进行统一处理，包括错误处理
// 只需要用到常用的 Get Post Put Delete 四种请求方式
export class HttpClient {
    // 配置拦截器
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    // 请求拦截器
    private static requestInterceptor() {
        // 在请求之前对请求头添加token
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },
            (error) => {
                Message.Error('请求拦截器->错误', error);
                return Promise.reject(error);
            }
        );
    }
    // 响应拦截器
    private static responseInterceptor() {
        // 对返回结果进行统一处理
        this.axiosInstance.interceptors.response.use(
            (response) => {
                // 对返回结果进行统一处理
                if (response.status === 200) {
                    return Promise.resolve(response);
                } else {
                    Message.Error('响应拦截器->错误', response.data);
                    return Promise.reject(response);
                }
            },
            (error) => {
                // 对返回错误进行统一处理
                if (error.response.status) {
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
                            Message.Error('服务器未知错误', error.response.data);
                            return Promise.reject(error);
                    }
                    return Promise.reject(error.response);
                }
            }
        );
    }
    // Get请求
    public static Get(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .get(url, { params })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    Message.Error('网络错误', error.message);
                    reject(error.data);
                    return Promise.reject(error);
                });
        });
    }
    // Post请求
    public static Post(url: string, params?: any) {
        try {
            return new Promise((resolve, reject) => {
                this.axiosInstance
                    .post(url, params)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        Message.Error('网络错误', error.message);
                        reject(error.data);
                        return Promise.reject(error);
                    });
            });
        } catch (e) {
            return false;
        }
    }
    // Put请求
    public static Put(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .put(url, params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    Message.Error('网络错误', error.message);
                    reject(error.data);
                    return Promise.reject(error);
                });
        });
    }
    // Delete请求
    public static Delete(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .delete(url, { params })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    Message.Error('网络错误', error.message);
                    reject(error.data);
                    return Promise.reject(error);
                });
        });
    }
}
