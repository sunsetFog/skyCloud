export default {
    getQuery (variable) { // 获取(url?id=12&name='')的参数
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return false;
    },
    pxToRem (num) { // 移动端px转rem
        return num / Number(sessionStorage.getItem('pixelSize'))
    },
    remToPx (num) { // 移动端rem转px
        return num * Number(sessionStorage.getItem('pixelSize'))
    },
    // 浏览器信息
    browserInfo(){
        let browser = {
            platform: function(){
              var uxu = navigator.userAgent;
              return {
                trident: uxu.indexOf('Trident') > -1, //IE内核
                presto: uxu.indexOf('Presto') > -1, //opera内核
                webKit: uxu.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: uxu.indexOf('Gecko') > -1 && uxu.indexOf('KHTML') == -1,//火狐内核
                mobile: !!uxu.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!uxu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: uxu.indexOf('Android') > -1 || uxu.indexOf('Adr') > -1, //android终端
                iPhone: uxu.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: uxu.indexOf('iPad') > -1, //是否iPad
                webApp: uxu.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: uxu.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: uxu.match(/\sQQ/i) == " qq" //是否QQ
              };
            }(),
            versions: navigator.appVersion,
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
          }

        return browser
    }
}
