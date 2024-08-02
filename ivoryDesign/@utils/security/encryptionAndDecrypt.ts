import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';

import MD5 from 'crypto-js/md5';
import encBase64 from 'crypto-js/enc-base64';
/*

应用场景：
token

encrypt('fuckyoudididada')

*/

// 秘密短语
const secret_phrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
const secret_iv = 'mltqgzVTJLGSS2TQ';
// const release_aes_key = 'GGGMCcdYCnbzeCOivJZbUatjgrJRJRRO';
// const release_aes_iv = 'LmrAeNihy7BixNo8';
// const release_finance_aes_key = 'm2l30d6MJ1sThagvM59XOZnz7j5GNAxZ';
// const release_finance_aes_iv = 'K5RpoXHwnAvVlFfz';

// 加密方法
export function encrypt(text = 'mt5SeCFnzcpyoC/MniOI4mrIRgES12czcghsjt9ILQ0=') {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secret_phrase);
    const iv = encUtf8.parse(secret_iv);
    return AES.encrypt(text, key, {
        iv,
        padding: pkcs7,
    }).toString();
}

// 解密方法
export function decrypt(text = 'mt5SeCFnzcpyoC/MniOI4mrIRgES12czcghsjt9ILQ0=') {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secret_phrase);
    const iv = encUtf8.parse(secret_iv);
    return AES.decrypt(text, key, {
        iv,
        padding: pkcs7,
    }).toString(encUtf8);
}

/*
获取签名

import { encrypt } from '@/@energy/ivoryDesign/@utils/encryptionAndDecrypt';
接口传参，手机号加密
encrypt(phone, 'finance')

*/
export function getSign(name: string, code: string) {
    name = name.toLowerCase();
    code = code.toLowerCase();
    const key = encUtf8.parse(MD5(code).toString().slice(0, 16));
    const iv = encUtf8.parse(MD5(name).toString().slice(-16));
    return AES.encrypt(name, key, {
        iv,
    }).ciphertext.toString();
}

/*
md5加密解密

应用场景：
token
用户
密码、取款密码

*/
export const md5Encrypt = (word) => {
    word = String(word).toLowerCase();
    return MD5(word).toString();
};

/*
base64加密解密

应用场景：
真实姓名
生日
手机号
邮箱
性别

base64Pkcs7Encrypt(birth)

*/
export function base64Pkcs7Encrypt(text) {
    const secretPhrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
    const secretIv = 'mltqgzVTJLGSS2TQ';
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretIv);
    const textCode = encUtf8.parse(text);
    const code = AES.encrypt(textCode, key, {
        iv,
        padding: pkcs7,
    });
    return encBase64.stringify(code.ciphertext);
}
