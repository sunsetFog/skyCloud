/*
study: 实现路由级或组件级懒加载，显著优化首屏性能。

代码分割
路由文件里加webpackChunkName: "dragonBoat"
Webpack 会将每个懒加载组件打包成独立的 chunk

*/

import React, { Suspense, lazy } from 'react';

const SuspenseLazy = (props: any) => {
    return <Suspense fallback={<>...</>}>{React.createElement(lazy(props))}</Suspense>;
};

export default SuspenseLazy;
