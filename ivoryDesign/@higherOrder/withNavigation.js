import React from 'react';
import {useNavigate} from 'react-router-dom';
/*
    高阶组件
    反向继承

    使类组件能用hooks，设置跳转的props值
    this.props.navigate('/home/reactClass/exJump?id=6');

    函数组件的跳转
    const navigate = useNavigate()
    navigate('/about')
*/

const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation;
