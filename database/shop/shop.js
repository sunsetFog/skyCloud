import store from './store.json'
import classify from './classify.json'
import login from './login.json'

let idAi = 'goods_id' // id名传参
/* 
|- total: 3, 商品数量
|- current_page: 1, 当前页
|- page_size: 15, 一页多少条数据
|- total_page: 1, 总页数
|- list
    |- store_id: 12, 店铺id
    |- goods_id: 1, 商品id
    |- title: '', 商品名称
    |- company: '包', 商品单位
    |- category_pid: 201, 商品分类一级id
    |- category_cid: 202, 商品分类二级id
    |- thumb: '', 商品图片
    |- price: 110, 商品现价
    |- original_price: 160, 商品原价
    |- cost: 25, 商品成本
    |- stock: 1000, 库存
    |- virtual_sales: 2300 虚拟销量

注意:
    1.对应的store.list和store.total
    2.下面别改，改上面传入参数就行
    3.其他传入参数可以无视，下面没限制
*/
/**
 * @param receive 接受http的参数
 * @param param   传http的参数
 */

function limitField(receive, param) { // 确认两者参数
    let arr = []
    for (let item in param) {
        arr.push(item)
    }
    for (let i = 0; i < arr.length; i++) {
        if (!receive.hasOwnProperty(arr[i])) {
            return { code: 100, message: '参数错误' }
        }
        if (!receive[arr[i]]) {
            return { code: 100, message: '参数不能为空' }
        }
    }
}
function sortAi(receive) { // 对象属性排序
    let allField = [] // 所有字段
    for (let item in store.list[0]) {
        allField.push(item)
        if (!receive.hasOwnProperty(item)) { // 额外字段：组合传参没有的字段
            receive[item] = store.list[0][item]
        }
    }
    let newAi = {}
    for (let i = 0; i < allField.length; i++) {
        newAi[allField[i]] = receive[allField[i]]
    }
    return newAi
}

//查询全部数据
let purchase = function (receive) {
    receive = JSON.parse(receive.body);
    let param = {
        store_id: null,
        current_page: null,
        page_size: null
    }
    let ending = limitField(receive, param);
    if (ending) {
        return ending
    }
    store.current_page = receive.current_page;
    store.page_size = receive.page_size;
    // let magic = store; // 错误，来自json的变量，赋值改变了store结构
    let magic = {}
    for (let item in store) {
        magic[item] = store[item];
    }
    magic.list = []
    let electric = receive.current_page*receive.page_size >= store.total ? store.total : receive.current_page*receive.page_size;
    for(let i = (receive.current_page-1)*receive.page_size; i < electric; i++) {
        magic.list.push(store.list[i]);
    }
    return magic
}

//查询该单条数据
let isSingle = function (receive) {
    let id = Number(JSON.parse(receive.body)[idAi]); // 获取请求的id，将receive.body转换为JSON对象
    for (let i = 0; i < store.list.length; i++) {
        if (store.list[i][idAi] == id) {
            return store.list[i];
        }
    }
    return { code: 100, message: '传参错误' }
}

//搜索数据
let search = function (receive) {
    return [ store.list[0] ]
}

// 数据的删除操作
let isDelete = function (receive) {
    let id = Number(JSON.parse(receive.body)[idAi]); // 获取请求的id，将receive.body转换为JSON对象
    let save_length = store.list.length;
    store.list = store.list.filter(function (val) {
        return val[idAi] != id;  // 过滤掉前台传过来的id对应的相应数据，并重新返回
    });
    for (let i = 0; i < store.list.length; i++) { // 删除后重新排列id
        store.list[i][idAi] = i + 1
    }
    if (save_length.length !== store.list.length) {
        store.total = store.total - 1;
        return { code: 200, message: '删除成功' }
    } else {
        return { code: 100, message: '传参错误' }
    }
}

// 数据的添加操作
let isAdd = function (receive) {
    receive = JSON.parse(receive.body);
    let param = {
        title: null,
        // company: null,
        // category_pid: null,
        // category_cid: null,
        thumb: null,
        imgName: null,
        price: null,
        // original_price: null,
        // cost: null,
        stock: null,
        virtual_sales: null
    }
    let ending = limitField(receive, param);
    if (ending) {
        return ending
    }
    store.total = store.list.length + 1;
    receive[idAi] = store.list.length + 1;

    receive = sortAi(receive)
    store.list = store.list.concat(receive);  // 将前台返回来的数据，拼接到数组中。
    return { code: 200, message: '添加成功' }
    // return store
}

// 数据的修改操作
let isUpdate = function (receive) {
    receive = JSON.parse(receive.body);
    let param = {
        goods_id: null, // 相比添加，修改一般多个id
        title: null,
        // company: null,
        // category_pid: null,
        // category_cid: null,
        thumb: null,
        imgName: null,
        price: null,
        // original_price: null,
        // cost: null,
        stock: null,
        virtual_sales: null
    }
    let ending = limitField(receive, param);
    if (ending) {
        return ending
    }
    receive = sortAi(receive)
    store.list = store.list.map(val => {  // 将需要替换的数据替换掉
        return Number(val[idAi]) === Number(receive[idAi]) ? receive : val;
    });
    return { code: 200, message: '修改成功' }
    // return store

}

// 登录
let loginAi = function (receive) {
/*

|- token ---------- token(24小时失效)
|- nickname ------------ 昵称
|- avatar_img ---------- 头像
|- sex ---------------- 性别
|- vip --------------- vip等级
|- store_id ------------ 商店id
|- user_id ------------ 用户id

*/
    return login
}


export default {
    purchase, // 查询所有数据用的
    classify, // 查询分类数据    这两个没做啥处理，不用写function
    isSingle,
    isDelete,
    isAdd,
    isUpdate,
    search,
    loginAi
};
