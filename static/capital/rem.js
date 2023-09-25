/*
    全局设置：main.js加载，html加载，App.vue加载都行
    局部设置：不支持，因为没有删除监听
*/
(function (document, window) {
    var docEl = document.documentElement;
        // 监听类型
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        // 定义一个方法
    var recalc = function () {
        let clientWidth = docEl.clientWidth; // 屏幕宽度，变动值
        /*
            移动端以750宽，居中PC端
            判断pc端还是移动端，pc端则屏幕宽度750，固定值
            let flag_client = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            if (!flag_client) {
            clientWidth = 750;
            }
        */
        sessionStorage.setItem('clientWidth', clientWidth); // 缓存下来

        if (!clientWidth) return;
        let pixelSize = 16 * (clientWidth / 375); // 根据屏幕宽，计算html的font-size值
        sessionStorage.setItem('pixelSize', pixelSize); // 缓存下来
        docEl.style.fontSize = pixelSize + 'px'; // DOM设置属性
    };

    if (!document.addEventListener) return;
    // 添加监听
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);// 匿名方法，已调用