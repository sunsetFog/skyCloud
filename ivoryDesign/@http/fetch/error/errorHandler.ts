import { DOMEvent } from 'sunny-js';
import { isBrowser } from '@/@energy/ivoryDesign/@utils/phone/app';

// 监听异常，事件发布与订阅
export function errorHandler(error: Error) {
  if ('code' in error && isBrowser()) {
    DOMEvent.trigger(`${error.constructor.name}/code/${(error as any).code}`, error);
  }
}
// 替换报错信息
const abnormalErrors = ['Acceptable', 'Failed', '发生了SSL错误', 'Forbidden'];
const replaceMessage = '网络异常,请您稍后重试';
const defalutMessage = '系统异常，请稍后重试或联系客服';
export function replaceErrorMessage(message: string) {
  let isNeedReplace = false;
  abnormalErrors.forEach((item) => {
    if ((message || '').toLowerCase().indexOf(item.toLowerCase()) !== -1) {
      isNeedReplace = true;
    }
  });
  return isNeedReplace ? replaceMessage : message || defalutMessage;
}
