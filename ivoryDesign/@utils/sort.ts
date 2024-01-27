
// 数组name排序
export const nameSortIndex = (str: string) => {
    const arr = ['全站', '体育'];
    let num = 999;
    arr.forEach((item, index) => {
      if (str.includes(item)) num = index;
    });
    return num;
};
