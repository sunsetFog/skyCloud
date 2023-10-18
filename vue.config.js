const { defineConfig } = require('@vue/cli-service');
const path = require('path');

/*

某功能自定义webpack
通过 configureWebpack 或 chainWebpack 对已有的 webpack 配置进行修改
configureWebpack比较清晰，建议
chainWebpack链式配置要熟练才好，不建议

npm install -D postcss-preset-env

vue3 loader: 'css-loader'用configureWebpack配置类名localIdentName



完全自定义 webpack 配置 --- 未采纳
// webpack.config.js
module.exports = {
  // webpack 配置
}
vue.config.js 中设定使用
// vue.config.js
module.exports = {
  // 使用自定义配置
  webpack: require('./webpack.config.js')
}

*/
function cssLoaders(importLoaders) {
    return [
        {
            loader: 'css-loader',
            options: {
                importLoaders: importLoaders,
                esModule: false,
                sourceMap: true,
                localsConvention: 'camelCaseOnly',
                modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
            },
        },
        // {
        //     loader: 'postcss-loader',
        //     options: {
        //         postcssOptions: {
        //             plugins: [
        //                 require('postcss-preset-env')
        //             ],
        //         },
        //     },
        // },
    ];
}

module.exports = defineConfig({
    devServer: {
        port: process.env.VUE_APP_PORT,
        proxy: {
            '/api': {
                target: 'http://localhost:8062',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    transpileDependencies: true,
    lintOnSave: false, // 关闭这些未使用变量/方法的警告
    configureWebpack: {
        resolve: {
            // 配置路径映射/路径别名   tsconfig.json里也要配置，曾遇到main.ts出现找不到路径别名
            alias: {
                '@': path.join(__dirname, './src'),
                '@sky': path.join(__dirname, '../../'),
                '@root': path.join(__dirname),
            },
        },
        module: {
            rules: [
                // {
                //     test: /\.css$/,
                //     use: [
                //         'vue-style-loader',
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 modules: {
                //                     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                //                 },
                //             },
                //         },
                //     ],
                // },
                // {
                //     test: /\.css$/,
                //     use: [
                //         // 'vue-style-loader',
                //         // 'style-loader',
                //         cssLoaders(1)
                //     ],
                // },
                // {
                //     test: /\.scss$/,
                //     use: [
                //         // 'vue-style-loader',
                //         cssLoaders(2),
                //         'sass-loader',
                //     ],
                // },
                // {
                //     test: /\.less$/,
                //     use: [
                //         // 'vue-style-loader',
                //         cssLoaders(2),
                //         'less-loader',
                //     ],
                // },
            ],
        },
    },
    /*
  main.ts里，加载失败
  import '@sky/styles/lessVariable.less';
  app.vue里，加载失败
  @import '~@sky/styles/lessVariable.less';
  */
    css: {
        loaderOptions: {
            // vue3 全局less变量
            less: {
                additionalData: `@import "${path.resolve(
                    __dirname,
                    '../../styles/lessVariable.less',
                )}";`,
            },
            // vue3 全局scss变量
            scss: {
                additionalData: `@import "${path.resolve(
                    __dirname,
                    '../../styles/scssVariable.scss',
                )}";`,
            },
            // 引入vw适配文件
            postcss:
                process.env.VUE_APP_ADAPTER == 'vw'
                    ? {
                          postcssOptions: {
                              config: './postcss.config.js',
                          },
                      }
                    : {},
        },
    },
    // config链式操作 (高级)
    chainWebpack: (config) => {
        //     config.module
        //   .rule('vue')
        //   .use('vue-loader')
        //   .loader('vue-loader')
        //     config.module.rule('css')
        //   .oneOf('vue')
        //   .use('css-loader')
        //     .loader('css-loader')
        //     .options({
        //       modules: {
        //         exportGlobals: true,
        //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
        //       }
        //     })
    },
});
