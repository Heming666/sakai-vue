// Http请求封装
import axios, { AxiosInstance } from 'axios';
import { Message } from './Message';

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
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    // 响应拦截器
    private static responseInterceptor() {

        // 对返回结果进行统一处理
        this.axiosInstance.interceptors.response.use(
            response => {
                // 对返回结果进行统一处理
                if (response.status === 200) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
            },
            error => {
                // 对返回错误进行统一处理
                if (error.response.status) {
                    switch (error.response.status) {
                        case 401:
                            Message.Error('错误', '登录过期，请重新登录');
                            localStorage.removeItem('token');
                            break;
                        case 403:
                            Message.Error('错误', '拒绝访问');
                            break;
                        case 404:
                            Message.Error('错误', '请求错误，未找到该资源');
                            break;
                        case 500:
                            Message.Error('错误', '服务端错误');
                            break;
                        default:
                            Message.Error('错误', error.response.data.message);
                            break;
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
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.data);
                });
        });
    }
    // Post请求
    public static Post(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .post(url, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.data);
                });
        });
    }
    // Put请求
    public static Put(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .put(url, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.data);
                });
        });
    }
    // Delete请求
    public static Delete(url: string, params?: any) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .delete(url, { params })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.data);
                });
        });
    }
}