/* eslint-disable no-param-reassign */
import ExtendableError from './ExtendableError';

interface IAjaxContext {
    status?;
    xhr?;
    message?: string;
}
/*
    连接异常
*/
class ConnectionError extends ExtendableError {
    context;

    constructor(context: IAjaxContext = {}) {
        super(ConnectionError.EnhanceMessage(context));

        this.code = context.status;
        this.context = context;
    }

    static TIMEOUT_MSG = '连接超时，请稍后再试。';
    static OFFLINE_MSG = '网络链接已断开，请检查后再试。';
    static CLOSE_MSG = '连接被终止，请检查后再试。';

    static EnhanceMessage({ status, xhr, message = '' }: IAjaxContext) {
        if (status === 0) {
            if (navigator.onLine) {
                return message.indexOf('timeout') !== -1
                    ? ConnectionError.TIMEOUT_MSG
                    : ConnectionError.CLOSE_MSG;
            } else {
                return ConnectionError.OFFLINE_MSG;
            }
        }

        if (xhr) {
            return xhr.statusText;
        }

        return message;
    }
}

export default ConnectionError;
