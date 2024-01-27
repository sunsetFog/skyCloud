function closest(el, selector) {
    let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    let isFind = false

    while (el) {
        el = el.parentElement;
        if (matchesSelector.call(el, selector)) {
            isFind = true
            break;
        }
    }
    return isFind ? el : null;
}

const dialogDrag = {}

const install = function (Vue) {
    Vue.directive('dialogDrag', {
        bind(el, binding, vnode, oldVnode) {
            let options = {
                moveHeader: '.el-dialog__header', // 按住拖动的容器
                moveBox: '.el-dialog' // 要移动的容器
            }
            options = Object.assign(options, binding.value || {})

            let moveHeader = null
            let moveBox = null
            let moveBoxStyle = null

            // 鼠标按下，计算当前元素距离可视区的距离
            const moveDown = function (e) {
                const disX = e.clientX - moveHeader.offsetLeft
                const disY = e.clientY - moveHeader.offsetTop

                const screenWidth = document.body.clientWidth // body当前宽度
                const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取) 
                const moveBoxWidth = moveBox.offsetWidth // 对话框宽度
                const moveBoxHeight = moveBox.offsetHeight // 对话框高度

                const minMoveBoxLeft = moveBox.offsetLeft
                const maxMoveBoxLeft = screenWidth - moveBox.offsetLeft - moveBoxWidth

                const minMoveBoxTop = moveBox.offsetTop
                const maxMoveBoxTop = screenHeight - moveBox.offsetTop - moveBoxHeight

                // 获取到的值带px 正则匹配替换
                let styL, styT
                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (moveBoxStyle.left.includes('%')) {
                    styL = +document.body.clientWidth * (+moveBoxStyle.left.replace(/\%/g, '') / 100)
                    styT = +document.body.clientHeight * (+moveBoxStyle.top.replace(/\%/g, '') / 100)
                } else {
                    styL = +moveBoxStyle.left.replace(/\px/g, '')
                    styT = +moveBoxStyle.top.replace(/\px/g, '')
                }

                // 通过事件委托，计算移动的距离
                document.onmousemove = function (e) {
                    let left = e.clientX - disX
                    let top = e.clientY - disY

                    // 边界处理
                    if (-(left) > minMoveBoxLeft) {
                        left = -(minMoveBoxLeft)
                    } else if (left > maxMoveBoxLeft) {
                        left = maxMoveBoxLeft
                    }

                    if (-(top) > minMoveBoxTop) {
                        top = -(minMoveBoxTop)
                    } else if (top >= maxMoveBoxTop) {
                        top = maxMoveBoxTop
                    }

                    // 移动当前元素 
                    moveBox.style.left = `${left + styL}px`
                    moveBox.style.top = `${top + styT}px`
                }

                document.onmouseup = function (e) {
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }

            vnode.context.$nextTick(() => {
                if (options.moveHeader === '.el-dialog__header') { // el-dialog
                    moveHeader = el.querySelector(options.moveHeader)
                    moveBox = el.querySelector(options.moveBox)
                } else {
                    moveHeader = el.querySelector(options.moveHeader)
                    moveBox = closest(moveHeader, options.moveBox)
                    moveBox.style.position = 'relative'
                    moveBox.style.left = 0
                    moveBox.style.top = 0
                }

                moveBoxStyle = moveBox.currentStyle || window.getComputedStyle(moveBox, null)
                moveHeader.style.cursor = 'move'
                moveHeader.style.userSelect = 'none'
                moveHeader.onmousedown = moveDown
            })
        },
        update(el, binding, vnode, oldVnode) {
            const options = binding.value
            if (options && options.moveHeader !== '.el-dialog__header') {
                vnode.context.$nextTick(() => {
                    const moveHeader = el.querySelector(options.moveHeader)
                    const moveBox = closest(moveHeader, options.moveBox)
                    moveBox.style.left = 0
                    moveBox.style.top = 0
                })
            }
        }
    })
}

dialogDrag.install = install
export default dialogDrag