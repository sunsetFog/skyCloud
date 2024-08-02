// @ts-nocheck
// 这是一个简单的 JavaScript 事件发布-订阅模式的实现
// Events.trigger('response_6001'); // 登陆失效
export let Events = (() => {
    // 创建了一个空对象,用于存储事件监听器
    const list = {};
    // 为特定的 key 添加一个新的事件监听器
    const listens = (key, fn) => {
        list[key] = list[key] || [];
        list[key].push(fn);
    };
    // 触发特定 key 的事件监听器
    const triggers = function (_key) {
        var key = Array.prototype.shift.call(arguments),
            fns = list[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments);
        }
    };
    // 删除特定 key 的事件监听器
    const removes = function (key, fn) {
        var fns = list[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };
    return {
        listen: listens,
        trigger: triggers,
        remove: removes,
        list
    };
})();
