/*
判断是否app
*/
export function getIsApp() {
    let appObj: any = sessionStorage.getItem('app') || '{}';
    appObj = JSON.parse(appObj);
    if (appObj?.isApp) {
        return appObj?.isApp;
    } else {
        return false;
    }
}

/*
判断是iphone手机，或Android手机
*/
const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;
export const isIos = () => /iphone/gi.test(ua);
export const isAndroid = () => /(?:Android)/.test(ua);

/*
判断IOS异形屏
 */
export function isIphoneX() {
    var faultTolerantVal = 10; // 容错值
    return (
        /iphone/gi.test(window.navigator.userAgent) &&
        window.screen.height + faultTolerantVal >= 812
    );
}

// 判断是否浏览器
export function isBrowser() {
    try {
        return 'location' in window;
    } catch (e) {
        return false;
    }
}

// 去app登录页
export function toAppLogin(status = true) {
    if (isAndroid()) {
        (window as any).nativeMethod.gotoLogin(status);
    }
    if (isIos()) {
        (window as any).webkit.messageHandlers.gotoLogin.postMessage(status);
    }
}

// app返回上一页
export function handleNativeBack(status = true) {
    if (!getIsApp()) {
        return;
    }
    if (isIos()) {
        (window as any).webkit.messageHandlers.callGoBack.postMessage(status);
        return;
    }
    if (isAndroid()) {
        (window as any).nativeMethod.callGoBack(status);
        return;
    }
}
