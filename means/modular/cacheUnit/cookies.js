/*
    原生cookie
*/
const Base64 = require("js-base64").Base64
const cookies = {
    // 设置cookie
    setCookie(key, value, days, encryption = false){
        let date = new Date(); // 获取时间
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存的天数
        date = date.toGMTString();
        let json = {
            key: key,
            value: encryption ? Base64.encode(value) : value,// base64加密
            // date: '2h',// 或这个写法
            date: date
        }
        window.document.cookie = json.key + "=" + json.value + ";path=/;expires=" + json.date;
    },
    // 获取cookie
    getCookie(key, encryption = false) {
        if (document.cookie.length == 0) {
            return;
        }
        let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
            if(arr2[0] == key) {
                return encryption ? Base64.decode(arr2[1]) : arr2[1];// base64解密
            }
        }
    },
    // 删除cookie
    deleteCookie(key) {
        // 过期时间
        var date = new Date();
        date.setTime(date.getTime() - 1);
        date = date.toGMTString();
        window.document.cookie = key + "= ;path=/;expires=" + date;
    }
}

export default cookies;