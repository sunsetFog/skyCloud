/*
js将对象序列化为 URL 查询字符串

{ name: 'John Doe', age: '30', city: 'New York' }
变
'name=John%20Doe&age=30&city=New%20York'
*/
export const urlObjToStr = (obj) => {
    return new URLSearchParams(obj).toString();
};

/*
js解析 URL 查询字符串为对象

'name=John%20Doe&age=30&city=New%20York'
变
{ name: 'John Doe', age: '30', city: 'New York' }
*/
export const urlStrToObj = (str) => {
    const params = {};

    new URLSearchParams(str).forEach((value, key) => {
        params[key] = value;
    });
    return params;
};
/*
获取url上的参数

window.location.search 返回当前页面的 URL 查询字符串部分，例如 ?token=abc123&user=John
*/
export const urlParams = (key) => {
    return new URLSearchParams(window.location.search).get(key);
};
