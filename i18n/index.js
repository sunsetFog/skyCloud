import { createI18n, detectBrowserLanguage } from 'vue-i18n'

import enLocale from './lang/en'
import zhLocale from './lang/zh'

// study: 国际多语言
const i18n = createI18n({
    /*
        切换语言
        选项：
            中文：en 
            英文：zh
            自动检测浏览器语言：detectBrowserLanguage()   --- 一般不用，因为可能没有德语翻译
    */
    locale: sessionStorage.getItem('language') || 'zh',
    messages: {
        // 英文翻译
        en: {
            ...enLocale,
        },
        // 中文翻译
        zh: {
            ...zhLocale,
        }
    }
})

export default i18n