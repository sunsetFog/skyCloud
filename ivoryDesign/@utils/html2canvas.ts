import html2canvas from 'html2canvas';

// 下载图片
const downloadIamge = (imgsrc: string, name: string) => {
    //下载图片地址和图片名
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        let context: any = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
        let a = document.createElement('a'); // 生成一个a元素
        let event = new MouseEvent('click'); // 创建一个单击事件
        a.download = name || 'photo'; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
};

//元素转成图片
export const convertCanvasToImage = (dom: any) => {
    html2canvas(dom, {
        // 转换为图片
        useCORS: true, // 解决资源跨域问题
    }).then((canvas: { toDataURL: (arg0: string) => any }) => {
        // imgUrl 是图片的 base64格式 代码 png 格式
        let imgUrl = canvas.toDataURL('image/jpeg');
        console.log('imgUrl', imgUrl);
        //下面是 下载图片的功能。 不需要不加 注意加 .png
        downloadIamge(imgUrl, 'app_qrcode.png');
    });
};
