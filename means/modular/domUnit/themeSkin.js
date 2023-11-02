/*
study: 皮肤切换
 */
export default {
    // 刷新皮肤保持不变
    initTheme() {
        const type = sessionStorage.getItem('theme_skin') || '';
        this.changeTheme(type);
    },
    changeTheme(type) {
        sessionStorage.setItem('theme_skin', type);
        // 修改html标签的类名
        document.documentElement.className = type;
        // html设置属性
        document.documentElement.setAttribute('data-theme', type);
    }
}
