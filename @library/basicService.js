import React, {Component} from 'react';

import { HashRouter as Router, Route, Switch, Redirect, Link, NavLink, withRouter } from 'react-router-dom';



class BasicService extends Component {

    state = {
        pumpkin: '南瓜'
    }

    constructor(props) {
        super(props);
    }

    pumpkin2 = '南瓜2'

    render() {

      return (
        <section>
            +++基础架构+++
        </section>
      );
    }
}

export default BasicService