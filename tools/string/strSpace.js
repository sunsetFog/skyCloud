/*
去掉空格
*/

// 去掉字符串两端的空格 
export function trimWay(str = '   hello world   ', way = 1) {
    if (way == 2) {
        return str.replace(/^\s+|\s+$/g, '');
    } else {
        return str.trim();
    }
}
// 去掉中间空格
export function middleSpace(str = '   hello world   ') {
    return str.replace(/\s+/g, ' ');
}
// 替换所有空格
export function replaceSpace(str = ' Admin0，Admin1，Admin2，Admin3 ') {
    return str.replace(/\s/g, '');
}
