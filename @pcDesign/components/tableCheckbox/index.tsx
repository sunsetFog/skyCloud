import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from 'redux';
// scss
import styles from './index.module.scss';

import { changeWay } from './utlis';

interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    keys: string;
}
/*
为啥不用table标签？
tr margin失效
tr border苹果手机失效
*/
function tableCheckbox(props: any) {
    const { columnList, tableData } = props;

    const fixedStyle = (item) => {
        let objStyle: any = {};
        if (item.width) {
            objStyle.flexBasis = item.width;
        }
        if (item.regularWidth) {
            objStyle.flex = '0 0 ' + item.regularWidth;
        }
        if (JSON.stringify(objStyle) == '{}') {
            objStyle = undefined;
        }
        return objStyle;
    };

    const Inputbox = (props: ExtendedInputProps) => {
        return <input {...props} />;
    };

    return (
        <section className={styles.tableCheckbox}>
            <header className={styles.theadBox}>
                <ul>
                    {columnList.map((item, index) => {
                        if (item.title == 'checkbox') {
                            return (
                                <li key={index} style={fixedStyle(item)}>
                                    <Inputbox
                                        type='checkbox'
                                        className='checkApt'
                                        keys='checkAll'
                                        onChange={(value) => {
                                            changeWay(value);
                                        }}
                                    />
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} style={fixedStyle(item)}>
                                    {item.title}
                                </li>
                            );
                        }
                    })}
                </ul>
            </header>

            <main className={styles.tbodyBox}>
                {tableData.map((row, index) => {
                    return (
                        <ul key={index}>
                            {columnList.map((item, sign) => {
                                if (item.title == 'checkbox') {
                                    return (
                                        <li key={sign} style={fixedStyle(item)}>
                                            <Inputbox
                                                type='checkbox'
                                                keys={item.name}
                                                className='checkApt'
                                                onChange={(value) => {
                                                    changeWay(value);
                                                }}
                                            />
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={sign} style={fixedStyle(item)}>
                                            {item.render ? item.render(row) : row[item.value]}
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    );
                })}
            </main>
        </section>
    );
}

export default compose(observer)(tableCheckbox);
