/**
 * 获取验证码图片url
 * @param {String} url <请求接口url>
 * @param {any}
返回
{
code: "20643878284577646",
url: "blob:http://172.23.54.51:9002/8e710672-aba9-4526-ac8a-7010a648f816"
}
 */
export const validateImgUrl = (url: string, { method = 'get', body = {} } = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
        let xmlHttp: any;
        // xmlHttp兼容做处理
        if ((window as any).XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            // @ts-ignore
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        console.log(xmlHttp, 'xmlHttp');
        xmlHttp.open(method, url, true);
        xmlHttp.responseType = 'blob';
        xmlHttp.setRequestHeader('client-type', 'web');
        // 设置跨域请求
        // xmlHttp.withCredentials = true;

        // 监听请求状态
        xmlHttp.onreadystatechange = () => {
            const { status, statusText } = xmlHttp;

            if (status !== 200) {
                reject(new Error(statusText));
            }
        };

        xmlHttp.onload = (event: any) => {
            const response = event.target.response;
            const img = new Image();
            const code =
                xmlHttp.getResponseHeader('x-code') ||
                xmlHttp.getResponseHeader('X-Code') ||
                xmlHttp.getResponseHeader('X-CODE');
            img.src = window.URL.createObjectURL(response);
            img.onload = () => {
                // 统一和request方法层级一致
                resolve({
                    url: img.src,
                    code,
                });
            };
            img.onerror = () => {
                // 返回文本解析为json
                const reader = new FileReader();
                reader.readAsText(response, 'utf-8');
                reader.onload = () => {
                    resolve({
                        data: JSON.parse(reader.result as string),
                    });
                };
            };
        };

        xmlHttp.send(JSON.stringify(body));
    });
};
