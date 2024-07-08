import stringify from 'qs/lib/stringify';
import { ajax as rxjsAjax } from 'rxjs/ajax';
import { throwError, of, Subject } from 'rxjs';
import { catchError, retry, concatMap, takeUntil, map } from 'rxjs/operators';
import AjaxCancelError from './error/AjaxCancelError';
import AjaxSetup from './ajaxSetup';

/**
 * 终止请求广播
 * 单例模式方式创建subject实例
 * @todo 使用mediator模式改进cancel request功能，解除对subject强制依赖 https://github.com/node-fetch/node-fetch#request-cancellation-with-abortsignal
 * @returns {Subject}
 */
function cancelAllSubject() {
    const fn = cancelAllSubject as any;
    const _subject$ = fn._subject$;
    fn._subject$ = !_subject$ || _subject$.isStopped ? new Subject() : _subject$;
    return fn._subject$;
}

/**
 * 处理请求底层公用逻辑
 * 1. 携带token
 * 2. 处理公共接口错误码
 * 3. 公共异常处理
 *
 * 业务逻辑层只处理私有异常和正常相应数据
 * @param {Object} settings
 * @returns {Observable}
 */
export function ajaxWay(settings) {
    console.log('--3--ajax', settings, AjaxSetup);
    // tslint:disable-next-line:prefer-const
    let objBox = AjaxSetup(settings);
    console.log('--3--剩余值', objBox);
    let { url, method, headers = {}, body, ...rest } = objBox;

    /**
     * 不定义headers Content-Type 默认会按照application/x-www-form-urlencoded方式处理
     *
     * multipart/form-data对象应对文件上传等需求
     * XMLHttpRequest会根据FormData是文件上传，所以以下header设置逻辑不需要。
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#Sending_files_using_a_FormData_object
     * 如果是form对象作为FormData入参，form应该声明enctype="multipart/form-data"
     * 或者使用formData.append添加文件类型的字段，可使用等对象有File/Blob等
     */
    // if (body instanceof FormData) {
    //   headers['Content-Type'] = 'multipart/form-data'
    // }

    // 用真实参数值替换rest URI中声明参数。如products/:pid，参数是pid，最终可能会替换为products/123。
    // todo 可以用path-to-regexp替换此处逻辑 https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp
    const URIParams = new URL(url, location.origin).pathname.match(/:[\w_]+/gi);
    console.log('--3--url', URIParams);
    if (URIParams) {
        URIParams.forEach((param) => {
            const field = param.substr(1);
            const value = body[field];
            if (value !== undefined) {
                url = url.replace(param, value);
                delete body[field];
            }
        });
    } else if (method.toLowerCase() === 'get' && !headers['Content-Type']) {
        // rxjs ajax没有内置对传统方式application/x-www-form-urlencoded发送get参数的能力，这里作为补充
        const queryString = stringify(body);
        url += queryString ? `${url.indexOf('?') !== -1 ? '&' : '?'}${queryString}` : '';
    }
    // 重点：返回Observable 对象
    const cancelSubject$ = new Subject();
    const ajax$ = rxjsAjax({
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
        // withCredentials: true,
        // responseType: 'json', // rxjs默认使用json parser
        headers,
        url,
        method,
        body, // body instanceof FormData ? data : stringify(data),
        ...rest,
    }).pipe(
        // 判定异常类型
        catchError((error) => throwError(rest.beforeCatchError(error) || error)),
        concatMap((ajaxResponse) => {
            // 从正常返回中检测业务异常
            const error = rest.detectError(ajaxResponse);
            if (error instanceof Promise) {
                return error.then(() => ajaxResponse);
            } else {
                return error ? throwError(error) : of(ajaxResponse);
            }
        }),
        // retry -1 无限重试 0 不重试
        // @ts-ignore
        retry(rest.retryTimes || 0),
        // 监听当前实例终止请求的广播
        takeUntil(cancelSubject$),
        // 监听全局终止请求广播
        takeUntil(cancelAllSubject()),
        // 请求完成一次后结束，RxJS的ajax模块已经封装好，这里不需要加入take
        // take(1),
        // 这里顺序位置还是比较重要的，可以接收上面操作符takeUntil、concatMap、catchError抛出的异常
        catchError((error) => {
            // 处理异常
            rest.afterCatchError(error);
            return throwError(error);
        }),
        // 通用数据结构转换逻辑
        map((ajaxResponse) => rest.transformData(ajaxResponse) || ajaxResponse),
    );

    /**
     * 对外暴露请求终止方法
     * 外部可以通过subscribe、catchError、tap等接收到异常
     * 如果外部不需要处理异常，直接调用subscription.unsubscribe方法也可以粗暴的终止请求
     * @typedef {function} cancelRequest
     */
    // @ts-ignore
    ajax$.cancel = () => {
        cancelSubject$.error(new AjaxCancelError('Request canceled'));
    };
    return ajax$;
}

/**
 * 终止所有请求
 */
export function cancelAll() {
    const error = new AjaxCancelError('Request canceled');
    // subject调用一次error后，频道自己会注销关闭
    cancelAllSubject().error(error);
    // 不用next是应为外部需要处理取消操作抛出的异常
    // cancelAllSubject().next(error)
    // cancelAllSubject()频道需要长久使用，不需要调用complete
    // cancelAllSubject().complete(error)
}

/**
 * 判断ajax是否取消
 * @param {Error} error
 * @returns {boolean}
 */
export function isCancel(error) {
    return error && error instanceof AjaxCancelError;
}

export default ajaxWay;

/**
 * ajax快捷方法代理函数
 * @param {function} call
 * @param {string} method
 * @param {string} url
 * @param {object|FormData} body
 * @param {object} options 第三个options参数可以参照官方用例 https://rxjs.dev/api/ajax/ajax#using-ajax-with-object-as-argument-and-method-post-with-a-two-seconds-delay-
 * @returns {*}
 */
export function shorthandMethod(method, url?, body?, options: any = {}) {
    console.log('--2--shorthandMethod');
    options.url = url;
    options.body = body;
    options.method = method;
    return ajaxWay(options);
}
/**
 * ajax get 快捷方法
 * @returns {Observable<any>}
 * @example
 * get('http://example', { field: 'value' }).subscribe(ajaxResponse => {})
 */
export function get(/* url, body, options */ ...args) {
    return shorthandMethod('GET', ...args);
}
/**
 * ajax get 快捷方法
 * @example
 * post('http://example', { field: 'value' }).subscribe(ajaxResponse => {})
 */
export function post(/* url, body, options */ ...args) {
    console.log('--1--post', args);
    return shorthandMethod('POST', ...args);
}
/**
 * ajax PUT 快捷方法
 * @example
 * put('http://example', { field: 'value' }).subscribe(ajaxResponse => {})
 */
export function put(/* url, body, options */ ...args) {
    return shorthandMethod('PUT', ...args);
}
/**
 * ajax PATCH 快捷方法
 * @example
 * patch('http://example', { field: 'value' }).subscribe(ajaxResponse => {})
 */
export function patch(/* url, body, options */ ...args) {
    return shorthandMethod('PATCH', ...args);
}
/**
 * ajax DELETE 快捷方法
 * @example
 * del('http://example', { field: 'value' }).subscribe(ajaxResponse => {})
 */
export function del(/* url, body, options */ ...args) {
    return shorthandMethod('DELETE', ...args);
}
