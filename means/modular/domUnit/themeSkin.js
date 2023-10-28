/*
study: 皮肤切换
 */
export default {
    // 刷新皮肤保持不变
    initTheme() {
        const type = sessionStorage.getItem('theme_skin') || '';
        this.changeTheme(type);
    },
    // 修改html标签的类名，从而改变:root根样式
    changeTheme(type) {
        sessionStorage.setItem('theme_skin', type);
        document.documentElement.className = '';
        switch (type) {
            case 'white':
                document.documentElement.classList.add('white');
                break;
            case 'black':
                document.documentElement.classList.add('black');
                break;
            case 'blue':
                document.documentElement.classList.add('blue');
                break;
            default:
                document.documentElement.classList.remove('white');
                break;
        }
    },
    changeTheme2(type) {
        // html设置属性
        document.documentElement.setAttribute('data-theme', type);
    }
}
