import {useToast} from "primevue/usetoast";
/**
 * Toast Message 类
 */
export class Message {
    /**
     * 消息是否显示关闭按钮
     * @type {boolean}
     * @memberof Message
     * @example
     * ```ts
     * const message = new Message();
     * message.showClose = true;
     * ```
     * @default true
     */
    showClose: boolean;
    /**
     * 消息是否显示图标
     * @type {boolean}
     * @memberof Message
     * @example
     * ```ts
     *  const message = new Message();
     *  message.showIcon = true;
     *  ```
     *  @default true
     */
    showIcon: boolean;
    /**
     * 消息是否显示标题
     *  @type {boolean}
     *  @memberof Message
     *  @example
     *  ```ts
     *  const message = new Message();
     *  message.showTitle = true;
     *  ```
     *  @default true
     *  @description
     *  消息是否显示标题
     *
     */

    showTitle: boolean;
    /**
     * 消息是否显示关闭按钮
     * @type {boolean}
     * @memberof Message
     * @example
     * ```ts
     * const message = new Message();
     * message.showClose = true;
     * ```
     * @default true
     * @description
     * 消息是否显示关闭按钮
     */
    showCloseButton: boolean;

    constructor() {
        this.showClose = false;
        this.showIcon = true;
        this.showTitle = true;
        this.showCloseButton = true;
    }
    /**
     * 方法：显示消息
     */
    Info( Title: string,Content: string,Duration: number=3000) {
        const toast = useToast();
        toast.add({
            detail: Content,
            life: Duration  ,
            summary: Title,
            severity: 'info',
        });
    }
    Success( Title: string,Content: string,Duration: number=3000) {
        const toast = useToast();
        toast.add({
            detail: Content,
            life: Duration  ,
            summary: Title,
            severity: 'success',
        });
    }
    Warning( Title: string,Content: string,Duration: number=3000) {
        const toast = useToast();
        toast.add({
            detail: Content,
            life: Duration  ,
            summary: Title,
            severity: 'warn',
        });
    }
    Error( Title: string,Content: string,Duration: number=3000) {
        const toast = useToast();
        toast.add({
            detail: Content,
            life: Duration  ,
            summary: Title,
            severity: 'error',
        });
    }
}
