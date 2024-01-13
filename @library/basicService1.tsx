import React, {Component} from 'react';

import { HashRouter as Router, Route, Switch, Redirect, Link, NavLink, withRouter } from 'react-router-dom';


/*
    作用：提供公共方法和基础服务
*/
class BasicService1 extends Component {

    state = {
        pumpkin: '南瓜'
    }

    constructor(props) {
        super(props);
    }

    pumpkin2 = '南瓜2'

}

export default BasicService1
