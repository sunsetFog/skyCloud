import { getSessionUserId } from '@/@energy/ivoryDesign/@utils/helpers';
import { getUUID } from '@/@energy/ivoryDesign/@utils/fingerprint';

/*
使用
import { getVisitHeaders } from '@/@energy/ivoryDesign/@utils/request/requestTransfer';
import { post, get } from '@/@energy/ivoryDesign/@http/request';

export function lotteryApply(params) {
    return post(domain + '/dragonBoat2023/first/lottery', {
        body: JSON.stringify(params),
        headers: getVisitHeaders(),
    });
}
*/
export function sharedHeaders(
    blob: boolean = false,
) {
    // 常规数据用
    let contentType = 'application/json';
    // 下载用
    if (blob) {
        contentType = 'application/x-www-form-urlencoded';
    }

    return {
        'Content-Type': contentType,
        // 登录token
        'X-API-TOKEN': 'token',
        // 用户ID
        'X-API-ID': getSessionUserId(),
        // 随机ID，生成浏览器指纹，用来统计用户数量
        'X-API-UUID': getUUID(),
        // 记录时间
        'X-API-time': new Date().getTime(),
        // 模式
        mode: 'cors',
        // 电脑端、手机端
        'client-type': 'h5',
    };
}

/**
 * XHR的方式提交formData
 * @param {string} params.url 请求地址
 * @param {formDate} params.data formDate格式
 * @param {function} params.success 成功的回调
 */
export function createXHRPost(params: any) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                params.success(JSON.parse(xhr.responseText));
            } else {
                params.error(xhr.response);
            }
        }
    };
    xhr.open('POST', params.url, true);
    xhr.setRequestHeader('client-type', 'h5');
    xhr.setRequestHeader('X-API-TOKEN', 'token');
    xhr.setRequestHeader('X-API-ID', getSessionUserId());
    xhr.setRequestHeader('X-API-UUID', getUUID());
    xhr.send(params.data);
}
