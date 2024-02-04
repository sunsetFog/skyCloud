# skyCloud

# vuecli搭建项目
https://cli.vuejs.org/zh/guide/

# vite搭建vue3、typeScript项目
使用 Vite 设置应用程序，解决大型项目服务器启动缓慢问题
npm create vite@latest

# 项目技术

vue3、typescript、elementPlus、vue-class-component

# 如何学习JSX
.js  javascript文件
.jsx  javascript文件并表明使用了JSX语法。

.ts  typescript文件
.tsx  typescript文件并使用了JSX语法

JSX作用：变量值是标签    例如：JSX标签 const element = <h1>Hello</h1>;

https://zh-hans.reactjs.org/docs/introducing-jsx.html
https://zh-hans.reactjs.org/docs/jsx-in-depth.html

# 用不了yarn的原因？因为没有使用 Yarn 管理 monorepo 工作空间类型的项目
用yarn server:dev需要有yarn.lock文件，重新yarn install就自动生成yarn.lock文件了

Yarn 官方文档
https://yarn.bootcss.com/docs/workspaces/

父的package.json
工作空间配置中没有声明 packages/adminSystem 这个子目录
"workspaces": [
    "packages/*",
    "packages/adminSystem"
],
子的package.json
name名不能重复

作用：
统一的依赖管理:根目录的 package.json 可以集中管理所有 workspace 包的依赖,使用 yarn install 一步安装所有包的依赖

# env配置环境变量
.env  所有环境的变量 --- 不需要配置也生效
.env.dev  开发环境的变量
.env.prod  生产环境的变量

优先级 .env < .env.production < .env.development
变量必须以 VUE_APP_ 开头

在package.json配置运行命令
"server": "vue-cli-service serve",
"build": "vue-cli-service build",
改为
"server:dev": "vue-cli-service serve --mode dev",
"build:dev": "vue-cli-service build --mode prod"

cross-env跨平台设置环境变量的工具，不需要也没影响
npm install cross-env -D
"server:dev": "cross-env platform=bd vue-cli-service serve --mode dev",
"build:dev": "cross-env platform=tb vue-cli-service build --mode prod"
此时生成两个属性 process.env.NODE_ENV 和 process.env.platform

使用:
    process.env.*   直接打印process会报错，要完整写法
    process.env.platform 在node环境运行的，打印会undefined

关联  NODE_ENV=dev  ->  .env.dev        NODE_ENV=prod  ->  .env.prod

作用：可以设置环境和平台，一个皮肤对应一个平台，也可以一个平台多个皮肤








crm的登陆页面弃用了

npm install less less-loader -D

/>  替换  ></input>

在Vue3项目中,图片资源可以放在组件模块中,而不一定要放在公共的assets目录下。



找不到
this.$cookies
this.$means
vuex
http


import { Message } from 'element-ui';
变
import { ElMessage } from 'element-plus'

import router from '../../router';
变
import router from '@/router';



:deep(tag) {} 替换 /deep/
addRoutes 变 addRoute

// @ts-ignore
if (VueCookies.get('tokenAdminClient')) {


Vue.prototype
变
rainbow.config.globalProperties

Vue3 没有 iview的UI组件


process.env.core_url + 
替换空


import {
    defineComponent
} from "vue";

export default defineComponent();


@/crm/components
变
@/components

@/explore/components


v-distpicker
sortablejs


项目相互调用修改

@/explore/components
变
@sky/pcDesign/components




<i class="el-icon-plus"></i>
变
<el-icon><Plus /></el-icon>

isNaN(Number(grabMoney))

import * as Icons from '@element-plus/icons-vue'

给要去除 hover 效果的元素添加 pointer-events: none,可以禁用鼠标事件的触发,阻止冒泡到父元素



在 Vue 3 中,this.$set 方法已被删除
用this赋值




插槽变了
v-slot 只能在组件和 <template> 上使用
slot-scope="scope"
变
v-slot="scope"





.$el.
变
.


:visible.sync
变
v-model

.sync删掉了


要忽略这句代码
// @ts-ignore
VueCookies.get(process.env.VUE_APP_TOKEN_KEY)


@/explore/api/http.js
变
@sky/axios/request2/http.js

@/explore/api/user
变
@sky/axios/request2/user

@/explore/mixins/lyMixin
变
@sky/mixins/lyMixin

@static/
变
@sky/static/

@/pages/
变
@/views/

用法改变
vue3 driver.js



import Vue from 'vue'  --- 这个还有，警告不要使用中
Vue.use()
解决：用引入子组件方式

不要再直接使用 Vue.extend,而要按照 Vue 3 的语法改用 setup、defineComponent 或 Class 语法来定义组件

Main.ts百度地图报错
TypeError: Cannot set properties of undefined (setting '_BMap')

item.component = resolve => require([ '@/views' + item.path + '.vue' ],resolve);
变
item.component = () => import('@/views' + item.path + '.vue');



-webkit-filter: brightness(3);
filter: brightness(3);
亮度提高3倍,使图片变得过度曝光,出现白色偏移
activity

vue3没有mint-ui, 只能换新UI库

@/reportForms/
变
@/

路由
component: resolve => require(['@/views/defaultPath'], resolve)
变
component: () => import('@/views/404.vue')


addRoutes
变
addRoute

vue-router.mjs:1326 Uncaught (in promise) Error: Catch all routes ("*") must now be defined using a param with a custom regexp.
path: '*',
变
path: '/:pathMatch(.*)*',

图片模块化
刷新component问题
vw适配
类名加文件路径
整理插件
罗盘抽奖没显示

npm install vue-luck-draw
变
npm install @lucky-canvas/vue@latest --save

裁切头像，升级版本
npm install vue-cropper@next --save


vue-amap是一套基于Vue 2.0和高德地图的地图组件
npm i -S @vuemap/vue-amap


import echarts from 'echarts'
变
import * as echarts from 'echarts'


在 Vue 3 中,过滤器已经被移除了
全局删filters:
改使用方法过滤


@lljj/vue-json-schema-form 是vue2的
vue3用？
npm install vue-json-schema-form



屏高问题？




v-viewer 目前还不支持 Vue 3

Css 计算问题

element-ui
改为
element-plus

size="mini"
变
size="small"

type="text"
改为
link


<keep-alive>
  <router-view></router-view>
</keep-alive>
改为
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>  
</router-view>


在 React 项目中引入不了src 目录之外的组件

没有变量
$eventBus

git lfs install

git clone --recurse-submodules https://


git submodule update --init --remote --recursive --force







