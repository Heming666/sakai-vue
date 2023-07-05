// Http请求封装
import axios, {AxiosInstance} from 'axios';
import {Message} from "../Message/Message";

// 声明 Promise<any> 类型
const  msg = new Message();
class HttpClient {
     Instance: AxiosInstance;
    constructor() {
        this.Instance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });

        }
    public static async Get(url: string, params: any){
        this.Instance.get(url, params).then((response) => {
            return response;

        }).catch((error) => {
            msg.Error('错误',error);
        });
    }

    public static async Post(url: string, params: any) {
        this.Instance.post(url, params).then((response) => {
            return response;

        }).catch((error) => {
            msg.Error('错误',error);
        });
    }
}
