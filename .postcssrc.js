/*
    px to rem自动转转换
    npm install postcss-pxtorem postcss-import postcss-url --save-dev
    https://github.com/michael-ciniawsky/postcss-load-config
*/
module.exports = {
    plugins: process.env.VUE_APP_ADAPTER == 'rem' ? {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-pxtorem': {
            rootValue: 16,
            propList: ['*'],
        },
        autoprefixer: {},
    } : {}
};
