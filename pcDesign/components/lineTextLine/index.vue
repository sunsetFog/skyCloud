<template>
    <!--
        hr分割线:水平线中间添加文字
     -->
    <div id="lineTextLine">
        <hr />
        <slot></slot>
        <hr />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";

export default defineComponent({
    name: 'lineTextLine'
});
</script>

<style lang="less" scoped>
#lineTextLine {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    color: yellowgreen;
    hr {
        margin: 0;
        float: left;
        flex: 1;
        height: 0.5px;
        border: 0;
        background: yellowgreen;
    }

    hr:nth-of-type(1) {
        margin-right: 15px;
    }

    hr:nth-of-type(2) {
        margin-left: 15px;
    }
}
</style>
