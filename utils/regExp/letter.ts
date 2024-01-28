export default {
    // 英文名：字母+空格，2到15位
    name: /^[a-zA-Z ]{2,15}$/,
    // 是否是http 或者 https开头的网址
    httpHead: /(http|https):\/\/([\w.]+\/?)\S*/,
}
