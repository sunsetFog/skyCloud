import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export const useScroll = (throttleTime: number = 100, callback: any = undefined) => {
  const [scrollY, setScrollY] = useState(0);

  const scrollHandler = throttle(() => {
    const y = window.scrollY;
    setScrollY(y);
    if (callback) {
      callback(y);
    }
  }, throttleTime);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, false);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return scrollY;
};
