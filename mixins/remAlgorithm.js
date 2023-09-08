/*
  rem算法
  mixins混合使用
  全局设置：与App.vue混合
  局部设置：与局部vue混合
  
  import algorithm from '@/pages/luckyDraw/algorithm.js'
  mixins: [ algorithm ],
*/
export default {
    data() {
        return {
            resizeEvt: 'orientationchange' in window ? 'orientationchange' : 'resize'
        }
    },
    created() {
        this.recalc()
        // 监听浏览器窗口大小和横竖屏变化
        window.addEventListener(this.resizeEvt, this.recalc, false)
        document.addEventListener('DOMContentLoaded', this.recalc, false)
    },
    destroyed() {
        window.removeEventListener(this.resizeEvt, this.recalc, false)
        document.removeEventListener('DOMContentLoaded', this.recalc, false)
    },
    methods: {
        recalc() {
            console.log('--rem算法--')
            let clientWidth = document.documentElement.clientWidth
            sessionStorage.setItem('clientWidth', clientWidth)

            if (!clientWidth) return
            let pixelSize = 16 * (clientWidth / 375)
            sessionStorage.setItem('pixelSize', pixelSize)
            document.documentElement.style.fontSize = pixelSize + 'px'
        }
    }
}
