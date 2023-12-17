import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import html2canvas from 'html2canvas';
import dayjs from "dayjs";
/*
    水印
    适用于防止信息盗用
    移动端把图宽调为375，然后转rem就ok了
    根据用户名加密，解密是盗版的证据
*/
function watermark(props: any) {
    //元素转成图片
    const convertCanvasToImage = (dom: any, width: any) => {
        html2canvas(dom, {
            backgroundColor: 'transparent',
            // 转换为图片
            useCORS: true, // 解决资源跨域问题
        }).then((canvas: { toDataURL: (arg0: string) => any }) => {
            // imgUrl 是图片的 base64格式 代码 png 格式
            let imgUrl = canvas.toDataURL('image/png');
            // console.log('imgUrl', imgUrl);
            let swanDraw = document.getElementById('swanDraw');
            swanDraw.style.backgroundImage = `url(${imgUrl})`;
            swanDraw.style.backgroundRepeat = `repeat`;
            let widApt = width + width * 0.04;
            swanDraw.style.backgroundSize = `${widApt}px ${widApt * 0.55}px`;
            swanDraw.style.pointerEvents = `none`;
        });
    };
    useEffect(() => {
        // let peach = document.createElement('div');
        // peach.innerHTML = '2023-12-13 15:45';
        let petalDraw = document.getElementById('petalDraw');
        petalDraw.style.top = petalDraw?.clientHeight * -2 + 'px';
        // console.log('--petalDraw--', petalDraw?.clientWidth, petalDraw?.clientHeight);
        convertCanvasToImage(petalDraw, petalDraw?.clientWidth);
    }, []);
    return (
        <div className={styles.watermarkUnit}>
            <div className={styles.watermarkBox} id='swanDraw'>
                <div id='petalDraw'>admin_{dayjs().format('YYYY-MM-DD HH:mm')}</div>
            </div>
        </div>
    );
}

export default watermark;
