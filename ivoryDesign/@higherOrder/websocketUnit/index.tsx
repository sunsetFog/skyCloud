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
            let queryString: any = {
                wsToken: "pkcs7Encrypt(wsToken)",// 加密的token
                clientType: 'h5',// 移动端 或 PC端
                version: 2,// 版本号
            };
            // 将对象 params 序列化为 URL 查询字符串
            queryString = new URLSearchParams(queryString).toString();
            console.log("--webSocket-参数--", queryString)
            // 判断http 或 https
            let isSSL: any = /https/i.test(location.protocol);
            // https对应wss，http对应ws
            isSSL = isSSL ? 'wss' : 'ws';
            // 域名
            let domain = 'websocket.fgry45iy.com';
            let urlss =  `${isSSL}://${domain}/stream/ws/v2/handshakewt?${queryString}`;
            console.log('--webSocket-url--', urlss);

            return new Promise((_resolve, reject) => {

                // 如果已经创建应用现有实例

                urlss = 'ws://websocket.fgry45iy.com/stream/ws/v2/handshakewt?wsToken=b6efc91399925e3a8ce8a6339c2da09d4550f2202d0ea985103c775a020f11a46b1041425480361160ec6db0c02241887e3ac6ff0e4083447de58674f240248cc738bfaaf7169b92567a9b2538b40a8c6146c240698c9120b7b5361323e48dce1e5a3bf4655d64422c79603185d5f21f&clientType=web&version=2';

                if (!instantiate) {
                    instantiate = new WebSocket(urlss);
                }
                // 处理连接事件
                instantiate.onopen = () => {
                    console.info('websocket onopen 已连接');
                };
                // 接收消息
                instantiate.onmessage = (event) => {

                    if (!event || !event?.data) {
                        return;
                    }
                    // @ts-ignore
                    const body = formatMessage(event?.data)[0]?.body;
                    console.log('--webSocket-onmessage--', body);
                    // 用于store存储数据
                    if (!body) {
                        return;
                    }
                };
                // 关闭连接
                instantiate.onclose = (event) => {
                    console.log('--webSocket-onclose--', event?.data);
                    if (event.code !== 4000) {
                        // 按后端要求，被意外关闭后需要继续保持连接
                        reject(new Error('websocket连接关闭'));
                    }
                };
                // 处理错误
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
            if (instantiate.readyState === WebSocket.OPEN) {
                instantiate?.send(msg);
            }
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
