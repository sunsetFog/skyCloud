import Mock from 'mockjs' // npm install mockjs --save

import './baidumap/index'
/**
 * 接受所以暴露export default
 * import * as obj from './'
 */
import shopAPI from './shop/shop'
import mapAPI from './map/map'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})
//    url:      /\/user\/login/    指的是  /user/login
//    请求方式:    /get|post/i    指的是get和post请求都可以


/**
 * 查询该全部数据
 * @param { store_id: 12, current_page: 1, page_size: 10 } 店铺id
 */
Mock.mock(process.env.mock_url + "/store/goods-list", "post", shopAPI.purchase);
/**
 * 搜索数据
 * @param { search_value: 12 } 店铺id
 */
Mock.mock(process.env.mock_url + "/store/search", "post", shopAPI.search);
/**
 * 查询该单条数据
 * @param { goods_id: '' }  商品id
 */
Mock.mock(process.env.mock_url + "/store/goods-detail", "post", shopAPI.isSingle);
/**
 * 数据的删除操作
 * @param { goods_id: '' }  商品id
 */
Mock.mock(process.env.mock_url + "/store/destroy-goods", "get", shopAPI.isDelete);
/**
 * 数据的添加操作
 * @param 看param 传http的参数
 */
Mock.mock(process.env.mock_url + "/store/add-goods", "post", shopAPI.isAdd);
/**
 * 数据的修改操作
 * @param 看param 传http的参数
 */
Mock.mock(process.env.mock_url + "/store/edit-goods", "post", shopAPI.isUpdate);
/**
 * 查询分类数据
 * @param { store_id: 12 } 店铺id
 */
Mock.mock(process.env.mock_url + "/store/goods/get-category", "post", shopAPI.classify);
/**
 * 登录
 * @param { username: '', password: '' }
 */
Mock.mock(process.env.mock_url + "/shop/login", "post", shopAPI.loginAi);

/**
 * mock.vue调用的接口
 * @param {}
 */
Mock.mock(process.env.mock_url + "/store/price-list", "post", mapAPI.mapList);



import getOCRTemplate from './attachment/getOCRTemplate.json'
import uniRecognized from './attachment/uniRecognized.json'
import getRegInvoiceResult from './attachment/getRegInvoiceResult.json'
Mock.mock(process.env.mock_url + "/ifin-expense/ocrTemplates/getOCRTemplate", "post", function (options) {
    return getOCRTemplate
});
Mock.mock(process.env.mock_url + "/ifin-expense/oieOcr/uniRecognized", "post", function (options) {
    // let json = JSON.parse(options.body);报错Unexpected token o in JSON at position 1
    return uniRecognized
});
Mock.mock(process.env.mock_url + "/ifin-expense/ocr/getRegInvoiceResult", "post", function (options) {
    return getRegInvoiceResult
});





/**
 * 无需暴露，main.js加载加载过mock就行
 * export default Mock;
 */
