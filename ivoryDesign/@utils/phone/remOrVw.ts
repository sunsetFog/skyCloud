// px 转 vw 再转 px
export const pxToVwToPx = (num: number): number => {
    let vwValue: number = (num / 390) * 100;
    let viewportWidth: number = 390;
    if (typeof window != 'undefined') {
        viewportWidth = window.innerWidth;
    }
    let pxValue: number = (vwValue / 100) * viewportWidth;
    return pxValue;
};
// px 转 vw
export function pxToVw(value: number): number {
    return (value / 390) * 100;
}
