import regExpUnit__frog from './modular/regExpUnit/frog'
import echartUnit__echart from './modular/echartUnit/echart'
import browserunit__1 from './modular/browserunit/1'
import regExpUnit__regular from './modular/regExpUnit/regular'
import callback from './modular/callback'
import cacheUnit__indexDb from './modular/cacheUnit/indexDb'
import cacheUnit__cookies from './modular/cacheUnit/cookies'
import dateUnit__date from './modular/dateUnit/date'
import regExpUnit__regExp from './modular/regExpUnit/regExp'
import stringUnit__strSpace from './modular/stringUnit/strSpace'
import stringUnit__1 from './modular/stringUnit/1'
import domUnit__1 from './modular/domUnit/1'


/*
    全局方法
 */
const comic = { // es6合并对象
    ...regExpUnit__frog,
    ...echartUnit__echart,
    ...browserunit__1,
    ...regExpUnit__regular,
    ...callback,
    ...cacheUnit__indexDb,
    ...cacheUnit__cookies,
    ...dateUnit__date,
    ...regExpUnit__regExp,
    ...stringUnit__strSpace,
    ...domUnit__1,
    ...stringUnit__1
}
export default comic
