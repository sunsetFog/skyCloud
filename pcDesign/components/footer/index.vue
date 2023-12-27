<template>
    <footer id="footerUnit">
        <div class="contain-center">
            <div class="copyright-example">
                <span>@2010-2020&nbsp;钻石娱乐&nbsp;版权所有</span>
                <span>钻石娱乐&nbsp;邀你共创未来</span>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";

export default defineComponent({
    name: 'footerUnit'
});
</script>

<style lang="less" scoped>
#footerUnit {
    width: 100%;
    .mixin_image(url('./img/diceng.png'));

    .contain-center {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        padding: 35px 0px 35px 0px;

        .copyright-example {
            width: 100%;
            height: 45px;
            line-height: 45px;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            span:nth-of-type(1) {
                width: auto;
                height: 45px;
                display: inline-block;
                text-align: left;
                line-height: 45px;
                color: #ffffff;
                float: left;
            }

            span:nth-of-type(2) {
                width: auto;
                height: 45px;
                display: inline-block;
                text-align: left;
                line-height: 45px;
                color: #ffffff;
                float: left;
                margin-left: 55px;
            }
        }
    }

}
</style>
