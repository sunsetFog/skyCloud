import axios from 'axios';

const broccoli = axios.create({
    // 请求域名设置
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        // 请求头格式
        'Content-Type': 'application/json',
        'x-api-client': 'h5',
    },
    // 请求超时时间
    timeout: 20000,
});

const source = axios.CancelToken.source();

// 请求拦截器: 在请求发送之前拦截请求以进行某些处理。
broccoli.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么

        // 取消重复请求
        config.cancelToken = source.token;
        console.log('Request:', config);
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);

// 响应拦截器: 在响应到达之前对其进行处理。
broccoli.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么
        console.log('Response:', response);
        // 失败回调,捕捉异常
        // return Promise.reject(response);
        // 成功回调
        return response;
    },
    (error) => {
        // 已取消请求
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        }
        // 对响应错误做些什么
        return Promise.reject(error);
    },
);

export default broccoli;

// 取消请求（例如在组件卸载时）
export const cancelAxios = () => {
    source.cancel('Operation canceled by the user.');
};

// broccoli.post(`/api/json-cache`, {
//     data: JSON.stringify({}),
// });
