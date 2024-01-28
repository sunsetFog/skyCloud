export default {
    // 字母、数字、汉字和标点符号
    characterOrNumber: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
    // 版本号正则 1.2.3
    version: /^\d+\.\d+\.\d+$/,
    // 匹配ip地址
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
}
