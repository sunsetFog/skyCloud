import { encrypt, decrypt } from '@/@energy/ivoryDesign/@utils/security/encryptAndDecrypt';
/**
 * 判断用户是否登录
 */
export const isLogin = () => {
    return LocalUserToken.getCache();
};

class LocalCache {
    key = '';
    // 是否密码字符串
    code = false;
    constructor(key, code) {
        this.key = key;
        this.code = code;
    }

    // 设置
    getCache() {
        try {
            let params = sessionStorage.getItem(this.key) || '{}';
            if(this.code) {
                params = decrypt(params);
            }
            return JSON.parse(params);
        } catch (e) {
            return {};
        }
    }

    // 获取
    setCache(data: any) {
        try {
            let params = JSON.stringify(data);
            if(this.code) {
                params = encrypt(params);
            }
            sessionStorage.setItem(this.key, params);
        } catch (e) {

        }
    }

    // 移除
    removeCache() {
        sessionStorage.removeItem(this.key);
    }
}
export const LocalUserToken = new LocalCache('auth/token', false);
// 用户信息要存加密字符串
export const LocalUserInfo = new LocalCache('auth/userInfo', true);


