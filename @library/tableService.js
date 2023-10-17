
import React, {Component} from 'react';
// 不能引入状态管理

import { HashRouter as Router, Route, Switch, Redirect, Link, NavLink, withRouter } from 'react-router-dom';

import BasicService from './basicService'

/*
    作用：提供公共方法和基础服务
*/
class TableService extends BasicService {

    state = {
        cabbage: '白菜'
    }

    constructor(props) {
        super(props);
    }

    cabbage2 = '白菜2'

    render() {

      return (
        <section>
            +++table架构+++
        </section>
      );
    }
}

// 不能用withRouter
export default TableService