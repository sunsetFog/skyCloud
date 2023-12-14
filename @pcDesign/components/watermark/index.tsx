import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import html2canvas from 'html2canvas';
/*
    水印
    适用于防止信息盗用
*/
function watermark(props: any) {
    const { children } = props;
    //元素转成图片
    const convertCanvasToImage = (dom: any) => {
        html2canvas(dom, {
            backgroundColor: 'transparent',
            // 转换为图片
            useCORS: true, // 解决资源跨域问题
        }).then((canvas: { toDataURL: (arg0: string) => any }) => {
            // imgUrl 是图片的 base64格式 代码 png 格式
            let imgUrl = canvas.toDataURL('image/png');
            console.log('imgUrl', imgUrl);
            let swanDraw = document.getElementById('swanDraw');
            swanDraw.style.backgroundImage = `url(${imgUrl})`;
            swanDraw.style.backgroundRepeat = `repeat`;
            swanDraw.style.backgroundSize = `160px 105px`;
            // swanDraw.style.backgroundSize = `35% 20%`;
            swanDraw.style.pointerEvents = `none`;
        });
    };
    useEffect(() => {
        // let peach = document.createElement('div');
        // peach.innerHTML = '2023-12-13 15:45';
        let petalDraw = document.getElementById('petalDraw');
        petalDraw.style.top = petalDraw?.clientHeight * -2 + 'px';
        console.log('--petalDraw--', petalDraw);
        convertCanvasToImage(petalDraw);
    }, []);
    return (
        <section className={styles.watermarkUnit}>
            {children}
            <main className={styles.watermarkBox} id='swanDraw'>
                <div id='petalDraw'>admin_2023-12-13 15:45</div>
            </main>
        </section>
    );
}

export default watermark;
