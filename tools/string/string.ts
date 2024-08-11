//判断是否为空
export function isEmpty(str: any) {
    if (str == '' || str == null || str == undefined) {
        return true;
    } else {
        return false;
    }
}
