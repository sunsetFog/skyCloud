/*
    用于跳转

    使用不了：
    import history from '@/@energy/ivoryDesign/@utils/history';
    history.push(value.key);


    react-router-dom版本6
    已报废
    import { withRouter } from 'react-router-dom';

    想注入history，找不到参数
    import { Router } from 'react-router-dom';
    <Router history={history}></Router>

    import { useNavigate } from 'react-router-dom';
    useNavigate是函数组件用的

    BrowserRouter自动创建并管理 history 实例，不能使用createBrowserHistory
    上面三个都用不了，类组件怎么跳转啊？？


*/
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

export default history;
