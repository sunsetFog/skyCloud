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

# 搜索
面试必考
study:
经验问题
vue3改版

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


















