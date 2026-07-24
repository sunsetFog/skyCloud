/*
使用示例
const wsManager = new WebSocketManager();
wsManager.send({ type: 'message', content: 'Hello WebSocket!' });
*/
class WebSocketManager {
    // 双向共享消息
    bidirectional = null as any;
    // 客户端心跳检测，还有个服务器心跳检测
    heartbeatInterval = null as any;
    // 重连定时器
    reconnectTimeout = null as any;
    // 已重连次数
    reconnectAttempts = 0;
    // 最大重连次数，避免频繁重连导致服务器压力
    maxReconnectAttempts = 5;
    // 定时器重连时间
    reconnectDelay = 1000;
    // 状态管理 CONNECTING,OPEN,CLOSING,CLOSED,RECONNECTING
    status = 'CLOSED';
    constructor() {
        this.bidirectional = null;
        this.heartbeatInterval = null;
        this.reconnectTimeout = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.status = 'CLOSED';

        this.setup();
    }
    // url处理
    urlWay() {
        let queryString: any = {
            wsToken: 'pkcs7Encrypt(wsToken)', // 加密的token
            clientType: 'h5', // 移动端 或 PC端
            version: 2, // 版本号
        };
        // 将对象 params 序列化为 URL 查询字符串
        queryString = new URLSearchParams(queryString).toString();
        // console.log("--webSocket-参数--", queryString)
        // 判断http 或 https
        let isSSL: any = /https/i.test(location.protocol);
        // https对应wss，http对应ws
        isSSL = isSSL ? 'wss' : 'ws';
        // 域名
        let domain = 'websocket.fgry45iy.com';
        return `${isSSL}://${domain}/stream/ws/v2/handshakewt?${queryString}`;
    }
    // 连接方法
    setup() {
        this.bidirectional = new WebSocket(this.urlWay());

        this.bidirectional.onopen = () => {
            console.log('WebSocket连接已建立');
            this.status = 'OPEN';
            // 重置重连次数
            this.reconnectAttempts = 0;
            this.startHeartbeat();
        };

        this.bidirectional.onclose = () => {
            console.log('WebSocket连接已关闭');
            this.status = 'CLOSED';
            this.stopHeartbeat();
            this.reconnect();
        };
        this.bidirectional.onerror = (error) => {
            console.error('WebSocket错误:', error);
            this.status = 'ERROR';
            /*
                可以加个错误日志
                function logError(error) {
                    // 发送错误日志到服务器
                    fetch('/api/log-error', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            error: error.message,
                            timestamp: new Date().toISOString()
                        })
                    });
                }
            */
        };

        this.bidirectional.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'pong') {
                console.log('收到心跳响应');
            } else {
                this.handleMessage(data);
            }
        };
    }
    // 客户端心跳检测，每半分钟发送消息给服务器
    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.bidirectional.readyState === WebSocket.OPEN) {
                this.bidirectional.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);
    }
    // 停止心跳检测
    stopHeartbeat() {
        clearInterval(this.heartbeatInterval);
    }
    // 重连机制，关闭会重连，所以用一次性定时器
    reconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('重连失败，已达到最大尝试次数');
            return;
        }
        // 指数退避重连 ：重连间隔逐渐增加，避免频繁重连导致服务器压力
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);

        this.reconnectTimeout = setTimeout(() => {
            console.log(`尝试重连... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
            this.setup();
            this.reconnectAttempts++;
        }, delay);
    }
    // 手动发送消息
    send(message) {
        if (this.bidirectional.readyState === WebSocket.OPEN) {
            this.bidirectional.send(JSON.stringify(message));
        } else {
            console.error('WebSocket未连接，无法发送消息');
        }
    }
    // 成功处理
    handleMessage(data) {
        // 处理业务消息
        console.log('收到消息:', data);
    }
    // 手动关闭方法
    close() {
        clearTimeout(this.reconnectTimeout);
        this.stopHeartbeat();
        if (this.bidirectional) {
            this.bidirectional.close();
        }
    }
}
