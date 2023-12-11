sure

submit

current 当前

git config pull.rebase false
hint: git config pull.rebase false # merge
hint: git config pull.rebase true # rebase

cd /usr/local/mysql/bin
sudo mysqldump -u root -p -B db_news > /Users/ivory/Downloads/backups6.sql

鸟
bird
草
grass
木瓜
papaya
猫女
catwoman
天鹅
swan
花瓣
petal

https://github.com/sunsetFog/extend.git
https://github.com/sunsetFog/java_tools.git

github 子模块(submodule)

添加子模块
git submodule add https://github.com/sunsetFog/java_tools.git yahoo
然后提交代码

下载方式 1：
递归克隆所有子模块
git clone --recurse-submodules https://github.com/sunsetFog/extend.git

下载方式 2：
一个个子模块下载
git clone https://github.com/sunsetFog/extend.git
查看子模块
git submodule
初始化子模块
git submodule init
更新子模块（下载子模块）
git submodule update
更新子模块为远程项目的最新版本
git submodule update --remote
一次性初始化和更新所有子模块
git submodule update --init --recursive

单个模块切换任务分支
git checkout feature/ivory-KY-0000
每一个子模块切换任务分支
git submodule foreach --recursive git checkout feature/ivory-KY-0000

单个模块切换和基于 master 创建任务分支
git checkout -b feature/ivory-KY-0000 origin/master
每一个子模块切换和基于 master 创建任务分支
git submodule foreach --recursive git checkout -b feature/ivory-KY-0000 origin/master

？？
自定义的 Git 钩子脚本，用于在执行 Git 提交（commit）操作之前，对子模块进行一些操作或检查
submodule-pre-commit.sh

切换和基于远程 master 创建本地任务分支
git checkout -b feature/ivory-KY-1001 origin/master
将本地分支推送到远程仓库，-u 将本地分支与远程分支建立追踪关系
git push -u origin feature/ivory-KY-1001

此时，feature/ivory-KY-1002 是本地分支，远程还没这个分支
git checkout -b feature/ivory-KY-1002 origin/master
将当前分支与远程分支 feature/ivory-KY-1001 建立追踪关系
git branch --set-upstream-to=origin/feature/ivory-KY-1001
git pull 时，拉取远程分支 origin/feature/ivory-KY-1001
git push 时，推送远程分支 origin/feature/ivory-KY-1001

submodule-pre-commit.sh

删除子模块

删除子模块文件夹
$ git rm --cached test
$ rm -rf test

删除.gitmodules 文件夹中相关子模块信息

删除.git/config 文件夹中的相关子模块信息

删除.git 文件夹中的相关子模块文件
rm -rf .git/modules/test
