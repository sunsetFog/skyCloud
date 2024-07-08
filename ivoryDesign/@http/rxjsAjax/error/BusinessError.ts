import ExtendableError from './ExtendableError';
/*
    业务异常
*/
export class BusinessError extends ExtendableError {
    response;

    /**
     * @param {Number} code 接口状态码
     * @param {String} message 接口状态消息
     * @param {Object} response 接口响应数据
     */
    constructor(code, message, response) {
        super(message || 'Business Error');

        this.code = code;
        this.response = response;
    }
    static TOKEN_EXPIRED = 6001;
    static TOKEN_EXPIRED_MSG = '会话超时';
    // static DONE = 6000;
    static DONE = 200;
    static SECURITY_RISK = 6016;
    static VERIFY_ACCOUNT = 6032; // 未绑定密保
}

export default BusinessError;
