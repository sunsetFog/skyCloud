/*
    全局设置：main.js加载，html加载，App.vue加载都行
    局部设置：不支持，因为没有删除该页监听
*/
(function (document, window) {
    let docEl = document.documentElement;
        // 定义一个方法
    let recalc = function () {
        let clientWidth = docEl.clientWidth; // 屏幕宽度，变动值
        /*
            如果是pc端，就以750屏宽水平居中
            let flag_client = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            if (!flag_client) {
                clientWidth = 750;
            }
        */

        if (!clientWidth) return;
        // 根据屏幕宽，计算html的font-size值
        let pixelSize = 16 * (clientWidth / 375);
        // html的font-size设置
        docEl.style.fontSize = pixelSize + 'px'; // DOM设置属性
        // 缓存
        sessionStorage.setItem('pixelSize', pixelSize);
        sessionStorage.setItem('clientWidth', clientWidth);
    };

    // 检测浏览器是否支持 orientationchange 事件, 不支持就使用 resize事件
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let loadedEvt = 'DOMContentLoaded';

    // 检查浏览器是否支持 addEventListener 方法。不支持就使用 attachEvent 方法
    if (document.addEventListener) {
        // 监听窗口大小改变事件
        window.addEventListener(resizeEvt, recalc, false);
        // 监听DOM 加载完毕的事件
        document.addEventListener(loadedEvt, recalc, false);
    } else {
        // 监听窗口大小改变事件
        window.attachEvent('on' + resizeEvt, recalc, false);
        // 监听DOM 加载完毕的事件
        document.attachEvent('on' + loadedEvt, recalc, false);
    }

    // 当浏览器窗口关闭时,页面上的所有 HTML 元素都会被销毁和移除,对应的事件监听也会自动被移除,不需要手动删除。

})(document, window);// 匿名方法，已调用并带参数
