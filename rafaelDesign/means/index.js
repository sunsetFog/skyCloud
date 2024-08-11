import regExpUnit__frog from './modular/regExpUnit/frog'
import echartUnit__echart from './modular/echartUnit/echart'
import regExpUnit__regular from './modular/regExpUnit/regular'
import callback from './modular/callback'
import cacheUnit__indexDb from './modular/cacheUnit/indexDb'
import cacheUnit__cookies from './modular/cacheUnit/cookies'
import regExpUnit__regExp from './modular/regExpUnit/regExp'
import tools from '@sky/tools'


/*
    全局方法
 */
const comic = { // es6合并对象
    ...regExpUnit__frog,
    ...echartUnit__echart,
    ...regExpUnit__regular,
    ...callback,
    ...cacheUnit__indexDb,
    ...cacheUnit__cookies,
    ...regExpUnit__regExp,
    ...tools
}
export default comic
