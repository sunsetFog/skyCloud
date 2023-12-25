<template>
    <section id="layout1" :style="{ paddingBottom: paddingBottom + 'px' }">
        <main class="scenery">
            <slot></slot>
        </main>
        <footers ref="seabed"></footers>
    </section>
</template>
<!--
    只在满屏没滚动条情况的
    在用页面：登陆页，注册页
 -->
<script lang="ts">
import {
    defineComponent
} from "vue";
import footers from '@sky/pcDesign/components/footer/index.vue';
export default defineComponent({
    name: 'layout1',
    components: { footers },
    data() {
        return {
            paddingBottom: 0,
        }
    },
    mounted() {
        this.paddingBottom = this.$refs.seabed?.$el?.clientHeight || 0;
    }
});
</script>

<style lang="less" scoped>
#layout1 {
    width: 100%;
    height: 100%;
    .scenery {
        width: 100%;
        height: 100%;
    }
}
</style>
