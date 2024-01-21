pattern 图案
sample 样品
normalcy 常态

git tag -a v1.0 -m '开云赞助宣传页完成交付' // 新建
git push origin v1.0 // 推送
git show v1.0 // 显示 tag 详情
git tag //显示 tag 记录


Git LFS是一个Git扩展，用于处理大型二进制文件，如图像、音频文件、视频等，以便更有效地管理和版本控制这些文件
git lfs install

vue3 使用百度地图(详)
https://blog.csdn.net/jyl919221lc/article/details/129840324

Vue 3.0 使用高德地图 vue-amap
https://blog.csdn.net/m0_45043105/article/details/103431348

猎杰
https://liejie.cc/?cat=94

博牛社区
https://www.boniu123.cc/


FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
这个错误是因为JavaScript堆内存不足，导致分配失败

增加node服务器内存
全局安装increase-memory-limit
npm install -g increase-memory-limit
根目录下：
increase-memory-limit

yarn upgrade react-router-dom@latest

npm install react-router-dom@latest


## Commit Message 规范

项目已经集成 husky 和 commitlint,会在 commit 前检查 commit message 是否符合规范。

一般常用的类别有：

- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

详细规范请参考 [规范说明](http://jira.hnxmny.com:8090/pages/viewpage.action?pageId=36461323)
