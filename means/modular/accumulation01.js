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
    }
}