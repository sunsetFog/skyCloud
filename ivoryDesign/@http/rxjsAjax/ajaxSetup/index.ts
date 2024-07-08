import { beforeCatchError, afterCatchError, detectError } from './errorHandler';
export default function ajaxSetup({ url, method, headers = {} as any, body, ...rest }) {
    return {
        url,
        method,
        body,
        // 设定自定义http header
        headers: {
            'X-API-PLAT': 'bd',
            'X-API-TOKEN': 'token',
            'Content-Type': headers['Content-Type'] || 'application/json',
        },
        // 继续将错误抛出，允许当前stream上的其他pipe也可以捕获异常，并作自定义处理
        beforeCatchError,
        // 检测可能出现的业务异常
        detectError,
        // 重试次数，可以被具体get, post等方法重设
        // retryTimes: 2,
        // 继续将错误抛出，允许当前stream上的其他pipe也可以捕获异常，提供自定义处理的机会
        afterCatchError,
        transformData: (ajaxResponse) => {
            console.log('--5--transformData');
            return ajaxResponse.response;
        },
        ...rest,
    };
}
