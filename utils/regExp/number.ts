export default {
    // 手机号
    mobile: /^1\d{10}$/,
    // 纯数字
    areaCode: /^\d+$/,
    // 只能字母和数字
    alphabetOrNumber: /^[A-Za-z0-9]+$/,
    // 只能浮点数
    floatNumber: /^\d+(\.\d+)?$/,
    // 正数
    positiveNumber: /^([1-9]+(\.\d+)?)|(0\.\d+)$/,
    // 只能两位小数
    twoDecimalsNumber: /^([1-9]\d*(\.\d{1,2})?|0\.[1-9][0-9]?|0\.[0-9][1-9])$/,
    // 整数;
    number: /^0|([1-9]\d*)$/,
    // 正整数
    positiveInteger: /^[1-9]\d*$/,
    // 1到90的正整数（天数限制）
    oneToNinety: /^[1-8][0-9]?$|^90$|^9$/,
    // 1 到 9999, 最大积分限制
    maxPoints: /^[1-9]\d{0,3}$/,
    // 验证码：数字，4到6位
    sms: /^\d{4,6}$/,
    // 6位数字密码
    dynamicpassword: /^\d{6}$/,
    // 银行卡卡号码
    bank: /^[0-9]{13,19}$/,
}
