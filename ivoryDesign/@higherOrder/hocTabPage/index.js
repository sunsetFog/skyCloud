import React from 'react';

/*
    高阶组件
    反向继承
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
