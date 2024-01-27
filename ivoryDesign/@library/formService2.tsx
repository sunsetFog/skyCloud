
import React, {Component, createRef} from 'react';
// 不能引入状态管理

import BasicService1 from './basicService1';
import { FormInstance } from 'antd/es/form'
/*
    使用场景：
        1.弹窗表单时
        2.只有表单时

    页面加载完的form默认值
*/
class FormService2 extends BasicService1 {

    constructor(props) {
        console.log("-okk-2-", props);
        super(props);
    }

    // form的ref实例
    formRef = createRef<FormInstance>()

    //《重写》提交表单
    onHttpApi = (sendingData = {}) => null

    // 弹窗表单：打开弹窗，初始化form重置(不推荐)
    onOpenModal = (obj = {}) => {
        this.setState({ ...obj }, () => {
            // 在 setState 的回调函数中执行对 DOM 的操作
            this.onRest1()
        })
    }

    // 弹窗表单：关闭弹框，初始化form重置(推荐)
    onCloseModal = (obj = {}) => {
        this.onRest1()
        this.setState({ ...obj })
    }

    // 表单校验
    onValidateForm = () => {
        return this.formRef.current?.validateFields();
    }

    // 获取表单数据
    getModalForm = () => {
        return this.formRef.current?.getFieldsValue()
    }

    // 设置表单数据
    setModalForm = (obj) => {
        this.formRef.current?.setFieldsValue(obj)
    }

    // 重置表单
    onRest1 = () => {
        this.formRef.current?.resetFields()
    }


    // render() {

    //   return (
    //     <>
    //         --form666--
    //     </>
    //   );
    // }
}

// 不能用withRouter
export default FormService2
