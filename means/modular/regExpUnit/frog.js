import router from '@/router';
import { ElMessage } from 'element-plus'

const comic = {
    //vue项目，输入框限制输入15个中文，或者30个英文
    validateTextLength (value) {
        // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
        let mat = value.match(cnReg)
        let length
        if (mat) {
            if(mat.length>=6){
                length = 6
                return {length: length,active: true,chinese: true}
            }else{
                length = (mat.length + (value.length - mat.length) * 0.5)
                return {length: length,active: true,chinese: false}
            }
        } else {
            length = value.length * 0.5;
            return {length: length,active: false,chinese: false}
        }
    },
    /* 大小写字母*/
    validatAlphabets(str) {
        const reg = /^[A-Za-z]+$/
        return reg.test(str)
    },
    // 只能是6位数字
    validatNumber(str) {
        const reg = /^\d{6}$/
        return reg.test(str)
    },
    //6-12位数字和字母的组合
    validatNumberLowerCase(str) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,12}$/
        return reg.test(str)
    },
    //不能输入特殊字符 (不能输入的字符，还能自个在正则添加)
    validatSpecial(str){
        const reg = new RegExp("[\\+,\\/,\\\\,\\?,\\？,\\%,\\#,\\&,\\=,\\(,\\),\\（,\\）,\\{,\\},\\',\\\",\\<,\\>,\\@,\\!,\\！,\\$,\\.,\\，,\\、,\\:,\\：,\\;,\\；,\\￥,\\*,\\~,\\`,\\-,\\——,\\_,\\^,\\“,\\”,\\‘,\\’,\\……,\\【,\\】,\\[,\\],\\,]", "gm");
        if(reg.test(str)){
            ElMessage.error('不能输入特殊字符！');
            return {state: true,value: str.replace(reg, "")};
        }else{
            return {state: false,value: ''};
        }
    },
    //验证是否手机号
    isMoblie: function (value) {
		return !/^1\d{10}$/.test(value);
    },
}

export default comic;
