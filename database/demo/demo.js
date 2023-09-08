import Mock from 'mockjs'
/*
链接
vue+vuecli+webpack中使用mockjs模拟后端数据
https://blog.csdn.net/yw00yw/article/details/81272632
在vue-cli项目中使用Mock模拟数据的增删改查操作：
https://blog.csdn.net/yw00yw/article/details/81328126

学习生成随机数据就行
mock.js官网: http://mockjs.com

前端关于自己模拟接口做测试
https://blog.csdn.net/w_s_x_b/article/details/92613421
https://www.mocky.io/  这是接口模拟工具  https://designer.mocky.io
 */
let List = []
let typelist = ['联通', '移动', '电信', '铁通']
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    userImg: Mock.Random.image(),
    username: Mock.Random.name(),
    username2: Mock.Random.cname(),
    date: Mock.Random.datetime(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    income: Mock.Random.float(0, 9999, 2,2),
    status:Mock.Random.natural( 1,4 ),
    commentContent:Mock.Random.paragraph(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.now(),
    ip: Mock.mock('@ip'),
    region: Mock.mock('@region'),
    areaId: /\d{7}/,
    email: Mock.Random.email(),
    'isp|1': typelist
  }))
}