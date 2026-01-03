import React from 'react';

/*
    面试必考
    高阶组件
    反向继承
    高阶组件（HOC）是React中一种用于复用组件逻辑的高级设计模式，它本质上是一个函数，接收一个组件并返回一个功能增强的新组件。

    函数return类组件，是简化版，就是不能调用时传参数
    函数return函数return类组件，调用时传组件参数时，可以加props值

    应用：
    1.插槽
    2.加props值
*/

const WithTabPage =
    ({tabList}) =>
    (Component) => {
        // 类
        class WrapperComponent extends Component {
            constructor(props) {
                super(props);
            }

            componentDidMount() {
                console.log('--高阶组件--', tabList);
            }
            dickey = () => {
                // compose后，在this.props能找到这方法
                console.log('--小鸟--');
            };

            render() {
                return <div>新增插槽---视图 +----+{super.render && super.render()}+----+</div>;
            }
        }

        return WrapperComponent; // 函数组件的return一个类
    };

export default WithTabPage;

export const initState = {
    loading: false,
    world: '哈喽'
};
