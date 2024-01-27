import Mock from 'mockjs'; // npm install mockjs --save

/**
 * 接受所以暴露export default
 * import * as obj from './'
 */
import selectDefaultCity from './modular/selectDefaultCity.json';
import orgCityListFull from './modular/orgCityListFull.json';
import allCityPriceAnalysis from './modular/allCityPriceAnalysis.json';
import selectProjectByCity from './modular/selectProjectByCity.json';
import selectProjectByProjectName from './modular/selectProjectByProjectName.json';
import priceAnalysisList from './modular/priceAnalysisList.json';
import priceAnalysisTrendData from './modular/priceAnalysisTrendData.json';

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600',
});
//    url:      /\/user\/login/    指的是  /user/login
//    请求方式:    /get|post/i    指的是get和post请求都可以

/**
 * 默认城市
 * @param
 */
Mock.mock(process.env.VUE_APP_MOCK_URL + '/role/selectDefaultCity', 'post', selectDefaultCity);
/**
 * 选择城市
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/mktinformationoperativemenu/orgCityListFull',
    'post',
    orgCityListFull,
);
/**
 * 项目列表
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/priceAnalysis/allCityPriceAnalysis',
    'post',
    allCityPriceAnalysis,
);
/**
 * 通过城市搜索项目
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/priceAnalysis/selectProjectByCity',
    'post',
    selectProjectByCity,
);
/**
 * 搜索项目
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/priceAnalysis/selectProjectByProjectName',
    'post',
    selectProjectByProjectName,
);
/**
 * 项目详情
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/priceAnalysis/priceAnalysisList',
    'post',
    priceAnalysisList,
);
/**
 * 项目详情图表
 * @param
 */
Mock.mock(
    process.env.VUE_APP_MOCK_URL + '/priceAnalysis/priceAnalysisTrendData',
    'post',
    priceAnalysisTrendData,
);

/**
 * 无需暴露，main.js加载加载过mock就行
 * export default Mock;
 */
