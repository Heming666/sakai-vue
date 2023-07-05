// Http请求封装
import axios, {AxiosInstance} from 'axios';
import {Message} from "../Message/Message";

// 声明 Promise<any> 类型

class HttpClient {
    private Instance: AxiosInstance;
    private Message: Message;
    constructor() {
        this.Instance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        }
    public async Get(url: string, params: any): Promise<any> {
        this.Instance.get(url, params).then((response) => {
            return response;

        }).catch((error) => {
           this.Message.Error('错误',error);
        });
    }

    public async Post(url: string, params: any): Promise<any> {
        this.Instance.post(url, params).then((response) => {
            return response;

        }).catch((error) => {
            this.Message.Error('错误',error);
        });
    }
}
