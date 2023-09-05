
// 类型的定义

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 拦截器的类型
export interface InRequestInterceptors<T = AxiosResponse> {
  // 请求拦截-then
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求拦截-catch
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截-then
  responseInterceptor?: (res: T) => T
  // 响应拦截-catch
  responseInterceptorCatch?: (error: any) => any
}

/*
构造器形参的类型

接口的继承并添加属性值；如: showLoading是否展示loading的dom
*/
export interface InRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: InRequestInterceptors<T>
  showLoading?: boolean
}

