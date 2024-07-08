// @ts-nocheck
import React, { ErrorInfo, FC, PureComponent } from 'react';
import BusinessError from '../error/BusinessError';
import ConnectionError from '../error/ConnectionError';
import requestChannel from './index';
import AjaxCancelError from '../error/AjaxCancelError';
import { Button, Result } from 'antd';
import { Subscription } from 'rxjs';
/*
全局，包在路由组件外
*/
export default class Channel extends PureComponent<
    {},
    {
        error: any;
        errorInfo: ErrorInfo;
    }
> {
    private Subscription$: Subscription;
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidMount() {
        this.Subscription$ = requestChannel.subscribe({
            // 成功处理
            next: (value) => {
                console.debug(this.constructor.name, '-errorInfo-订阅的消息--', value);
            },
            // 异常处理
            error: (err) => {
                console.error('errorInfo--监听频道时发生错误:', err);
                this.setState({
                    error: err,
                    errorInfo: err,
                });
                this.errorHandler(err);
            },
        });
        console.log('--订阅--', this.Subscription$);
    }

    componentWillUnmount() {
        this.Subscription$.unsubscribe();
    }

    /**
     * 处理请求异常事件
     * @param {BusinessError|ConnectionError} error
     */
    errorHandler = (error) => {
        console.log('--errorHandler--', error.constructor.name);
        console.log('--BusinessError--', BusinessError.name);
        console.log('--ConnectionError--', ConnectionError.name);
        console.log('--AjaxCancelError--', AjaxCancelError.name);
        switch (error.constructor.name) {
            // @ts-ignore
            case BusinessError.name:
                // 处理公共业务异常
                break;
            case ConnectionError.name:
                // 处理公共连接异常
                break;
            case AjaxCancelError.name:
                // 处理请求被取消
                break;
        }
    };
    /*
        组件的生命周期中捕获和处理可能抛出的错误
        当组件的渲染过程中出现错误时，React 会自动将错误抛出到浏览器控制台，同时触发 componentDidCatch 方法
     */
    componentDidCatch(error, errorInfo) {
        console.log('--异常捕获--', errorInfo);
        // You can also log the error to an error reporting service
        // console.error(this.constructor.name, error, info)
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        const { error, errorInfo } = this.state;
        // @ts-ignore
        const { children } = this.props;
        // 渲染异常报错页
        if (errorInfo) {
            // You can render any custom fallback UI
            return (
                <Result
                    status='error'
                    title='当前页面操作发生了错误'
                    extra={[
                        <Button key='buy' href={'/home/homeView'}>
                            回到主页
                        </Button>,
                        <Button type='primary' key='console' onClick={() => location.reload()}>
                            刷新页面
                        </Button>,
                    ]}
                >
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary style={{ textAlign: 'center' }}>查看详细错误内容</summary>
                        {error && error.toString()}
                        {errorInfo.componentStack}
                    </details>
                </Result>
            );
        }

        return children;
    }
}
