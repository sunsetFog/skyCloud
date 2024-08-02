import { getSessionUserId } from '@/@energy/ivoryDesign/@utils/helpers';
import { getUUID } from '@/@energy/ivoryDesign/@utils/fingerprint';

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
