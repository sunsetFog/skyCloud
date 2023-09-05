export default {
    testReg (key) {
        const regObj = {
            index01: /[0-9]/
        }
        return regObj[key].test(str)
    },
    //vue中动态获取文本换行
    trim(str) {  //str表示要转换的字符串
        return str.replace(/\n|\r\n/g,"<br/>");
    },
}