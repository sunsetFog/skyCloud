/*
Sunny.js 是一个轻量级的前端 JavaScript 框架
https://sunnylabs.github.io/sunny.js/
提供了一套简单直观的 API
简单易用的同时,也提供了丰富的功能特性和出色的性能表现
*/
import { AjaxCancelError, BusinessError, ConnectionError, trimEnd, trimStart } from 'sunny-js';
import { errorHandler, replaceErrorMessage } from './error/errorHandler';
import tools from '@/@energy/tools';
const { isBrowser } = tools;
import { sharedHeaders } from './sharedHeaders';


// 域名与url拼接
function withBaseUrl(url: string): string {
    const separator = '/';
    // 有https不需要拼接
    if (/^https?/.test(url)) {
        return url;
    } else {
        return [
            // 清除尾部空格
            trimEnd(isBrowser() ? '' : process.env.REACT_APP_API_BASE_URL, separator),
            separator,
            // 清除首部空格
            trimStart(url, separator),
        ].join('');
    }
}
/*
参数选项-类型

RequestInit 是一个 TypeScript 接口,定义了 fetch 函数的请求配置选项的类型
interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    integrity?: string;
    keepalive?: boolean;
    signal?: AbortSignal | null;
    window?: any;
}

& RequestInit 使用交叉类型运算符 &，与 RequestInit 类型合并,形成一个新的类型 FetchOptions
*/
type FetchOptions = {
    url: string;
    timeout?: number;
    signal?: any;
    blob?: boolean;
    // 重连次数
    reconnectCount?: number;
} & RequestInit;
// 参数选项
export async function normalizeFetchOptions(params: FetchOptions): Promise<FetchOptions> {
    let _params: RequestInit;
    let { url, ...rest } = params;
    // 处理headers
    if (rest.headers instanceof Headers) {
        const customHeaders = {} as Record<string, any>;
        rest.headers.forEach((v, k) => (customHeaders[k] = v));
        // 浅拷贝
        rest.headers = Object.assign(await sharedHeaders(params?.blob), customHeaders);
    } else {
        rest.headers = Object.assign(await sharedHeaders(params?.blob), rest.headers);
    }
    _params = { ...rest };

    return {
        // 处理url
        url: withBaseUrl(url),
        ..._params,
    };
}
// 成功的数据类型
export interface ResponseData<TData = any> {
    status_code: number;
    code: number | string;
    data: TData;
    message: string;
}

/*
fetch代理函数
TResponse是泛型
=是默认类型

在 JavaScript 中,fetch 是一个内置的全局函数,不需要进行任何导入或引用就可以直接使用。
 */
export async function fetchProxy<TResponse = Response | ResponseData>(
    params: FetchOptions,
): Promise<TResponse> {
    let { url: _url, ...rest } = await normalizeFetchOptions(params);
    // 请求超时处理
    let timeout = 20000;
    let isTimeout = false;
    if (typeof params === 'object') {
        timeout = params.timeout || timeout;
    }
    // AbortController浏览器原生提供的 API,用于控制 fetch 和其他异步操作的取消
    // @ts-ignore
    const controller = new AbortController() as any;
    const ajaxTimeoutId = setTimeout(() => {
        isTimeout = true;
        // 取消异步
        controller.abort();
    }, timeout);
    rest.signal = rest.signal || controller.signal;

    return fetch(_url, rest)
        .then<any>((response: Response) => {
            // console.log("fetch的response", response);
            // 替换报错信息
            if (!response?.ok) {
                throw new ConnectionError({
                    status: response?.status,
                    message: replaceErrorMessage(response?.statusText),
                });
            }

            let parsedResponse: Promise<ResponseData>;
            try {
                parsedResponse = response.text().then((text) => JSON.parse(text));
            } catch (e) {
                parsedResponse = response.json();
            }
            return parsedResponse.then((data: ResponseData) => {
                return data;
                // 接口catch回调
                // return Promise.reject(new BusinessError(code, message, data));
            });
            // 接口then回调，这似乎不需要
            return Promise.resolve(response);
        })
        .catch((error) => {
            // 处理异常
            if (error.name && error.name.toLowerCase().includes('abort')) {
                error = isTimeout
                    ? new ConnectionError({ status: 0, message: 'timeout' }) // 超时异常
                    : new AjaxCancelError(); // 请求被取消异常
            }
            let isNeedReplace = false;
            const abnormalErrors = ['Acceptable', 'Failed', '发生了SSL错误', 'Forbidden'];
            abnormalErrors.forEach((item) => {
                if ((error.message || '').toLowerCase().indexOf(item.toLowerCase()) !== -1) {
                    isNeedReplace = true;
                }
            });
            if (isNeedReplace) {
                error = new Error('网络异常,请您稍后重试');
            }
            // 监听异常
            errorHandler(error);
            // 接口catch回调
            return Promise.reject(error);
        })
        .finally(() => {
            // 已ok，清除定时器就不会取消异步
            clearTimeout(ajaxTimeoutId);
        });
}
// 接口url参数加密
function urlEncrypt(url: string, options: any) {
    let _getUrl: string = url;

    if (!url.includes('?') && options.body) {
        const _body = JSON.parse(options.body as any);

        let _params = '?';

        for (let item in _body) {
            _params += `${item}=${encodeURIComponent(_body[item])}&`;
        }
        _getUrl += _params.substring(0, _params.length - 1);
    }
    delete options.body;
    return _getUrl;
}

export function get<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    const _url: string = urlEncrypt(url, options);
    return fetchProxy<TResponse>({ url: _url, ...options, method: 'get' });
}

export function post<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({ url, ...options, method: 'post' });
}

export function put<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({ url, ...options, method: 'put' });
}

export function del<TResponse>(url: string, options: Omit<FetchOptions, 'url'> = {}) {
    return fetchProxy<TResponse>({ url, ...options, method: 'delete' });
}

/**
 * 重新封装重连机制
 */
// export function postByReconnect(url: string, options: Omit<FetchOptions, 'url'> = {}) {
//     let reconnectCount = options.reconnectCount || 1;
//     return new Promise((resolve, reject) => {
//         const tryReconnect = async () => {
//             try {
//                 const res = await fetchProxy({url, ...options, method: 'post'});
//                 resolve(res);
//             } catch (e) {
//                 if (reconnectCount > 1) {
//                     reconnectCount--;
//                     tryReconnect();
//                 } else {
//                     reject(e);
//                 }
//             }
//         };
//         tryReconnect();
//     });
// }
