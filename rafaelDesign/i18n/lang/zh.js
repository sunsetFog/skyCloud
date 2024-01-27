
export default {
    button: {
      back: '返回',//Back
      undo: '撤销',//Undo
      upload: '上传附件',//Upload Attachment
      close: '关闭',//Close
      confirm: '确定',//OK
      cancel: '取消',//Cancel
      add: '新增',//Add
      edit: '修改',//Edit
      delete: '删除',//Delete
      reset: '重置',//Reset
      migration: '迁移',//Migrate
      save: '保存',//Save
      search: '查询',//Query
      assignRole: '授权',//Authorize
      enable: '启用',//Enable
      disable: '禁用',//Disable
      show: '显示',//Show
      hide: '隐藏',//Hide
      onceSave: '暂存',//Save
      detail: '详情',//Details
      print: '打印',//Print
      view: '查看',//View
      refresh: '刷新',//Refresh
      export: '导出',//Export
      active: '生效',//Active
      inactive: '失效',//Inactive
      copy: '复制',//Copy
      download: '下载',//Download
      preview: '预览',//Preview
      import: '导入',//Import
      imageRetrieval:'影像调阅',//Image Review
      bulkDownload:'批量下载',//Download All
      bulkDelete:'批量删除'//Delete All
    },
    operationMessage: {
      saveSuccess: '保存成功!',//save success!
      saveFail: '保存失败',//save fail!
      cancelTip: '记录没有保存！',//The record has not been saved!
      editBeforeSave: '请编辑未保存的行',//Please edit the unsaved row.
  
      deleteSuccess: '删除成功!',//delete success!
      deleteFail: '删除失败',//delete fail!
      delRow: '删除该行?',//Delete this row?
  
    confirmDelete: '请确认是否需要永久删除此数据？',//Confirm to delete data forever?
    cancelDelete: '已取消删除。',//Canceled deletion.

    updateSuccess: '更新成功!',//update success!
    updateFail: '更新失败',//update fail!

    modifySuccess: '修改成功!',//modify success!
    modifyFail: '修改失败',//modify fail!

    cannotActive: '请选择需要生效的条目',//Please select data to active
    cannotInactive: '请选择需要失效的条目',//Please select data to inactive
    confirmDisable: '数据失效后不可恢复，请确认是否需要失效此数据？',//The data cannot be recovered after it is invalidated. Please confirm whether you need to invalidate this data?
    cannotSave: '没有需要保存的内容',//There is no data that needs to be saved.

    errorInput: '请输入正确的',//Please enter correctly
    errorInputLength: '超出可输入长度',//Data too long
    errorSelect: '请选择正确的',//Please select correctly
    errorNumber: '请输入数字',//Please enter number

    cannotCopy: '请选择需要复制的条目',//Please select data to copy
    cannotSame: '此名称已被使用',//The name is already used.
    cannotDelete: '请选择需要删除的条目',//Please select data to delete
    cannotEdit: '请选择需要修改的条目',//Please select data to edit
    cannotAssignRole: '请选择需要授权的条目',//Please select data to authorize

    noData: '暂无数据',//No available data
    editted: '保存编辑内容?',//Save the edited content?
    checkEdit: '请检查录入的内容',//Please check what you has entered
    confirm_enable: '设置为可用？',//Enable them?
    loading: '拼命加载中',//Loading
    dateFormat: '格式错误'//The format is wrong
  },
  placeholderInfo: {
    pleaseTypeContents: '请输入内容',//Please enter
    placeholder: '输入关键字进行过滤',//Enter keywords for filtering
    datePlaceholder: '请输入YYYY-MM-DD日期格式'//Please input YYYY-MM-DD format
  },

  condition: {
    bt: '之间',//between
    cn: '包含',//contains
    eq: '等于',//equal
    ne: '不等',//not equal
    me: '多选',//multi equal
    bw: '开始于',//begins with
    ew: '结束于',//ends with
    gt: '大于',//greater
    ge: '大于等于',//greater or equal
    lt: '小于',//less
    le: '小于等于'//less or equal
  },
  loginError: {
    "ISC-950": "用户不存在或密码错误！",//The username does not exist or password is incorrect.
    "ISC-920": "无用户登录信息禁止访问服务！",//No user login, no access to the service!
    "ISC-912": "当前会话过期，请重新登录！",//Current session expired. Please login again.
    "ISC-903": "用户名或密码为空！",//The username or password is empty.
    "ISC-904": "SSO登录失败！",//Fail to login using SSO.
    "ISC-914": "系统名或令牌为空！",//The App or token is empty.
    "ISC-911": "SSO获取用户名失败！",//Fail to obtain the user name using SSO.
    "ISC-913": "SSO获取Token失败！",//Fail to obtain the token using SSO.
    "ISC-930": "服务不可用，请联系管理员！",//Service unavailable, please contact administrator!
    "ISC-959": "没有应用访问权限!",//You have no access to the application.
    "ISC-960": "登录应用无效!",//Invalid login to the application.
    "ISC-980": "SSO访问权限未配置!",//SSO access permission is not configured.
    "ISC-981": "IP在黑名单中，禁止访问！",//This IP is blocklisted and cannot be accessed.
    "ISC-982": "SSO服务不在IP白名单中，禁止访问！"//The SSO service is not in the IP allowlist and cannot be accessed.
  }
}
