// 浏览器信息
export function browserInfo() {
    let browser = {
        platform: (function () {
            var uxu = navigator.userAgent;
            return {
                trident: uxu.indexOf('Trident') > -1, //IE内核
                presto: uxu.indexOf('Presto') > -1, //opera内核
                webKit: uxu.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: uxu.indexOf('Gecko') > -1 && uxu.indexOf('KHTML') == -1, //火狐内核
                mobile: !!uxu.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!uxu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: uxu.indexOf('Android') > -1 || uxu.indexOf('Adr') > -1, //android终端
                iPhone: uxu.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: uxu.indexOf('iPad') > -1, //是否iPad
                webApp: uxu.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: uxu.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                // qq: uxu.match(/\sQQ/i) == ' qq', //是否QQ
            };
        })(),
        // versions: navigator.appVersion,
        // language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };

    return browser;
}

// 判断用户当前的支付环境（如微信浏览器、支付宝浏览器、Safari、Chrome等），从而适配不同的支付SDK或安全策略
export function getPaymentEnvironment() {
    const ua = navigator.userAgent.toLowerCase();
    let env = '未知环境';

    if (ua.includes('micromessenger')) {
        env = '微信浏览器';
        // 可进一步判断微信版本：ua.match(/micromessenger\/(\d+\.\d+)/)
    } else if (ua.includes('alipayclient')) {
        env = '支付宝浏览器';
    } else if (/iphone|ipad|ipod/.test(ua)) {
        env = 'iOS设备';
    } else if (ua.includes('android')) {
        env = 'Android设备';
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
        env = 'Safari浏览器';
    } else if (ua.includes('chrome') && !ua.includes('edg')) {
        env = 'Chrome浏览器';
    } else if (ua.includes('edg')) {
        env = 'Edge浏览器';
    }

    return env;
}
