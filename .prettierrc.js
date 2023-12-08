/*
VSCode格式化代码配置

Prettier官方文档：
https://prettier.io/docs/en/configuration.html


打开settings.json修改vscode配置：
文件---首选项---设置---搜索prettier---工作区设置


手动：
点vscode右下角空格:2 》空格缩进右的更改视图 》改 空格:4
全选代码 》vue文件里右键 》 选格式化文件

vscode保存自动格式化代码?
VSCode安装插件: Prettier - Code formatter
文件---首选项---设置---搜索Format on Save，然后勾选
.prettierrc.js文件自定义格式


文件名可以是prettier.config.js
.prettierrc 和 .prettierrc.js 都是 Prettier 的配置文件,区别在于:
1. 格式不同
- .prettierrc 使用 JSON 格式
- .prettierrc.js 使用 JavaScript 格式
2. 导出方式不同
- .prettierrc 直接导出配置对象
- .prettierrc.js 通过 module.exports 导出配置对象
3. 支持的配置不同
- .prettierrc 只支持部分静态配置
- .prettierrc.js 可以指定任何动态配置
4. 扩展方式不同
- .prettierrc 不能使用 extends 继承配置
- .prettierrc.js 支持通过 extends 继承配置
综上:
- 如果只需要静态配置,使用 .prettierrc 更简单
- 如果需要动态或可扩展配置,使用 .prettierrc.js 更灵活

*/
module.exports = {
    tabWidth: 4, // 每个制表符占用的空格数, 水平缩进的空格数
    printWidth: 100, // 单行最大长度
    singleQuote: true, // 使用单引号
    trailingComma: 'all', // 在任何可能的多行中输入尾逗号
    jsxSingleQuote: true, // 使用双引号
    bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
    alwaysParens: 'always', // 为单行箭头函数的参数添加圆括号。
    jsxBracketSameLinte: false, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
    semi: true, // 在句尾添加分号
    endOfLine: 'lf', // 行结束
};
