/*
vw 适配文件，px to vw自动转转换

在 Vue3 项目中可以通过 PostCSS 的 postcss-px-to-viewport 插件来实现 vw 适配

安装 postcss-px-to-viewport
npm install postcss-px-to-viewport -D


在 vue.config.js 中引用 postcss.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          config: './postcss.config.js'
        }
      }
    }
  }
}

使用：
屏宽：100vw
(345px / 375) * 100 = 92vw

*/
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375, // 设计稿宽度
            viewportHeight: 667, // 设计稿高度
            unitPrecision: 5, // 单位转换后保留的精度
            viewportUnit: 'vw', // 希望使用的视口单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许在媒体查询中转换
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        },
    },
};
