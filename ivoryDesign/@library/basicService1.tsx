import React, {Component} from 'react';

/*
    面试必考
    基类组件
    通过继承一个基类来实现代码复用、统一逻辑处理或配置共享
    作用：使用不同功能的基类，提供公共方法，全局数据
*/
class BasicService1 extends Component {
    // 别写state, 继承要重写的
    state = {

    }

    constructor(props) {
        console.log("-okk-1-", props);
        super(props);
    }

    pumpkin2 = '南瓜2'

}

export default BasicService1
