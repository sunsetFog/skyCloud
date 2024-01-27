import React from 'react';
import {useNavigate} from 'react-router-dom';
/*
    高阶组件
    反向继承

    设置跳转的props值
*/

const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation;
