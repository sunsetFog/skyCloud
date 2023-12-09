/*
唯一值
*/
export const timeStamp = new Date().getTime();

/*
生成n位随机数
*/
export const generateRandom = (n: number) => {
    let num = '';
    for (let i = 0; i < n; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
};
