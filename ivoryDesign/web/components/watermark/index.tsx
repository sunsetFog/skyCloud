import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import dayjs from "dayjs";
/*
    水印
    适用于防止信息盗用
    移动端把图宽调为375，然后转rem就ok了
    根据用户名加密，解密是盗版的证据
*/
function watermark(props: any) {

    useEffect(() => {
        let petalDraw = document.getElementById('swanDraw');
        for (let i = 0; i < 30; i++) {
            const box = document.createElement('div');
            box.innerHTML = `admin_${dayjs().format('YYYY-MM-DD HH:mm')}`;
            petalDraw.appendChild(box);
        }
    }, []);
    return (
        <div className={styles.watermarkUnit}>
            <div className={styles.watermarkBox} id='swanDraw'>

            </div>
        </div>
    );
}

export default watermark;
