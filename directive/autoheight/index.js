import { debounce } from 'lodash'
const mideaAutoheight = {}

/*
binding.value-----  传入参数{tabs:true, height:'高度', subHeight:'高度差'}
 */
function calcHeight(bindValue, height) {
    let elHeight = height
    if (bindValue) {
        // tabs 标签栏
        if (bindValue.tabs === true) {
            elHeight -= 33
        }

        // 高度差 (flex布局中无须处理，会自动按比例调整)
        if (bindValue.subHeight) {
            const subHeight = (bindValue.subHeight + '').replace(/[^\d]/g, '')
            elHeight -= subHeight
        }

        // 自定义高度
        if (bindValue.height) {
            const height = (bindValue.height + '').replace(/[^\d.%]/g, '')
            if (height.indexOf('%') === -1) {
                elHeight = height
            } else {
                elHeight *= parseInt(height) * 0.01
            }
        }
    }

    // app-main的padding-top值 
    elHeight -= 10
    return elHeight
}

let debounceFn = null

const install = function (Vue) {
    Vue.directive('autoHeight', {
        bind: function (el, binding, vnode) {
        },
        /**
        * 
        * @param {*} el 
        * @param {*} binding {enabel:'状态', height:'高度', subHeight:'高度差'}
        * @param {*} vnode 
        */
        inserted: function (el, binding, vnode) {
            const bindValue = binding.value
            // debugger
            // 禁用状态
            if (bindValue && bindValue.enabel === false) {
                return
            }
            el.classList.add('flex-container')
            const finalHeight = function () {
                const elHeight = calcHeight(bindValue, document.querySelector('.app-main').offsetHeight)
                el.style.height = elHeight + 'px'
                el.style.maxHeight = elHeight + 'px'
            }
            finalHeight()
            debounceFn = debounce(finalHeight, 450)
            window.addEventListener('resize',
                debounceFn
            )
        },
        update: function (el, binding, vnode) {

        },
        componentUpdated: function (el, binding, vnode) {
            // debugger
        },
        unbind: function (el, binding, vnode) {
            window.removeEventListener('resize', debounceFn)
        }
    })
}

mideaAutoheight.install = install
export default mideaAutoheight