<template>
    <Layout1>
        <section id="loginUnit">
            <div class="entertainment">
                <img class="login-logo" src="./img/logo2.png" />
                <img class="big-fish" src="./img/fish.png" />
                <div class="sign-frame">
                    <div class="code-and-service">
                        <span @click="customerService()"></span>
                    </div>
                    <div class="form-information">
                        <form>
                            <div class="account">
                                <span>账号:</span>
                                <input v-model.trim="account_number" maxlength="20" type="text" placeholder="请输入账号"
                                    name="username" autocomplete="username" />
                            </div>
                            <div class="password-enter">
                                <span>密码:</span>
                                <!--
                                浏览器自动填充？
                                    type="text"和type="password"
                                    name="username"和name="password"
                                    对比
                                        旧密码
                                        autocomplete="new-password"用于新密码输入场景，防止浏览器自动填充旧密码
                                        验证码
                                        autocomplete="off"禁用浏览器的自动填充功能
                                    对比
                                        autocomplete="current-password"推荐
                                        autocomplete="password"导致username没自动填充提示窗口
                                    确保没有干扰自动填充的属性，readonly或disabled



                                使浏览器在用户登录后弹出“记住密码”或“更新密码”的提示框?
                                    不要使用阻止默认提交行为，别用@submit.prevent
                                    浏览器自动填充标准ok
                                    post请求



                                按钮可以加loading加载效果
                                enter键盘触发事件
                                    方式1: 密码input输入框加@keyup.enter.native="signIn"，但是要获取焦点
                                    方式2: 监听键盘事件
                            -->
                                <input :type="eyeType" maxlength="12" v-model.trim="password_number"
                                    placeholder="请输入登陆密码" name="password" autocomplete="current-password" />
                                <div @click="eyeMeans">
                                    <img v-if="eyeType == 'text'" class="zhengyan" src="./img/zhengyan.png" />
                                    <img v-else class="biyan" src="./img/biyan.png" />
                                </div>
                            </div>
                        </form>
                        <div class="remember-and-forget">
                            <div class="rectangle" @click="remember_checked = !remember_checked"><img
                                    v-show="remember_checked" src="./img/jizhu.png" /></div>
                            <span>记住密码</span>
                            <span @click="forgetPassword">忘记密码</span>
                        </div>
                        <div class="login-register">
                            <button @click="signIn"></button>
                            <button @click="rapidRegistration('register')"></button>
                        </div>
                        <div class="recommend"><span></span><span>推荐最优路线</span><span></span></div>
                        <div class="optimal" @click="rapidRegistration('line')"></div>
                    </div>
                </div>

            </div>
        </section>
    </Layout1>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";
