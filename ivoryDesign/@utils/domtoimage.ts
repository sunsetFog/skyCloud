import domtoimage from 'dom-to-image';
/*
import html2canvas from 'html2canvas';
不能识别阴影和圆角，删
*/

export const screenshotPng = (dom: any) => {
    // 生成 PNG 格式的截图
    domtoimage
        .toPng(dom)
        .then(function (dataUrl) {
            // 将截图数据 URL 转换为 Blob 对象
            const link = document.createElement('a');
            link.download = 'app_qrcode.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('Screenshot failed:', error);
        });
};
