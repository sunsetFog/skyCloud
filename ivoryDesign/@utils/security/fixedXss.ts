import DOMPurify from 'dompurify';
/*
 React DOMPurify 来保护你的 React 应用免受 HTML 注入攻击
 防止 XSS（跨站脚本）攻击和其他安全漏洞
*/

/**
 * TODO 增加过滤可能引起xss攻击的敏感信息
 * @param contents
 */
export function fixedXssContent(contents: any) {
    if (typeof DOMPurify.sanitize !== 'function') {
        return contents;
    }
    return DOMPurify.sanitize(contents);
}
