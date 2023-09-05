<template>
    <section id="footerUnit">
       <div class="footer-contain">
           <div class="contain-center">
               <div class="copyright-example">
                   <span>@2010-2020&nbsp;钻石娱乐&nbsp;版权所有</span>
                   <span>钻石娱乐&nbsp;邀你共创未来</span>
               </div>
           </div>
       </div>

    </section>
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
#footerUnit{
    width: 100%;
    .footer-contain{
        width: 100%;
        height: 100%;
        .mixin_image(url('./img/diceng.png'));
        .contain-center{
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 35px 0px 35px 0px;
            overflow: hidden;
            .copyright-example{
                width: 100%;
                height: 45px;
                line-height: 45px;
                padding: 0px 0px 0px 420px;
                font-size: @font_size12;
                overflow: hidden;
                span:nth-of-type(1){
                    .mixin_span(auto,45px,none,@color_white,left);
                    float: left;
                }
                span:nth-of-type(2){
                    .mixin_span(auto,45px,none,@color_white,left);
                    float: left;
                    margin-left: 55px;
                }
            }
        }
    }
 
}
</style>