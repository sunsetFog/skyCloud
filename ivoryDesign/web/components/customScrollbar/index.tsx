import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
/*
自定义滚动条
*/
function CustomScrollbar({ children }) {


    return (
        <section className={styles.CustomScrollbar}>
            {children}
        </section>
    );
}

export default CustomScrollbar;
