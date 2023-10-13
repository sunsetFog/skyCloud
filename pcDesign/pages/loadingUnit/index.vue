<template>
    <section id="loadingUnit">
        <img class="logo2" src="./img/logo2.png"/>
        <main>
            <div class="progress-example">
                <span :style="{ width: percentage + '%', borderTopRightRadius: radius.top_right, borderBottomRightRadius: radius.bottom_right }"></span>
            </div>
        </main>
    </section>
</template>

<script>
export default {
    name: 'loadingUnit',
    data() {
        return {
            percentage: 0,
            timerKey: '',
            radius: { top_right: '0px', bottom_right: '0px' }
        }
    },
    created() {
        this.timerKey = setInterval(this.timerMeans, 40);
    },
    methods: {
        timerMeans() {
            if(this.percentage >= 100) {
                clearInterval(this.timerKey);
                this.variableGear();
            }else{
                this.percentage += 2;
            }
        },
        variableGear(value) {
            var that = this;
            that.$store.dispatch('routerApple').then(function (value) {
                for (let i = 0; i < value.length; i++) {
                    const item = value[i];
                    that.$router.addRoute(item);
                }
                // console.log('--then结束-2-', that.$router.getRoutes());
                that.radius.top_right = '15px';
                that.radius.bottom_right = '15px';
                that.$router.push({path: sessionStorage.getItem('save_path')});
            });
        }
    }
}
</script>

<style lang="less" scoped>
#loadingUnit {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .mixin_image(url('~./img/bg_loading.jpg'));
    position: relative;
    .logo2 {
        width: 550px;
        height: 480px;
        position: absolute;
        left: 50%;
        top: 150px;
        margin-left: -275px;
    }
    main {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .progress-example{
            width: 860px;
            height: 46px;
            .mixin_image(url('~./img/kuang.png'));
            overflow: hidden;
            border-radius: 20px;
            padding: 5px 5px 9px 6px;
            span{
                height: 100%;
                display: inline-block;
                .mixin_image(url('~./img/jindus.png'));
                float: left;
                overflow: hidden;
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
                transition: width 0.4s ease-out;
            }
        }
    }

}
</style>
