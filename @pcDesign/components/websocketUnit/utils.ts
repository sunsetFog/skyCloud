
// 计算带中文字符串长度
export function lengthInUtf8Bytes(str) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}
// 格式化ws消息
export function formatMessage(msg: string) {
    try {
      // 处理后端json字符串格式
      msg = JSON.parse(msg);
    } catch {
      msg =
        msg ||
        'msgpush.com00000083{"data":{"endTime":1560049683,"periods":"01","startTime":1560048683},"msgType":"1"}';
    }
    const regexp = '([a-z.]+)(\\d+)(.+)';
    const matches: any[] = msg.match(RegExp(regexp, 'ig')) || [];
    return matches.reduce((prev: any, curr: any) => {
      const _matches = curr.match(RegExp(regexp, 'i')) || [];
      const matches3 = lengthInUtf8Bytes(_matches[3]);
      // 消息长度检查，如果检查不通过，continue循环 与移动端一致不再比对
      // if (_matches.length && matches3 !== parseInt(_matches[2], 10)) {
      //   return prev;
      // }
      // 部分情况msg数据格式不符,不影响代码逻辑
      let body = {};
      try {
        body = JSON.parse(_matches[3]);
      } catch {}
      // 消息长度检查通过，将有效消息push到result数组
      return prev.concat({
        head: _matches[1],
        length: matches3,
        body,
      });
    }, [] as Array<any>);
  }
