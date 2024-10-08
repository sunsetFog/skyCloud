/*
    DOM操作相关方法
*/

/*
    固定宽，字体多出就截取，然后显示三个点
*/
export function contentSlice(strCon: any) {
    let strEmpty = '';
    let strSure = '';
    let flag = false;
    for (let i = 0; i < strCon.length; i++) {
        let element = strCon[i];
        strEmpty += element;
        // console.log('--strEmpty--', strEmpty);
        if (contentWidth(strEmpty + '...') > 412) {
            // console.log('--max-width--', this.contentWidth(strEmpty + '...'));
            flag = true;
            break;
        } else {
            strSure = strEmpty;
        }
    }
    if (flag) {
        return strSure + '...';
    }
    return strSure;
}
/*
    计算字体占盒子的宽
    注意：字体大小、字体间距能影响占宽
*/
export function contentWidth(value: any) {
    let isSpan = document.createElement('span');
    isSpan.innerHTML = value;
    isSpan.style.fontSize = '18px';
    document.body.appendChild(isSpan);
    let offsetWidth = isSpan.offsetWidth;
    document.body.removeChild(isSpan);
    return offsetWidth;
}
