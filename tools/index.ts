import title1 from './app';
import title2 from './browser';
import title3 from './date';
import title4 from './dom';
import title5 from './regExp';
import title6 from './string';

export default {
    ...title1,
    ...title2,
    ...title3,
    ...title4,
    ...title5,
    ...title6
}
/*
使用
import tools from '@/@energy/tools';
const { isBrowser } = tools;
*/
