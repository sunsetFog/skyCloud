import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from 'redux';
import { formatMessage } from './utils';
let instantiate: WebSocket | any;

function websocketUnit(Component: any) {
    const WrapperComponent = (props) => {
        // 创建websocket连接
        async function initWebsocket() {
            let queryString = {
                wsToken: "pkcs7Encrypt(wsToken)",// 加密的token
                clientType: 'h5',// 移动端 或 PC端
                version: 2,// 版本号
            };
            // 将对象 params 序列化为 URL 查询字符串
            queryString = new URLSearchParams(queryString).toString();
            console.log("--webSocket-参数--", queryString)
            // 判断http 或 https
            let isSSL = /https/i.test(location.protocol);
            // https对应wss，http对应ws
            isSSL = isSSL ? 'wss' : 'ws';
            // 域名
            let domain = 'goapi.fgry45iy.com';
            let urlss =  `${isSSL}://${domain}/stream/ws/v2/handshakewt?${queryString}`;
            console.log('--webSocket-url--', urlss);

            return new Promise((_resolve, reject) => {

                // 如果已经创建应用现有实例

                urlss = 'ws://goapi.fgry45iy.com/stream/ws/v2/handshakewt?wsToken=5169e4ee00b09fc8a3592e87fb2b5641865e1cecfa16223c662e0f349e8ba4f08b0e3d0ac4efb39ce3c44268357ab223606d78fe1f377c4357dac8eef2a0efa94340367d4a915e385a1ea2326c339cd55492c836cadab2369890d5bea282b9f08d935e95759c41024287c4bafd193af0&clientType=h5&version=2';

                if (!instantiate) {
                    instantiate = new WebSocket(urlss);
                }
                instantiate.onopen = () => {
                    console.info('websocket onopen 已连接');
                };

                instantiate.onmessage = (event) => {

                    if (!event || !event?.data) {
                        return;
                    }
                    // @ts-ignore
                    const body = formatMessage(event?.data)[0]?.body;
                    console.log('--webSocket-onmessage--', body);
                    if (!body) {
                        return;
                    }
                };
                instantiate.onclose = (event) => {
                    console.log('--webSocket-onclose--', event?.data);
                    if (event.code !== 4000) {
                        // 按后端要求，被意外关闭后需要继续保持连接
                        reject(new Error('websocket连接关闭'));
                    }
                };
                instantiate.onerror = (err) => {
                    console.error('websocket onerror 未连接');
                    reject(err);
                };
            }).catch((err) => {
                clearSocket();
                return Promise.reject(err);
            });
        }

        // 发送信息
        function onSendMsg(msg: any) {
            instantiate?.send(msg);
        }
        // 清理socket
        function clearSocket() {
            if (instantiate) {
                instantiate.close(4000);
                instantiate = null;
            }
        }

        const componentProps = {
            ...props,
            initWebsocket,
            onSendMsg,
            clearSocket,
        };

        return <Component {...componentProps} />;
    };

    return WrapperComponent;
}

export default websocketUnit;
// export default compose(observer)(websocketUnit);
