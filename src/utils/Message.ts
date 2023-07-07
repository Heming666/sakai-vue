import {useToast} from "primevue/usetoast";
//基于Primevue/useToast的消息提示帮助类，用于统一管理消息提示
// 包括 Info，Success，Warn，Error四种不同的消息类型
// 这个类不需要实例化就可以直接使用它里面的方法
const toastService = useToast();
export class Message {
    public static Info(title: string, message: string) {
        toastService.add({
            severity: 'info',
            summary: title,
            detail: message,
            life: 3000
        });
    }
    public static Success(title: string, message: string) {
        toastService.add({
            severity: 'success',
            summary: title,
            detail: message,
            life: 3000
        });
    }
    public static Warn(title: string, message: string) {
        toastService.add({
            severity: 'warn',
            summary: title,
            detail: message,
            life: 3000
        });
    }
    public static Error(title: string, message: string) {
        toastService.add({
            severity: 'error',
            summary: title,
            detail: message,
            life: 3000
        });
    }
}