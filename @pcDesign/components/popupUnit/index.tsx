import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
// component
import { compose } from 'redux';
// scss
import styles from './index.module.scss';

import { anchorList } from './constants';

function PopupUnit(props: any) {
  const [showModal, setShowModal] = useState(false);
  const { children } = props;

  const showWay0 = (_event: any) => {
    bodyRef.current.style.overflow = 'hidden';
    setShowModal(true);
  };
  const closeWay0 = (event: any) => {
    let ev = event || window.event;
    ev.stopPropagation();
    if (event.target === event.currentTarget) {
      bodyRef.current.style.overflow = '';
      setShowModal(false);
    }
  };

  const bodyRef = useRef() as any;
  useEffect(() => {
    bodyRef.current = document.body;
  });
  return (
    <>
      <button onClick={showWay0}>
        {children}
      </button>
      {showModal && (
        <section className={styles.rainbow} onClick={closeWay0}>
          <main className={styles.summer}>
            <div className={styles.headerTitle}>提示</div>
            {anchorList.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.rowBox}>
                  <label>{item.label}</label>
                  <p>{item.tips}</p>
                </div>
              );
            })}
            <footer onClick={closeWay0}>我知道了</footer>
          </main>
        </section>
      )}
    </>
  );
}

export default compose(observer)(PopupUnit);

