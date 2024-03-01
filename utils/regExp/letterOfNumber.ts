export default {
    // 域名url
    url: /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/,
    // 密码：不能为纯数字或纯字母，6~12位
    password: /^[a-zA-Z0-9]{6,12}$/,
    // 邮箱
    emailyz: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    // 验证32位key
    appSecurit: /^[a-zA-Z0-9]{32}$/,
    // 16-18位key
    appKey: /^[a-zA-Z0-9]{16,18}$/,
}