export default defineComponent({
    name: 'loginUnit',
    data() {
        return {
            account_number: '',// 登陆账号
            password_number: '',// 登陆密码
            remember_checked: false,
            eyeType: 'password'
        }
    },
    created() {
        console.log('--login-that.$store-', this.$store);
        // this.$cookies.remove("tokenPcClient");// 登录页面，删除token缓存

        // this.catchMice();
        // 记住密码
        if (this.$means.getCookie("remember_account")) {
            this.account_number = this.$means.getCookie("remember_account");
            this.password_number = this.$means.getCookie("remember_password", true);
            this.remember_checked = true;
        }


        this.keyEnter();
    },
    watch: {
        // password_number(cur, old) {
        //     if (/[^A-z0-9]/.test(cur)) {
        //         this.$message.error('不能输入特殊字符！');
        //         this.password_number = cur.replace(/[^A-z0-9]/, '');
        //     }
        // }
    },
    methods: {
        eyeMeans() {
            if (this.eyeType == 'password') {
                this.eyeType = 'text';
            } else {
                this.eyeType = 'password';
            }
        },
        /* 登录按钮---监听键盘事件 */
        keyEnter() {
            let that = this;
            document.onkeypress = function (e) {
                let evt: any = e || event;
                let keycode = evt.keyCode ? evt.keyCode : evt.which;
                // console.log('keycode',keycode,'---',evt);

                if (keycode == 13) {
                    let login = document.getElementById('login');
                    // console.log('#login',login);
                    if (login != null) {
                        that.signIn();// 登录方法名
                        return false;
                    }

                }
            };
        },
        customerService() {
            window.open("https://nine.mdihi.com/chat/chatClient/chatbox.jsp?companyID=365033539&configID=2306&jid=4095904748&s=1");
        },
        rapidRegistration(value) {
            if (value == 'register') {
                this.$router.push({ path: '/register/index' });
            } else if (value == 'line') {
                this.$message.success("敬请期待！");
            }
        },
        signIn(res) {
            var that = this;
            if (that.account_number == '' && that.password_number == '') {
                that.$message.error('请输入账号和密码!');
                return;
            } else if (that.account_number == '') {
                that.$message.error('请输入账号!');
                return;
            } else if (that.password_number == '') {
                that.$message.error('请输入密码!');
                return;
            }

            let params = {
                username: that.account_number,
                password: that.password_number
            }

            that.$apihttp({
                url: '/sky/user/login',
                method: 'post',
                params: params
            }).then((res) => {
                console.log('--login--', res);

                if (res.code == "200") {
                    that.$cookies.set(process.env.VUE_APP_TOKEN_KEY, res.data.token, "1d");
                    // study: 动态添加路由
                    that.$store.dispatch('routerApple').then(function (value) {
                        // vue3差异化：批量添加路由不能传数组
                        for (let i = 0; i < value.length; i++) {
                            const item = value[i];
                            that.$router.addRoute(item);
                        }
                        // that.$router.addRoute(value);
                        // 记住密码
                        if (that.remember_checked) {
                            that.$means.setCookie('remember_account', that.account_number, 30);
                            that.$means.setCookie('remember_password', that.password_number, 30, true);
                        } else {
                            that.$means.deleteCookie('remember_account');
                            that.$means.deleteCookie('remember_password');
                        }
                        if (process.env.VUE_APP_TOKEN_KEY == 'tokenAdminClient') {
                            that.$router.push({ path: '/home/index' });
                        } else if (process.env.VUE_APP_TOKEN_KEY == 'tokenPcClient') {
                            that.$router.push({ path: '/home/homeIndex/index' });
                        }

                        // that.$router.push({ path: '/home/world/world' });
                    })
                }
            }).catch((err) => {
                console.log('error', err);
            })
        },
        // catchMice() {
        //     var that = this;
        //     Object.defineProperties(catchGame, {
        //         mice: {
        //             configurable: true,
        //             get: function () {
        //                 return '';
        //             },
        //             set: function (value) {
        //                 if (value == 'ok') {
        //                     refreshWeb.state = 'init';
        //                     that.signIn();
        //                 }
        //             }
        //         },
        //         register: {
        //             configurable: true,
        //             get: function () {
        //                 return '';
        //             },
        //             set: function (value) {
        //                 if (value == 'ok') {
        //                     refreshWeb.state = 'init';
        //                     that.rapidRegistration('register');
        //                 }
        //             }
        //         }
        //     });
        // }
    }
});
</script>

