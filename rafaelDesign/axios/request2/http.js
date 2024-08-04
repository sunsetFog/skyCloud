import axios from 'axios';
// import { Message, MessageBox } from 'element-ui'
const isApp = process.env.VUE_APP_TOKEN_KEY == 'tokenAppClient';

// 用于路由跳转 router.push({path: '/login'})
import router from '@/router';
import VueCookies from 'vue-cookies';

// 创建axios实例
const service = axios.create({
    // 请求域名设置
    baseURL: process.env.VUE_APP_BASE_URL,
    // 请求超时时间
    timeout: 10000,
    // 是否允许携带cookie
    withCredentials: false,
    headers: {
        // 请求头格式
        'Content-Type': 'application/json',
    },
});
const source = axios.CancelToken.source();
// 请求拦截器: 在请求发送之前拦截请求以进行某些处理。
service.interceptors.request.use(
    (config) => {
        // 允许所有来源访问(跨域时，关键是后台设，前端也可以设置)
        config.headers['Access-Control-Allow-Origin'] = '*';
        // 取消重复请求
        config.cancelToken = source.token;
        // header里存token参数,每一次服务器收到请求，都要验证有效期，有效期为一天(token可以判断登陆的状态,不能存中文)
        // token的获取：1.访问链接上的参数 2.浏览器缓存里 3.直接在登录接口获取
        config.headers['token'] = VueCookies.get('tokenPcClient');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器: 在响应到达之前对其进行处理。(可以控制成功回调和失败回调)
service.interceptors.response.use(
    (response) => {
        // console.log('后台返回的数据', response);
        if (response.data.data === 'checkToken') {
            // ElMessage.error('登陆过期！');
            // 失败回调,捕捉异常
            return Promise.reject(response);
        } else {
            // 成功回调
            return response.data;
        }

        // if (!response.data.code) {//判断code是否为null,或undefined,是就返回false,所以要加非！
        //     ElMessage({ message: '返回的code值找不到', type: 'error', duration: 3000 });
        //     return Promise.reject(response);// 失败回调,捕捉异常
        // } else {
        //     let code = response.data.code;// code码 1001会话过期, 1002无权限, 1003其他客户端登录了
        //     if ([1001, 1003].indexOf(code) > -1) {
        //         MessageBox.alert(response.data.message, {
        //             confirmButtonText: '确定',
        //             callback: action => {
        //                 router.push({path: '/login'});//路由跳转
        //             }
        //         })
        //         return Promise.reject(response)
        //     } else if ([1002].indexOf(code) > -1) {
        //         ElMessage({ message: '无权限', type: 'error', duration: 3000 })
        //         return Promise.reject(response)
        //     } else {
        //         return response.data;//成功回调
        //     }
        // }
    },
    (error) => {
        // 已取消请求
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        }
        // 失败回调,捕捉异常
        return Promise.reject(error);
    },
);

export default service;

// 取消请求（例如在组件卸载时）
export const cancelAxios = () => {
    source.cancel('Operation canceled by the user.');
};
