
/*
VSCode格式化配置
https://blog.csdn.net/qq_42704919/article/details/118551837

文件名可以是prettier.config.js

---VSCode安装Prettier 插件---
Prettier configuration
https://prettier.io/docs/en/configuration.html

vscode设置（覆盖不了，只能查看）：文件---首选项---设置---搜索prettier---工作区设置（或点...打开settings.json手动改）
点vscode右下角空格:2---空格缩进右的更改视图 ---改 空格:4
vue文件里右键---选格式化文件
*/
module.exports = {
    tabWidth: 4,// 每个制表符占用的空格数, 水平缩进的空格数
    printWidth: 100,// 单行最大长度
    singleQuote: true,// 使用单引号
    trailingComma: 'all',// 在任何可能的多行中输入尾逗号
    jsxSingleQuote: true,// 使用双引号
    bracketSpacing: true,// 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
    alwaysParens: 'always',// 为单行箭头函数的参数添加圆括号。
    jsxBracketSameLinte: false,// 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
    semi: true,// 在句尾添加分号
    endOfLine: 'lf',// 行结束
};
