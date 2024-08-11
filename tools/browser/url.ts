/*
js将对象序列化为 URL 查询字符串

{ name: 'John Doe', age: '30', city: 'New York' }
变
'name=John%20Doe&age=30&city=New%20York'
*/
export const urlObjToStr = (obj: any) => {
    return new URLSearchParams(obj).toString();
};

/*
js解析 URL 查询字符串为对象

'name=John%20Doe&age=30&city=New%20York'
变
{ name: 'John Doe', age: '30', city: 'New York' }
*/
export const urlStrToObj = (str: string) => {
    const params: any = {};

    new URLSearchParams(str).forEach((value, key) => {
        params[key] = value;
    });
    return params;
};
/*
获取url上的参数

window.location.search 返回当前页面的 URL 查询字符串部分，例如 ?token=abc123&user=John
*/
export const urlParams1 = (key: string) => {
    return new URLSearchParams(window?.location?.search).get(key);
};

export const urlParams2 = (key: string) => {
    return new URL(window?.location?.href).searchParams.get(key);
};

/*
获取url所有参数
*/
export function getUrlParam(): any {
    const url = decodeURI(window.location.href);
    const thisParam = new Object();
    // 判断是否存在请求的参数
    if (url.indexOf('?') !== -1) {
        const str = url.split('?')[1];
        // 截取所有请求的参数，以数组方式保存
        const strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            // 获取该参数名称，值。其中值以unescape()方法解码，有些参数会加密
            // @ts-ignore
            thisParam[strs[i].split('=')[0]] = strs[i].split('=')[1];
        }
    }

    return thisParam;
}

export function getQuery (variable: string) { // 获取(url?id=12&name='')的参数
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}
