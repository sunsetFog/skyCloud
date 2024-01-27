
import React, {Component} from 'react';
// 不能引入状态管理

import FormService2 from './formService2'
/*
    使用场景：form表单和table表格一起时
*/
class TableService3 extends FormService2 {

    constructor(props) {
        console.log("-okk-3-", props);
        super(props);
    }

    cabbage2 = '白菜2'

    // 切换分页
    onChangePage = (page, pageSize) => {
        this.onValidateForm()
    }

    // 删除
    onDelete = (id) => {

    }

    // 重置表单并查询数据
    onRest2 = () => {
        this.onRest1()
        this.onValidateForm()
    }


    // render() {

    //   return (
    //     <>
    //     --table666--
    //     </>
    //   );
    // }
}

// 不能用withRouter
export default TableService3


// 基础table数据类型
export const initTableData: any = {
    page: 1, // 当前页
    pageSize: 15, // 分页大小
    totalRecord: 0, // 总数
    pageNum: 5,
    units: [], // 列表
    list: [], // 列表 <- 新接口返回list，老接口返回units
}
