// crypto-js 加密&解密
import MD5 from 'crypto-js/md5';
import encBase64 from 'crypto-js/enc-base64';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';

// md5 用户密码加密
export const md5Encrypt = (word) => {
    let _encrypt = String(word).toLowerCase();
    return MD5(_encrypt).toString();
};

// base64加密
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
    });
    return encBase64.stringify(code.ciphertext);
}

// 获取签名
export function getSign(name, code) {
    name = name.toLowerCase();
    code = code.toLowerCase();
    const key = encUtf8.parse(MD5(code).toString().slice(0, 16));
    const iv = encUtf8.parse(MD5(name).toString().slice(-16));
    return AES.encrypt(name, key, {
        iv,
    }).ciphertext.toString();
}

export function pkcs7Encrypt(text) {
    const secretPhrase = 'xzaNI7snBdRFa2MLPDaK1duMTx89vaqc';
    const secretIv = 'mltqgzVTJLGSS2TQ';
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretIv);
    const code = AES.encrypt(text, key, {
        iv,
    });
    return code.ciphertext.toString();
}



// ws token解密
export function decryptByToken(text) {
    const secret_phrase = 'g1kD3G46J2j9c3S8';
    const key = encUtf8.parse(secret_phrase);
    const iv = encUtf8.parse(secret_phrase);
    const encryptedText = text || 'mt5SeCFnzcpyoC/MniOI4mrIRgES12czcghsjt9ILQ0=';

    // 参数文档 see https://cryptojs.gitbook.io/docs/#block-modes-and-padding
    return AES.decrypt(encryptedText, key, {
        iv,
        padding: pkcs7,
    }).toString(encUtf8);
}

export function encrypt(plainText: string, secret?: string): string {
    return AES.encrypt(plainText, secret || '').toString();
}
// 解密方法
export function decrypt(text) {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretPhrase);
    return AES.decrypt(text, key, {
        iv,
        padding: pkcs7,
    }).toString(encUtf8);
}
// 加密方法
export function encrypt(text) {
    if (!text) {
        return text;
    }
    const key = encUtf8.parse(secretPhrase);
    const iv = encUtf8.parse(secretPhrase);
    return AES.encrypt(text, key, {
        iv,
        padding: pkcs7,
    }).toString();
}
