
/*
    study: 全局注册过滤器
    vue3删了过滤器，用方法代替，这里就是方法
*/
export default {
    // 数字添加百分号
    numPercent(value) {
        return isNaN(value)?'不是数字':value+'%'
    },
};
