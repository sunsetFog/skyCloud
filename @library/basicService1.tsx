import React, {Component} from 'react';

/*
    作用：提供公共方法和基础服务
*/
class BasicService1 extends Component {

    state = {
        pumpkin: '南瓜'
    }

    constructor(props) {
        console.log("-okk-1-", props);
        super(props);
    }

    pumpkin2 = '南瓜2'

}

export default BasicService1
