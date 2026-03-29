import React from 'react';
import {useNavigate} from 'react-router-dom';
/*
    高阶组件
    反向继承

    react类组件如何跳转？？
    "react": "^18.2.0",
    "react-router-dom": "^6.21.2",这个6版本已删withRouter

    使类组件能用hooks，设置跳转的props值，函数组件里的类子组件的传参数
    this.props.navigate('/home/reactClass/exJump?id=6');

    函数组件的跳转
    const navigate = useNavigate()
    navigate('/about')
*/

const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation;