<style lang="less" scoped>
#loginUnit {
    width: 100%;
    height: 100%;
    background-image: url('./img/bg_denglu.jpg');
    background-repeat: no-repeat;
    background-size: 100% calc(100% + 115px);
    @color_violet: #3d1351; //字体
    @color_label: #dbcbb7; //字体
    @color_green: #0f991a; //按钮背景
    @color_hover: #f85e0b; //hover
    @color_stroke: #143597;

    :deep(input:-webkit-autofill) {
        background-color: none !important;
    }

    :deep(input) {
        background-color: none !important;
        background: none;
    }

    .entertainment {
        width: 100%;
        height: 100%;
        position: relative;

        .login-logo {
            width: 790px;
            height: 170px;
            position: absolute;
            top: 10px;
            left: 50%;
            margin-left: -395px;
        }

        .big-fish {
            width: 326px;
            height: 387px;
            position: absolute;
            left: 0px;
            bottom: 0px;
        }

        .sign-frame {
            width: 480px;
            height: 400px;
            .mixin_image(url('./img/kuankuan.png'));
            position: absolute;
            top: 190px;
            left: 50%;
            margin-left: -240px;

            .code-and-service {
                width: 100%;
                height: 40px;

                span:nth-of-type(1) {
                    width: 105px;
                    height: 34px;
                    float: right;
                    .mixin_image(url('./img/kefu.png'));
                    cursor: pointer;
                    margin: 3px 3px 0px 0px;
                }

                span:nth-of-type(1):hover {
                    .mixin_image(url('./img/kefu_hover.png'));
                }
            }

            .form-information {
                width: 100%;
                height: 360px;
                padding: 20px 30px 0px 30px;

                .account,
                .password-enter {
                    width: 100%;
                    height: 50px;
                    .mixin_image(url('./img/juxingkuang.png'));
                    color: #ffffff;
                    border-radius: 4px;
                    border: 1px solid #b1923f;

                    span {
                        width: 20%;
                        height: 50px;
                        display: inline-block;
                        text-align: left;
                        line-height: 50px;
                        color: @color_label;
                        font-size: 24px;
                        float: left;
                        font-weight: 600;
                        padding: 0px 0px 0px 13px;
                    }

                    input {
                        width: 260px;
                        height: 48px;
                        text-align: left;
                        line-height: 48px;
                        text-indent: 10px;
                        background: none;
                        float: left;
                        color: @color_label;
                        font-size: 20px;
                    }

                    div {
                        width: 70px;
                        height: 50px;
                        float: right;
                        cursor: pointer;

                        .zhengyan {
                            width: 29px;
                            height: 16px;
                            font-size: 20px;
                            float: right;
                            margin: 17px 20px 0px 0px;
                        }

                        .biyan {
                            width: 34px;
                            height: 9px;
                            font-size: 20px;
                            float: right;
                            margin: 20.5px 20px 0px 0px;
                        }
                    }
                }

                .account {
                    input {
                        width: 80%;
                    }
                }

                .password-enter {
                    margin-top: 15px;
                }

                .remember-and-forget {
                    width: 100%;
                    height: 35px;
                    position: relative;
                    font-size: 16px;

                    .rectangle {
                        width: 18px;
                        height: 18px;
                        .mixin_image(url('./img/fuxuankuang.png'));
                        position: absolute;
                        top: 50%;
                        left: 5px;
                        margin-top: -9px;
                        padding: 2px 0px 0px 2px;
                        cursor: pointer;

                        img {
                            width: 13px;
                            height: 13px;
                            float: left;
                        }
                    }

                    span:nth-of-type(1) {
                        width: auto;
                        height: 35px;
                        display: inline-block;
                        text-align: center;
                        line-height: 35px;
                        color: @color_violet;
                        position: absolute;
                        top: 0px;
                        left: 30px;
                    }

                    span:nth-of-type(2) {
                        width: auto;
                        height: 25px;
                        display: inline-block;
                        text-align: center;
                        line-height: 25px;
                        color: @color_violet;
                        position: absolute;
                        top: 50%;
                        right: 0px;
                        margin-top: -12.5px;
                        cursor: pointer;
                    }

                    span:nth-of-type(2):hover {
                        color: @color_hover;
                    }
                }

                .login-register {
                    width: 100%;
                    height: 50px;

                    button {
                        cursor: pointer;
                        background: none;
                    }

                    button:nth-of-type(1) {
                        width: 48%;
                        height: 50px;
                        display: inline-block;
                        text-align: center;
                        line-height: 50px;
                        color: white;
                        float: left;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: 600;
                        .mixin_image(url('./img/denglu.jpg'));
                    }

                    button:nth-of-type(1):hover {
                        .mixin_image(url('./img/denglu_hover.jpg'));
                    }

                    button:nth-of-type(2) {
                        width: 48%;
                        height: 50px;
                        display: inline-block;
                        text-align: center;
                        line-height: 50px;
                        color: white;
                        float: right;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: 600;
                        .mixin_image(url('./img/kuaisuzhuce.jpg'));
                    }

                    button:nth-of-type(2):hover {
                        .mixin_image(url('./img/kuaisuzhuce_hover.jpg'));
                    }
                }

                .recommend {
                    width: 100%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    color: @color_violet;
                    margin: 6px 0px 6px 0px;
                    position: relative;

                    span:nth-of-type(1) {
                        width: 75px;
                        height: 10px;
                        display: inline-block;
                        text-align: left;
                        line-height: 10px;
                        color: @color_violet;
                        position: absolute;
                        left: 62px;
                        top: 15px;
                        border-bottom: 1px solid @color_violet;
                    }

                    span:nth-of-type(2) {
                        width: 125px;
                        height: 50px;
                        display: inline-block;
                        text-align: center;
                        line-height: 50px;
                        color: @color_violet;
                        position: absolute;
                        left: 137px;
                        top: 0px;
                        font-size: 17px;
                        overflow: hidden;
                    }

                    span:nth-of-type(3) {
                        width: 75px;
                        height: 10px;
                        display: inline-block;
                        text-align: left;
                        line-height: 10px;
                        color: @color_violet;
                        position: absolute;
                        left: 262px;
                        top: 15px;
                        border-bottom: 1px solid @color_violet;
                    }
                }

                .optimal {
                    width: 100%;
                    height: 50px;
                    .mixin_image(url('./img/xuanxian.png'));
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                }

                .optimal:hover {
                    .mixin_image(url('./img/xuanxian_hover.png'));
                }
            }
        }
    }
}
</style>
